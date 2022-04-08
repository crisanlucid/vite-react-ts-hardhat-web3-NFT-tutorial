import React from 'react';

import { Navbar, Services, Transactions, Welcome } from './components';
import { NftPage } from './pages/Nft';

const App: React.FC = () => {
  return (
    <>
      <NftPage />
      <div>
        <div className="gradient-bg-welcome">
          <Navbar />
          <Welcome />
        </div>
        <Services />
        <Transactions />
      </div>
    </>
  );
};

export default App;
