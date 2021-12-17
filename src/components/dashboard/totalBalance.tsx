import {
  Box,
  useColorModeValue,
  Text,
  Heading,
  Tooltip,
  VStack,
  Progress,
  HStack,
  useToast,
  Spacer,
} from "@chakra-ui/react";
import { BiCopy } from "react-icons/bi";
import numbro from "numbro";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { FiExternalLink } from "react-icons/fi";
import {
  userKarFreeState,
  userKarLockedState,
  userTokensBalanceState,
  userVaultsBalanceState,
} from "../../atoms";

const TotalBalance = () => {
  const gradient = useColorModeValue(
    "linear(to-br, #A4EBDF, #D3DCEC)",
    "linear(to-br, #14776C, #04476D)"
  );
  const address = useParams().address;
  const userVaultsBalance = useRecoilValue(userVaultsBalanceState);
  const userKarFreeBalance = useRecoilValue(userKarFreeState);
  const userKarLockedBalance = useRecoilValue(userKarLockedState);
  const userTokensBalance = useRecoilValue(userTokensBalanceState);
  function sumAll() {
    const sum =
      userTokensBalance +
      userKarLockedBalance +
      userKarFreeBalance +
      userVaultsBalance;
    if (isNaN(sum)) return 0;

    return (
      userTokensBalance +
      userKarLockedBalance +
      userKarFreeBalance +
      userVaultsBalance
    );
  }
  function getRatio() {
    const sum = sumAll();
    return ((userTokensBalance + userKarFreeBalance) * 100) / sum;
  }
  const toast = useToast();
  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "address copied successfully",
        status: "success",
        position: "top",
        duration: 900,
        isClosable: true,
      });
    }
  };
  return (
    <Box
      mx="auto"
      maxW={{ base: "90vw", sm: "80vw", md: "70vw", lg: "60vw", xl: "800px" }}
      spacing={0}
      rounded="md"
      bgGradient={gradient}
    >
      <HStack>
        <Box px={4} pt={6}>
          <Text fontWeight={600}>Portfolio Value</Text>
          {address && (
            <HStack>
              <Text opacity={0.7} fontSize="sm">
                {address.substring(0, 4) +
                  "..." +
                  address.substring(address.length - 4, address.length)}
              </Text>
              <Tooltip
                label="Copy Address"
                rounded="md"
                bgColor={useColorModeValue("gray.100", "gray.900")}
                color={useColorModeValue("gray.900", "gray.50")}
              >
                <Box>
                  <BiCopy opacity={0.8} onClick={() => copyAddress()} />
                </Box>
              </Tooltip>
              <Tooltip
                label="View on Subscan"
                rounded="md"
                bgColor={useColorModeValue("gray.100", "gray.900")}
                color={useColorModeValue("gray.900", "gray.50")}
              >
                <Box>
                  <FiExternalLink
                    opacity={0.8}
                    onClick={() => {
                      window.open(
                        `https://karura.subscan.io/account/${address}`
                      );
                    }}
                  />
                </Box>
              </Tooltip>
            </HStack>
          )}
        </Box>
      </HStack>

      <Box px={4} pb={4} minH="100px" rounded="md">
        <VStack alignItems="start">
          <Text opacity={0.6}>Net Worth</Text>
          <Heading fontSize="4xl" fontWeight="300">
            {numbro(sumAll()).format("0,0.00")}$
          </Heading>
        </VStack>

        <Tooltip
          hasArrow
          label={`${
            sumAll() ? numbro(getRatio()).format("0,0.00") : "0"
          }% In wallet, ${
            sumAll() ? numbro(100 - getRatio()).format("0,0.00") : "0"
          }% Locked`}
          rounded="md"
        >
          <div>
            <Progress
              hasStripe
              value={sumAll() ? getRatio() : 0}
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
