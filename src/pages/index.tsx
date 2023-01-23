import type { NextPage } from "next";
import {
  useActiveListings,
  useAddress,
  useContract,
} from "@thirdweb-dev/react";
import Link from "next/link";
import NFTCard from "../components/NFTCard";

const Home: NextPage = () => {
  const address = useAddress();

  const { contract } = useContract(
    "0x7653Cd64320c65733C005EF855CdE916705B483D",
    "marketplace"
  );

  const { data: nfts, isLoading } = useActiveListings(contract);

  if (isLoading)
    return (
      <div className={"mb-3 flex w-screen justify-center"}>Loading ...</div>
    );

  function handleClick() {
    console.log("increment like count")
  }

  return (
    <><div className={"space-y-4 p-2"}>
      <div className={"flex space-x-4"}>
        <div className={"text-2xl font-semibold"}>Sounds</div>
        <Link href={`profile/${address}`}>
          <div className={"cursor-pointer text-2xl font-semibold"}>
            Collection
          </div>
        </Link>
      </div>
      <div className={`nft-grid`}>
        {nfts &&
          nfts.map((nft) => {
            return (
              <><Link
                href={`/assets/${nft.id}`}
                key={nft.assetContractAddress + nft.id}
              >
                <a>
                  <NFTCard
                    nft={{
                      name: nft.asset.name as string,
                      tokenUri: nft.asset.animation_url as string,
                      price: nft.buyoutCurrencyValuePerToken?.displayValue,
                    }} 
                    // <button onClick={handleClick}> Click This</button>
                    />
                    <button onClick={handleClick}> Purchase</button>
                </a>
              </Link><div>
                  {/* <a download href="https://gateway.ipfscdn.io/ipfs/QmaTXB1nP2ABkqQnhtUQtjcGg8f9ZwxWg3Zr61V3A5evwx/Cymatics%20-%20Oracle%20Dark%20Melody%20Loop%203%20-%20112%20BPM%20E%20Min.wav">
                    <button> Download</button>
                  </a> */}
                </div></>
            );
          })}
      </div>
    </div></>
  );
};

export default Home;
