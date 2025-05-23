import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Container,
  Chip,
  Paper,
  Button,
  Divider,
  Fade,
  TextField,
  Rating
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopRatedRecipes from './TopRatedRecipes';
import NewlyAddedRecipes from './NewlyAddedRecipes';

const ClientRecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteEntry, setFavoriteEntry] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    name: '',
    rating: 0,
    message: '',
  });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setCurrentUser(decoded); // decoded should have user ID
    }
  }, []);

  // Function to fetch the recipe details
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error('Error fetching recipe:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/feedback/${id}`);
        const feedbackList = response.data;
        setFeedbacks(feedbackList);
  
        if (feedbackList.length > 0) {
          const total = feedbackList.reduce((sum, f) => sum + f.rating, 0);
          const average = total / feedbackList.length;
          setRecipe((prev) => ({
            ...prev,
            avgRating: average,
            numReviews: feedbackList.length,
          }));
        }
      } catch (err) {
        console.error('Error fetching feedbacks:', err);
      }
    };
  
    if (recipe) {
      fetchFeedbacks();
    }
  }, [recipe, id]);
  
  

  // Check if the recipe is already in favorites
  useEffect(() => {
    const checkFavorite = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`http://localhost:5000/api/favorites/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
    
        const foundFavorite = res.data.find(
          (f) => f.recipe && f.recipe._id === recipe._id // Ensure recipe exists before accessing _id
        );
    
        if (foundFavorite) {
          setIsFavorite(true);
          setFavoriteEntry(foundFavorite); // Ensure full favorite object with _id is stored
        } else {
          setIsFavorite(false);
          setFavoriteEntry(null);
        }
      } catch (err) {
        console.error('Error checking favorite:', err);
      }
    };
  
    if (recipe) {
      checkFavorite();
    }
  }, [recipe]);
  

  // Function to handle adding the recipe to favorites
  const handleAddToFavorites = async () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert('You need to log in to add to favorites.');
      return;
    }
  
    if (!recipe || !recipe._id) {
      console.error('Recipe is not defined or missing _id');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:5000/api/favorites/add',
        { recipeId: recipe._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setIsFavorite(true);
      setFavoriteEntry(response.data);
      toast.success('Recipe added to favorites!');
    } catch (err) {
      console.error('Failed to add to favorites:', err);
      toast.error('Failed to add recipe to favorites.');
    }
  };
  

  // Function to handle removing the recipe from favorites
  const handleRemoveFromFavorites = async () => {
    const token = localStorage.getItem('token');
  
    if (!favoriteEntry || !favoriteEntry._id) {
      console.error('No favorite entry or missing _id');
      return;
    }
  
    try {
      await axios.delete(`http://localhost:5000/api/favorites/${favoriteEntry._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setIsFavorite(false);
      setFavoriteEntry(null);
      toast.info('Recipe removed from favorites!');
    } catch (error) {
      console.error('Failed to remove from favorites:', error);
      toast.error('Failed to remove recipe from favorites.');
    }
  };
  
  // Function to handle submitting feedback
  const handleFeedbackSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `http://localhost:5000/api/feedback/${recipe._id}`,
        {
          name: newFeedback.name,
          rating: newFeedback.rating,
          message: newFeedback.message,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      setFeedbacks([response.data, ...feedbacks]);
      setNewFeedback({ name: '', rating: 0, message: '' });
      toast.success('Feedback submitted successfully!');
    } catch (err) {
      console.error('Error submitting feedback:', err);
      toast.error('Failed to submit feedback.');
    }
  };
  
  const handleDeleteFeedback = async (feedbackId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${feedbackId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks((prev) => prev.filter((f) => f._id !== feedbackId));
      toast.success('Feedback deleted');
    } catch (err) {
      console.error('Error deleting feedback:', err);
      toast.error('Failed to delete feedback');
    }
  };

  // Loader while fetching recipe
  if (loading)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '70vh'
        }}
      >
        <CircularProgress />
      </Box>
    );

  // If recipe not found
  if (!recipe)
    return (
      <Typography variant="h6" align="center" sx={{ mt: 5 }}>
        Recipe not found.
      </Typography>
    );

  return (
    <Box sx={{ backgroundImage: 'url("/images/bg.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Container maxWidth={false} sx={{ pt: 6, pb: 6 }}>
        <Fade in timeout={800}>
          <Box>
            {/* Back Button */}
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/recipes')}
              variant="outlined"
              sx={{ mb: 4 }}
            >
              Back to Recipes
            </Button>

            <Box>
              {/* Top Section: Image and Details */}
              <Paper elevation={6} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.36)', backdropFilter: 'blur(8px)', p: 4, borderRadius: 5 }}>
                <Grid container spacing={4}>
                  {/* Image on Left */}
                  <Box sx={{ width: { xs: '100%', md: '44%', xl: '50%' } }}>
                    <Grid item xs={12} md={6}>
                      <Box
                        component="img"
                        src={recipe.image}
                        alt={recipe.title}
                        sx={{
                          width: '100%',
                          aspectRatio: '4/3',
                          borderRadius: 5,
                          objectFit: 'cover',
                          boxShadow: 3,
                          transition: 'transform 0.4s ease',
                          '&:hover': {
                            transform: 'scale(1.03)',
                          },
                        }}
                      />
                      {/* Add to Favorites or Remove from Favorites Button */}
                      <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                        <Tooltip title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}>
                          <IconButton
                            onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}
                            sx={{
                              bgcolor: 'white',
                              '&:hover': { bgcolor: 'grey.200' },
                              boxShadow: 2,
                            }}
                          >
                            {isFavorite ? (
                              <FavoriteIcon sx={{ color: 'red' }} />
                            ) : (
                              <FavoriteBorderIcon sx={{ color: 'red' }} />
                            )}
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Grid>
                  </Box>

                  {/* Title, Time, Description on Right */}
                  <Box sx={{ maxWidth: { xs: '100%', md: '44%', xl: '47%' } }}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h3" fontWeight="bold" color="primary.main" gutterBottom>
                        {recipe.title}
                      </Typography>

                      <Chip
                        label={`Cooking Time: ${recipe.time}`}
                        color="white"
                        sx={{ borderRadius: '10px', mb: 2, fontSize: '16px' }}
                      />

                      {/* Rating and number of reviews */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating
                          name="read-only"
                          value={Number(recipe.avgRating) || 0}
                          precision={0.5}
                          readOnly
                          size="medium"
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          ({recipe.numReviews || 0} reviews)
                        </Typography>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ wordWrap: 'break-word', mr: -3, mt: 2, lineHeight: 1.8, fontSize: '18px' }}
                      >
                        {recipe.description}
                      </Typography>
                    </Grid>
                  </Box>

                </Grid>

              <Box sx={{ borderRadius:'10px', p:3, mt:5, bgcolor:'rgba(255, 255, 255, 0.62)', textAlign:'center'}}>
                <Typography variant="h3" fontWeight="bold" color="primary.main" gutterBottom>
                "Start Crafting Your Delicious Recipe!"
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary.main" gutterBottom>
                        Are You Ready With Ingredients ? Then Click 'Start'
                </Typography>
              </Box>
                {/* Bottom Section: Ingredients and Instructions */}
                <Grid container spacing={4} sx={{ mt: 4 }}>
                  {/* Ingredients Left */}
                  <Box sx={{ width: { xs: '100%', md: '47%', xl: '48%' } }}>
                    <Grid item xs={12} md={6}>
                      <Paper elevation={2} sx={{ width: 'auto', minHeight: 600, p: 3, borderRadius: 3 }}>
                        <Typography textAlign={'center'} variant="h5" fontWeight="bold" gutterBottom color="primary">
                          Ingredients
                        </Typography>
                        <Box component="ul" sx={{ pl: 5 }}>
                          {recipe.ingredients?.map((ingredient, index) => (
                            <li key={index}>
                              <Typography sx={{ fontSize: '16px', fontWeight: 400, lineHeight: 2 }}>
                                {ingredient}
                              </Typography>
                            </li>
                          ))}
                        </Box>
                      </Paper>
                    </Grid>
                  </Box>

                  {/* Instructions Right */}
                  <Box sx={{ width: { xs: '100%', md: '48%', xl: '50%' } }}>
                    <Grid item xs={12} md={6}>
                      <Paper elevation={2} sx={{ width: 'auto', minHeight: 600, p: 3, borderRadius: 3 }}>
                        <Typography textAlign={'center'} variant="h5" fontWeight="bold" gutterBottom color="primary">
                          Instructions
                        </Typography>
                        <Box sx={{ fontSize: '16px', fontWeight: 400, lineHeight: 2 }}>
                          {recipe.instructions}
                        </Box>
                      </Paper>
                    </Grid>
                  </Box>
                </Grid>
              </Paper>

              <TopRatedRecipes />
              <NewlyAddedRecipes />
              {/* Feedback Section */}
              <Box sx={{ justifyItems:'center' }}>
  <Paper elevation={3} sx={{ mt: 4, p: 3, borderRadius: 3, width: { xs: '100%', md: '50%', xl: '50%' } }}>
    <Typography variant="h5" fontWeight="bold" color="primary.main" gutterBottom>
      Leave a Feedback
    </Typography>

    <TextField
      label="Your Name"
      variant="outlined"
      fullWidth
      value={newFeedback.name}
      onChange={(e) => setNewFeedback({ ...newFeedback, name: e.target.value })}
      sx={{ mb: 2 }}
    />

    <Rating
      name="rating"
      value={newFeedback.rating}
      onChange={(event, newValue) => setNewFeedback({ ...newFeedback, rating: newValue })}
      sx={{ mb: 2 }}
    />

    <TextField
      label="Your Message"
      variant="outlined"
      fullWidth
      multiline
      rows={4}
      value={newFeedback.message}
      onChange={(e) => setNewFeedback({ ...newFeedback, message: e.target.value })}
      sx={{ mb: 2 }}
    />

    <Button variant="contained" onClick={handleFeedbackSubmit} sx={{ width: '100%' }}>
      Submit Feedback
    </Button>

    {/* Display feedbacks */}
    <Box sx={{ mt: 4 }}>
  <Typography variant="h6" color="primary" fontWeight="bold">
    Feedbacks:
  </Typography>
  {feedbacks.map((feedback, index) => (
    <Box key={index} sx={{ mt: 2, mb: 2, position: 'relative' }}>
      <Typography variant="body1" fontWeight="bold">
        {feedback.name}
      </Typography>
      <Rating value={feedback.rating} readOnly />
      <Typography variant="body2" sx={{ mt: 1 }}>
        {feedback.message}
      </Typography>

      {/* Show delete button if current user is the feedback owner */}
      {currentUser && feedback.userId === currentUser.id && (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDeleteFeedback(feedback._id)}
          sx={{ mt: 1 }}
        >
          Delete
        </Button>
      )}
    </Box>
  ))}
</Box>

  </Paper>
</Box>

            </Box>
          </Box>
        </Fade>
      </Container>
      <Footer />
    </Box>
  );
};

export default ClientRecipeDetail;
