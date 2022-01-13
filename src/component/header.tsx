import React from "react";
import { Center, Text, VStack } from "@chakra-ui/react";
import AppStickyHeader from "./sticky-header";

export interface IRightMenuItem {
  title: string;
  id: string;
}

interface IHeader {
  isMini?: boolean;
  hideMiniBackButton?: boolean;
  menuTitle: string;
  backToUrl?: string;
  rightIconElem?: React.ElementType<any>;
  handleRightButtonClick?: () => void;
  rightMenuItems?: IRightMenuItem[];
  handleRightMenuItemClick?: (id: string) => void;
}

const AppHeader: React.FC<IHeader> = ({ menuTitle, children }) => {
  const MenuHorizontalTitleTop: React.FC = () => (
    <Center width="full" paddingX="5px" paddingY="5px">
      <Text userSelect="none" fontWeight="bold">
        {menuTitle.toUpperCase()}
      </Text>
    </Center>
  );

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
