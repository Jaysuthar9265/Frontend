import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';


const Header = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, color: 'white', textDecoration: 'none' }}
        >
          AutoChef
        </Typography>

        <Button color="inherit" component={Link} to="/recipes">
          Recipes
        </Button>
        <Button color="inherit" component={Link} to="/about">
          About
        </Button>

        {user?.name ? (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1" sx={{ color: 'white' }}>
              Hi, {user.name}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
