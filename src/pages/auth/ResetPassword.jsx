import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../services/api';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert('Invalid reset link');
      navigate('/'); // Redirect to home or login page
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    if (e.target.name === 'newPassword') setNewPassword(e.target.value);
    if (e.target.name === 'confirmPassword') setConfirmPassword(e.target.value);
    setError('');
  };

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await API.post(`/auth/reset-password/${token}`, { newPassword });
      setSuccessMessage(response.data.message);
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
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
          Reset Password
        </Typography>

        {successMessage && <Typography color="success">{successMessage}</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        <TextField
          fullWidth
          margin="normal"
          name="newPassword"
          label="New Password"
          type="password"
          value={newPassword}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={handleChange}
        />

        <Button fullWidth variant="contained" sx={{ marginTop: 2 }} onClick={handleSubmit}>
          Reset Password
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
    </Box>
  );
};

export default ResetPassword;
