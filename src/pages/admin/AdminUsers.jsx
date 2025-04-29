import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle,
  DialogContent, TextField, DialogActions, Button, Divider, Box, InputAdornment
} from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';
import API from '../../services/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await API.get('/admin/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await API.delete(`/admin/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const handleEditOpen = (user) => {
    setCurrentUser(user);
    setEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    try {
      await API.put(`/admin/users/${currentUser._id}`, currentUser);
      setEditDialogOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Edit error:', error);
    }
  };

  const roles = ['admin', 'client', 'chef', 'vendor'];

  // Filter users by search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupByRole = (role) => filteredUsers.filter((user) => user.role === role);

  return (
    <Box sx={{ backgroundImage: 'url("/images/bg.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', mt:-10, pt:5 }}>
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search by name or email..."
        variant="outlined"
        sx={{ my: 3 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
      />

      {/* Role-Based Tables */}
      {roles.map((role) => {
        const roleUsers = groupByRole(role);
        if (roleUsers.length === 0) return null;

        return (
          <Box key={role} sx={{ mb: 5 }}>
            <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
              {role.charAt(0).toUpperCase() + role.slice(1)}s
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <TableContainer  sx={{ bgcolor:'rgba(255, 255, 255, 0.53)' }} component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roleUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEditOpen(user)}><Edit /></IconButton>
                        <IconButton color="error" onClick={() => handleDelete(user._id)}><Delete /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
      })}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Name" value={currentUser.name || ''} onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })} />
          <TextField fullWidth margin="dense" label="Email" value={currentUser.email || ''} onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} />
          <TextField fullWidth margin="dense" label="Role" value={currentUser.role || ''} onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
    </Box>
  );
};

export default AdminUsers;
