import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import AdminLayout from './AdminLayout';
import ChefNavbar from '../components/navbars/ChefNavbar';
import VendorNavbar from '../components/navbars/VendorNavbar';
import VisitorNavbar from '../components/navbars/VisitorNavbar';
import ClientLayout from './ClientLayout';

const UserLayout = ({ children }) => {
  const { user } = useContext(UserContext); // or get from localStorage

  const renderNavbar = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminLayout />;
      case 'client':
        return <ClientLayout />;
      case 'chef':
        return <ChefNavbar />;
      case 'vendor':
        return <VendorNavbar />;
      default:
        return <VisitorNavbar />;
    }
  };

  return (
    <div>
      {renderNavbar()}
      <main>{children}</main>
    </div>
  );
};

export default UserLayout;
