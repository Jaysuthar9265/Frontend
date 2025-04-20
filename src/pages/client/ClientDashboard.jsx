import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Container
} from '@mui/material';
import FeaturedCarousel from '../../components/FeaturedCarousel';

const ClientDashboard = () => {
  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      {/* Welcome Header */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome back, Foodie! 🍽️
      </Typography>

      {/* Featured Recipes Carousel */}
      <Box sx={{ mb: 5 }}>
        <FeaturedCarousel />
      </Box>

      {/* Quick Access Cards */}
      <Typography variant="h5" fontWeight="bold" mt={5} mb={2}>
        Quick Access
      </Typography>
      <Grid container spacing={3}>
        {['My Recipes', 'Favorite Dishes', 'Meal Planner'].map((title, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                height: 140,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #ffe0b2, #ffcc80)',
                boxShadow: 3,
                borderRadius: 3,
              }}
            >
              <Typography variant="h6" fontWeight="medium">
                {title}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Popular Recipes */}
      <Typography variant="h5" fontWeight="bold" mt={6} mb={2}>
        Popular Recipes
      </Typography>
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item}>
            <Card sx={{ boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="160"
                image={`https://source.unsplash.com/featured/?recipe,${item}`}
                alt={`Recipe ${item}`}
              />
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  Recipe {item}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  size="small"
                  sx={{ mt: 1, backgroundColor: '#ff7043', '&:hover': { backgroundColor: '#f4511e' } }}
                >
                  View
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Categories Grid */}
      <Typography variant="h5" fontWeight="bold" mt={6} mb={2}>
        Browse by Categories
      </Typography>
      <Grid container spacing={2}>
        {['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts', 'Beverages'].map((cat, idx) => (
          <Grid item xs={6} sm={4} md={2} key={idx}>
            <Card
              sx={{
                py: 3,
                textAlign: 'center',
                backgroundColor: '#fbe9e7',
                boxShadow: 2,
                borderRadius: 2,
              }}
            >
              <Typography fontWeight="medium">{cat}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ClientDashboard;
