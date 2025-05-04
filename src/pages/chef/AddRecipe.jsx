import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css';

const categories = [
  'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snacks', 'Appetizers', 'Drinks',
  'Vegan', 'Gluten-Free', 'Healthy', 'Salads', 'Quick & Easy', 'Kid-Friendly', 'Holiday',
  'BBQ & Grilling', 'Indian', 'Chinese', 'Italian', 'Mexican', 'French',
  'Japanese', 'Mediterranean',
];

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [time, setTime] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('ingredients', ingredients.split('\n'));
    formData.append('time', time);
    formData.append('instructions', instructions.split('\n'));
    formData.append('category', category);
    if (image) formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/api/recipes', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 201) {
        toast.success('🎉 Recipe added successfully!');
        setTitle('');
        setDescription('');
        setIngredients('');
        setTime('');
        setInstructions('');
        setCategory('');
        setImage(null);
      }
    } catch (err) {
      console.error('Error adding recipe:', err);
      toast.error('❌ Failed to add recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundImage: 'url("/images/bg.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Box minHeight="100vh" p={4} maxWidth={600} margin="auto">
        <Paper elevation={3} sx={{ bgcolor: 'rgba(255, 255, 255, 0.62)', p: 4 }}>
          <Typography variant="h5" gutterBottom>Add New Recipe</Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Title" fullWidth required margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextField label="Description" fullWidth required multiline rows={2} margin="normal" value={description} onChange={(e) => setDescription(e.target.value)} />
            <TextField label="Ingredients (Separated By New Line)" fullWidth required margin="normal" multiline rows={4} value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
            <TextField label="Recipe Time" fullWidth required margin="normal" value={time} onChange={(e) => setTime(e.target.value)} />
            <TextField label="Instructions" fullWidth required multiline rows={4} margin="normal" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
            <TextField label="Category" select fullWidth required margin="normal" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </TextField>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" required />
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Recipe'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default AddRecipe;
