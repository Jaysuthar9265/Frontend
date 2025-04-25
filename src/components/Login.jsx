import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Box, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { UserContext } from '../context/UserContext';
import { CircularProgress } from '@mui/material';




const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      const userData = {
        name: res.data.user.name,
        role: res.data.user.role,
        
      };
      setLoading(true);
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
    finally {
      setLoading(false); // Set loading to false after the request finishes
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
        <Box sx={{ margin: -3, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => navigate('/')}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography variant="h5" align="center" gutterBottom>Autochef Login</Typography>

        <form onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" name="email" label="Email" onChange={handleChange} required />
          <TextField fullWidth margin="normal" name="password" label="Password" type="password" onChange={handleChange} required />
          <Button type="submit" sx={{ marginTop: 2 }} fullWidth variant="contained"  disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Login"} </Button>
        </form>

        <Button fullWidth onClick={() => navigate('/forgot-password')} sx={{ mt: 1 }}>
          Forgot Password?
        </Button>

        <Button sx={{ marginTop: 2 }} fullWidth variant="outlined" color="secondary" onClick={() => navigate('/signup')}>
          Don't have an account? Register
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
