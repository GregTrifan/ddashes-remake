import {
  Box,
  useColorModeValue,
  Text,
  Heading,
  Tooltip,
  VStack,
  Progress,
} from "@chakra-ui/react";
import React from "react";

const TotalBalance = () => {
  const gradient = useColorModeValue(
    "linear(to-t, #9EE7AA, #AFC6EE)",
    "linear(to-t, #56AFA5, #0E73AD)"
  );

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
            69.42$
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
