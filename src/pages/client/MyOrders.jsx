import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrderId, setLoadingOrderId] = useState(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/orders/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openCancelDialog = (orderId) => {
    setSelectedOrderId(orderId);
    setCancelDialogOpen(true);
  };

  const closeCancelDialog = () => {
    setCancelDialogOpen(false);
    setSelectedOrderId(null);
  };

  const handleConfirmCancel = async () => {
    setLoadingOrderId(selectedOrderId);

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/orders/cancel/${selectedOrderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Order cancelled successfully");
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel the order");
    } finally {
      setLoadingOrderId(null);
      closeCancelDialog();
    }
  };

  return (
    <Box sx={{
      backgroundImage: 'url(/images/bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '150vh'
    }}>
      <ToastContainer />
      <div style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>My Orders</Typography>

        {orders.length === 0 ? (
          <Typography variant="h6" color="textSecondary">No orders found.</Typography>
        ) : (
          orders.map((order) => (
            <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.62)' }} key={order._id} style={{ marginBottom: '20px' }}>
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
                  onClick={() => openCancelDialog(order._id)}
                  style={{ marginTop: 10 }}
                  disabled={loadingOrderId === order._id}
                >
                  {loadingOrderId === order._id ? <CircularProgress size={20} /> : "Cancel Order"}
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
          ))
        )}
      </div>

      {/* Cancel Order Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onClose={closeCancelDialog}>
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to cancel this order?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCancelDialog} color="primary">No</Button>
          <Button
            onClick={handleConfirmCancel}
            color="error"
            disabled={!!loadingOrderId}
          >
            {loadingOrderId ? <CircularProgress size={20} /> : "Yes, Cancel"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyOrders;
