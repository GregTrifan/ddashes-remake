import {
  Box,
  Flex,
  Heading,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const StakingCard = () => {
  const gradient = useColorModeValue(
    "linear(to-br, #00d2ff, #4C5AF7)",
    "linear(to-tl, #089DBE, #3a47d5)"
  );
  return (
    <Box
      mt="8"
      mx="auto"
      shadow="lg"
      py={6}
      px={8}
      maxW={{ base: "90vw", sm: "80vw", md: "70vw", lg: "60vw", xl: "800px" }}
      spacing={0}
      rounded="md"
      bgGradient={gradient}
    >
      <Heading>KSM Staking</Heading>
      <Flex>
        16%
        <Spacer />
        APY
      </Flex>
      <Flex>
        0
        <Spacer />
        Total KSM
      </Flex>
      <Flex>
        0
        <Spacer />
        Total LKSM
      </Flex>

      <Flex>
        Overall
        <Spacer />
        ~US 0$
      </Flex>
    </Box>
  );
};

export default StakingCard;
