import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { fetchAllProducts } from '../store/productSlice';

const columns = [
  // MongoDB uses _id, DataGrid expects id. We'll use getRowId prop.
  { field: '_id', headerName: 'ID', width: 220 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'price', headerName: 'Price', type: 'number', width: 120,
    valueFormatter: (params) => `$${params.value.toFixed(2)}`
  },
  { field: 'stock', headerName: 'Stock', type: 'number', width: 100 },
  { field: 'supplier', headerName: 'Supplier', width: 180 },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 180,
    valueGetter: (params) => new Date(params.value).toLocaleString(),
  },
  {
    field: 'updatedAt',
    headerName: 'Updated At',
    width: 180,
    valueGetter: (params) => new Date(params.value).toLocaleString(),
  }
];

function ProductDataGrid() {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box sx={{ padding: 3 }}>
        <Alert severity="error">Error fetching products: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '80vh', width: '100%', padding: 2 }}>
      <Typography variant="h4" gutterBottom component="div" sx={{ textAlign: 'center', mb: 2 }}>
        Product List
      </Typography>
      {products.length > 0 ? (
        <DataGrid
          rows={products}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          getRowId={(row) => row._id} // Important: tells DataGrid to use _id as the unique row identifier
          autoHeight={false} // Set to true if you don't want fixed height
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              fontSize: '1.05rem'
            },
            // You can add more custom styling here
          }}
        />
      ) : (
        <Typography>No products found.</Typography>
      )}
    </Box>
  );
}

export default ProductDataGrid;