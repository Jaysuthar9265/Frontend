import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Box, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { UserContext } from '../context/UserContext';
import { CircularProgress } from '@mui/material';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (form.email && form.password) {
      setErrorMessage(''); // Clear error when input is filled
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setErrorMessage('Please fill the details first');
      return;
    }

    setLoading(true);
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
      localStorage.setItem('user', JSON.stringify(userData));


      const role = res.data.user.role;
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'client') navigate('/client/dashboard');
      else if (role === 'chef') navigate('/chef/dashboard');
      else if (role === 'vendor') navigate('/vendor/dashboard');
      else navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    } finally {
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
      <Paper elevation={6} sx={{ padding: 4, width: 400, backdropFilter: 'blur(5px)', position: 'relative' }}>
        <Box sx={{ margin: -3, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => navigate('/')}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography variant="h5" align="center" gutterBottom>Autochef Login</Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="email"
            label="Email"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="password"
            label="Password"
            type="password"
            onChange={handleChange}
            required
          />

          <Box sx={{ position: 'relative' }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                marginTop: 2,
                transition: 'transform 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
                transform: isHovered && (!form.email || !form.password) ? 'translateY(200px)' : 'none', // Move the button outside
                position: 'relative',
                zIndex: 1,
                marginBottom: '10px',
              }}
              onMouseEnter={() => {
                if (!form.email || !form.password) {
                  setIsHovered(true);
                  setErrorMessage('Please Fill The Details First');
                }
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                setErrorMessage('');
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>

            {/* Error Message Box */}
            {errorMessage && (
              <Typography
                sx={{
                  position: 'absolute',
                  
                  color: 'red',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginTop: '-50px',
                  zIndex: 0,
                }}
              >
                {errorMessage}
              </Typography>
            )}
          </Box>
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
