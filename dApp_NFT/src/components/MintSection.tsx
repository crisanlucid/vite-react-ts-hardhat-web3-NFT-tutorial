/* eslint-disable @typescript-eslint/no-empty-function */
import { BigNumber } from 'ethers';
import React, { useState } from 'react';

import { HandleChangeType, Input } from './Input';
import Loader from './Loader';

const MINT_PAY = 0.02;
export const MintSection: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const { isLoading, mintToken } = {
    isLoading: false,
    mintToken: async (n: any) => {}
  };

  const handleChange: HandleChangeType = (e, name) => {
    // todo: inform delegation
    const bigNumber = BigNumber.from(Math.abs(Number(e.target?.value)));
    setCounter(Number(bigNumber));
  };
  const decreaseNFT = () => {
    if (counter - 1 < 0) return;
    setCounter(counter - 1);
  };
  const increaseNFT = () => {
    setCounter(counter + 1);
  };

  const minTokenHandler = () => {
    mintToken(counter);
  };

  return (
    <div className="md:mt-10 lg:mt-0 lg:p-5 p-10 lg:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism self-baseline">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={increaseNFT}
              className="text-white w-7 h-full mt-1 border-[1px] border-[#3d4f7c] p-2 hover:bg-[#3d4f7c] rounded-full cursor-pointer"
            >
              +
            </button>
            <Input
              placeholder="0"
              name="ethMint"
              type="number"
              handleChange={handleChange}
              styleCss=" mx-2"
              value={counter}
              step="1"
            />
            <button
              type="button"
              onClick={decreaseNFT}
              className="text-white w-7 h-full mt-1 border-[1px] border-[#3d4f7c] p-2 hover:bg-[#3d4f7c] rounded-full cursor-pointer"
            >
              -
            </button>
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={minTokenHandler}
              className=" md:inline-flex items-center text-white border-[1px] border-[#3d4f7c] hover:bg-[#3d4f7c]  font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-3"
            >
              Mint
            </button>
            <p className="font-medium text-white text-xs my-1">
              *pay eth {MINT_PAY} + gas
            </p>
          </div>
        </>
      )}
    </div>
  );
};
