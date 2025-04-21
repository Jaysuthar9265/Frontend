import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>About AutoChef</Typography>
        <Typography variant="body1" mt={2}>
          AutoChef is your smart cooking assistant! It helps you plan meals, explore recipes, manage ingredients, and even connect with smart kitchen devices. Whether you're a home cook or a professional chef, AutoChef makes cooking easier, faster, and more fun.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
