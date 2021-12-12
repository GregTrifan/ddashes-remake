import { decodeAddress, encodeAddress } from "@polkadot/util-crypto";
import { isHex, hexToU8a } from "@polkadot/util";
import React from "react";
import { useParams } from "react-router-dom";
import AssetCollection from "../../components/dashboard/assetCollection";
import PositionCollection from "../../components/dashboard/positionsCollection";
import NativeAsset from "../../components/dashboard/nativeAsset";
import TotalBalance from "../../components/dashboard/totalBalance";
import NotFound from "../404";
import LoadingDash from "../../components/misc/loadingDash";

const AddressLookup = () => {
  let { address } = useParams();

  try {
    const isValid = encodeAddress(
      isHex(address) ? hexToU8a(address) : decodeAddress(address)
    );
    if (isValid)
      return (
        <LoadingDash>
          <TotalBalance />
          <NativeAsset />
          <AssetCollection />
          <PositionCollection />
        </LoadingDash>
      );
    else return <NotFound />;
  } catch {
    return <NotFound />;
  }
};

export default AddressLookup;
