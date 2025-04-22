import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { appBarStyle, titleStyle, buttonStyle, buttonStyle1 } from './navbarStyles';

const ChefNavbar = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={appBarStyle}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={titleStyle}>Chef Dashboard</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/chef/dashboard" sx={buttonStyle}>Dashboard</Button>
          <Button component={Link} to="/chef/my-recipes" sx={buttonStyle}>My Recipes</Button>
          
          <Button onClick={handleLogout} sx={buttonStyle1}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ChefNavbar;
