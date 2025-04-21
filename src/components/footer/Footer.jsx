// src/components/Footer.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#333',
        color: 'white',
        textAlign: 'center',
        py: 2,
        mt: 'auto',
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
