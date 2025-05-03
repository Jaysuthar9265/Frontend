import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Button,
  IconButton,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
import Footer from '../../components/footer/Footer';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const ClientCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [loadingCheckout, setLoadingCheckout] = useState(false); // Loading state for checkout button

  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No token found, please log in'); // Toast error message
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
      toast.error('Error loading cart'); // Toast error message
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
      toast.success('Item removed from cart'); // Toast success message
    } catch (err) {
      toast.error('Error removing item from cart'); // Toast error message
      console.error('Error removing item from cart:', err);
    }
  };

  const updateQuantity = async (ingredientId, delta) => {
    const updatedItems = cartItems.map((item) => {
      if (item.ingredient._id === ingredientId) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });

    setCartItems(updatedItems);
    calculateTotal(updatedItems);

    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5000/api/cart/update/${ingredientId}`, {
        quantity: updatedItems.find(item => item.ingredient._id === ingredientId).quantity,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Quantity updated'); // Toast success message
    } catch (err) {
      toast.error('Error updating quantity'); // Toast error message
      console.error('Error updating quantity:', err);
    }
  };

  const handleCheckout = async () => {
    setLoadingCheckout(true); // Set checkout loading to true

    const token = localStorage.getItem('token');

    const items = cartItems.map(item => ({
      ingredientId: item.ingredient._id,
      quantity: item.quantity,
    }));

    try {
      await axios.post(
        'http://localhost:5000/api/orders/checkout',
        { items },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success('Order placed successfully!'); // Toast success message
      setCartItems([]); // Clear cart
      setTotal(0); // Reset total
    } catch (error) {
      toast.error('Checkout failed'); // Toast error message
      console.error('Checkout failed:', error);
    } finally {
      setLoadingCheckout(false); // Reset loading state after checkout
    }
  };

  const handleClearCart = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(
        'http://localhost:5000/api/cart/clear', 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log(response.data); // Handle success
      setCartItems([]); // Clear cart items from state
      setTotal(0); // Reset total
      toast.success('Cart cleared'); // Toast success message
    } catch (error) {
      toast.error('Error clearing cart'); // Toast error message
      console.error('Error clearing cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <Box sx={{
      backgroundImage: 'url(/images/bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <Box sx={{ p: 4, minHeight: '100vh' }}>
        <Typography variant="h4" gutterBottom>
          My Ingredient Cart
        </Typography>

        {loading && <CircularProgress />}
        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="textSecondary">
              No items in your cart.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {cartItems.map((item) => {
              const ingredient = item.ingredient;
              if (!ingredient) return null;

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
                        <IconButton onClick={() => updateQuantity(ingredient._id, -1)} color="primary">
                          <Remove />
                        </IconButton>

                        <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>

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
        )}

        {cartItems.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5">Total: ₹{total}</Typography>
          </Box>
        )}

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleClearCart}
          >
            Clear Cart
          </Button>

          <Button
            sx={{ mx: 2 }}
            variant="contained"
            onClick={handleCheckout}
            disabled={cartItems.length === 0 || loadingCheckout}
            startIcon={loadingCheckout ? <CircularProgress size={24} /> : null}
          >
            {loadingCheckout ? 'Processing...' : 'Checkout'}
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ClientCart;
