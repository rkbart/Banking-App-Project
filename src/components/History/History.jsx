import './History.css';

function History({ transactionHistory }) {
    const formatBalance = (amount) => {
        return amount.toLocaleString('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    return (
        <div id="history-container">
            <h3>Transaction History</h3>
            <div id="history-table-container">
                <table id="history-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Activity</th>
                            <th>Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionHistory.length > 0 ? (
                            transactionHistory.map((transaction, index) => {
                                // Determine the CSS class based on activity type
                                let amountClass = '';
                                if (transaction.activity === 'Deposit') {
                                    amountClass = 'deposit-amount'; // Green for deposit
                                } else if (transaction.activity === 'Withdrawal' || 
                                           transaction.activity === 'Transfer' || 
                                        // transaction.activity === 'Pay Bills' || 
                                           transaction.activity.includes('Pay Bills') || 
                                           transaction.activity === 'Buy Load') {
                                    amountClass = 'expense-amount'; // Red for withdrawals, transfers, etc.
                                }

                                return (
                                    <tr key={index}>
                                        <td>{transaction.user}</td>
                                        <td>{transaction.activity}</td>
                                        <td>{transaction.date}</td>
                                        <td id="col-amount" className={amountClass}>
                                            PHP {formatBalance(transaction.amount)}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4">No transactions available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default History;
