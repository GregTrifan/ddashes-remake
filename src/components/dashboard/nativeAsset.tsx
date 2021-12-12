import {
  Box,
  Flex,
  Heading,
  Spacer,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import numbro from "numbro";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { ReactComponent as Karura } from "../../assets/karura.svg";
import {
  userAddressState,
  userKarFreeState,
  userKarLockedState,
} from "../../atoms";
import { fetchKARBalance, fetchKARPrice } from "../../utils/fetchBalance";
const NativeAsset = () => {
  const gradient = useColorModeValue(
    "linear(to-br, #49DEFF, #6C77F7)",
    "linear(to-tl, #065364, #0D1572)"
  );
  const [karBalance, setKarBalance] = useState<number>(0);
  const [karPrice, setKarPrice] = useState<number>(0);
  const userAddress = useRecoilValue(userAddressState);
  let address = useParams().address ?? userAddress;
  const lockedKarBalance = useRecoilValue(userKarLockedState);
  const setLockedKarBalance = useSetRecoilState(userKarLockedState);
  const freeKarBalance = useRecoilValue(userKarFreeState);
  const setFreeKarBalance = useSetRecoilState(userKarFreeState);
  async function initBal() {
    const kar = await fetchKARBalance(address);
    const price = await fetchKARPrice();
    setKarPrice(Number(price) / Math.pow(10, 12));
    setKarBalance(kar.free + kar.locked);
    setFreeKarBalance(kar.free);
    setLockedKarBalance(kar.locked);
  }
  useEffect(() => {
    initBal();
  }, [address]);
  return (
    <Box
      mt="8"
      mx="auto"
      shadow="lg"
      py={2}
      px={4}
      maxW={{ base: "90vw", sm: "80vw", md: "70vw", lg: "60vw", xl: "800px" }}
      spacing={0}
      rounded="md"
      bgGradient={gradient}
    >
      <Flex>
        <Box
          rounded="md"
          p="2"
          mr="2"
          bgColor={useColorModeValue("#2E2E2E63", "gray.800")}
        >
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 360 }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Karura fontSize={90} />
          </motion.div>
        </Box>
        <VStack visibility={{ base: "hidden", md: "visible" }}>
          <Box>
            <Heading textAlign={{ base: "right", md: "left" }}>KAR</Heading>
          </Box>
          <Spacer />
          <Box>
            <Text ml="4" color={useColorModeValue("gray.600", "gray.500")}>
              1 KAR = {numbro(karPrice).format("0,0.00")} $
            </Text>
          </Box>
        </VStack>
        <Spacer />
        <VStack>
          <Box>
            <Heading textAlign="right" fontSize={{ base: "xl", md: "3xl" }}>
              {numbro(karBalance).format("0,0.00")} KAR
            </Heading>

            <Text
              textAlign="right"
              display={{ base: "block", md: "none" }}
              fontSize="md"
              color={useColorModeValue("gray.600", "gray.500")}
            >
              {numbro(karBalance * karPrice).format("0,0.00")} $
            </Text>
            <Text
              display={{ base: "none", md: "block" }}
              fontSize="sm"
              textAlign="right"
              color={useColorModeValue("gray.600", "gray.500")}
            >
              {numbro(freeKarBalance).format("0,0.00")} KAR Avalaible
            </Text>
            <Text
              display={{ base: "none", md: "block" }}
              fontSize="sm"
              textAlign="right"
              color={useColorModeValue("gray.600", "gray.500")}
            >
              {numbro(lockedKarBalance).format("0,0.00")} KAR Locked
            </Text>
            <Spacer />
            <Text
              textAlign="right"
              display={{ base: "none", md: "block" }}
              fontSize={{ base: "lg", md: "md" }}
              color={useColorModeValue("gray.600", "gray.500")}
            >
              {numbro(karBalance * karPrice).format("0,0.00")} $
            </Text>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default NativeAsset;
