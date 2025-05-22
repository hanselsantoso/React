import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL_CATEGORIES = 'http://localhost:5001/api/categories';

export const fetchAllCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL_CATEGORIES);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/create',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL_CATEGORIES, categoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/update',
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL_CATEGORIES}/${id}`, categoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (categoryId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL_CATEGORIES}/${categoryId}`);
      return categoryId; // Return the ID of the deleted category
    } catch (error){
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  // To manage specific operation statuses if needed
  // createStatus: 'idle',
  // updateStatus: 'idle',
  // deleteStatus: 'idle',
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    resetCategoryError: (state) => {
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Create
      .addCase(createCategory.pending, (state) => {
        // state.createStatus = 'loading';
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.items.sort((a, b) => a.name.localeCompare(b.name)); // Keep sorted
        // state.createStatus = 'succeeded';
      })
      .addCase(createCategory.rejected, (state, action) => {
        // state.createStatus = 'failed';
        state.error = action.payload;
        console.error("Failed to create category:", action.payload);
      })
      // Update
      .addCase(updateCategory.pending, (state) => {
        // state.updateStatus = 'loading';
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.items.sort((a, b) => a.name.localeCompare(b.name)); // Keep sorted
        // state.updateStatus = 'succeeded';
      })
      .addCase(updateCategory.rejected, (state, action) => {
        // state.updateStatus = 'failed';
        state.error = action.payload;
        console.error("Failed to update category:", action.payload);
      })
      // Delete
      .addCase(deleteCategory.pending, (state) => {
        // state.deleteStatus = 'loading';
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
        // state.deleteStatus = 'succeeded';
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        // state.deleteStatus = 'failed';
        state.error = action.payload;
        console.error("Failed to delete category:", action.payload);
      });
  },
});

export const { resetCategoryError } = categorySlice.actions;
export default categorySlice.reducer;