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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
} from '@mui/material';
import axios from 'axios';
import Footer from '../../components/footer/Footer';

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

  return (
    <Box sx={{backgroundImage: 'url(/images/bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',  pt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Container sx={{ mt: 4, mb:5 }}>
        <Typography variant="h4" gutterBottom>
          Explore Recipes
        </Typography>

        {/* Filter Row */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="category-select-label">Filter by Category</InputLabel>
            <Select
              labelId="category-select-label"
              value={selectedCategory}
              label="Filter by Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((cat, idx) => (
                <MenuItem key={idx} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Search Bar */}
          <TextField
            label="Search Recipes"
            variant="outlined"
            sx={{ flex: 1, minWidth: 250 }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>

        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
                  {filteredRecipes.map((recipe) => (
                    <Grid item xs={12} sm={6} md={4} key={recipe._id}>
                      <Card sx={{ position: 'relative', height: 350, width: 250 }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={recipe.image}
                          alt={recipe.title}
                        />
                        <CardContent>
                          <Typography
                            sx={{ wordWrap: 'break-word', whiteSpace: 'normal' }}
                            variant="h6"
                          >
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
