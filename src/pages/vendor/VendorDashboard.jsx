import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VendorDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Vendor Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#f0f4f8' }}>
            <CardContent>
              <Typography variant="h6">Manage Ingredients</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                View and manage your added ingredients.
              </Typography>
              <Button variant="contained" color="primary" onClick={() => navigate('/vendor/my-ingredients')}>
                My Ingredients
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#f9fbe7' }}>
            <CardContent>
              <Typography variant="h6">Add New Ingredient</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Add new ingredients to your list.
              </Typography>
              <Button variant="contained" color="success" onClick={() => navigate('/vendor/add-ingredient')}>
                Add Ingredient
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VendorDashboard;
