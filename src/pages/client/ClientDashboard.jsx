import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FeaturedCarousel from '../../components/FeaturedCarousel';
import Footer from '../../components/footer/Footer';



const trendingRecipes = [
  { title: 'Spicy Ramen Noodles', image: 'https://cdn.loveandlemons.com/wp-content/uploads/2020/12/plant-based-recipes.jpg' },
  { title: 'Grilled Salmon Bowl', image: 'https://cdn.loveandlemons.com/wp-content/uploads/2020/12/plant-based-recipes.jpg' },
  { title: 'Beef Tacos', image: 'https://cdn.loveandlemons.com/wp-content/uploads/2020/12/plant-based-recipes.jpg' },
  { title: 'Berry Cheesecake', image: 'https://cdn.loveandlemons.com/wp-content/uploads/2020/12/plant-based-recipes.jpg' },
  { title: 'Loaded Nachos', image: 'https://cdn.loveandlemons.com/wp-content/uploads/2020/12/plant-based-recipes.jpg' },
  { title: 'Loaded Nachos', image: 'https://cdn.loveandlemons.com/wp-content/uploads/2020/12/plant-based-recipes.jpg' },
];

const featuredContent = {
  bigCard: {
    title: 'Ultimate Summer Salads',
    image: 'https://cdn.loveandlemons.com/wp-content/uploads/2020/12/plant-based-recipes.jpg',
  },
  smallCards: [
    { title: 'Quick Breakfast Ideas', image: 'https://cdn.loveandlemons.com/wp-content/uploads/2020/12/plant-based-recipes.jpg' },
    { title: 'One-Pot Meals', image: 'https://cdn.loveandlemons.com/wp-content/uploads/2020/12/plant-based-recipes.jpg' },
    { title: 'Desserts for Two', image: 'https://cdn.loveandlemons.com/wp-content/uploads/2020/12/plant-based-recipes.jpg' },
  ],
  smallCards1: [
    { title: 'Quick Breakfast Idea', image: 'https://cdn.loveandlemons.com/wp-content/uploads/2020/12/plant-based-recipes.jpg' },
    { title: 'One-Pot Meals', image: 'https://cdn.loveandlemons.com/wp-content/uploads/2020/12/plant-based-recipes.jpg' },
    { title: 'Desserts for Two', image: 'https://cdn.loveandlemons.com/wp-content/uploads/2020/12/plant-based-recipes.jpg' },
  ],
};

const ClientDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundImage: 'url(/images/bg.jpg)',minHeight: '100vh',
        backgroundSize: 'cover', m: 0, p: 0, backgroundPosition: 'center', pt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    
      {/* Inner Container */}
      <Box sx={{ width: '100%', maxWidth: '1500px', px: { xs: 2, md: 4 } }}>
        {/* Hero Banner */}
        <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '1500px',
          height: '350px',
          borderRadius: 5,
          overflow: 'hidden',
          mb: 8,
        }}
      >
        {/* Carousel Background */}
        <Box sx={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
          <FeaturedCarousel />
          {/* Dark overlay for better readability */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 1,
            }}
          />
        </Box>

        {/* Text on top of Carousel */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            px: { xs: 4, md: 10 },
            color: 'white',
            pointerEvents:'none',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            Discover Delicious Recipes
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Curated collections and personalized meals for every occasion.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#00000000',
              pointerEvents:'all',
              border: 1,
              fontSize: '1.1rem',
              px: 4,
              py: 1,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: '#ffffff22',
              },
            }}
            onClick={() => navigate('/client/recipes')}
          >
            Explore Recipes
          </Button>
        </Box>
      </Box>

        {/* Top Trending Recipes */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ textAlign:'left', fontWeight: 'bold', mb: 3 }}>
            Top Trending
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {trendingRecipes.map((recipe, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                <Card sx={{ borderRadius: 3, width:'224px', height: '100%', boxShadow: 3, 
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                 }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={recipe.image}
                    alt={recipe.title}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {recipe.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Content */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'left' }}>
        Featured Content
          </Typography>
          <Grid container spacing={4} justifyContent="center">

         {/* Left */}


         <Grid item xs={12} md={4}>
           <Card
             sx={{
               width: '100%',
               height: '550px',
               borderRadius: 4,
               boxShadow: 4,
               position: 'relative',
               transition: 'transform 0.3s ease',
               '&:hover': {
                 transform: 'scale(1.05)',
               },
             }}
           >
             <CardMedia
               component="img"
               height="550"
               image={featuredContent.bigCard.image}
               alt={featuredContent.bigCard.title}
               sx={{ borderRadius: 4 }}
             />
             <CardContent
               sx={{
                 position: 'absolute',
                 bottom: 30,
                 left: 30,
                 color: 'white',
               }}
             >
               <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                 {featuredContent.bigCard.title}
               </Typography>
             </CardContent>
           </Card>
         </Grid>

          {/* Center */}


         <Grid item xs={12} md={4}>
           <Stack spacing={3} alignItems="center">
             {featuredContent.smallCards1.map((card, index) => (
               <Card
                 key={index}
                 sx={{
                   display: 'flex',
                   width: '100%',
                   height: '168px',
                   borderRadius: 3,
                   boxShadow: 3,
                   transition: 'transform 0.3s ease',
                   '&:hover': {
                     transform: 'scale(1.05)',
                   },
                 }}
               >
                 <CardMedia
                   component="img"
                   image={card.image}
                   alt={card.title}
                   sx={{
                     width: 168,
                     height: 168,
                     borderTopLeftRadius: 12,
                     borderBottomLeftRadius: 12,
                   }}
                 />
                 <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                   <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                     {card.title}
                   </Typography>
                 </CardContent>
               </Card>
             ))}
           </Stack>
         </Grid>
           
        
         
             
         {/* Right */}
         <Grid item xs={12} md={4}>
           <Stack spacing={3} alignItems="center">
             {featuredContent.smallCards.map((card, index) => (
               <Card
                 key={index}
                 sx={{
                   display: 'flex',
                   width: '100%',
                   height: '168px',
                   borderRadius: 3,
                   boxShadow: 3,
                   transition: 'transform 0.3s ease',
                   '&:hover': {
                     transform: 'scale(1.05)',
                   },
                 }}
               >
                 <CardMedia
                   component="img"
                   image={card.image}
                   alt={card.title}
                   sx={{
                     width: 168,
                     height: 168,
                     borderTopLeftRadius: 12,
                     borderBottomLeftRadius: 12,
                   }}
                 />
                 <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                   <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                     {card.title}
                   </Typography>
                 </CardContent>
               </Card>
             ))}
           </Stack>
         </Grid>
        </Grid>

        </Box>

      </Box>
      <Footer />
    </Box>
  );
};

export default ClientDashboard;
