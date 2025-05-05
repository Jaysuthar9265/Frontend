import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Signup from './components/Signup';
import UserLayout from './layouts/UserLayout';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// User Pages
import About from './pages/About';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AddAdmin from './pages/admin/AddAdmin';

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard';
import ClientRecipes from './pages/client/ClientRecipes';
import ClientIngredients from './pages/client/ClientIngredients';
import ClientRecipeDetail from './pages/client/ClientRecipeDetail';
import ClientFavorites from './pages/client/ClientFavorites';
import ClientCart from './pages/client/ClientCart';
import MyOrders from './pages/client/MyOrders';

// Chef Pages
import ChefDashboard from './pages/chef/ChefDashboard';
import AddRecipe from './pages/chef/AddRecipe';
import MyRecipes from './pages/chef/MyRecipes';
import EditRecipe from './pages/chef/EditRecipe';

// Vendor Pages
import VendorDashboard from './pages/vendor/VendorDashboard';
import MyIngredients from './pages/vendor/MyIngredients';
import AddIngredient from './pages/vendor/AddIngredient';
import EditIngredient from './pages/vendor/EditIngredient';
import ManageRecipes from './pages/admin/ManageRecipes';
import ManageIngredients from './pages/admin/ManageIngredients';
import ManageFeedbacks from './pages/admin/ManageFeedbacks';
import RecipeDetail from './pages/admin/RecipeDetail';

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Default User Pages */}
        <Route path="/about" element={<UserLayout><About /></UserLayout>} />
        <Route path="/" element={<UserLayout><ClientDashboard /></UserLayout>} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<PrivateRoute allowedRoles={['admin']}><UserLayout><AdminDashboard /></UserLayout></PrivateRoute>}/>
        <Route path="/admin/users" element={<PrivateRoute allowedRoles={['admin']}><UserLayout><AdminUsers /></UserLayout></PrivateRoute>} />
        <Route path="/admin/add-admin" element={<PrivateRoute allowedRoles={['admin']}><UserLayout><AddAdmin /></UserLayout></PrivateRoute>} />
        <Route path="/admin/manage-recipes" element={<PrivateRoute allowedRoles={['admin']}><UserLayout><ManageRecipes /></UserLayout></PrivateRoute>} />
        <Route path="/admin/manage-ingredients" element={<PrivateRoute allowedRoles={['admin']}><UserLayout><ManageIngredients /></UserLayout></PrivateRoute>} />
        <Route path="/admin/manage-feedbacks" element={<PrivateRoute allowedRoles={['admin']}><UserLayout><ManageFeedbacks /></UserLayout></PrivateRoute>} />
        <Route path="/recipe/:id" element={<PrivateRoute allowedRoles={['admin']}><UserLayout><RecipeDetail /></UserLayout></PrivateRoute>}/>

        {/* Client Routes */}
        <Route path="/client/dashboard" element={<UserLayout><ClientDashboard /></UserLayout>}/>
        <Route path="/client/recipes" element={<UserLayout><ClientRecipes /></UserLayout>}/>
        <Route path="/client-ingredients" element={<UserLayout><ClientIngredients /></UserLayout>}/>
        <Route path="/client/recipes/:id" element={<UserLayout><ClientRecipeDetail /></UserLayout>}/>
        <Route path="/client/favorites" element={<UserLayout><ClientFavorites /></UserLayout>} />
        <Route path="/client/cart" element={<UserLayout><ClientCart /></UserLayout>} />
        <Route path="/client/my-orders" element={<UserLayout><MyOrders /></UserLayout>} />

        {/* Chef Routes */}
        <Route path="/chef/dashboard" element={<PrivateRoute allowedRoles={['chef']}><UserLayout><ChefDashboard /></UserLayout></PrivateRoute>}/>
        <Route path="/chef/add-recipe" element={<PrivateRoute allowedRoles={['chef']}><UserLayout><AddRecipe /></UserLayout></PrivateRoute>}/>
        <Route path="/chef/my-recipes" element={<PrivateRoute allowedRoles={['chef']}><UserLayout><MyRecipes /></UserLayout></PrivateRoute>}/>
        <Route path="/chef/edit-recipe/:id" element={<PrivateRoute allowedRoles={['chef']}><UserLayout><EditRecipe /></UserLayout></PrivateRoute>}/>

        {/* Vendor Routes */}
        <Route path="/vendor/dashboard" element={<PrivateRoute allowedRoles={['vendor']}><UserLayout><VendorDashboard /></UserLayout></PrivateRoute>}/>
        <Route path="/vendor/add-ingredient" element={<PrivateRoute allowedRoles={['vendor']}><UserLayout><AddIngredient /></UserLayout></PrivateRoute>} />
        <Route path="/vendor/my-ingredients" element={<PrivateRoute allowedRoles={['vendor']}><UserLayout><MyIngredients /></UserLayout></PrivateRoute>} />
        <Route path="/vendor/edit-ingredient/:ingredientId" element={<PrivateRoute allowedRoles={['vendor']}><UserLayout><EditIngredient /></UserLayout></PrivateRoute>} />
      </Routes>
    </>
  );
};

export default App;
