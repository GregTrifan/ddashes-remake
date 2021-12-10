import {
  Avatar,
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import numbro from "numbro";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAddressState } from "../../atoms";
import CuratedLoanPosition from "../../interfaces/curatedLoan";
import { fetchLoans } from "../../utils/fetchLoans";
import CardSpinner from "../misc/cardSpinner";

const PositionCollection = () => {
  // TODO: Replace with actual data
  const data = [
    { name: "MATIC", price: 1.3, amount: 69 },
    { name: "SUSHI", price: 12.5, amount: 29 },
  ];
  const userAddress = useRecoilValue(userAddressState);
  let address = useParams().address ?? userAddress;
  const [loans, setLoans] = useState<CuratedLoanPosition[]>();
  const gradient = useColorModeValue(
    "linear(to-bl, gray.200 0%, #94A6FF 100%)",
    "linear(to-bl, #121a1f 0%, #1C319959 100%)"
  );
  async function initLoans() {
    const result = await fetchLoans(address);
    setLoans(result);
    console.log(result);
  }
  useEffect(() => {
    initLoans();
  }, [address]);
  return (
    <Box
      mt="4"
      mx="auto"
      shadow="lg"
      py={6}
      maxW={{ base: "90vw", sm: "80vw", md: "70vw", lg: "60vw", xl: "800px" }}
      spacing={0}
      rounded="md"
      bgGradient={gradient}
    >
      <Text px={4} fontWeight={600}>
        Vaults
      </Text>
      {!loans && <CardSpinner />}
      {typeof loans === "object" && (
        <Box
          mt="4"
          py="2"
          rounded="lg"
          mx="4"
          border="1px"
          borderColor={useColorModeValue("#E4E4E4", "#525252")}
        >
          <Stack direction={{ base: "column" }} w="full">
            {loans.map((asset, pid) => {
              return (
                <React.Fragment key={pid}>
                  <Flex pr={10} pl={2}>
                    <Avatar mx="auto" mr={3}>
                      <chakra.p fontSize="12" mx="8">
                        {asset.collateralId}
                      </chakra.p>
                    </Avatar>
                    <VStack alignItems="start">
                      <Text opacity={0.6}>{asset.collateralId}</Text>
                      <Heading fontSize="md" fontWeight="300">
                        {asset.collateralPrice}$
                      </Heading>
                    </VStack>
                    <Spacer />
                    <VStack alignItems="end" mx="auto">
                      <Heading fontSize="md" fontWeight="600">
                        {numbro(asset.debitAmount).format("0,0.00")} kUSD
                      </Heading>
                      <Text opacity={0.6}>
                        {numbro(asset.collateralAmount).format("0,0.00")}{" "}
                        {asset.collateralId} Locked
                      </Text>
                    </VStack>
                  </Flex>
                  {loans[pid] !== loans[loans.length - 1] &&
                  loans.length > 1 ? (
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

export default PositionCollection;
