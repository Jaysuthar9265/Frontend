import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TopRatedRecipes = () => {
  const [topRatedRecipes, setTopRatedRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopRatedRecipes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/recipes/top-rated");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setTopRatedRecipes(data.slice(0, 20)); // limit to 20
        }
      } catch (err) {
        console.error('Error fetching top-rated recipes:', err.message);
      }
    };

    fetchTopRatedRecipes();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/client/recipes/${id}`);
    window.location.reload();
  };

  // Split into groups of 6
  const chunked = [];
  for (let i = 0; i < topRatedRecipes.length; i += 6) {
    chunked.push(topRatedRecipes.slice(i, i + 6));
  }

  return (
    <Box sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'left' }}>
        Top Trending Recipes
      </Typography>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation={true}
        pagination={{ clickable: true }}
        slidesPerView={1}
        loop={true}
        style={{ paddingBottom: '30px' }}
      >
        {chunked.map((group, index) => (
          <SwiperSlide key={index}>
            <Grid container spacing={2} justifyContent="center">
              {group.map((recipe) => (
                <Grid sx={{ py:3 }} item key={recipe._id}>
                  <Card
                    onClick={() => handleCardClick(recipe._id)}
                    sx={{
                      mb:3,
                      height: 350,
                      width: 262,
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      boxShadow: 3,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={recipe.image}
                      alt={recipe.title}
                    />
                    <CardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexGrow: 1,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold', textAlign: 'center' }}
                      >
                        {recipe.title}
                      </Typography>
                      <Rating
                        name="read-only"
                        value={Number(recipe.avgRating) || 0}
                        precision={0.5}
                        readOnly
                        size="small"
                        sx={{ mt: 'auto' }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default TopRatedRecipes;
