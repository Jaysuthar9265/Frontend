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
  Fade
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import styles

const ClientRecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteEntry, setFavoriteEntry] = useState(null);

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

  // Check if the recipe is already in favorites
  useEffect(() => {
    const checkFavorite = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`http://localhost:5000/api/favorites/`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const foundFavorite = res.data.find(
          (f) => f.recipe._id === recipe._id
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

    try {
      const response = await axios.post(
        'http://localhost:5000/api/favorites/add',
        { recipeId: recipe._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsFavorite(true);
      setFavoriteEntry(response.data);
      toast.success('Recipe added to favorites!'); // Toast notification for success
    } catch (err) {
      console.error('Failed to add to favorites:', err);
      toast.error('Failed to add recipe to favorites.'); // Toast notification for failure
    }
  };

  // Function to handle removing the recipe from favorites
  const handleRemoveFromFavorites = async () => {
    const token = localStorage.getItem('token');

    try {
      if (!favoriteEntry?._id) return; // Ensure we have an ID
      await axios.delete(`http://localhost:5000/api/favorites/${favoriteEntry._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setIsFavorite(false);
      setFavoriteEntry(null);
      toast.info('Recipe removed from favorites!'); // Toast notification for removal
    } catch (error) {
      console.error('Failed to remove from favorites:', error);
      toast.error('Failed to remove recipe from favorites.'); // Toast notification for failure
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
                            transform: 'scale(1.03)'
                          }
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
                              boxShadow: 2
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

                {/* Bottom Section: Ingredients and Instructions */}
                <Grid container spacing={4} sx={{ mt: 4 }}>
                  {/* Ingredients Left */}
                  <Box sx={{ width: { xs: '100%', md: '48%', xl: '50%' } }}>
                    <Grid item xs={12} md={6}>
                      <Paper elevation={2} sx={{ width: 'auto', minHeight: 600, p: 3, borderRadius: 3 }}>
                        <Typography textAlign={'center'} variant="h5" fontWeight="bold" gutterBottom color="primary">
                          Ingredients
                        </Typography>
                        <Box component="ul" sx={{ pl: 5 }}>
                          {recipe.ingredients?.map((ingredient, index) => (
                            <li key={index}>
                              <Typography sx={{ pb: 2 }} variant="body1" color="text.secondary">
                                {ingredient}
                              </Typography>
                            </li>
                          ))}
                        </Box>
                      </Paper>
                    </Grid>
                  </Box>

                  {/* Instructions Right */}
                  <Box sx={{ width: { xs: '100%', md: '48%', xl: '47%' } }}>
                    <Grid item xs={12} md={6}>
                      <Paper elevation={2} sx={{ width: '100%', minHeight: 600, p: 3, borderRadius: 3, bgcolor: 'grey.100' }}>
                        <Typography textAlign={'center'} variant="h5" fontWeight="bold" gutterBottom color="primary">
                          Instructions
                        </Typography>
                        <Box component="ol" sx={{ pl: 5 }}>
                          {recipe.instructions?.map((instruction, index) => (
                            <li key={index} style={{ marginBottom: '12px' }}>
                              <Typography variant="body1" color="text.secondary">
                                {instruction}
                              </Typography>
                            </li>
                          ))}
                        </Box>
                      </Paper>
                    </Grid>
                  </Box>
                </Grid>
              </Paper>
            </Box>
          </Box>
        </Fade>
      </Container>
      <Footer />
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={5000} newestOnTop closeButton />
    </Box>
  );
};

export default ClientRecipeDetail;
