import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import axios from 'axios';

const ClientFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token'); // Assuming token is in local storage

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

    fetchFavorites();
  }, []);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Favorite Recipes
      </Typography>
      <Grid container spacing={3}>
        {favorites.map((favorite) => (
          <Grid item xs={12} sm={6} md={4} key={favorite._id}>
            <Box>
              <img src={favorite.recipe.image} alt={favorite.recipe.title} width="100%" />
              <Typography variant="h6">{favorite.recipe.title}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ClientFavorites;
