import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import VisitorNavbar from '../../components/navbars/VisitorNavbar';

const VisitorRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/recipes');
        setRecipes(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch recipes:', err);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Explore Recipes
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            {recipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe._id}>
                <Card sx={{ position: 'relative',height: 350 ,width: 250 }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={recipe.image}
                    alt={recipe.title}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {recipe.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Category: {recipe.category}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" disabled>
                      View (Login to see more)
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default VisitorRecipes;
