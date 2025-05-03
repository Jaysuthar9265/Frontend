import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Avatar, Button, Box } from '@mui/material';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/orders/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/orders/cancel/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders(); // refresh list
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Failed to cancel the order.");
    }
  };

  return (
    <Box sx={{
      backgroundImage: 'url(/images/bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight:'150vh'
    }}>
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>My Orders</Typography>
      {orders.map((order) => (
        <Card  sx={{ bgcolor:'rgba(255, 255, 255, 0.62)'}}  key={order._id} style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h6">Order ID: {order._id}</Typography>
            <Typography variant="subtitle1">
              Date: {new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </Typography>
            <Typography variant="subtitle1">Amount: ₹{order.amount?.toFixed(2) || 'N/A'}</Typography>

            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleCancel(order._id)}
              style={{ marginTop: 10 }}
            >
              Cancel Order
            </Button>

            <Typography variant="h6" style={{ marginTop: '15px' }}>Items:</Typography>
            <Grid container spacing={2}>
              {order.items && order.items.length > 0 ? (
                order.items.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={item.ingredient?.imageUrl}
                          alt={item.ingredient?.title}
                          variant="rounded"
                          style={{ width: 56, height: 56, marginRight: 10 }}
                        />
                        <div>
                          <Typography>{item.ingredient?.title || 'Unnamed Item'}</Typography>
                          <Typography variant="body2">Qty: {item.quantity}</Typography>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography>No items in this order</Typography>
              )}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </div>
    </Box>
  );
};

export default MyOrders;
