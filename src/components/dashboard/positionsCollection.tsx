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
import React from "react";

const PositionCollection = () => {
  // TODO: Replace with actual data
  const data = [
    { name: "MATIC", price: 1.3, amount: 69 },
    { name: "SUSHI", price: 12.5, amount: 29 },
  ];
  const gradient = useColorModeValue(
    "linear(to-bl, gray.200 0%, #94A6FF 100%)",
    "linear(to-bl, #121a1f 0%, #1C319959 100%)"
  );
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
                  <Avatar mx="auto" mr={3}>
                    <chakra.p fontSize="12" mx="8">
                      {asset.name}
                    </chakra.p>
                  </Avatar>
                  <VStack alignItems="start">
                    <Text opacity={0.6}>{asset.name}</Text>
                    <Heading fontSize="md" fontWeight="300">
                      {asset.price}$
                    </Heading>
                  </VStack>
                  <Spacer />
                  <VStack alignItems="end" mx="auto">
                    <Heading fontSize="md" fontWeight="600">
                      {(asset.amount * asset.price).toFixed(2)}$
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

export default PositionCollection;
