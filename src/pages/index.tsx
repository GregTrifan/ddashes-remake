import { useRecoilValue } from "recoil";
import { userAddressState } from "../atoms";
import AssetCollection from "../components/dashboard/assetCollection";
import PositionCollection from "../components/dashboard/positionsCollection";
import TotalBalance from "../components/dashboard/totalBalance";
import NativeAsset from "../components/dashboard/nativeAsset";

export default function Home() {
  const userAddress = useRecoilValue(userAddressState);
  return (
    <>
      <TotalBalance />
      <NativeAsset />
      {userAddress && (
        <>
          <AssetCollection />
          <PositionCollection />
        </>
      )}
    </>
  );
}
