import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Box,
} from '@mui/material';

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

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    time: '',
    instructions: '',
    category: '',
    image: '',
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        const recipeData = res.data;
        if (!categories.includes(recipeData.category)) {
          recipeData.category = '';
        }
        setFormData({
          title: recipeData.title || '',
          description: recipeData.description || '',
          ingredients: Array.isArray(recipeData.ingredients)
           ? recipeData.ingredients.join('\n')
           : recipeData.ingredients || '',

          time: recipeData.time || '',
          instructions: Array.isArray(recipeData.instructions)
           ? recipeData.instructions.join('\n')
           : recipeData.instructions || '',
          category: recipeData.category || '',
          image: recipeData.image || '',
        });
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const updatedData = {
        ...formData,
        ingredients: formData.ingredients.split('\n').map((item) => item.trim()).filter((item) => item !== ''),
        instructions: formData.instructions.split('\n').map((item) => item.trim()).filter((item) => item !== ''),
        
      };
      console.log('Submitting updated instructions:', updatedData.instructions);

      await axios.put(`http://localhost:5000/api/recipes/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/chef/my-recipes');
    } catch (error) {
      console.error('Failed to update recipe:', error);
    }
  };

  return (
    <Box  sx={{ minHeight:'100vh', backgroundImage: 'url("/images/bg.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', mt:-4.03 }}>
    <Container maxWidth="md" sx={{ mt: 4, pt:2 }}>
      <Paper elevation={3} sx={{ bgcolor:'rgba(255, 255, 255, 0.62)', p: 4 }}>
        <Typography variant="h5" gutterBottom>Edit Recipe</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Title" name="title" fullWidth margin="normal" value={formData.title || ''} onChange={handleChange} />
          <TextField multiline rows={4} label="Description" name="description" fullWidth margin="normal" value={formData.description || ''} onChange={handleChange} />
          <TextField
              label="Ingredients (one per line)"
              name="ingredients"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={formData.ingredients || ''}
              onChange={handleChange}
            />
          <TextField label="Recipe Time" name="time" fullWidth margin="normal" value={formData.time || ''} onChange={handleChange}/>
          <TextField
              label="Instructions"
              name="instructions"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={formData.instructions || ''}
              onChange={handleChange}
          />
          <TextField
            select
            label="Category"
            name="category"
            fullWidth
            margin="normal"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
          <TextField label="Image URL" name="image" fullWidth margin="normal" value={formData.image || ''} onChange={handleChange} />
          <Button type="submit" variant="contained" color="primary">Update Recipe</Button>
        </form>
      </Paper>
    </Container>
    </Box>
  );
};

export default EditRecipe;
