import { decodeAddress, encodeAddress } from "@polkadot/util-crypto";
import { isHex, hexToU8a } from "@polkadot/util";
import React from "react";
import { useParams } from "react-router-dom";
import AssetCollection from "../../components/dashboard/assetCollection";
import LiquidityCollection from "../../components/dashboard/liquidityCollection";
import PositionCollection from "../../components/dashboard/positionsCollection";
import StakingCard from "../../components/dashboard/staking";
import TotalBalance from "../../components/dashboard/totalBalance";
import NotFound from "../404";
import { chakra } from "@chakra-ui/react";

const AddressLookup = () => {
  let { address } = useParams();

  try {
    const isValid = encodeAddress(
      isHex(address) ? hexToU8a(address) : decodeAddress(address)
    );
    if (isValid)
      return (
        <>
          <TotalBalance />
          <StakingCard />
          <AssetCollection />
          <PositionCollection />
          <LiquidityCollection />
        </>
      );
    else return <NotFound />;
  } catch {
    return <NotFound />;
  }
};

export default AddressLookup;
