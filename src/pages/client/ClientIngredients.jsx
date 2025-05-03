import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Button,
  Snackbar,
} from '@mui/material';
import axios from 'axios';
import Footer from '../../components/footer/Footer';

const ClientIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');

  const fetchAllIngredients = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/ingredients/all');
      setIngredients(res.data);
    } catch (err) {
      setError('Error loading ingredients');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (ingredientId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5000/api/cart/add',
        {
          ingredientId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSnackMsg('Added to cart!');
      setSnackOpen(true);
    } catch (err) {
      console.error('Add to cart failed', err);
      setSnackMsg('Login to add to cart');
      setSnackOpen(true);
    }
  };

  useEffect(() => {
    fetchAllIngredients();
  }, []);

  return (
    <Box sx={{
      backgroundImage: 'url(/images/bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <Box sx={{ p: 4, minHeight: '100vh' }}>
        <Typography variant="h4" gutterBottom>
          Explore Ingredients
        </Typography>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        <Grid container spacing={3}>
          {ingredients.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  height: '100%',
                  width: 200,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                }}
              >
                {item.imageUrl && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{
                        width: 200,
                        height: 200,
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                )}

                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ wordWrap: 'break-word', fontWeight: 'bold' }}>
                    {item.title}
                  </Typography>

                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={() => handleAddToCart(item._id)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        message={snackMsg}
      />
    </Box>
  );
};

export default ClientIngredients;
