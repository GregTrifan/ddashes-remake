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
import { useRecoilValue } from "recoil";
import { ReactComponent as Karura } from "../../assets/karura.svg";
import { userAddressState } from "../../atoms";
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
  async function initBal() {
    const kar = await fetchKARBalance(address);
    const price = await fetchKARPrice();
    setKarPrice(Number(price) / Math.pow(10, 12));
    setKarBalance(kar / Math.pow(10, 12));
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
            <Heading ml="auto" textAlign="left">
              KAR
            </Heading>
          </Box>
          <Spacer />
          <Box>
            <Text color={useColorModeValue("gray.600", "gray.500")}>
              1 KAR = {numbro(karPrice).format("0,0.00")} $
            </Text>
          </Box>
        </VStack>
        <Spacer />

        <VStack>
          <Box>
            <Heading fontSize={{ base: "lg", md: "3xl" }}>
              {numbro(karBalance).format("0,0.00")} KAR
            </Heading>
          </Box>
          <Spacer />
          <Box>
            <Text ml="auto" color={useColorModeValue("gray.600", "gray.500")}>
              {numbro(karBalance * karPrice).format("0,0.00")}$
            </Text>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default NativeAsset;
