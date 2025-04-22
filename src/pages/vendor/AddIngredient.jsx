import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, InputLabel, MenuItem, FormControl, Select, CircularProgress, Typography } from '@mui/material';

const AddIngredient = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [units, setUnits] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('quantity', quantity);
    formData.append('units', units);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/ingredients/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.message === 'Ingredient added successfully') {
        setMessage('Ingredient added successfully!');
        // Clear the form after successful submission
        setTitle('');
        setDescription('');
        setQuantity('');
        setUnits('');
        setImage(null);
      }
    } catch (err) {
      setError('Error adding ingredient');
      console.error('Error adding ingredient:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto' }}>
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
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={loading}>
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Ingredient'}
      </Button>

      {message && <Typography sx={{ mt: 2, color: 'green' }}>{message}</Typography>}
      {error && <Typography sx={{ mt: 2, color: 'red' }}>{error}</Typography>}
    </Box>
  );
};

export default AddIngredient;
