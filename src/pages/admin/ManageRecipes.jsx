import React, { useEffect, useState } from 'react';
import { Button, Grid, Card, CardMedia, CardContent, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Delete } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the default CSS for toast

const ManageRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  // Fetch all recipes from the backend
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recipes');
        setRecipes(response.data); // This will include the chef's name
      } catch (error) {
        console.error("Error fetching recipes:", error);
        toast.error("Error fetching recipes!"); // Show error toast
      }
    };
    fetchRecipes();
  }, []);

  const token = localStorage.getItem('token'); // Ensure you retrieve the token from localStorage
  if (!token) {
    console.error('Token not found');
    return;
  }

  // Delete Recipe for Admin
  const handleDelete = async (recipeId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/recipes/${recipeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Ensure the token is passed
        }
      });
      console.log(response.data.message); // Successfully deleted the recipe
      // Close the dialog after successful deletion
      closeDeleteDialog();
      // Optionally, you can update the state to remove the deleted recipe from the UI
      setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== recipeId));
      toast.success("Recipe deleted successfully!"); // Success toast
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: You are not allowed to delete this recipe.");
        toast.error("Unauthorized: You cannot delete this recipe.");
      } else {
        console.error('Error deleting recipe:', error.message);
        toast.error("Error deleting recipe!"); // Error toast
      }
    }
  };

  const openDeleteDialog = (recipeId) => {
    setRecipeToDelete(recipeId);
    setOpenDialog(true);
  };

  const closeDeleteDialog = () => {
    setRecipeToDelete(null);
    setOpenDialog(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Manage Recipes
      </Typography>

      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={recipe.image} // Assuming the image URL is stored in the recipe data
                alt={recipe.title}
              />
              <CardContent>
                <Typography variant="h6">{recipe.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  By {recipe.chefName} {/* Assuming the chef's name is stored in the recipe data */}
                </Typography>
              </CardContent>
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                <IconButton color="error" onClick={() => openDeleteDialog(recipe._id)}>
                  <Delete />
                </IconButton>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Delete Recipe</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this recipe?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(recipeToDelete)} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageRecipes;
