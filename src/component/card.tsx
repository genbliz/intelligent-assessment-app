import React from "react";
import { Box, HStack, BoxProps } from "@chakra-ui/react";

export const Card: React.FC<{
  disabled?: boolean;
  hasBorderRadius?: boolean;
  bg?: string;
}> = ({ children, hasBorderRadius, disabled, bg }) => {
  return (
    <Box
      borderWidth="1px"
      borderColor="dark.200"
      bg={bg || undefined}
      pointerEvents={disabled ? "none" : "auto"}
      borderTopRadius={hasBorderRadius ? "20px" : undefined}
      display="flex"
      flexDirection="column"
      minWidth="full"
      shadow="lg"
      className="AppCard_main"
      p={0}
      m={0}
    >
      {children}
    </Box>
  );
};

export const CardBody: React.FC = ({ children }) => {
  return (
    <Box
      className="AppCard_Body"
      paddingEnd="10px"
      paddingStart="10px"
      paddingTop="2px"
      paddingBottom="2px"
    >
      {children}
    </Box>
  );
};

export const CardItem: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box className="AppCard_Item" marginTop="5px" {...props}>
      {children}
    </Box>
  );
};

export const CardHeader: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box className="AppCard_Header" padding="5px" {...props}>
      {children}
    </Box>
  );
};

export const CardTitle: React.FC = ({ children }) => {
  return (
    <Box
      className="AppCard_Title"
      p={0}
      m={0}
      fontWeight="thin"
      size="sm"
      textTransform="uppercase"
      textAlign="center"
    >
      {children}
    </Box>
  );
};

export const CardSubTitle: React.FC = ({ children }) => {
  return (
    <Box
      className="AppCard_SUbTitle"
      fontWeight="hairline"
      size="sm"
      textAlign="center"
      textTransform="lowercase"
    >
      {children}
    </Box>
  );
};

export const CardActions: React.FC = ({ children }) => {
  return (
    <HStack
      className="AppCard_Actions"
      marginTop="20px"
      padding="5px"
      justifyContent="center"
      marginLeft="5px"
      flexGrow={1}
    >
      {children}
    </HStack>
  );
};
