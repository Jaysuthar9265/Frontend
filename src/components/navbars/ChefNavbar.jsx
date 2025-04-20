import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const ChefNavbar = () => {
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
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Chef Dashboard</Typography>
        <Button color="inherit" component={Link} to="/chef/dashboard">Dashboard</Button>
        <Button color="inherit" component={Link} to="/chef/my-recipes">My Recipes</Button>
        <Button color="inherit" component={Link} to="/chef/schedule">Schedule</Button>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default ChefNavbar;
