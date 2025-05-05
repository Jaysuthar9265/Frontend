import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const ManageFeedbacks = () => {
  const [uniqueRecipes, setUniqueRecipes] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedback', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        // Filter unique recipes and calculate average ratings
        const recipeMap = {};

        data.forEach((fb) => {
          const recipe = fb.recipeId;
          if (recipe && recipe._id) {
            if (!recipeMap[recipe._id]) {
              recipeMap[recipe._id] = {
                ...recipe,
                feedbacks: [],
              };
            }
            recipeMap[recipe._id].feedbacks.push(fb.rating);
          }
        });

        const unique = Object.values(recipeMap).map((r) => ({
          ...r,
          avgRating: (
            r.feedbacks.reduce((a, b) => a + b, 0) / r.feedbacks.length
          ).toFixed(1),
        }));

        setUniqueRecipes(unique);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        toast.error('Failed to fetch feedbacks');
      }
    };

    fetchFeedbacks();
  }, [token]);

  const handleCardClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Manage Recipe Feedbacks
      </Typography>

      <Grid container spacing={3}>
        {uniqueRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe._id}>
            <Card
            sx={{ width:'260px', height:'100%' }}
              onClick={() => handleCardClick(recipe._id)}
              style={{ cursor: 'pointer' }}
            >
              <CardMedia
                component="img"
                height="200"
                image={recipe.image}
                alt={recipe.title}
              />
              <CardContent>
                <Typography variant="h6">{recipe.title}</Typography>
                <Typography variant="body2" color="textSecondary" display="flex" alignItems="center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon
                      key={i}
                      style={{
                        color: i < Math.round(recipe.avgRating) ? '#FFD700' : '#ccc',
                        fontSize: 20,
                      }}
                    />
                  ))}
                  <span style={{ marginLeft: 8 }}>{recipe.avgRating} / 5</span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ManageFeedbacks;
