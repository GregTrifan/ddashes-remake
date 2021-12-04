import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider,
} from "@polkadot/extension-dapp";
async function loadWallet() {
  await web3Enable("my cool dapp");
}
const WalletButton = () => {
  const [uiLoaded, setUILoaded] = useState(false);
  const connectWallet = async () => {
    if (uiLoaded) {
      //await web3Enable("my cool dapp");
    }
  };
  return (
    <Box>
      <Button onClick={() => connectWallet()}>Connect Wallet</Button>
    </Box>
  );
};

export default WalletButton;
