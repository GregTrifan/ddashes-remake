import {
  Box,
  Button,
  HStack,
  Text,
  Tooltip,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import Identicon from "@polkadot/react-identicon";
import { encodeAddress } from "@polkadot/keyring";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAddressState } from "../../atoms";

const WalletButton = () => {
  const setAddress = useSetRecoilState(userAddressState);
  const address = useRecoilValue(userAddressState);
  useEffect(() => {
    setupWallet();
  }, []);
  const toast = useToast();
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
  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast({
      title: "address copied successfully",
      status: "success",
      position: "top",
      variant: "subtle",
      isClosable: true,
    });
  };

  if (address)
    return (
      <Tooltip
        label="Click to copy address"
        rounded="md"
        p="1"
        color={useColorModeValue("black", "gray.100")}
        bgColor={useColorModeValue("gray.300", "gray.700")}
      >
        <Button
          onClick={() => copyAddress()}
          backgroundColor={useColorModeValue("gray.100", "gray.900")}
          rounded="md"
          py="2"
        >
          <HStack p="3">
            <Identicon value={address} size={24} theme="polkadot" />
            <Text>
              {address.substring(0, 3) +
                "..." +
                address.substring(address.length - 3, address.length)}
            </Text>
          </HStack>
        </Button>
      </Tooltip>
    );
  return (
    <Button px="6" onClick={() => setupWallet()}>
      Connect Wallet
    </Button>
  );
};

export default WalletButton;
