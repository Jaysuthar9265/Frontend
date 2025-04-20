import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import API from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total: 0, admins: 0, clients: 0, chefs: 0, vendors: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/admin/user-stats');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const cardData = [
    { title: 'Total Users', value: stats.total },
    { title: 'Admins', value: stats.admins },
    { title: 'Clients', value: stats.clients },
    { title: 'Chefs', value: stats.chefs },
    { title: 'Vendors', value: stats.vendors },
  ];

  return (
    <Box p={3}>
      <Grid container spacing={3} justifyContent="center">
        {cardData.map((item, index) => (
          <Grid item key={index}>
            <Card
              sx={{
                width: 200,
                height: 200,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                textAlign: 'center',
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="h4" color="primary">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
