import React from "react";
import { Box } from "@chakra-ui/react";

const AppStickyHeader: React.FC = ({ children }) => {
  const headerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (headerRef?.current?.clientHeight) {
      // setMenuHeight(headerRef.current.clientHeight);
    }
  }, [headerRef?.current?.clientHeight]);

  return (
    <Box
      bg="transparent"
      display="flex"
      flexDirection="column"
      width="full"
      height="auto"
      margin={0}
      padding={0}
      className="AppStickyHeader"
      zIndex="sticky"
      top={0}
      left={0}
      right={0}
      position="fixed"
      ref={headerRef}
    >
      {children}
    </Box>
  );
};

export default AppStickyHeader;
