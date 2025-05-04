import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';

const TopRatedRecipes = () => {
  const [topRecipes, setTopRecipes] = useState([]);

  useEffect(() => {
    axios.get('/api/recipes/top-rated')
      .then(res => {
        console.log(res.data);
        setTopRecipes(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Top Recipes
      </Typography>
      <Grid container spacing={3}>
        {topRecipes.length > 0 ? (
          topRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={`/uploads/${recipe.image}`} // Ensure correct path
                  alt={recipe.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {recipe.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No top-rated recipes available.</Typography>
        )}
      </Grid>
    </div>
  );
};

export default TopRatedRecipes;
