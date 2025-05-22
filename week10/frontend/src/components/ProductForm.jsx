import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, TextField, Typography, Grid, Paper,
  Select, MenuItem, FormControl, InputLabel, CircularProgress, Alert
} from '@mui/material';
// Import updateProduct
import { createProduct, updateProduct, fetchAllProducts /* If you want to refresh list */ } from '../store/productSlice';
import { fetchAllCategories } from '../store/categorySlice';

// ProductForm receives productToEdit, onFormSubmitSuccess, onCancelEdit
// Make sure these props are being passed from App.jsx
function ProductForm({ productToEdit, onFormSubmitSuccess, onCancelEdit }) {
  const dispatch = useDispatch();
  const { items: categories, status: categoryStatus } = useSelector((state) => state.categories);
  const productOperationStatus = useSelector(state => state.products.status);
  const productOperationError = useSelector(state => state.products.error); // For global errors from thunks

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [supplier, setSupplier] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [localFormError, setLocalFormError] = useState(''); // For form-specific validation errors

  const isEditing = Boolean(productToEdit);

  useEffect(() => {
    if (categoryStatus === 'idle' || categoryStatus === 'failed') {
      dispatch(fetchAllCategories());
    }
  }, [categoryStatus, dispatch]);

  useEffect(() => {
    if (isEditing && productToEdit) {
      setName(productToEdit.name || '');
      setPrice(productToEdit.price?.toString() || '');
      setStock(productToEdit.stock?.toString() || '');
      setSupplier(productToEdit.supplier || '');
      setSelectedCategory(productToEdit.category?._id || productToEdit.category || '');
      setLocalFormError('');
    } else {
      // Clear form if not editing or productToEdit is cleared
      setName('');
      setPrice('');
      setStock('');
      setSupplier('');
      setSelectedCategory('');
      setLocalFormError('');
    }
  }, [productToEdit, isEditing]);

  // MAKE THIS FUNCTION ASYNC
  const handleSubmit = async (e) => { // <--- Added async here
    e.preventDefault();
    setLocalFormError('');

    if (!name.trim() || !price.trim() || !stock.trim() || !supplier.trim() || !selectedCategory) {
      setLocalFormError('All fields are required.');
      return;
    }
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      setLocalFormError('Price must be a non-negative number.'); // Changed from setFormError
      return;
    }
    const parsedStock = parseInt(stock, 10);
    if (isNaN(parsedStock) || parsedStock < 0) {
      setLocalFormError('Stock must be a non-negative integer.'); // Changed from setFormError
      return;
    }

    const productData = {
      name: name.trim(),
      price: parsedPrice,
      stock: parsedStock,
      supplier: supplier.trim(),
      category: selectedCategory,
    };

    let actionResult;
    if (isEditing && productToEdit) { // Ensure productToEdit exists when editing
      actionResult = await dispatch(updateProduct({ id: productToEdit._id, productData }));
    } else {
      actionResult = await dispatch(createProduct(productData));
    }

    // Check the result of the dispatched thunk
    if (actionResult.meta.requestStatus === 'fulfilled') {
      if (onFormSubmitSuccess) { // Call the success callback from App.jsx
        onFormSubmitSuccess();
      }
      // The form fields will be reset by the useEffect listening to productToEdit
    } else if (actionResult.payload) {
      // Display error from Redux (from rejectWithValue in your thunk)
      setLocalFormError(actionResult.payload);
    } else {
      setLocalFormError("An unknown error occurred. Please try again.");
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
      <Typography variant="h5" gutterBottom component="div" sx={{ mb: 2 }}>
        {isEditing ? 'Edit Product' : 'Add New Product'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Product Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required error={!selectedCategory && !!localFormError.includes('required')}>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categoryStatus === 'loading' && <MenuItem disabled><em>Loading categories...</em></MenuItem>}
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
                ))}
                {categoryStatus === 'failed' && <MenuItem disabled><em>Error loading categories</em></MenuItem>}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              required
              inputProps={{ min: "0", step: "0.01" }}
              error={!!(localFormError && (localFormError.toLowerCase().includes('price') || localFormError.includes('required')))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              fullWidth
              required
              inputProps={{ min: "0", step: "1" }}
              error={!!(localFormError && (localFormError.toLowerCase().includes('stock') || localFormError.includes('required')))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Supplier"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              fullWidth
              required
              error={!!(localFormError && (localFormError.toLowerCase().includes('supplier') || localFormError.includes('required')))}
            />
          </Grid>

          {/* Display local form error or global error from Redux thunk */}
          {localFormError && (
            <Grid item xs={12}>
              <Alert severity="error">{localFormError}</Alert>
            </Grid>
          )}
          {/* Optionally, you might want a separate way to show global productOperationError if it's not caught by actionResult.payload */}
          {/* For example, if a network error occurs before the request is made by axios */}
          {productOperationStatus === 'failed' && productOperationError && !localFormError && (
            <Grid item xs={12}>
                <Alert severity="error">Operation failed: {productOperationError}</Alert>
            </Grid>
          )}


          <Grid item xs={12} sx={{ display: 'flex', gap: 1 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={productOperationStatus === 'loading'}
            >
              {productOperationStatus === 'loading' ? <CircularProgress size={24} /> : (isEditing ? 'Save Changes' : 'Add Product')}
            </Button>
            {isEditing && onCancelEdit && ( // Check if onCancelEdit is provided
              <Button variant="outlined" onClick={onCancelEdit} disabled={productOperationStatus === 'loading'}>
                Cancel Edit
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default ProductForm;