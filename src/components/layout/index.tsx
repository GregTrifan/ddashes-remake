import {
  chakra,
  Box,
  Text,
  Center,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { AiFillGithub } from "react-icons/ai";
import NavHeader from "./header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")}>
      <NavHeader />
      <Box minH="78vh">
        <Box mt="12">{children}</Box>
      </Box>

      <Box
        as="footer"
        role="contentinfo"
        mx="auto"
        maxW="7xl"
        py="12"
        px={{ base: "4", md: "8" }}
      >
        <Center>
          <Flex>
            <Text alignSelf={{ base: "center", sm: "start" }}>
              &copy; {new Date().getFullYear()} Greg (aka TheSlayer-666)
            </Text>
            <chakra.a ml="13" href="https://github.com/TheSlayer-666">
              <AiFillGithub size={25} />
            </chakra.a>
          </Flex>
        </Center>
      </Box>
    </Box>
  );
};

export default Layout;
