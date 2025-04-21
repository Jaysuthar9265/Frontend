import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post('/auth/login', form);
      const userData = {
        name: res.data.user.name,
        role: res.data.user.role,
        token: res.data.token,
      };
      login(userData);
      alert('Login Successful ✅');
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('name', res.data.user.name);
      
      const role = res.data.user.role;

      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'client') navigate('/client/dashboard');
      else if (role === 'chef') navigate('/chef/dashboard');
      else if (role === 'vendor') navigate('/vendor/dashboard');
      else navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("/images/bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper elevation={6} sx={{ padding: 4, width: 400, backdropFilter: 'blur(5px)' }}>
        <Typography variant="h5" align="center" gutterBottom>Login</Typography>
        <TextField fullWidth margin="normal" name="email" label="Email" onChange={handleChange} />
        <TextField fullWidth margin="normal" name="password" label="Password" type="password" onChange={handleChange} />
        <Button sx={{ marginTop: 2}} fullWidth variant="contained" onClick={handleSubmit}>Login</Button>
        <Button sx={{ marginTop: 2}} fullWidth variant="outlined" color="secondary" onClick={() => navigate('/signup')}>Don't have an account? Regiter</Button>

      </Paper>
    </Box>
  );
};

export default Login;
