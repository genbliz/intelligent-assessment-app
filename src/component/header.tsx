import React from "react";
import { Box, Button, Center, Icon, Text, VStack } from "@chakra-ui/react";
import AppStickyHeader from "./sticky-header";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export interface IRightMenuItem {
  title: string;
  id: string;
}

interface IHeader {
  isMini?: boolean;
  hideMiniBackButton?: boolean;
  menuTitle: string;
  backToUrl?: string;
}

const AppHeader: React.FC<IHeader> = ({
  menuTitle,
  children,
  isMini,
  hideMiniBackButton,
  backToUrl,
}) => {
  const navigate = useNavigate();

  const MenuHorizontalTitleTop: React.FC = () => (
    <Center width="full" paddingX="5px" paddingY="5px">
      <Text userSelect="none" fontWeight="bold">
        {menuTitle.toUpperCase()}
      </Text>
    </Center>
  );

  const MenuBackButton: React.FC = () => (
    <Button
      leftIcon={<Icon as={MdArrowBack} boxSize="32px" />}
      variant="link"
      marginLeft="5px"
      color="brand.50"
      _focus={{ userSelect: "none", outline: "none" }}
      _active={{ userSelect: "none", outline: "none" }}
      _hover={{ userSelect: "none", outline: "none" }}
      onClick={() => {
        if (backToUrl) {
          navigate(backToUrl);
        } else {
          // NavigationService.goBack();
        }
      }}
    >
      &nbsp;
    </Button>
  );

  const MiniMenu: React.FC = () => (
    <Box
      bg="gray.200"
      minHeight="50px"
      className="App_MiniMenu"
      display="flex"
      justifyContent="space-between"
    >
      {!hideMiniBackButton && (
        <Center minHeight="50px" width="auto">
          <MenuBackButton />
        </Center>
      )}
      <MenuHorizontalTitleTop />
      <Center></Center>
    </Box>
  );

  if (isMini) {
    return (
      <AppStickyHeader>
        <MiniMenu />
        {children}
      </AppStickyHeader>
    );
  }

  return (
    <AppStickyHeader>
      <Center
        userSelect="none"
        width="full"
        minHeight="50px"
        bg="gray.200"
        className="AppLayout_main"
      >
        <VStack width="full" spacing={0}>
          <MenuHorizontalTitleTop />
          {/* <MenuHorizontalActions menus={menuHeaderData} /> */}
        </VStack>
      </Center>
      {children}
    </AppStickyHeader>
  );
};

export default React.memo(AppHeader);
