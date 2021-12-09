import { Center, Spinner, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const CardSpinner = () => {
  return (
    <Center>
      <Spinner
        thickness="6px"
        speed="0.65s"
        emptyColor={useColorModeValue("gray.200", "gray.700")}
        color={useColorModeValue("blue.600", "blue.300")}
        size="xl"
      />
    </Center>
  );
};

export default CardSpinner;
