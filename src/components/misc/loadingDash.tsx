import { Box, Center, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

const LoadingDash = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [loading]);
  if (loading == true)
    return (
      <Box height="100vh">
        <Center>
          <ScaleLoader color={useColorModeValue("#4C5BA7", "#94A6FF")} />
        </Center>
      </Box>
    );
  return <>{children}</>;
};

export default LoadingDash;
