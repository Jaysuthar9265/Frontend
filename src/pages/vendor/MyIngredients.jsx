import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Grid, Button, CardMedia, CardActions } from '@mui/material';

const MyIngredients = () => {
    const [ingredients, setIngredients] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchIngredients = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get('http://localhost:5000/api/ingredients/vendor', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIngredients(response.data || []);  // Ensure it's an array
        } catch (err) {
          setError('No Ingredients Added');
          console.error('Error fetching ingredients:', err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchIngredients();
    }, []);
  
    if (loading) {
      return <Typography sx={{ p:10 }} variant="h3">Loading ingredients...</Typography>;
    }
  
    const handleDelete = async (ingredientId) => {
      try {
        await axios.delete(`http://localhost:5000/api/ingredients/${ingredientId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setIngredients(ingredients.filter((ingredient) => ingredient._id !== ingredientId));
        alert('Ingredient deleted successfully');
      } catch (err) {
        console.error('Error deleting ingredient:', err);
        alert('Failed to delete ingredient');
      }
    };

    return (
        <Box sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            My Ingredients
          </Typography>

          {loading ? (
            <Typography variant="h6">Loading...</Typography>
          ) : error ? (
            <Typography variant="h6" color="error">{error}</Typography>
          ) : ingredients.length === 0 ? (
            <Typography variant="h6">You haven't added any ingredients yet.</Typography>
          ) : (
            <Grid container spacing={3}>
              {ingredients?.map((ingredient) => (
                <Grid item xs={12} sm={6} md={4} key={ingredient._id}>
                  <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', width:200 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={ingredient.imageUrl || 'fallback-image.jpg'}
                      alt={ingredient.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{wordWrap: 'break-word'}}>{ingredient.title}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {ingredient.description}
                      </Typography>
                      <Typography variant="body2">
                        Quantity: {ingredient.quantity} {ingredient.units}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button 
                        variant="contained" 
                        color="error" 
                        onClick={() => handleDelete(ingredient._id)} 
                        sx={{ margin: '0 auto', width: '100%' }}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
    );
};

export default MyIngredients;
