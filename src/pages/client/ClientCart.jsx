import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Button,
  IconButton,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import axios from 'axios';
import Footer from '../../components/footer/Footer';

const ClientCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);

  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found, please log in');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get('http://localhost:5000/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const cartData = res.data.items || [];
      setCartItems(cartData);
      calculateTotal(cartData);
    } catch (err) {
      setError('Error loading cart');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => {
      const price = item.ingredient?.price || 0;
      const qty = item.quantity || 1;
      return acc + price * qty;
    }, 0);
    setTotal(sum);
  };

  const handleRemove = async (ingredientId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${ingredientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedItems = cartItems.filter((item) => item.ingredient._id !== ingredientId);
      setCartItems(updatedItems);
      calculateTotal(updatedItems);
    } catch (err) {
      console.error('Error removing item from cart:', err);
    }
  };

  const updateQuantity = (ingredientId, delta) => {
    const updatedItems = cartItems.map((item) => {
      if (item.ingredient._id === ingredientId) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 }; // Ensure quantity doesn't go below 1
      }
      return item;
    });
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <Box>
      <Box sx={{ p: 4, minHeight: '100vh' }}>
        <Typography variant="h4" gutterBottom>
          My Ingredient Cart
        </Typography>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        <Grid container spacing={3}>
          {cartItems.map((item) => {
            const ingredient = item.ingredient;
            if (!ingredient) return null;

            // Calculate per-item subtotal
            const itemSubtotal = ingredient.price * item.quantity;

            return (
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
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img
                      src={ingredient.imageUrl}
                      alt={ingredient.title}
                      style={{
                        width: 200,
                        height: 200,
                        objectFit: 'cover',
                      }}
                    />
                  </Box>

                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {ingredient.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {ingredient.description}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      ₹{ingredient.price} x {item.quantity} = ₹{itemSubtotal}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                      {/* "-" button */}
                      <IconButton onClick={() => updateQuantity(ingredient._id, -1)} color="primary">
                        <Remove />
                      </IconButton>

                      <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>

                      {/* "+" button */}
                      <IconButton onClick={() => updateQuantity(ingredient._id, 1)} color="primary">
                        <Add />
                      </IconButton>
                    </Box>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemove(ingredient._id)}
                      sx={{ mt: 1 }}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {cartItems.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5">Total: ₹{total}</Typography>
          </Box>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default ClientCart;
