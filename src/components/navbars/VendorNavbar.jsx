import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { appBarStyle, titleStyle, buttonStyle, buttonStyle1 } from './navbarStyles';

const VendorNavbar = () => {
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
        <Typography variant="h6" component={Link} to="/" sx={titleStyle}>Vendor Dashboard</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/vendor/dashboard" sx={buttonStyle}>Dashboard</Button>
          <Button component={Link} to="/vendor/my-ingredients" sx={buttonStyle}>My Ingredients</Button>
          <Button component={Link} to="/vendor/add-ingredient" sx={buttonStyle}>Add Ingredients</Button>
          <Button onClick={handleLogout} sx={buttonStyle1}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default VendorNavbar;
