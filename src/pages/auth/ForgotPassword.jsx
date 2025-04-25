import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  CircularProgress,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (email) setErrorMessage('');
  };

  const handleSubmit = async () => {
    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      const response = await API.post('/auth/forgot-password', { email });
      toast.success(response.data.message);
      setEmail('');
      console.log("Password reset link: ", response.data.resetLink); 
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
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
          Forgot Password?
        </Typography>
        <Typography align="center" gutterBottom>
          Enter your email to receive a reset link
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          value={email}
          onChange={handleChange}
        />

        <Box sx={{ position: 'relative' }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              marginTop: 2,
              transition: 'transform 0.2s ease-in-out',
              transform: isHovered && !email ? 'translateY(200px)' : 'none',
            }}
            onClick={handleSubmit}
            onMouseEnter={() => {
              if (!email) {
                setIsHovered(true);
                setErrorMessage('Please enter your email address.');
              }
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setErrorMessage('');
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Send Reset Link'}
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
          Back to Login
        </Button>
      </Paper>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </Box>
  );
};

export default ForgotPassword;
