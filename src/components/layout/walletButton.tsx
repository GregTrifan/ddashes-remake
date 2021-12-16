import {
  Box,
  Button,
  HStack,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Text,
  Tooltip,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import Identicon from "@polkadot/react-identicon";
import { AiOutlineCopy } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { BiDoorOpen } from "react-icons/bi";
import { encodeAddress } from "@polkadot/keyring";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAddressState } from "../../atoms";
import { useNavigate } from "react-router-dom";

const WalletButton = () => {
  const setAddress = useSetRecoilState(userAddressState);
  const address = useRecoilValue(userAddressState);
  const navigate = useNavigate();
  useEffect(() => {
    setupWallet();
  }, []);
  const toast = useToast();
  async function setupWallet() {
    try {
      await web3Enable("DDash App");
      const allAccounts = await web3Accounts();
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
      duration: 900,
      isClosable: true,
    });
  };
  const disconnectWallet = () => {
    setAddress("");
    localStorage.removeItem("address");
  };
  if (address)
    return (
      <Popover>
        <PopoverTrigger>
          <Button
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
        </PopoverTrigger>
        <PopoverContent maxW="180" p="1">
          <Box>
            <HStack mb="2">
              <Button
                onClick={() => disconnectWallet()}
                colorScheme="red"
                rightIcon={<BiDoorOpen />}
              >
                Disconnect
              </Button>
              <Spacer />
              <IconButton
                variant="outline"
                aria-label="copy-address"
                icon={<AiOutlineCopy />}
                onClick={() => copyAddress()}
              />
            </HStack>

            <Button
              maxW="full"
              onClick={() => {
                window.open(`https://karura.subscan.io/account/${address}`);
              }}
              rightIcon={<FiExternalLink />}
            >
              View on Subscan
            </Button>
          </Box>
        </PopoverContent>
      </Popover>
    );
  return (
    <Button px="6" onClick={() => setupWallet()}>
      Connect Wallet
    </Button>
  );
};

export default WalletButton;
