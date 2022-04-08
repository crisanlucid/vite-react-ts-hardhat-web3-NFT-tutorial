import React from 'react';

const TransactionsCard: React.FC = () => {
  return <>TransactionCard</>;
};

const Transactions: React.FC = () => {
  return (
    <div>
      <h1>Transactions</h1>
      <div>
        {[].map((transaction, i) => (
          <TransactionsCard key={i} {...transaction} />
        ))}
      </div>
    </div>
  );
};

export default Transactions;
