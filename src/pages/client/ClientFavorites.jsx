import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  CircularProgress,
  Box,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { toast } from 'react-toastify';

const ClientFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('You need to log in to view your favorites.');
      return;
    }

    try {
      const res = await axios.get('http://localhost:5000/api/favorites', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(res.data);
    } catch (err) {
      toast.error('Error fetching favorites');
      console.error('Error fetching favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (favoriteId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/favorites/${favoriteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites((prev) => prev.filter((fav) => fav._id !== favoriteId));
      toast.success('Recipe removed from favorites');
    } catch (err) {
      toast.error('Error removing favorite');
      console.error('Error removing favorite:', err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>Loading Favorites...</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{
      backgroundImage: 'url(/images/bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      mt: -4.1,
    }}>
      <Container sx={{ mt: 4, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Your Favorite Recipes
        </Typography>
        {favorites.length === 0 ? (
          <Typography variant="h6" color="text.secondary">
            You have no favorite recipes added.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {favorites.map((favorite) => {
              const recipe = favorite.recipe;
              if (!recipe) {
                return (
                  <Grid item xs={12} sm={6} md={4} key={favorite._id}>
                    <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
                      <Typography variant="h6" color="error">
                        Recipe not available
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        This recipe may have been deleted.
                      </Typography>
                      <CardActions>
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveFavorite(favorite._id)}
                          aria-label="remove invalid favorite"
                        >
                          <FavoriteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              }

              return (
                <Grid item xs={12} sm={6} md={4} key={favorite._id}>
                  <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={recipe.image || '/default-recipe.jpg'}
                      alt={recipe.title || 'Recipe Image'}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {recipe.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {recipe.description || 'No description available.'}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveFavorite(favorite._id)}
                        aria-label="remove from favorites"
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ClientFavorites;
