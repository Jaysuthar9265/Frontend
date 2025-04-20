import React from 'react';
import AdminNavbar from '../components/navbars/AdminNavbar';
import { Box } from '@mui/material';

const AdminLayout = ({ children }) => {
  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <AdminNavbar />
        <Box p={3}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
