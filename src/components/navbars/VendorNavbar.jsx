import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const VendorNavbar = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Vendor Dashboard</Typography>
        <Button color="inherit" component={Link} to="/vendor/dashboard">Dashboard</Button>
        <Button color="inherit" component={Link} to="/vendor/products">Products</Button>
        <Button color="inherit" component={Link} to="/vendor/orders">Orders</Button>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default VendorNavbar;
