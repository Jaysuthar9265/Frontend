import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import UserLayout from './layouts/UserLayout';
import PrivateRoute from './components/PrivateRoute';
// Dashboards


import VendorDashboard from './pages/vendor/VendorDashboard';
//Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AddAdmin from './pages/admin/AddAdmin';

//Client Pages
import ClientDashboard from './pages/client/ClientDashboard';
import ClientRecipes from './pages/client/ClientRecipes';



//Chef Pages
import ChefDashboard from './pages/chef/ChefDashboard';
import AddRecipe from './pages/chef/AddRecipe';
import MyRecipes from './pages/chef/MyRecipes';
import EditRecipe from './pages/chef/EditRecipe';



//Visitor Pages


import VisitorRecipes from './pages/visitor/VisitorRecipes';
import VisitorHome from './pages/visitor/VisitorHome';
import About from './pages/About';


const App = () => {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Default User Pages */}

      <Route path="/" element={<UserLayout><VisitorHome /></UserLayout>}/>
      <Route path="/recipes" element={<UserLayout><VisitorRecipes /></UserLayout>}/>
      <Route path="/about" element={<UserLayout><About /></UserLayout>} />

      {/* Role-Based Dashboards */}

      {/* Admin */}

      <Route path="/admin/dashboard" element={<PrivateRoute allowedRoles={['admin']}><UserLayout><AdminDashboard /></UserLayout></PrivateRoute>}/>
      <Route path="/admin/users" element={<PrivateRoute  allowedRoles={['admin']}><UserLayout><AdminUsers /></UserLayout></PrivateRoute>} />
      <Route path="/admin/add-admin" element={<PrivateRoute  allowedRoles={['admin']}><UserLayout><AddAdmin /></UserLayout></PrivateRoute>} />
 
      {/* Client */}
 
      <Route path="/client/dashboard" element={<PrivateRoute allowedRoles={['client']}><UserLayout><ClientDashboard /></UserLayout></PrivateRoute>}/>
      <Route path="/client/recipes" element={<PrivateRoute allowedRoles={['client']}><UserLayout><ClientRecipes /></UserLayout></PrivateRoute>} />


        {/* Chef */}

      <Route path="/chef/dashboard" element={<PrivateRoute allowedRoles={['chef']}><UserLayout><ChefDashboard /></UserLayout></PrivateRoute>}/>
      <Route path="/chef/add-recipe" element={<PrivateRoute allowedRoles={['chef']}><UserLayout><AddRecipe /></UserLayout></PrivateRoute>}/>
      <Route path="/chef/my-recipes" element={<PrivateRoute allowedRoles={['chef']}><UserLayout><MyRecipes /></UserLayout></PrivateRoute>}/>
      <Route path="/chef/edit-recipe/:id" element={<PrivateRoute allowedRoles={['chef']}><UserLayout><EditRecipe /></UserLayout></PrivateRoute>}/>


       {/* Vendor */}

      <Route path="/vendor/dashboard" element={<PrivateRoute allowedRoles={['vendor']}><UserLayout><VendorDashboard /></UserLayout></PrivateRoute>}/>
  
      </Routes>
  );
};

export default App;
