import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, Box, Paper, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const roles = ['client', 'chef', 'vendor'];

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // New loading state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const { password, confirmPassword } = form;
  
    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }
    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      return 'Password must be at least 8 characters long and include both letters and numbers.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      alert(error);
      return;
    }
    const { name, email, phone, password, role } = form;
    const submitData = { name, email, phone, password, role };
  
    setLoading(true); // Set loading to true when submission starts
    try {
      const res = await API.post('/auth/register', submitData);
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
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
      <Paper elevation={6} sx={{ padding: 4, width: 400, backdropFilter: 'blur(5px)' }}>
        <Box sx={{ margin: -3, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => navigate('/')}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="h5" align="center" gutterBottom>
          New To Autochef
        </Typography>
        <Typography align="center" gutterBottom>
          Start By Providing :
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="name"
            label="Name"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="email"
            label="Email"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="phone"
            label="Phone"
            value={form.phone}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="password"
            label="Password"
            type="password"
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            fullWidth
            margin="normal"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <TextField
            fullWidth
            select
            margin="normal"
            name="role"
            label="Role"
            value={form.role}
            onChange={handleChange}
            error={!!errors.role}
            helperText={errors.role}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>

          <Button fullWidth variant="contained" type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
          <Button
            sx={{ marginTop: 2 }}
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/login')}
          >
            Already have an account? Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Signup;
