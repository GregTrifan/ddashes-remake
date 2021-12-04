import React from "react";
import { useParams } from "react-router-dom";
import AssetCollection from "../../components/dashboard/assetCollection";
import LiquidityCollection from "../../components/dashboard/liquidityCollection";
import PositionCollection from "../../components/dashboard/positionsCollection";
import StakingCard from "../../components/dashboard/staking";
import TotalBalance from "../../components/dashboard/totalBalance";
import NotFound from "../404";

const AddressLookup = () => {
  let { address } = useParams();

  if (address !== "")
    return (
      <>
        <p>{address}</p>
        <TotalBalance />
        <StakingCard />
        <AssetCollection />
        <PositionCollection />
        <LiquidityCollection />
      </>
    );
  return <NotFound />;
};

export default AddressLookup;
