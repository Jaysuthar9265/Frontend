// src/components/Footer.jsx
import React from 'react';
import { Box, Typography, TextField, Button, Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
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
        {/* Left: Contact Us Form */}
        <Grid sx={{ p: 3, m: 2}} item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
            Contact Us
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              variant="filled"
              label="Your Email"
              sx={{ mb: 2, bgcolor: 'white', borderRadius: 1 }}
              InputProps={{ disableUnderline: true }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Your Message"
              multiline
              rows={4}
              sx={{ mb: 2, bgcolor: 'white', borderRadius: 1 }}
              InputProps={{ disableUnderline: true }}
            />
            <Button fullWidth variant="contained" color="primary" sx={{ bgcolor:'rgba(255, 255, 255, 0.29)', borderRadius: '5px' }}>
              Send
            </Button>
          </Box>
        </Grid>

        {/* Right: Quick Links in 3 columns */}
        <Grid sx={{ p: 3, m: 2 }} item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
            Quick Links
          </Typography>

          <Grid container spacing={2}>
            {/* First Column */}
            <Grid item xs={4}>
              <Button onClick={() => handleNavigation('/')} variant="text" color="inherit" fullWidth>
                Home
              </Button>
              <Button onClick={() => handleNavigation('/about')} variant="text" color="inherit" fullWidth>
                About
              </Button>
            </Grid>

            {/* Second Column */}
            <Grid item xs={4}>
              <Button onClick={() => handleNavigation('/recipes')} variant="text" color="inherit" fullWidth>
                Recipes
              </Button>
              <Button onClick={() => handleNavigation('/chefs')} variant="text" color="inherit" fullWidth>
                Chefs
              </Button>
            </Grid>

            {/* Third Column */}
            <Grid item xs={4}>
              <Button onClick={() => handleNavigation('/vendors')} variant="text" color="inherit" fullWidth>
                Vendors
              </Button>
              <Button onClick={() => handleNavigation('/contact')} variant="text" color="inherit" fullWidth>
                Contact
              </Button>
            </Grid>
          </Grid>

          {/* Social Media Icons */}
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

      {/* Bottom Copyright */}
      
    </Box>
  );
};

export default Footer;
