/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

interface ITransactionsCard {
  title?: string;
}

const TransactionsCard: React.FC = (props: ITransactionsCard) => {
  return <>TransactionCard</>;
};

const Transactions: React.FC = () => {
  return (
    <div>
      <h1>Transactions</h1>
      <div>
        {[].map((transaction: ITransactionsCard, i) => (
          <TransactionsCard key={i} {...transaction} />
        ))}
      </div>
    </div>
  );
};

export default Transactions;
