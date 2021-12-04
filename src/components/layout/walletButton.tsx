import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider,
} from "@polkadot/extension-dapp";

const WalletButton = () => {
  const connectWallet = async () => {
    await web3Enable("DDash");
  };
  return (
    <Box>
      <Button onClick={() => connectWallet()}>Connect Wallet</Button>
    </Box>
  );
};

export default WalletButton;
