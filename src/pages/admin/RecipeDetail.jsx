import React, { useEffect, useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Rating,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const RecipeDetail = () => {
  const { id } = useParams(); // recipeId
  const [recipe, setRecipe] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const token = localStorage.getItem('token');
  console.log(token);

  
  useEffect(() => {
      const fetchRecipeAndFeedbacks = async () => {
          try {
        // Fetch recipe details
        const recipeRes = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(recipeRes.data);

        // Fetch feedbacks
        const feedbackRes = await axios.get(`http://localhost:5000/api/feedback/${id}`);
        setFeedbacks(feedbackRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load recipe or feedbacks');
      }
    };
    fetchRecipeAndFeedbacks();
  }, [id]);

  const handleDelete = async () => {
    try {
      if (!token) {
        toast.error('You must be logged in to delete feedback');
        return;
      }
  
      // Perform delete operation
      await axios.delete(`http://localhost:5000/api/feedback/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      toast.success('Feedback deleted');
      setFeedbacks(prev => prev.filter(f => f._id !== deleteId));
      setConfirmDialog(false);
    } catch (error) {
      console.error('Error deleting feedback:', error);
  
      // Handle error based on error response structure
      if (error.response) {
        // Server responded with a status other than 2xx
        toast.error(error.response.data.message || 'Failed to delete feedback');
      } else if (error.request) {
        // Request was made but no response was received
        toast.error('No response from the server. Please try again later.');
      } else {
        // Something else went wrong while setting up the request
        toast.error('Error occurred while deleting the feedback. Please try again.');
      }
    }
  };
  

  return (
    <div style={{ padding: '20px' }}>
      {recipe && (
        <div style={{ marginBottom: '20px' }}>
          <Typography variant="h4">{recipe.title}</Typography>
        </div>
      )}

      <Typography variant="h5" gutterBottom>Feedbacks</Typography>
      <Grid container spacing={2}>
        {feedbacks.length > 0 ? (
          feedbacks.map((fb) => (
            <Grid item xs={12} md={6} key={fb._id}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1"><strong>{fb.name}</strong></Typography>
                  <Rating value={fb.rating} readOnly precision={0.5} />
                  <Typography variant="body2">{fb.message}</Typography>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setDeleteId(fb._id);
                      setConfirmDialog(true);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No feedbacks yet.</Typography>
        )}
      </Grid>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
        <DialogTitle>Delete Feedback</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this feedback?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RecipeDetail;
