import React from "react";
import { useParams } from "react-router-dom";
import AssetCollection from "../../components/dashboard/assetCollection";
import LiquidityCollection from "../../components/dashboard/liquidityCollection";
import PositionCollection from "../../components/dashboard/positionsCollection";
import StakingCard from "../../components/dashboard/staking";
import TotalBalance from "../../components/dashboard/totalBalance";

const AddressLookup = () => {
  let { invoiceId } = useParams();
  return (
    <>
      <TotalBalance />
      <StakingCard />
      <AssetCollection />
      <PositionCollection />
      <LiquidityCollection />
    </>
  );
};

export default AddressLookup;
