import React, { useState } from 'react';
import {
  TextField, Button, MenuItem, Typography, Box,
  Paper, IconButton, CircularProgress, InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const roles = ['client', 'chef', 'vendor'];

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCpassword, setShowCpassword] = useState(false);

  const validate = (data = form) => {
    const { name, email, phone, password, confirmPassword, role } = data;

    if (!name || !email || !phone || !password || !confirmPassword || !role) {
      return 'Please Fill All Fields.';
    }

    if (password !== confirmPassword) {
      return 'Passwords Do Not Match.';
    }

    if (password.length < 8) {
      return 'Password Must Be At Least 8 Characters Long.';
    }

    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      return 'Password Must Include Letters And Numbers.';
    }

    if (phone.length < 10 || !/^[0-9]+$/.test(phone)) {
      return 'Please Enter Valid Phone Number.';
    }

    return '';
  };

  const handleChange = (e) => {
    const updatedForm = { ...form, [e.target.name]: e.target.value };
    setForm(updatedForm);

    const error = validate(updatedForm);
    if (!error) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setErrorMessage(error);
      return;
    }

    const { name, email, phone, password, role } = form;
    const submitData = { name, email, phone, password, role };

    setLoading(true);
    try {
      const res = await API.post('/auth/register', submitData);
      toast.success(res.data.message || 'Registration successful!');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
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
          <TextField fullWidth margin="normal" name="name" label="Name" onChange={handleChange} />
          <TextField fullWidth margin="normal" name="email" label="Email" onChange={handleChange} />
          <TextField fullWidth margin="normal" name="phone" label="Phone" onChange={handleChange} />
          <TextField
            fullWidth
            margin="normal"
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            name="confirmPassword"
            label="Confirm Password"
            type={showCpassword ? 'text' : 'password'}
            onChange={handleChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowCpassword(!showCpassword)}
                    edge="end"
                  >
                    {showCpassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            select
            margin="normal"
            name="role"
            label="Role"
            value={form.role}
            onChange={handleChange}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ position: 'relative' }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                marginTop: 2,
                transition: 'transform 0.2s ease-in-out',
                transform: isHovered && validate() ? 'translateY(200px)' : 'none',
              }}
              onMouseEnter={() => {
                const error = validate();
                if (error) {
                  setIsHovered(true);
                  setErrorMessage(error);
                }
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                setErrorMessage('');
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>

            {errorMessage && (
              <Typography
                sx={{
                  position: 'absolute',
                  color: 'red',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginTop: '-60px',
                }}
              >
                {errorMessage}
              </Typography>
            )}
          </Box>

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

        {/* Toast Container */}
      </Paper>
        <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default Signup;
