import 'react-loading-skeleton/dist/skeleton.css';

import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonCard: React.FC = () => {
  return (
    <>
      {[...Array(3).fill(0)].map((item, index) => (
        <div
          className={`px-3 w-full  md:w-6/12 lg:w-4/12`}
          key={`nft-${index}`}
        >
          <div className="bg-white overflow-hidden rounded-xl text-gray-500">
            <Skeleton
              className="group-hover:opacity-90 w-full"
              height={307}
              width={`100%`}
            />
            <div className="px-4 py-6 sm:px-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xl">
                  <span className="hover:text-primary-500 text-gray-900">
                    <Skeleton height={27} width={200} />
                  </span>
                </h3>

                <Skeleton circle={true} height={24} width={24} />
              </div>
              <hr className="border-gray-200 my-4" />
              <div className="flex items-center justify-between">
                <div>
                  <a
                    href="#"
                    className="hover:text-gray-400 inline-flex italic items-center space-x-2 text-sm"
                  >
                    <Skeleton
                      circle={true}
                      height={36}
                      width={36}
                      style={{ margin: '0 5px 0 0' }}
                    />
                    <span>
                      <Skeleton height={20} width={210} />
                    </span>
                  </a>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <Skeleton
                  width={102}
                  height={42}
                  className="rounded-xl cursor-pointer"
                />
                <Skeleton width={140} height={42} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonCard;
