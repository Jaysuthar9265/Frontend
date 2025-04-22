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
        Ingredients by Vendors
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={2}>
        {ingredients.map((item) => (
          <Grid item xs={12} md={4} key={item._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography>
                  {item.quantity} {item.unit}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Vendor ID: {item.vendorId}
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
