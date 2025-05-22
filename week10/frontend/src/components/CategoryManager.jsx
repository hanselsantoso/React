import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, TextField, Typography, Paper, List, ListItem, ListItemText,
  ListItemSecondaryAction, IconButton, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, CircularProgress, Alert, Grid, Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {
  fetchAllCategories, createCategory, updateCategory, deleteCategory, resetCategoryError
} from '../store/categorySlice';

function CategoryManager() {
  const dispatch = useDispatch();
  const { items: categories, status, error } = useSelector((state) => state.categories);

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null); // For storing category being edited

  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState(''); // Local form error

  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllCategories());
    }
  }, [status, dispatch]);

  useEffect(() => {
    // If there's a global error from Redux, display it as a form error
    // and then clear it from Redux state to prevent it from persisting
    if (error) {
        setFormError(error); // Show Redux error in form
        dispatch(resetCategoryError()); // Clear global error after displaying
    }
  }, [error, dispatch]);


  const handleOpenAddDialog = () => {
    setIsEditing(false);
    setCurrentCategory(null);
    setCategoryName('');
    setCategoryDescription('');
    setFormError('');
    setOpenFormDialog(true);
  };

  const handleOpenEditDialog = (category) => {
    setIsEditing(true);
    setCurrentCategory(category);
    setCategoryName(category.name);
    setCategoryDescription(category.description || '');
    setFormError('');
    setOpenFormDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenFormDialog(false);
    setFormSubmitting(false);
  };

  const handleFormSubmit = async () => {
    if (!categoryName.trim()) {
      setFormError('Category name is required.');
      return;
    }
    setFormSubmitting(true);
    setFormError(''); // Clear previous local error

    const categoryData = { name: categoryName.trim(), description: categoryDescription.trim() };

    let actionResult;
    if (isEditing && currentCategory) {
      actionResult = await dispatch(updateCategory({ id: currentCategory._id, categoryData }));
    } else {
      actionResult = await dispatch(createCategory(categoryData));
    }

    if (actionResult.meta.requestStatus === 'fulfilled') {
      handleCloseDialog();
    } else {
      // Error is handled by the useEffect that listens to global `error`
      // Or, you can set a local form error here if `actionResult.payload` has the error message
      // setFormError(actionResult.payload || "An unknown error occurred.");
    }
    setFormSubmitting(false);
  };


  const handleOpenConfirmDelete = (category) => {
    setCategoryToDelete(category);
    setOpenConfirmDeleteDialog(true);
  };

  const handleCloseConfirmDelete = () => {
    setCategoryToDelete(null);
    setOpenConfirmDeleteDialog(false);
  };

  const handleDeleteConfirmed = async () => {
    if (categoryToDelete) {
      await dispatch(deleteCategory(categoryToDelete._id));
      handleCloseConfirmDelete();
    }
  };


  if (status === 'loading' && categories.length === 0) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box>;
  }

  return (
    <Paper elevation={2} sx={{ padding: { xs: 1, sm: 2, md: 3 }, marginTop: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h3">
          Manage Categories
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
        >
          Add Category
        </Button>
      </Box>

      <Divider sx={{mb: 2}}/>

      {status === 'failed' && categories.length === 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>Error loading categories: {error}</Alert>
      )}

      {categories.length > 0 ? (
        <List dense>
          {categories.map((category) => (
            <ListItem
              key={category._id}
              divider
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleOpenEditDialog(category)} sx={{ mr: 0.5 }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleOpenConfirmDelete(category)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={category.name}
                secondary={category.description || 'No description'}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        status === 'succeeded' && <Typography>No categories found. Add one to get started!</Typography>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={openFormDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? 'Edit Category' : 'Add New Category'}</DialogTitle>
        <DialogContent>
          {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            fullWidth
            variant="outlined"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            error={!!(formError && formError.toLowerCase().includes('name'))} // Highlight if error mentions name
          />
          <TextField
            margin="dense"
            id="description"
            label="Description (Optional)"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{pb:2, pr:2}}>
          <Button onClick={handleCloseDialog} color="inherit">Cancel</Button>
          <Button onClick={handleFormSubmit} variant="contained" disabled={formSubmitting}>
            {formSubmitting ? <CircularProgress size={24} /> : (isEditing ? 'Save Changes' : 'Add Category')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={openConfirmDeleteDialog}
        onClose={handleCloseConfirmDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the category "{categoryToDelete?.name}"?
            This action cannot be undone.
            {/* You might want to add a warning if products use this category */}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{pb:2, pr:2}}>
          <Button onClick={handleCloseConfirmDelete} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmed} color="error" variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default CategoryManager;