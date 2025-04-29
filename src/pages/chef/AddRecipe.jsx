// src/pages/chef/AddRecipe.jsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';

const categories = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Snacks',
  'Appetizers',
  'Drinks',
  'Vegan',
  'Gluten-Free',
  'Healthy',
  'Quick & Easy',
  'Kid-Friendly',
  'Holiday',
  'BBQ & Grilling',
  'Indian',
  'Chinese',
  'Italian',
  'Mexican',
  'French',
  'Japanese',
  'Mediterranean',
];

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [time, setTime] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [success, setSuccess] = useState(false);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/recipes',
        {
          title,
          description,
          ingredients: ingredients.split('\n'),
          time,
          instructions: instructions.split('\n'),
          category,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
        setSuccess(true);
        setTitle('');
        setDescription('');
        setIngredients('');
        setTime('');
        setInstructions('');
        setCategory('');
        setImage('');
      }
    } catch (err) {
      console.error('Error adding recipe:', err);
    }
  };

  return (
    <Box sx={{ backgroundImage: 'url("/images/bg.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <Box minHeight={'100vh'} p={4} maxWidth={600} margin="auto">
      <Paper elevation={3} sx={{ bgcolor:'rgba(255, 255, 255, 0.62)', p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Add New Recipe
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            required
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
            <TextField
            label="Description"
            fullWidth
            required
            multiline
            rows={2}
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            label="Ingredients (Seprated By New Line)"
            name="ingredients"
            fullWidth
            required
            margin="normal"
            multiline
            rows={4}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
            <TextField
            label="Recipe Time"
            fullWidth
            required
            margin="normal"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <TextField
            label="Instructions"
            name="instructions"
            fullWidth
            required
            multiline
            rows={4}
            margin="normal"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          <TextField
            label="Category"
            select
            fullWidth
            required
            margin="normal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Image URL"
            fullWidth
            margin="normal"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Add Recipe
          </Button>
        </form>
      </Paper>

      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Recipe added successfully!
        </Alert>
      </Snackbar>
    </Box>
    </Box>
  );
};

export default AddRecipe;
