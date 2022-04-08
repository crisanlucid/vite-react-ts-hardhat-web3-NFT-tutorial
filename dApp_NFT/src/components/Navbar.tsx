import React from 'react';

const NavbarItem: React.FC = () => {
  return <>NavBarItem</>;
};

const Navbar: React.FC = () => {
  return (
    <div>
      Navbar
      <ul>
        {['Market', 'Exchange', 'Tutorials', 'Wallets'].map((item, index) => (
          <NavbarItem key={index} />
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
