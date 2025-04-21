import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { adminAppBarStyle, titleStyle, buttonStyle, buttonStyle1 } from './navbarStyles';

const AdminNavbar = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={adminAppBarStyle}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={titleStyle}>Admin Dashboard</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/admin/dashboard" sx={buttonStyle}>Dashboard</Button>
          <Button component={Link} to="/admin/users" sx={buttonStyle}>Users</Button>
          <Button component={Link} to="/admin/add-admin" sx={buttonStyle}>Add Admin</Button>
          <Button onClick={handleLogout} sx={buttonStyle1}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
