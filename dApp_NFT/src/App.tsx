import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NftPage } from './pages/Nft';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<NftPage />} />
          <Route path="*" element={<main>Not Found 404!</main>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
