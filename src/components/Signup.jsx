import React, { useState } from 'react';
import {TextField, Button, MenuItem, Typography, Box, Paper} from '@mui/material';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const roles = ['admin', 'client', 'chef', 'vendor'];

const Signup = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', email: '', password: '', role: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post('/auth/register', form);

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    
      <Box sx={{
        minHeight: '100vh',
        backgroundImage: 'url("/images/bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Paper elevation={6} sx={{ padding: 4, width: 400, backdropFilter: 'blur(5px)' }}>
        <Box sx={{margin:-3, display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={() => navigate('/')}>
          <CloseIcon />
        </IconButton>
        </Box>
        <Typography variant="h5" align="center" gutterBottom>Signup</Typography>
        <TextField fullWidth margin="normal" name="name" label="Name" onChange={handleChange} />
        <TextField fullWidth margin="normal" name="email" label="Email" onChange={handleChange} />
        <TextField fullWidth margin="normal" name="password" label="Password" type="password" onChange={handleChange} />
        <TextField
          fullWidth
          select
          margin="normal"
          name="role"
          label="Role"
          value={form.role ?? ''}
          onChange={handleChange}
        >
          {roles.map(role => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
          </TextField>

        <Button fullWidth variant="contained" onClick={handleSubmit}>Sign Up</Button>
        <Button sx={{ marginTop: 2}} fullWidth variant="outlined" color="secondary" onClick={() => navigate('/login')}>Already have an account? Login</Button>
        
        </Paper>
      </Box>
    
  );
};

export default Signup;
