import { Center, Heading } from "@chakra-ui/react";
import React from "react";

const NotFound = () => {
  return (
    <>
      <Center>
        <Heading>404: Page not found</Heading>
      </Center>

      <Center>
        {" "}
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      </Center>
    </>
  );
};

export default NotFound;
