import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';

const ClientIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  useEffect(() => {
    fetchAllIngredients();
  }, []);

  return (
      <Box sx={{ p: 4 }}>
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
                  height:'100%',
                  width:200,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                }}
              >
  
                    {item.imageUrl && (
                    <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{
                        width: 200,
                        height:200,
                        objectFit:'cover'
                      }}
                    />
                    </Box>
                  )}
  
                <CardContent sx={{ textAlign:'center' }}>
  
                  {/* Displaying the Title */}
                  <Typography variant="h6" sx={{ wordWrap:'break-word', fontWeight: 'bold' }}>
                    {item.title}
                  </Typography>
  
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

export default ClientIngredients;
