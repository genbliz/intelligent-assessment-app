import React from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";

const Loading: React.FC<{ hideSpinner?: boolean }> = ({
  children,
  hideSpinner,
}) => {
  return (
    <Box
      display="flex"
      width="100%"
      height="100vh"
      backgroundColor="brand.100"
      justifyContent="center"
      alignItems="center"
    >
      <Box style={{ textAlign: "center" }}>
        {hideSpinner !== true && (
          <Spinner
            thickness="6px"
            width="100px"
            height="100px"
            speed="0.65s"
            emptyColor="brand.700"
            color="brand.50"
          />
        )}
        <Text color="brand.50" textAlign="center" fontSize="2em">
          {children}
        </Text>
      </Box>
    </Box>
  );
};

export default Loading;
