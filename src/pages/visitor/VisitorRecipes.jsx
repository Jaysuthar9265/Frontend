import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  TextField,
  Box,
  AppBar,
  Toolbar,
  Tab,
  Tabs,
} from '@mui/material';
import axios from 'axios';
import Footer from '../../components/footer/Footer';
import { Link } from 'react-router-dom';

const VisitorRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  const categories = [...new Set(recipes.map((recipe) => recipe.category))];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = selectedCategory ? recipe.category === selectedCategory : true;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url(/images/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        pt: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Container sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Explore Recipes
        </Typography>

        {/* Search Bar */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3, borderRadius:'20px' }}>
          <TextField
            label="Search Recipes"
            variant="outlined"
            sx={{ flex: 1, minWidth: 250 }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>

        {/* Navbar for Categories */}
        <AppBar position="static" sx={{ boxShadow: 0, backgroundColor: 'white', color:'black', mb:'20px', borderRadius:'10px'}}>
          <Toolbar sx={{ justifyContent: 'center' }}>
            <Tabs sx={{ fontWeight:600 }}
              value={selectedCategory}
              onChange={(e, newValue) => handleCategorySelect(newValue)}
              textColor="inherit"
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              
            >
              <Tab sx={{ fontWeight:600 }} label="All Categories" value="" />
              {categories.map((cat, idx) => (
                <Tab sx={{ fontWeight:600 }} key={idx} label={cat} value={cat} />
              ))}
            </Tabs>
          </Toolbar>
        </AppBar>

        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            {filteredRecipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe._id}>
                <Link to={`/recipes/${recipe._id}`} style={{ textDecoration: 'none' }}>
                  <Card sx={{ position: 'relative', height: 350, width: 269.6 }}>
                    <CardMedia component="img" height="200" image={recipe.image} alt={recipe.title} />
                    <CardContent>
                      <Typography sx={{ wordWrap: 'break-word', whiteSpace: 'normal' }} variant="h6">
                        {recipe.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Category: {recipe.category}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {recipe.instructions.slice(0, 50)}...
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default VisitorRecipes;
