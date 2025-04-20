import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const dummyRecipes = [
  {
    id: 1,
    title: 'Grilled Chicken Salad',
    image: 'https://source.unsplash.com/featured/?chicken,salad',
    mealType: 'Lunch',
    diet: 'Keto',
  },
  {
    id: 2,
    title: 'Vegan Smoothie Bowl',
    image: 'https://source.unsplash.com/featured/?smoothie,bowl',
    mealType: 'Breakfast',
    diet: 'Vegan',
  },
  // Add more dummy data as needed
];

const RecipesPage = () => {
  const [search, setSearch] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(dummyRecipes);
  const [diet, setDiet] = useState('');
  const [mealType, setMealType] = useState('');

  useEffect(() => {
    let results = dummyRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(search.toLowerCase())
    );
    if (diet) {
      results = results.filter((recipe) => recipe.diet === diet);
    }
    if (mealType) {
      results = results.filter((recipe) => recipe.mealType === mealType);
    }
    setFilteredRecipes(results);
  }, [search, diet, mealType]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Explore Recipes
      </Typography>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search Recipes"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <Select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">All Meal Types</MenuItem>
              <MenuItem value="Breakfast">Breakfast</MenuItem>
              <MenuItem value="Lunch">Lunch</MenuItem>
              <MenuItem value="Dinner">Dinner</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <Select
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">All Diets</MenuItem>
              <MenuItem value="Vegan">Vegan</MenuItem>
              <MenuItem value="Keto">Keto</MenuItem>
              <MenuItem value="Vegetarian">Vegetarian</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {filteredRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="180"
                  image={recipe.image}
                  alt={recipe.title}
                />
                <CardContent>
                  <Typography variant="h6">{recipe.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {recipe.mealType} • {recipe.diet}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default RecipesPage;
