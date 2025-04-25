import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles for the toast notifications



const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleSubmit = async () => {
    if (!email) {
      setError('Please enter your email address');
      
      return;
    }
    setLoading(true);
    try {
      const response = await API.post('/auth/forgot-password', { email });
      
      setEmail('');
      console.log("Password reset link: ", response.data.resetLink);
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
    finally {
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
        <Typography variant="h5" align="center" gutterBottom>
          Forgot Password
        </Typography>
        
        {successMessage && <Typography color="success">{successMessage}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        
        <TextField
          fullWidth
          margin="normal"
          label="Enter your email"
          value={email}
          onChange={handleChange}
        />

        <Button fullWidth variant="contained" sx={{ marginTop: 2 }} onClick={handleSubmit}  disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Send Reset Link"}
        </Button>

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
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Box>
  );
};

export default ForgotPassword;
