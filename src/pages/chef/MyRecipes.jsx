// src/pages/chef/MyRecipes.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const fetchMyRecipes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/recipes/myrecipes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/chef/edit-recipe/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMyRecipes();
      toast.success('Recipe deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
      });
    } catch (err) {
      console.error('Error deleting recipe:', err);
      toast.error('Failed to delete recipe!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
      });
    }
  };

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("/images/bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      p={4}
    >
      <Typography variant="h4" gutterBottom>
        My Recipes
      </Typography>

      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe._id}>
            <Card
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.62)',
                borderRadius: '10px',
                position: 'relative',
                height: '460px',
                width: '250px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={recipe.image || 'https://via.placeholder.com/300'}
                alt={recipe.title}
              />
              <CardContent>
                <Typography sx={{ wordWrap: 'break-word', whiteSpace: 'normal' }} variant="h6">
                  {recipe.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {recipe.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Time: {recipe.time}
                </Typography>
              </CardContent>

              <Box sx={{ mt: 'auto', px: 2, pb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleEdit(recipe._id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={() => handleDelete(recipe._id)}
                >
                  Delete
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box marginTop={10} spacing={2} direction="row">
        <Button variant="contained" color="primary" onClick={() => navigate('/chef/add-recipe')}>
          + Add New Recipe
        </Button>
      </Box>
    </Box>
  );
};

export default MyRecipes;
