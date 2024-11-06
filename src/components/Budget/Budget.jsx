import './Budget.css'
import { useState } from 'react';
import editSquare from '../../assets/edit_square_Budget.svg'
import foodIcon from '../../assets/lunch_dining_Budget.svg'
import billsIcon from '../../assets/payments_Budget.svg'
import othersIcon from '../../assets/others_Budget.svg'
import deleteIcon from '../../assets/close.svg'
import closeIcon from '../../assets/close.svg'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


function Budget({onClose, onBudget}) {
    const [budgetVisible, setBudgetVisible] = useState(false);
    const displayBudgetModal = () => setBudgetVisible(true);
    const hideBudgetModal = () => setBudgetVisible(false);
    const[addExpenseVisible, setAddExpenseVisible] = useState(false);
    const displayAddExpense = () => setAddExpenseVisible(true);
    const hideAddExpense = () => {
        setAddExpenseVisible(false)
        setErrorVisible(false);
    }
    const [updateBudget, setUpdateBudget] = useState('');
    const [graphVisible, setGraphVisible] = useState(true);
    const generateChartData = () => {
        const categoryTotals = expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {});

        return {
            labels: Object.keys(categoryTotals), // Expense categories
            datasets: [
                {
                    // label: 'Expenses by Category',
                    data: Object.values(categoryTotals), // Amounts per category
                    backgroundColor: [
                        '#FFCE56',
                        '#FF6384', // Color for each category (customize as needed)
                        '#36A2EB',
                        '#34c742',
                    ],
                    hoverBackgroundColor: [
                        '#FFCE56',
                        '#FF6384',
                        '#36A2EB',
                        '#34c742',
                    ]
                },
            ],
        };
    };

    // Chart options for displaying legend with labels
const chartOptions = {
    plugins: {
        legend: {
            position: 'right', // Position the legend to the right
            labels: {
                boxWidth: 20, // Width of color box
                padding: 15, // Space between each legend item
                generateLabels: (chart) => {
                    const data = chart.data;
                    return data.labels.map((label, i) => ({
                        text: label, // Label text
                        fillStyle: data.datasets[0].backgroundColor[i], // Match color
                        fontColor: "whitesmoke",
                        hidden: false,
                    }));
                },
            },
        },
    },
};

    const handleBudgetInput = (e) => {
        const value = e.target.value;
        const validDecimalPattern = /^\d*\.?\d{0,2}$/;
        if (validDecimalPattern.test(value)) {
          setUpdateBudget(value);
        }
      };

      const handleBudgetKeyDown = (e) => {
        if (['-', 'e', '+'].includes(e.key)) {
          e.preventDefault();
        }
      };

      const [displayBudget, setDisplayBudget] = useState(0);

      const handleSaveBudget = () => {
        const numberValue = parseFloat(updateBudget);
        if (!isNaN(numberValue)) {
            setDisplayBudget(numberValue);
            setRemainingBudget(numberValue - totalExpenses); // Calculate initial remaining budget
        }
        hideBudgetModal();
      };

      const formatBalance = (amount) => {
        return amount.toLocaleString("en-US", {
        style:"decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits:2
        }
        );
      }
      
      const [expenseAmount, setExpenseAmount] = useState('');
      const [expenseCategory, setExpenseCategory] = useState('');
      const [expenses, setExpenses] = useState([]);
      const [totalExpenses, setTotalExpenses] = useState(0);
      const [errorVisible, setErrorVisible] = useState(false);

      // Update the input values for expenses
      const handleExpenseAmount = (e) => setExpenseAmount(e.target.value);
      const handleExpenseCategory = (e) => {
        setExpenseCategory(e.target.value)
      };
      const saveDisabled = !expenseAmount || !expenseCategory
      
      // Save expense and update the total expenses

      const handleSaveExpense = () => {
        setErrorVisible(true); // Show error if any field is empty  
     // Ensure all required fields are filled     
       if (saveDisabled) {
        setErrorVisible(true); // Show error if fields are empty
        return;
    } 

    const expenseValue = parseFloat(expenseAmount);

    // Proceed if fields are filled
    if (!isNaN(expenseValue)) {
        const newExpense = { amount: expenseValue, category: expenseCategory};
        const updatedExpenses = [...expenses, newExpense];

        setExpenses(updatedExpenses);
        setTotalExpenses(prevTotal => {
            const newTotal = prevTotal + expenseValue;
            setRemainingBudget(displayBudget - newTotal); // Update remaining budget
            return newTotal;
        });

        // Clear inputs after successful save
        setExpenseAmount(''); 
        setExpenseCategory('');
        setErrorVisible(false); // Hide error after successful save
        hideAddExpense();
        console.log(updatedExpenses);
    }
        }
    
const [remainingBudget, setRemainingBudget] = useState(0); // State for remaining budget

// Function to handle deleting an expense
const handleDeleteExpense = (index) => {
    // Calculate the amount of the expense being removed
    const expenseAmount = expenses[index].amount;

    // Remove the expense from the list
    const updatedExpenses = expenses.filter((item, i) => i !== index);
    setExpenses(updatedExpenses);

    // Update total expenses and remaining budget
    setTotalExpenses(prevTotal => {
        const newTotal = prevTotal - expenseAmount;
        setRemainingBudget(displayBudget - newTotal); // Update remaining budget
        return newTotal;
    });
};

    return (
        <>
        <div className = "budgetWindow">

            <div className="budget-display-container">
                <span><img className='closeIconBudget' src ={closeIcon} onClick={onClose}/></span>
    
                    
                <p className="budget-header"> Budget Tracker </p>
             
                
                <div className="budget-container">
                    <p className="budget-amount">
                        <span className="initial-budget-amount">
                            P{displayBudget ? 
                            formatBalance(displayBudget) : '0.00'} 
                        </span>
                        
                        <img
                            src = {editSquare}
                            className="edit-square"
                            onClick={displayBudgetModal}
                        />
                    </p>
                    <p className="budget-initial">Total Budget</p>
                    <p className="expenses-amount">P{formatBalance(totalExpenses)}</p>
                    <p className="expenses-total">Total Expenses</p>
                    <p className={`remaining-amount ${remainingBudget < 0 ? 'negative-amount' : ''}`}>P{formatBalance(remainingBudget)}</p>
                    <p className="remaining-total">Total Remaining</p>
                </div>
            </div>

            {/* "Update Initial Budget" Modal */}
            {budgetVisible && (
                <div className="modal">
                    <div className="update-budget-container">
                        <p className="update-budget">Update Budget</p>
                        <div className="update-budget-input">
                            Total Budget:*
                            <br />
                            <input
                                type="number"
                                min={0}
                                step="0.01"
                                id="budgetInput"
                                onChange={handleBudgetInput}
                                onKeyDown={handleBudgetKeyDown}
                                required
                            />
                        </div>
                        <div className="modalBtn">
                            <button className="cancel-budget" onClick={hideBudgetModal}>
                                Cancel
                            </button>
                            <button className="save-budget" onClick={handleSaveBudget}>Save</button>
                        </div>
                    </div>
                </div>
            ) }

            {/* "addExpense" Modal */}
            {addExpenseVisible && (<div className="modal">
                <div className="expense-form">
                    <p className="add-expenses">Add Expenses</p>
                    Amount:*
                    <input 
                    type="number" 
                    className="input-css" 
                    id="expense-amount"
                    value = {expenseAmount}
                    onChange= {handleExpenseAmount} 
                    required />
                    <br />
                    Expense category:*
                    <select 
                    className="input-css" 
                    id="expense-category" 
                    value={expenseCategory} 
                    onClick={handleExpenseCategory}
                    onChange={handleExpenseCategory}
                    required>
                        <option className = "option-css" value = "" disabled>Select Category</option>
                        <option className="option-css" value="Food">Food</option>
                        <option className="option-css" value="Bills">Bills</option>
                        <option className="option-css" value="Transfer">Transfer</option>
                        <option className="option-css" value="Others">Others</option>
                    </select>
                    <br />
                    {errorVisible &&(<div className="errorMessage">Please fill in all fields.</div>)}
                    <div className="form-button-container">
                        <button className="cancel-expense-btn" onClick = {hideAddExpense}>Cancel</button>
                        <button className="save-expense-btn" onClick= {handleSaveExpense}>Save</button>
                    </div>
                </div>
            </div>)
            }

     {/* List of Expenses  */}
     <div className="expenses-notebook">
                <p className="header-expenses-notebook">Expenses List:</p>
                {expenses.length > 0 ? (
                    expenses.map((expense, index) => (
                        <div key={index} className="expense-item">
                
                {/* Display icon based on category */}
                <img
                    src={
                        expense.category === 'Food'
                            ? foodIcon
                            : expense.category === 'Bills'
                            ? billsIcon
                            : othersIcon // Fallback icon for other categories
                    }
                    alt={`${expense.category} icon`}
                    className="expense-icon"
                />
                            <p className = "expense-book-list">{expense.category}</p>
                            <p className = "expense-book-list">P{formatBalance(expense.amount)}</p>

                
                {/* Delete button */}
                <img
                    src={deleteIcon}
                    alt="Delete"
                    className="delete-icon"
                    onClick={() => handleDeleteExpense(index)} 
                />
                            
    </div>
                    ))
                ) : (
                    <div className = "expense-book-list">No expenses added yet.</div>
                )}
                
                <button className="addBtn" onClick={displayAddExpense}>Add Expense</button>
            </div>
        </div>

        {graphVisible && 
            
            <div className="graph">
                <div className="graph">
                        <Pie data={generateChartData()} options={chartOptions}/>
                </div>
            </div>
            
            }
        </>
    );

} 

export default Budget;