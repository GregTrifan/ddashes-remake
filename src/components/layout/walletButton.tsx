import { Box, Button, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider,
} from "@polkadot/extension-dapp";
import Identicon from "@polkadot/react-identicon";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { encodeAddress } from "@polkadot/keyring";
const WalletButton = () => {
  const [address, setAddress] = useState("");
  useLayoutEffect(() => {
    setupWallet();
  }, [address]);

  async function setupWallet() {
    await web3Enable("DDash App");
    const allAccounts = await web3Accounts();
    if (allAccounts.length >= 0) {
      const wsProvider = new WsProvider(
        "wss://karura-rpc-3.aca-api.network/ws"
      );
      const api = await ApiPromise.create({ provider: wsProvider });
      const chain = await api.rpc.system.chain();
      setAddress(encodeAddress(allAccounts[0].address, 8));
    }
  }

  return (
    <HStack>
      {!address && (
        <Button onClick={() => setupWallet()}>Connect Wallet</Button>
      )}
      {address && (
        <Box
          background={useColorModeValue("gray.100", "gray.900")}
          rounded="md"
          py="2"
          px="4"
        >
          <HStack>
            <Identicon value={address} size={24} theme="polkadot" />
            <Text>
              {address.substring(0, 3) +
                "..." +
                address.substring(address.length - 3, address.length)}
            </Text>
          </HStack>
        </Box>
      )}
    </HStack>
  );
};

export default WalletButton;
