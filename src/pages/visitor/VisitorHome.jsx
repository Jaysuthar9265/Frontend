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
  { title: 'Spicy Ramen Noodles', image: 'https://www.sidechef.com/recipe/1286b3f3-93e7-4556-9137-7b7689b2c55b.jpg?d=1408x1120' },
  { title: 'Grilled Salmon Bowl', image: 'https://www.sidechef.com/recipe/f3e94397-9ecb-4497-aa4e-4061b9a88b20.jpg?d=1408x1120' },
  { title: 'Beef Tacos', image: 'https://www.sidechef.com/recipe/1509d081-c453-4735-b0aa-6760807dbabd.jpeg?d=1408x1120' },
  { title: 'Berry Cheesecake', image: 'https://www.sidechef.com/recipe/2fec750a-daf0-4371-babe-410e9152f963.jpg?d=1408x1120' },
  { title: 'Loaded Nachos', image: 'https://www.sidechef.com/recipe/a4773db7-9021-407c-a62c-1747fa047265.jpg?d=1408x1120' },
  { title: 'Carrot Cake Cookies', image: 'https://www.sidechef.com/recipe/d50d8f1f-c231-4b61-87c7-70ebe3ce4dc5.jpg?d=1408x1120' },
];

const featuredContent = {
  bigCard: {
    title: 'Ultimate Summer Salads',
    image: 'https://cdn.loveandlemons.com/wp-content/uploads/2020/12/plant-based-recipes.jpg',
  },
  smallCards: [
    { title: 'Quick Breakfast Ideas', image: 'https://www.sidechef.com/article/cdc64c18-0d47-431d-a808-f47fb7d88716.jpg?d=1408x1120' },
    { title: 'One-Pot Meals', image: 'https://www.sidechef.com/recipe/8c6de499-36b3-45eb-a2f5-70d781171d29.jpeg?d=1408x1120' },
    { title: 'Desserts for Two', image: 'https://www.sidechef.com/recipe/93d77a2a-5da4-4181-9b48-36fe44f76604.jpg?d=1408x1120' },
  ],
  smallCards1: [
    { title: 'Healthy Snacks', image: 'https://www.sidechef.com/article/c36e97b2-1bed-4e34-bfd5-a9d872eee003.jpg?d=1408x1120' },
    { title: '30-Minute Dinners', image: 'https://www.sidechef.com/recipe/df716374-1a40-4a2c-9f91-bd002c520888.jpg?d=1408x1120' },
    { title: 'Vegetarian Favorites', image: 'https://www.sidechef.com/recipe/7910036b-3746-496b-8099-a0b1d78b6743.jpg?d=1408x1120' },
  ],
};

const VisitorHome = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundImage: 'url(/images/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center', pt: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    
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
            onClick={() => navigate('/recipes')}
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

export default VisitorHome;
