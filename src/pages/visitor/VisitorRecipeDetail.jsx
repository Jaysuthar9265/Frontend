import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Container
} from '@mui/material';
import axios from 'axios';

const VisitorRecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <CircularProgress sx={{ m: 5 }} />;
  if (!recipe) return <Typography variant="h6">Recipe not found.</Typography>;

  return (
    <Container sx={{ mt: 4, mb: 5 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src={recipe.image}
            alt={recipe.title}
            style={{ width: '100%', borderRadius: 8 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">{recipe.title}</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {recipe.description}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Cooking Time: {recipe.time}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Ingredients</Typography>
          <ul>
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Instructions</Typography>
          <Typography variant="body2">{recipe.instructions}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VisitorRecipeDetail;
