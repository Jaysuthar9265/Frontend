import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import UserLayout from './layouts/UserLayout';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';


//Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AddAdmin from './pages/admin/AddAdmin';

//Client Pages
import ClientDashboard from './pages/client/ClientDashboard';
import ClientRecipes from './pages/client/ClientRecipes';
import ClientIngredients from './pages/client/ClientIngredients';

//Chef Pages
import ChefDashboard from './pages/chef/ChefDashboard';
import AddRecipe from './pages/chef/AddRecipe';
import MyRecipes from './pages/chef/MyRecipes';
import EditRecipe from './pages/chef/EditRecipe';

//Visitor Pages
import VisitorRecipes from './pages/visitor/VisitorRecipes';
import VisitorHome from './pages/visitor/VisitorHome';
import About from './pages/About';
import VisitorIngredients from './pages/visitor/VisitorIngredients';

//Vendor Pages
import VendorDashboard from './pages/vendor/VendorDashboard';
import MyIngredients from './pages/vendor/MyIngredients';
import AddIngredient from './pages/vendor/AddIngredient';
import ClientRecipeDetail from './pages/client/ClientRecipeDetail';
import VisitorRecipeDetail from './pages/visitor/VisitorRecipeDetail';

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />


      {/* Default User Pages */}

      <Route path="/" element={<UserLayout><VisitorHome /></UserLayout>}/>
      <Route path="/recipes" element={<UserLayout><VisitorRecipes /></UserLayout>}/>
      <Route path="/about" element={<UserLayout><About /></UserLayout>} />
      <Route path="/visitor-ingredients" element={<UserLayout><VisitorIngredients /></UserLayout>} />
      <Route path="/recipes/:id" element={<UserLayout><VisitorRecipeDetail /></UserLayout>} />

      {/* Role-Based Dashboards */}

      {/* Admin */}

      <Route path="/admin/dashboard" element={<PrivateRoute allowedRoles={['admin']}><UserLayout><AdminDashboard /></UserLayout></PrivateRoute>}/>
      <Route path="/admin/users" element={<PrivateRoute  allowedRoles={['admin']}><UserLayout><AdminUsers /></UserLayout></PrivateRoute>} />
      <Route path="/admin/add-admin" element={<PrivateRoute  allowedRoles={['admin']}><UserLayout><AddAdmin /></UserLayout></PrivateRoute>} />
 
      {/* Client */}
 
      <Route path="/client/dashboard" element={<PrivateRoute allowedRoles={['client']}><UserLayout><ClientDashboard /></UserLayout></PrivateRoute>}/>
      <Route path="/client/recipes" element={<PrivateRoute allowedRoles={['client']}><UserLayout><ClientRecipes /></UserLayout></PrivateRoute>} />
      <Route path="/client-ingredients" element={<PrivateRoute allowedRoles={['client']}><UserLayout><ClientIngredients /></UserLayout></PrivateRoute>} />
      <Route path="/client/recipes/:id" element={<PrivateRoute allowedRoles={['client']}><UserLayout><ClientRecipeDetail /></UserLayout></PrivateRoute>} />


        {/* Chef */}

      <Route path="/chef/dashboard" element={<PrivateRoute allowedRoles={['chef']}><UserLayout><ChefDashboard /></UserLayout></PrivateRoute>}/>
      <Route path="/chef/add-recipe" element={<PrivateRoute allowedRoles={['chef']}><UserLayout><AddRecipe /></UserLayout></PrivateRoute>}/>
      <Route path="/chef/my-recipes" element={<PrivateRoute allowedRoles={['chef']}><UserLayout><MyRecipes /></UserLayout></PrivateRoute>}/>
      <Route path="/chef/edit-recipe/:id" element={<PrivateRoute allowedRoles={['chef']}><UserLayout><EditRecipe /></UserLayout></PrivateRoute>}/>


       {/* Vendor */}

      <Route path="/vendor/dashboard" element={<PrivateRoute allowedRoles={['vendor']}><UserLayout><VendorDashboard /></UserLayout></PrivateRoute>}/>
      <Route path="/vendor/add-ingredient" element={<PrivateRoute allowedRoles={['vendor']}><UserLayout><AddIngredient /></UserLayout></PrivateRoute>} />
      <Route path="/vendor/my-ingredients" element={<PrivateRoute allowedRoles={['vendor']}><UserLayout><MyIngredients /></UserLayout></PrivateRoute>} />
      </Routes>
  );
};

export default App;
