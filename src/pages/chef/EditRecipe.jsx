// src/pages/chef/EditRecipe.jsx
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
  CircularProgress,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify'; // Import the toast method
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toasts

const categories = [
  'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snacks', 'Appetizers', 'Drinks',
  'Vegan', 'Gluten-Free', 'Healthy', 'Quick & Easy', 'Kid-Friendly', 'Holiday',
  'BBQ & Grilling', 'Indian', 'Chinese', 'Italian', 'Mexican', 'French',
  'Japanese', 'Mediterranean',
];

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', description: '', ingredients: '', time: '', instructions: '', category: '', image: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        const recipeData = res.data;
        if (!categories.includes(recipeData.category)) recipeData.category = '';
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
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const updatedData = {
        ...formData,
        ingredients: formData.ingredients.split('\n').map(item => item.trim()).filter(item => item),
        instructions: formData.instructions.split('\n').map(item => item.trim()).filter(item => item),
      };

      const formDataWithImage = new FormData();
      formDataWithImage.append("title", updatedData.title);
      formDataWithImage.append("description", updatedData.description);
      formDataWithImage.append("ingredients", updatedData.ingredients.join(','));
      formDataWithImage.append("time", updatedData.time);
      formDataWithImage.append("instructions", updatedData.instructions.join(','));
      formDataWithImage.append("category", updatedData.category);
      if (formData.imageFile) {
        formDataWithImage.append("image", formData.imageFile);
      }

      await axios.put(`http://localhost:5000/api/recipes/${id}`, formDataWithImage, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Recipe updated successfully!'); // Display success toast
      navigate('/chef/my-recipes');
    } catch (error) {
      console.error('Failed to update recipe:', error);
      toast.error('Failed to update recipe. Please try again.'); // Display error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight:'100vh', backgroundImage: 'url("/images/bg.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', mt: -4.03 }}>
      <Container maxWidth="md" sx={{ mt: 4, pt:2 }}>
        <Paper elevation={3} sx={{ bgcolor:'rgba(255, 255, 255, 0.62)', p: 4 }}>
          <Typography variant="h5" gutterBottom>Edit Recipe</Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Title" name="title" fullWidth margin="normal" value={formData.title} onChange={handleChange} />
            <TextField multiline rows={4} label="Description" name="description" fullWidth margin="normal" value={formData.description} onChange={handleChange} />
            <TextField label="Ingredients (one per line)" name="ingredients" fullWidth margin="normal" multiline rows={4} value={formData.ingredients} onChange={handleChange} />
            <TextField label="Recipe Time" name="time" fullWidth margin="normal" value={formData.time} onChange={handleChange}/>
            <TextField label="Instructions" name="instructions" fullWidth margin="normal" multiline rows={4} value={formData.instructions} onChange={handleChange} />
            <TextField select label="Category" name="category" fullWidth margin="normal" value={formData.category} onChange={handleChange}>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </TextField>
            <TextField type="file" name="imageFile" fullWidth margin="normal" onChange={(e) => setFormData({ ...formData, imageFile: e.target.files[0] })} />

            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Recipe'}
              </Button>
            </Box>
          </form>
        </Paper>
        <ToastContainer />
      </Container>
    </Box>
  );
};

export default EditRecipe;
