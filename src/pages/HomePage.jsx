import React from 'react';
import { Container, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to AutoChef 🍽️
      </Typography>
      <Typography>
        This is the Home Page.
      </Typography>
    </Container>
  );
};

export default HomePage;
