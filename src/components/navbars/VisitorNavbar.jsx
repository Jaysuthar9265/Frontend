import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { appBarStyle, titleStyle, buttonStyle } from './navbarStyles';

const VisitorNavbar = () => {
  return (
    <AppBar position="static" sx={appBarStyle}>
      <Toolbar disableGutters sx={{ justifyContent: 'space-between', px: 2 }}>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={titleStyle}
        >
          AutoChef
        </Typography>

        <Box sx={{ display: 'flex', gap: { xs: 1, md: 2 } }}>
          <Button component={Link} to="/" sx={buttonStyle}>Home</Button>
          <Button component={Link} to="/recipes" sx={buttonStyle}>Recipes</Button>
          <Button component={Link} to="/about" sx={buttonStyle}>About</Button>
          <Button component={Link} to="/login" sx={buttonStyle}>Login</Button>
          <Button component={Link} to="/signup" sx={buttonStyle}>Register</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default VisitorNavbar;
