import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, CircularProgress, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

const EditIngredient = () => {
  const { ingredientId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [units, setUnits] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/ingredients/${ingredientId}`);
        const data = response.data;
        setTitle(data.title);
        setDescription(data.description);
        setQuantity(data.quantity);
        setUnits(data.units);
        setPrice(data.price);
      } catch (err) {
        setError('Error fetching ingredient');
        console.error('Error fetching ingredient:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredient();
  }, [ingredientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true);

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('quantity', quantity);
    formData.append('units', units);
    formData.append('price', price);
    if (image) {
      formData.append('image', image); // Append image if present
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/ingredients/${ingredientId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.message === 'Ingredient updated successfully') {
        toast.success('Ingredient updated successfully!');
        navigate('/vendor/my-ingredients'); // Navigate to My Ingredients page after update
      }
    } catch (err) {
      console.error('Error updating ingredient:', err);
      toast.error('Error updating ingredient');
    } finally {
      setLoadingUpdate(false); // Set loading state to false after update
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>Edit Ingredient</Typography>

      {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}

      <TextField
        label="Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        label="Quantity"
        type="number"
        fullWidth
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        margin="normal"
        required
      />
      <FormControl fullWidth margin="normal" required>
          <InputLabel>Units</InputLabel>
          <Select
            value={units}
            onChange={(e) => setUnits(e.target.value)}
          >
            <MenuItem value="kg">kg</MenuItem>
            <MenuItem value="g">g</MenuItem>
            <MenuItem value="liter">Liter</MenuItem>
            <MenuItem value="ml">ml</MenuItem>
          </Select>
            </FormControl>
      <TextField
        label="Price"
        type="number"
        fullWidth
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        margin="normal"
        required
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        {loadingUpdate ? <CircularProgress size={24} color="inherit" /> : 'Update Ingredient'}
      </Button>

    </Box>
  );
};

export default EditIngredient;
