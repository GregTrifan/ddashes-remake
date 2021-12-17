import {
  Avatar,
  Box,
  Image,
  Button,
  Center,
  chakra,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import numbro from "numbro";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAddressState, userTokensBalanceState } from "../../atoms";
import CuratedToken from "../../interfaces/curatedToken";
import { getTokenBalances } from "../../utils/fetchBalance";
import CardSpinner from "../misc/cardSpinner";

const AssetCollection = () => {
  const gradient = useColorModeValue(
    "linear(to-tr, gray.200 0%, #A4C4F5 100%)",
    "linear(to-tr, #121a1f 0%, #1C319959 100%)"
  );
  const [tokenBalances, setTokenBalances] = useState<
    Array<CuratedToken> | undefined
  >();
  const userAddress = useRecoilValue(userAddressState);
  let address = useParams().address ?? userAddress;
  const setAssetsBalance = useSetRecoilState(userTokensBalanceState);
  async function initAssets() {
    const res = await getTokenBalances(address);
    setTokenBalances(res);
    let tokenBalance = 0;
    res!.forEach((element) => {
      tokenBalance += element.balance * element.price;
    });
    setAssetsBalance(tokenBalance);
  }
  useEffect(() => {
    if (address) {
      initAssets();
    }
  }, [address]);
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
        Tokens
      </Text>
      {!tokenBalances && <CardSpinner />}
      {typeof tokenBalances === "object" && (
        <Box
          mt="4"
          py="2"
          rounded="lg"
          mx="4"
          border="1px"
          borderColor={useColorModeValue("#E4E4E4", "#525252")}
        >
          <Stack direction={{ base: "column" }} w="full">
            {tokenBalances.length === 0 && (
              <Center>
                <Heading
                  bgGradient={useColorModeValue(
                    "linear(to-l, #1AAA0D, #0B97D8)",
                    "linear(to-l, #63F156, #39AADF)"
                  )}
                  bgClip="text"
                  fontWeight={400}
                  fontSize="3xl"
                  m={3}
                >
                  There are no assets
                </Heading>
              </Center>
            )}
            {tokenBalances.map((asset, pid) => {
              return (
                <React.Fragment key={pid}>
                  <Flex pr={{ base: 2, md: 10 }} pl={2}>
                    <Avatar
                      mx="auto"
                      mr={3}
                      name={asset.name}
                      src={`/logos/${asset.name}.png`}
                    />
                    <VStack alignItems="start">
                      <Text opacity={0.6}>{asset.name}</Text>
                      <Heading fontSize="md" fontWeight="300">
                        {numbro(asset.price).format("0,0.00 $")}
                      </Heading>
                    </VStack>
                    <Spacer />
                    <VStack alignItems="end" mx="auto">
                      <Heading fontSize="md" fontWeight="600">
                        {numbro(asset.balance * asset.price).format("0,0.00 $")}
                      </Heading>
                      <Text opacity={0.6}>
                        {numbro(asset.balance).format("0,0.00")} {asset.name}
                      </Text>
                    </VStack>
                  </Flex>
                  {tokenBalances[pid] !==
                  tokenBalances[tokenBalances.length - 1] ? (
                    <Divider />
                  ) : (
                    ""
                  )}
                </React.Fragment>
              );
            })}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default AssetCollection;
