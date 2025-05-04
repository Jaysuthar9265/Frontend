import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCpassword, setShowCpassword] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error('Invalid reset link');
      navigate('/');
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newPassword') setNewPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async () => {
    // Validate password length and characters
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    if (!/[a-zA-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      toast.error('Password must include both letters and numbers');
      return;
    }

    // Check if both passwords match
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Ensure fields are not empty
    if (!newPassword || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      toast.error('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await API.post(`/auth/reset-password/${token}`, { newPassword });
      toast.success(response.data.message); // Success toast
      setNewPassword('');
      setConfirmPassword('');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong'); // Error toast
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
          Reset Your Password
        </Typography>
        <Typography align="center" gutterBottom>
          Enter and confirm your new password
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          name="newPassword"
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          value={newPassword}
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
          value={confirmPassword}
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

        <Box sx={{ position: 'relative' }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              marginTop: 2,
              transition: 'transform 0.2s ease-in-out',
              transform: isHovered && (!newPassword || !confirmPassword) ? 'translateY(200px)' : 'none',
            }}
            onClick={handleSubmit}
            onMouseEnter={() => {
              if (!newPassword || !confirmPassword) {
                setIsHovered(true);
                setErrorMessage('Please fill in all fields.');
              }
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setErrorMessage('');
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Reset Password'}
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

    </Box>
  );
};

export default ResetPassword;
