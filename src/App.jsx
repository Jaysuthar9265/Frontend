import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import UserLayout from './layouts/UserLayout';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';


//User Pages
import About from './pages/About';



//Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AddAdmin from './pages/admin/AddAdmin';

//Client Pages
import ClientDashboard from './pages/client/ClientDashboard';
import ClientRecipes from './pages/client/ClientRecipes';
import ClientIngredients from './pages/client/ClientIngredients';
import ClientRecipeDetail from './pages/client/ClientRecipeDetail';

//Chef Pages
import ChefDashboard from './pages/chef/ChefDashboard';
import AddRecipe from './pages/chef/AddRecipe';
import MyRecipes from './pages/chef/MyRecipes';
import EditRecipe from './pages/chef/EditRecipe';


//Vendor Pages
import VendorDashboard from './pages/vendor/VendorDashboard';
import MyIngredients from './pages/vendor/MyIngredients';
import AddIngredient from './pages/vendor/AddIngredient';
import ClientFavorites from './pages/client/ClientFavorites';
import ClientCart from './pages/client/ClientCart';
import EditIngredient from './pages/vendor/EditIngredient';

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />


      {/* Default User Pages */}

      <Route path="/about" element={<UserLayout><About /></UserLayout>} />
      <Route path="/" element={<UserLayout><ClientDashboard /></UserLayout>} />


      {/* Role-Based Dashboards */}

      {/* Admin */}

      <Route path="/admin/dashboard" element={<PrivateRoute allowedRoles={['admin']}><UserLayout><AdminDashboard /></UserLayout></PrivateRoute>}/>
      <Route path="/admin/users" element={<PrivateRoute  allowedRoles={['admin']}><UserLayout><AdminUsers /></UserLayout></PrivateRoute>} />
      <Route path="/admin/add-admin" element={<PrivateRoute  allowedRoles={['admin']}><UserLayout><AddAdmin /></UserLayout></PrivateRoute>} />
 
      {/* Client */}
 
      <Route path="/client/dashboard" element={<UserLayout><ClientDashboard /></UserLayout>}/>
      <Route path="/client/recipes" element={<UserLayout><ClientRecipes /></UserLayout>}/>
      <Route path="/client-ingredients" element={<UserLayout><ClientIngredients /></UserLayout>}/>
      <Route path="/client/recipes/:id" element={<UserLayout><ClientRecipeDetail /></UserLayout>}/>
      <Route path="/client/favorites" element={<UserLayout><ClientFavorites /></UserLayout>} />
      <Route path="/client/cart" element={<UserLayout><ClientCart /></UserLayout>} />


        {/* Chef */}

      <Route path="/chef/dashboard" element={<PrivateRoute allowedRoles={['chef']}><UserLayout><ChefDashboard /></UserLayout></PrivateRoute>}/>
      <Route path="/chef/add-recipe" element={<PrivateRoute allowedRoles={['chef']}><UserLayout><AddRecipe /></UserLayout></PrivateRoute>}/>
      <Route path="/chef/my-recipes" element={<PrivateRoute allowedRoles={['chef']}><UserLayout><MyRecipes /></UserLayout></PrivateRoute>}/>
      <Route path="/chef/edit-recipe/:id" element={<PrivateRoute allowedRoles={['chef']}><UserLayout><EditRecipe /></UserLayout></PrivateRoute>}/>


       {/* Vendor */}

      <Route path="/vendor/dashboard" element={<PrivateRoute allowedRoles={['vendor']}><UserLayout><VendorDashboard /></UserLayout></PrivateRoute>}/>
      <Route path="/vendor/add-ingredient" element={<PrivateRoute allowedRoles={['vendor']}><UserLayout><AddIngredient /></UserLayout></PrivateRoute>} />
      <Route path="/vendor/my-ingredients" element={<PrivateRoute allowedRoles={['vendor']}><UserLayout><MyIngredients /></UserLayout></PrivateRoute>} />
      <Route path="/vendor/edit-ingredient/:ingredientId" element={<PrivateRoute allowedRoles={['vendor']}><UserLayout><EditIngredient /></UserLayout></PrivateRoute>} />
      </Routes>
  );
};

export default App;
