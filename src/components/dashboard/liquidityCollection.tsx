import {
  Box,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  VStack,
  Heading,
  Spacer,
  Divider,
  Avatar,
  chakra,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAddressState } from "../../atoms";

const LiquidityCollection = () => {
  const data = [
    {
      asset1: "MATIC",
      asset2: "USDT",

      price1: 1.3,
      price2: 1,
      amount: 69,
    },
    {
      asset1: "SUSHI",
      asset2: "ETH",
      price1: 14,
      price2: 4300,
      amount: 0.5,
    },
  ];
  const gradient = useColorModeValue(
    "linear(to-tl, #84E8FF 0%, #8F98FF 100%)",
    "linear(to-tl, #00323D, #000744)"
  );
  /*
  const userAddress = useRecoilValue(userAddressState);
  let address = useParams().address ?? userAddress;
  */
  return (
    <Box
      mt="8"
      mx="auto"
      shadow="lg"
      py={6}
      maxW={{ base: "90vw", sm: "80vw", md: "70vw", lg: "60vw", xl: "800px" }}
      spacing={0}
      rounded="md"
      bgGradient={gradient}
    >
      <Text px={4} fontWeight={600}>
        Liquidity Provided
      </Text>
      <Box
        mt="4"
        py="2"
        rounded="lg"
        mx="4"
        border="1px"
        borderColor={useColorModeValue("#E4E4E4", "#525252")}
      >
        <Stack direction={{ base: "column" }} w="full">
          {data.map((asset, pid) => {
            return (
              <React.Fragment key={pid}>
                <Flex pr={10} pl={2}>
                  <Avatar bgColor="blue.500">
                    <chakra.p fontSize="12" mx="8">
                      {asset.asset1}
                    </chakra.p>
                  </Avatar>
                  <Avatar ml="-1" mr={3} bgColor="#5347aa">
                    <chakra.p fontSize="12" mx="8">
                      {asset.asset2}
                    </chakra.p>
                  </Avatar>
                  <VStack alignItems="start">
                    <Text opacity={0.6}>
                      {asset.asset1}/{asset.asset2}
                    </Text>
                    <Heading fontSize="md" fontWeight="300">
                      50/50
                    </Heading>
                  </VStack>
                  <Spacer />
                  <VStack alignItems="end" mx="auto">
                    <Heading fontSize="md" fontWeight="600">
                      {(asset.amount * asset.price1 * asset.price2).toFixed(2)}$
                    </Heading>
                    <Text opacity={0.6}>{asset.amount}</Text>
                  </VStack>
                </Flex>
                {data[pid] !== data[data.length - 1] ? <Divider /> : ""}
              </React.Fragment>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};

export default LiquidityCollection;
