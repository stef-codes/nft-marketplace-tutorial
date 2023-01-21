import type { NextPage } from "next";
import {useActiveListings, useAddress,useContract, useContractMetadata, ThirdwebNftMedia, useNFTs } from "@thirdweb-dev/react";
import Link from "next/link";
import NFTCard from "../components/NFTCard";

const Home: NextPage = () => {
  const address = useAddress();

  const { contract } = useContract(
    "0x7653Cd64320c65733C005EF855CdE916705B483D");


  // const { data: nfts, isLoading } = useActiveListings(contract);
  // const {data: metadata, isLoading: loadingMetadata} = useContractMetadata(contract);
  const {data: nfts, isLoading} = useNFTs(contract); 
  const {data: metadata, isLoading: loadingMetadata} = useContractMetadata(contract);

  if (isLoading)
    return (
      <div className={"mb-3 flex w-screen justify-center"}>Loading ...</div>
    );

  return (
    <div className={"space-y-4 p-2"}>
      <div className={"flex space-x-4"}>
        <div className={"text-2xl font-semibold"}>Sounds</div>
        <Link href={`profile/${address}`}>
          <div className={"cursor-pointer text-2xl font-semibold"}>
            Collection
          </div>
        </Link>
      </div>
      <div className={`nft-grid`}>
      {nfts?.map(e =>
          <div className="card">
            <ThirdwebNftMedia metadata={e.metadata} />
          </div>

        ) }
        {/* {nfts &&
          nfts?.map((nft) => { */}
            // return (
            // //   // <Link
            // //   //   href={`/assets/${nft.id}`}
            // //   //   key={nft.assetContractAddress + nft.id}
            // //   // >
            // //   //   <a>
                    // <NFTCard
            // //   //       // nft={{
            // //   //       //   name: nft.asset.name as string,
            // //   //       //   tokenUri: nft.asset.image as string,
            // //   //          <ThirdwebNftMedia metadata={nft.metadata} />
            // //   //         // price: nft.buyoutCurrencyValuePerToken?.displayValue,
            // //   //       // }}
          //     />
            // //   //   </a>
            // //   // </Link>
            // );
          })}
      </div>
    </div>
  );
};

export default Home;
