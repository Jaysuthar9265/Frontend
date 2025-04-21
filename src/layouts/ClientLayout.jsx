import React from 'react';
import { Box } from '@mui/material';
import ClientNavbar from '../components/navbars/ClientNavbar';


const ClientLayout = ({ children }) => {
  return (
    <Box>
      <Box>
        <ClientNavbar />
       
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default ClientLayout;
