import React from 'react';
import { Box } from '@chakra-ui/react';

/*

.sticky-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

*/
const AppStickyFooter: React.FC = ({ children }) => {
  return (
    <Box
      bg="transparent"
      display="flex"
      flexDirection="column"
      width="full"
      height="auto"
      margin={0}
      padding={0}
      className="AppStickyFooter"
      zIndex="sticky"
      bottom={0}
      left={0}
      right={0}
      position="fixed"
    >
      {children}
    </Box>
  );
};

export default AppStickyFooter;
