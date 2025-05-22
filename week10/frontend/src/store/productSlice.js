import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL_PRODUCTS = 'http://localhost:5001/api/products';

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  // ... (keep existing fetchAllProducts code)
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL_PRODUCTS);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/create',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL_PRODUCTS, productData);
      return response.data; // Backend should return the created product with populated category
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
    'products/delete',
    async (productId, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL_PRODUCTS}/${productId}`);
            return productId; // Return the ID of the deleted product
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL_PRODUCTS}/${id}`, productData);
      return response.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // resetProductStatus: (state) => {
    //   state.status = 'idle';
    //   state.error = null;
    // }
  },
  extraReducers: (builder) => {
    builder
      // fetchAllProducts
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // createProduct
      .addCase(createProduct.pending, (state) => {
        // Optionally set a specific status for creating
        // state.createStatus = 'loading';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload); // Add to the beginning of the array
        // state.createStatus = 'succeeded';
      })
      .addCase(createProduct.rejected, (state, action) => {
        // state.createStatus = 'failed';
        state.error = action.payload; // Or a specific createError field
        console.error("Failed to create product:", action.payload)
      })
      // deleteProduct
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
        console.error("Failed to delete product:", action.payload);
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading'; // Or a specific updateStatus
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload; // Replace the old item with the updated one
        }
        // Ensure items remain sorted if you have a specific sort order
        // state.items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.error("Failed to update product:", action.payload);
      });
  },
});

export default productSlice.reducer;