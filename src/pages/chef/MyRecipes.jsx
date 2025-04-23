// src/pages/chef/MyRecipes.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Grid,
  Snackbar,
  Alert,
  Stack,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [deleted, setDeleted] = useState(false);
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
      setDeleted(true);
      fetchMyRecipes(); // refresh list
    } catch (err) {
      console.error('Error deleting recipe:', err);
    }
  };

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        My Recipes
      </Typography>
      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid
           item xs={12} sm={6} md={4} key={recipe._id}>
            <Card sx={{ position: 'relative', height: '420px', width:'200px', display:'flex', flexDirection:'column' }}>
              <CardMedia
                component="img"
                height="160"
                image={recipe.image || 'https://via.placeholder.com/300'}
                alt={recipe.title}
              />
              <CardContent>
                <Typography sx={{ wordWrap: 'break-word', whiteSpace: 'normal' }} variant="h6">{recipe.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {recipe.category}
                </Typography>
           
                <Typography variant="body2" color="text.secondary">
                  Time: {recipe.time}
                </Typography>
                <IconButton
                color="error"
                onClick={() => handleDelete(recipe._id)}
                sx={{ position: 'absolute', top: 8, right: 8 }}
              >
                <DeleteIcon />
              </IconButton>
              </CardContent>
            
              <Box sx={{ mt: 'auto', px: 2, pb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleEdit(recipe._id)}
                >
                  Edit
                </Button>
              </Box>
 
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack marginTop={10} spacing={2} direction="row">
        <Button variant="contained" color="primary" onClick={() => navigate('/chef/add-recipe')}>
         + Add New Recipe
        </Button>
      </Stack>

      <Snackbar open={deleted} autoHideDuration={3000} onClose={() => setDeleted(false)}>
        <Alert onClose={() => setDeleted(false)} severity="info" sx={{ width: '100%' }}>
          Recipe deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MyRecipes;
