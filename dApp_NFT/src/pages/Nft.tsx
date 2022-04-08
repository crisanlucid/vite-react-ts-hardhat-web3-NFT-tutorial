import { Navbar, Welcome } from '../components';
import MintCardList from '../components/MintCardList';

export const NftPage = () => {
  return (
    <div>
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <section className="bg-opacity-50 bg-slate-500  flex w-full justify-center items-center">
        <div className="flex flex-col items-start justify-between md:p-20 py-12 px-4 max-w-6xl w-full">
          <div className="flex flex-wrap gap-2 mb-6 items-center -mx-4">
            <div className="px-4 w-full md:flex-1">
              <h2 className="capitalize font-bold md:text-4xl text-3xl  text-gray-900">
                <span>NFT Collectible</span>
              </h2>
            </div>
          </div>
          <MintCardList />
        </div>
      </section>
    </div>
  );
};
