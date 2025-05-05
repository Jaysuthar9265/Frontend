import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Rating
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recipes');
        const recipesWithRatings = await Promise.all(
          response.data.map(async (recipe) => {
            const ratingRes = await axios.get(`http://localhost:5000/api/feedback/${recipe._id}`);
            const feedbacks = ratingRes.data;
            const avgRating =
              feedbacks.length > 0
                ? feedbacks.reduce((acc, cur) => acc + cur.rating, 0) / feedbacks.length
                : 0;
            return { ...recipe, averageRating: avgRating };
          })
        );
        setRecipes(recipesWithRatings);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        toast.error("Error fetching recipes!");
      }
    };
    fetchRecipes();
  }, []);

  const handleCardClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`); // Make sure this route exists for RecipeDetail
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Manage Recipes
      </Typography>

      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe._id}>
            <Card
              onClick={() => handleCardClick(recipe._id)}
              style={{ cursor: 'pointer' }}
            >
              <CardContent>
                <Typography variant="h6">{recipe.title}</Typography>
                <Rating
                  name="read-only"
                  value={recipe.averageRating}
                  precision={0.5}
                  readOnly
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ManageRecipes;
