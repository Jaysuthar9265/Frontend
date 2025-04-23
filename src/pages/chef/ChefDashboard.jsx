// src/pages/chef/ChefDashboard.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChefDashboard = () => {
  const navigate = useNavigate();
  const [recentRecipes, setRecentRecipes] = useState([]);

  useEffect(() => {
    const fetchRecentRecipes = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/recipes/myrecipes?limit=6', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecentRecipes(res.data);
      } catch (err) {
        console.error('Failed to fetch recent recipes', err);
      }
    };

    fetchRecentRecipes();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Welcome, Chef!
      </Typography>

      <Stack spacing={2} direction="row" mb={4}>
        <Button variant="contained" color="primary" onClick={() => navigate('/chef/add-recipe')}>
          Add New Recipe
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate('/chef/my-recipes')}>
          View My Recipes
        </Button>
      </Stack>

      <Typography variant="h5" gutterBottom>
        Recently Added Recipes
      </Typography>

      <Grid container spacing={3}>
        {recentRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe._id}>
            <Card
              sx={{
                height: '420px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                width:250,
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={recipe.image || 'https://via.placeholder.com/300'}
                alt={recipe.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ wordWrap: 'break-word' }}>
                  {recipe.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {recipe.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ingredients: {recipe.ingredients.join(', ')}
                </Typography>
              </CardContent>
              <Box sx={{ mt: 'auto', px: 2, pb: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={() => navigate(`/chef/edit-recipe/${recipe._id}`)}
                >
                  Edit
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ChefDashboard;
