import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Contact form error:', err);
      toast.error('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'rgba(16, 37, 58, 0.81)',
        color: 'white',
        textAlign: 'center',
        py: 2,
        px: 2,
        mt: 2,
      }}
    >

      <Grid container spacing={'10%'} justifyContent="center">
        {/* Contact Us Form */}
        <Grid sx={{ p: 3, m: 2 }} item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
            Contact Us
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
              fullWidth
              variant="filled"
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={{ mb: 2, bgcolor: 'white', borderRadius: 1 }}
              InputProps={{ disableUnderline: true }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2, bgcolor: 'white', borderRadius: 1 }}
              InputProps={{ disableUnderline: true }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={4}
              sx={{ mb: 2, bgcolor: 'white', borderRadius: 1 }}
              InputProps={{ disableUnderline: true }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.29)', borderRadius: '5px' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Send'}
            </Button>
          </Box>
        </Grid>

        {/* Quick Links and Social Icons */}
        <Grid sx={{ p: 3, m: 2 }} item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
            Quick Links
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Button onClick={() => handleNavigation('/')} variant="text" color="inherit" fullWidth>
                Home
              </Button>
              <Button onClick={() => handleNavigation('/about')} variant="text" color="inherit" fullWidth>
                About
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button onClick={() => handleNavigation('/recipes')} variant="text" color="inherit" fullWidth>
                Recipes
              </Button>
              <Button onClick={() => handleNavigation('/chefs')} variant="text" color="inherit" fullWidth>
                Chefs
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button onClick={() => handleNavigation('/vendors')} variant="text" color="inherit" fullWidth>
                Vendors
              </Button>
              <Button onClick={() => handleNavigation('/contact')} variant="text" color="inherit" fullWidth>
                Contact
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ mt: 5 }}>
            <IconButton color="inherit" href="https://youtube.com" target="_blank">
              <YouTubeIcon fontSize="large" />
            </IconButton>
            <IconButton color="inherit" href="https://pinterest.com" target="_blank">
              <PinterestIcon fontSize="large" />
            </IconButton>
            <IconButton color="inherit" href="https://instagram.com" target="_blank">
              <InstagramIcon fontSize="large" />
            </IconButton>
            <IconButton color="inherit" href="https://facebook.com" target="_blank">
              <FacebookIcon fontSize="large" />
            </IconButton>
          </Box>

          <Typography variant="body2" sx={{ mt: 5 }}>
            &copy; {new Date().getFullYear()} AutoChef. All rights reserved.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
