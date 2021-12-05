import { Box, Button, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
  const [address, setAddress] = useState(localStorage.getItem("address") ?? "");

  useEffect(() => {
    setupWallet();
  }, []);

  async function setupWallet() {
    await web3Enable("DDash App");
    const allAccounts = await web3Accounts();
    try {
      const newAddress = encodeAddress(allAccounts[0].address, 8);
      if (newAddress !== address) {
        setAddress(newAddress);
        localStorage.setItem("address", newAddress);
      }
    } catch {
      setAddress(address);
    }
  }
  return (
    <>
      {!address && (
        <Button px="6" onClick={() => setupWallet()}>
          Connect Wallet
        </Button>
      )}
      {address && (
        <Box
          backgroundColor={useColorModeValue("gray.100", "gray.900")}
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
    </>
  );
  if (address)
    return (
      <Box
        backgroundColor={useColorModeValue("gray.100", "gray.900")}
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
    );
  return (
    <Button px="6" onClick={() => setupWallet()}>
      Connect Wallet
    </Button>
  );
};

export default WalletButton;
