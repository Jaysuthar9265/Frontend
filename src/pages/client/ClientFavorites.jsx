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
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';

const ClientFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You need to log in to view your favorites.');
      return;
    }

    try {
      const res = await axios.get('http://localhost:5000/api/favorites', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(res.data);
    } catch (err) {
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
    } catch (err) {
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
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Favorite Recipes
      </Typography>
      <Grid container spacing={3}>
        {favorites.map((favorite) => (
          <Grid item xs={12} sm={6} md={4} key={favorite._id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={favorite.recipe.image || '/default-recipe.jpg'}
                alt={favorite.recipe.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {favorite.recipe.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {favorite.recipe.description}
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
        ))}
      </Grid>
    </Container>
  );
};

export default ClientFavorites;
