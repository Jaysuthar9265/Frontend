import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddAdmin = () => {
  const [admin, setAdmin] = useState({ name: '', email: '', password: '', role: 'admin' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', admin);
      toast.success('Admin user created successfully!');
      setTimeout(() => {
        navigate('/admin/users');
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error creating admin');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("/images/bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        mt: -6,
        pt: 5
      }}
    >
      <Container sx={{ bgcolor: 'rgba(255, 255, 255, 0.62)', borderRadius: '10px', p: 5 }}>
        <Typography variant="h5" gutterBottom>
          Add New Admin
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            required
            value={admin.name}
            onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            required
            value={admin.email}
            onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={admin.password}
            onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Admin
          </Button>
        </form>
      </Container>

    </Box>
  );
};

export default AddAdmin;