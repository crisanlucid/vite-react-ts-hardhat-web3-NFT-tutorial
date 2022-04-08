/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';
import { AiFillPlayCircle, AiOutlineClose } from 'react-icons/ai';
import { HiMenuAlt4 } from 'react-icons/hi';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.svg';

interface INavbarItem {
  title: string;
  classProps: string;
}

const NavbarItem: React.FC<INavbarItem> = ({ title, classProps }) => (
  <li className={`mx-4 cursor-pointer ${classProps}`}>
    <Link to="/nft">{title}</Link>
  </li>
);

const Navbar: React.FC = () => {
  const [toogleMenu, setToogleMenu] = useState(false);

  const currentAccount = false;
  const disconnectWallet = () => {};
  const connectWalletAndShowNFT = () => {};

  const renderButton = () => {
    const isLogIn = !currentAccount;
    return (
      <button
        type="button"
        className="bg-[#2952e3] py-2 px-5 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
        onClick={isLogIn ? connectWalletAndShowNFT : disconnectWallet}
      >
        {isLogIn ? (
          <> Login</>
        ) : (
          <>
            <AiFillPlayCircle className="text-white mr-2 inline-flex" />
            <span className="text-sm">Logout</span>
          </>
        )}
      </button>
    );
  };
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer invert" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {['NFT', 'Exchange', 'Tutorials', 'Wallets'].map((item, index) => (
          <NavbarItem key={item + index} title={item} classProps="" />
        ))}
        <li>{renderButton()}</li>
      </ul>
      <div className="flex relate">
        {toogleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToogleMenu(false)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToogleMenu(true)}
          />
        )}
        {toogleMenu && (
          <ul
            className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
          flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToogleMenu(false)} />
            </li>
            {['Market', 'Exchange', 'Tutorials', 'Wallets'].map(
              (item, index) => (
                <NavbarItem
                  key={item + index}
                  title={item}
                  classProps="my-2 text-lg"
                />
              )
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
