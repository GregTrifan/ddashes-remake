import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  userAddressState,
  userKarFreeState,
  userKarLockedState,
  userTokensBalanceState,
  userVaultsBalanceState,
} from "../atoms";
import AssetCollection from "../components/dashboard/assetCollection";
import PositionCollection from "../components/dashboard/positionsCollection";
import TotalBalance from "../components/dashboard/totalBalance";
import NativeAsset from "../components/dashboard/nativeAsset";
import { useEffect } from "react";
import LoadingDash from "../components/misc/loadingDash";

export default function Home() {
  const userAddress = useRecoilValue(userAddressState);
  const setLockedKarBalance = useSetRecoilState(userKarLockedState);
  const setVaultsBalance = useSetRecoilState(userVaultsBalanceState);
  const setFreeKarBalance = useSetRecoilState(userKarFreeState);
  const setAssetsBalance = useSetRecoilState(userTokensBalanceState);
  useEffect(() => {
    if (!userAddress) {
      setLockedKarBalance(0);
      setFreeKarBalance(0);
      setVaultsBalance(0);
      setAssetsBalance(0);
    }
  });
  return (
    <LoadingDash>
      <TotalBalance />
      <NativeAsset />
      {userAddress && (
        <>
          <AssetCollection />
          <PositionCollection />
        </>
      )}
    </LoadingDash>
  );
}
