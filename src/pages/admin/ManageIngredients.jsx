import React, { useEffect, useState } from 'react';
import { Button, Grid, Card, CardContent, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, CardMedia } from '@mui/material';
import { Delete } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the default CSS for toast

const ManageIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [ingredientToDelete, setIngredientToDelete] = useState(null);

  // Fetch all ingredients from the backend
  useEffect(() => {
    const fetchAllIngredients = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/ingredients/all');
        setIngredients(res.data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
        toast.error("Error fetching ingredients!"); // Show error toast
      }
    };
    fetchAllIngredients();
  }, []);

  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  if (!token) {
    console.error('Token not found');
    return;
  }

  // Delete Ingredient for Admin
  const handleDelete = async (ingredientId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/ingredients/${ingredientId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      console.log(response.data.message); // Successfully deleted the ingredient
      // Close dialog after successful deletion
      closeDeleteDialog();
      // Remove deleted ingredient from the UI
      setIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient._id !== ingredientId));
      toast.success("Ingredient deleted successfully!"); // Success toast
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: You are not allowed to delete this ingredient.");
        toast.error("Unauthorized: You cannot delete this ingredient.");
      } else {
        console.error('Error deleting ingredient:', error.message);
        toast.error("Error deleting ingredient!"); // Error toast
      }
    }
  };

  const openDeleteDialog = (ingredientId) => {
    setIngredientToDelete(ingredientId);
    setOpenDialog(true);
  };

  const closeDeleteDialog = () => {
    setIngredientToDelete(null);
    setOpenDialog(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Manage Ingredients
      </Typography>

      <Grid container spacing={3}>
        {ingredients.map((ingredient) => (
          <Grid item xs={12} sm={6} md={4} key={ingredient._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={ingredient.imageUrl} // Assuming the image URL is stored in the ingredient data
                alt={ingredient.title}
              />
              <CardContent>
                <Typography variant="h6">{ingredient.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  By {ingredient.vendorName} {/* Assuming the Vendor's name is stored in the ingredient data */}
                </Typography>
              </CardContent>
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                <IconButton color="error" onClick={() => openDeleteDialog(ingredient._id)}>
                  <Delete />
                </IconButton>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Delete Ingredient</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this ingredient?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(ingredientToDelete)} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageIngredients;
