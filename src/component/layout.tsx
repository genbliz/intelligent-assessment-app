import { Box } from '@chakra-ui/react';
import React from 'react';

const AppLayout: React.FC = ({ children }) => (
  <Box padding={0} margin={0} width="full" height="full" bg="transparent" className="AppLayout_main">
    {children}
  </Box>
);

export default AppLayout;
