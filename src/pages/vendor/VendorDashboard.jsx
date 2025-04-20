import React from 'react';

const VendorDashboard = () => {
  const name = localStorage.getItem('name');

  return (
    <div>
      <h2>Welcome Vendor, {name}</h2>
      {/* Vendor-specific content here */}
    </div>
  );
};

export default VendorDashboard;
