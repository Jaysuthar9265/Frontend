import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { navbarColor } from '../../theme/colors';


const AdminNavbar = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clear user from context
    localStorage.clear(); // remove token, role, etc.
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: navbarColor, color: 'white' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Admin Dashboard</Typography>
        <Button color="inherit" component={Link} to="/admin/dashboard">Dashboard</Button>
        <Button color="inherit" component={Link} to="/admin/users">Users</Button>
        <Button color="inherit" component={Link} to="/admin/add-admin">Add Admin</Button>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
