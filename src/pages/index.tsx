import AssetCollection from "../components/dashboard/assetCollection";
import LiquidityCollection from "../components/dashboard/liquidityCollection";
import PositionCollection from "../components/dashboard/positionsCollection";
import StakingCard from "../components/dashboard/staking";
import TotalBalance from "../components/dashboard/totalBalance";

export default function Home() {
  return (
    <>
      <TotalBalance />
      <StakingCard />
      <AssetCollection />
      <PositionCollection />
      <LiquidityCollection />
    </>
  );
}
