import {
  Box,
  useColorModeValue,
  Text,
  Heading,
  Tooltip,
  VStack,
  Progress,
} from "@chakra-ui/react";
import numbro from "numbro";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import {
  userAddressState,
  userKarFreeState,
  userKarLockedState,
  userTokensBalanceState,
  userVaultsBalanceState,
} from "../../atoms";

const TotalBalance = () => {
  const gradient = useColorModeValue(
    "linear(to-t, #9EE7AA, #AFC6EE)",
    "linear(to-t, #56AFA5, #0E73AD)"
  );
  const userAddress = useRecoilValue(userAddressState);
  let address = useParams().address ?? userAddress;

  const userVaultsBalance = useRecoilValue(userVaultsBalanceState);
  const userKarFreeBalance = useRecoilValue(userKarFreeState);
  const userKarLockedBalance = useRecoilValue(userKarLockedState);
  const userTokensBalance = useRecoilValue(userTokensBalanceState);
  function sumAll() {
    return (
      userTokensBalance +
      userKarLockedBalance +
      userKarFreeBalance +
      userVaultsBalance
    );
  }
  function getRatio() {
    const sum = sumAll();
    console.log(((userTokensBalance + userKarFreeBalance) * 100) / sum);
    return ((userTokensBalance + userKarFreeBalance) * 100) / sum;
  }
  return (
    <Box
      mx="auto"
      maxW={{ base: "90vw", sm: "80vw", md: "70vw", lg: "60vw", xl: "800px" }}
      spacing={0}
      rounded="md"
      bg={useColorModeValue("#AFC6EE", "#0E73AD")}
    >
      <Box px={4} pt={6}>
        <Text fontWeight={600}>Portfolio Value</Text>
      </Box>

      <Box p={4} minH="100px" bgGradient={gradient} rounded="md">
        <VStack alignItems="start">
          <Text opacity={0.6}>Net Worth</Text>
          <Heading fontSize="4xl" fontWeight="300">
            {numbro(sumAll()).format("0,0.00")}$
          </Heading>
        </VStack>

        <Tooltip
          hasArrow
          label={`${numbro(getRatio()).format("0,0.00")}% In wallet, ${numbro(
            100 - getRatio()
          ).format("0,0.00")}% Locked`}
          rounded="md"
        >
          <div>
            <Progress
              hasStripe
              value={getRatio()}
              rounded="sm"
              size="sm"
              my="2"
              colorScheme="green"
            />
          </div>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default TotalBalance;
