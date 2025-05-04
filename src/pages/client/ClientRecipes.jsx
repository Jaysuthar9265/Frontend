import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  CircularProgress,
  AppBar,
  Toolbar,
  Tab,
  Tabs,
  TextField,
  Box,
} from "@mui/material";
import Footer from "../../components/footer/Footer";
import { Link, useLocation } from 'react-router-dom'; // <-- Added useLocation

const ClientRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation(); // <-- To read query params

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromQuery = queryParams.get('category');
    if (categoryFromQuery) {
      setSelectedCategory(categoryFromQuery);
    }
  }, [location.search]); // Runs when URL changes

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/recipes")
      .then((res) => {
        setRecipes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recipes:", err);
        setLoading(false);
      });
  }, []);

  const categories = [...new Set(recipes.map((recipe) => recipe.category))];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = selectedCategory ? recipe.category === selectedCategory : true;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) return <CircularProgress sx={{ m: 5 }} />;

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Box sx={{ backgroundImage: 'url(/images/bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center', pt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <Container sx={{  mt: 4, mb: 5 }}>
      
      <Typography variant="h4" gutterBottom>All Recipes</Typography>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        <TextField
          label="Search Recipes"
          variant="outlined"
          sx={{ flex: 1, minWidth: 250 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      <AppBar position="static" sx={{ boxShadow: 0, backgroundColor: 'white', color:'black', mb:'20px', borderRadius:'10px'}}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Tabs
            value={selectedCategory}
            onChange={(e, newValue) => handleCategorySelect(newValue)}
            textColor="inherit"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="All Categories" value="" />
            {categories.map((cat, idx) => (
              <Tab key={idx} label={cat} value={cat} />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3}>
        {filteredRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe._id}>
            <Link to={`/client/recipes/${recipe._id}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ position: 'relative', height: 350, width: 269.6 }}>
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
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
    <Footer />
  </Box>
  );
};

export default ClientRecipes;
