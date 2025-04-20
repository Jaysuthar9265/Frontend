// src/pages/chef/ChefDashboard.jsx
import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChefDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Welcome, Chef!
      </Typography>

      <Stack spacing={2} direction="row">
        <Button variant="contained" color="primary" onClick={() => navigate('/chef/add-recipe')}>
          Add New Recipe
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate('/chef/my-recipes')}>
          View My Recipes
        </Button>
      </Stack>
    </Box>
  );
};

export default ChefDashboard;
