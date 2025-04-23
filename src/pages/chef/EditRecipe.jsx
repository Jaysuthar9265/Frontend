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
          ingredients: recipeData.ingredients?.join(', ') || '',
          time: recipeData.time || '',
          instructions: recipeData.instructions || '',
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
      await axios.put(`http://localhost:5000/api/recipes/${id}`, formData, {
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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Edit Recipe</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Title" name="title" fullWidth margin="normal" value={formData.title || ''} onChange={handleChange} />
          <TextField label="Description" name="description" fullWidth margin="normal" value={formData.description || ''} onChange={handleChange} />
          <TextField label="Ingredients (comma-separated)" name="ingredients" fullWidth margin="normal" value={formData.ingredients || ''} onChange={handleChange} />
          <TextField label="Recipe Time" name="time" fullWidth margin="normal" value={formData.time || ''} onChange={handleChange}/>
          <TextField label="Instructions" name="instructions" fullWidth margin="normal" value={formData.instructions || ''} onChange={handleChange} multiline rows={4} />
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
  );
};

export default EditRecipe;
