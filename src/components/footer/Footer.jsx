// src/components/Footer.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        borderTopLeftRadius:'20px',
        borderTopRightRadius:'20px',
        width: '100%',
        backgroundColor: '#2c3e50',
        color: 'white',
        textAlign: 'center',
        py: 10,
        mt: 0,
        mb:0,
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} AutoChef. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
