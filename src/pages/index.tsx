import type { NextPage } from "next";
import {
  useActiveListings,
  useAddress,
  useContract,
  useContractMetadata,
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
  const {data: metadata, isLoading: loadingMetadata} = useContractMetadata(contract);

  if (isLoading)
    return (
      <div className={"mb-3 flex w-screen justify-center"}>Lesskeddit ...</div>
    );

  function handleClick() {
    console.log("increment like count")
  }

  return (
    <><div className={"space-y-4 p-2"}>
      <div className={"flex space-x-4"}>
        <div className={"text-2xl font-semibold"}>Sounds</div>
        {/* <Link href={`profile/${address}`}> */}
        <Link href={`https://soundphase-collection.vercel.app/`}>
          <div className={"cursor-pointer text-2xl font-semibold"}>
            Collection
          </div>
        </Link>
      </div>
      <div className={`nft-grid`}>
        {nfts &&
          nfts.map((nft) => {
            return (
                  <><NFTCard
                nft={{
                  name: nft.asset.name as string,
                  tokenUri: nft.asset.animation_url as string,
                  price: nft.buyoutCurrencyValuePerToken?.displayValue,
                }} /><button onClick={handleClick}> Purchase</button></>
                
            );
          })}
      </div>
    </div></>
  );
};

export default Home;
