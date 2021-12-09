import {
  Box,
  useColorModeValue,
  Text,
  Heading,
  Tooltip,
  VStack,
  Progress,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAddressState } from "../../atoms";

const TotalBalance = () => {
  const gradient = useColorModeValue(
    "linear(to-t, #9EE7AA, #AFC6EE)",
    "linear(to-t, #56AFA5, #0E73AD)"
  );
  const userAddress = useRecoilValue(userAddressState);
  let address = useParams().address ?? userAddress;

  useEffect(() => {
    if (address) {
      /*Do something... */
    }
  });
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
            🤔$
          </Heading>
        </VStack>

        <Tooltip hasArrow label="91% In wallet,9% Supplied" rounded="md">
          <div>
            <Progress
              hasStripe
              value={91}
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
