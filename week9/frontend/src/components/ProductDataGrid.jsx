import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme
import { fetchAllProducts } from '../store/productSlice';

// Define only the columns you want to display
const getColumns = (theme) => [ // Pass theme to potentially use it for styling if needed
  {
    field: 'name',
    headerName: 'Name',
    flex: 2, // Use flex for responsive width allocation
    minWidth: 150,
    headerClassName: 'custom-header',
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    flex: 1,
    minWidth: 100,
    headerClassName: 'custom-header',
    
  },
  {
    field: 'stock',
    headerName: 'Stock',
    type: 'number',
    flex: 1,
    minWidth: 80,
    headerClassName: 'custom-header',
  },
  {
    field: 'supplier',
    headerName: 'Supplier',
    flex: 2,
    minWidth: 150,
    headerClassName: 'custom-header',
  },
];

function ProductDataGrid() {
  const dispatch = useDispatch();
  const theme = useTheme(); // Access the current theme
  const { items: products, status, error } = useSelector((state) => state.products);

  const columns = getColumns(theme); // Generate columns

  useEffect(() => {
    // Fetch products only if they haven't been fetched or if an error occurred previously
    if (status === 'idle' || status === 'failed') {
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

  if (status === 'failed' && products.length === 0) { // Only show full error if no data is present
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
      {/* Show error as an alert on top if data is already present but a new fetch failed */}
      {status === 'failed' && products.length > 0 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Could not refresh product data: {error}
        </Alert>
      )}
      {products.length > 0 ? (
        <DataGrid
          rows={products}
          columns={columns}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          getRowId={(row) => row._id} // Still need _id for DataGrid's internal row identification
          autoHeight={false}
          sx={{
            border: 1, // Add a border around the DataGrid
            borderColor: 'divider',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.primary.main, // Use theme color directly
              color: theme.palette.primary.contrastText, // Use contrast text from theme
              fontSize: '1rem', // Adjust font size if needed
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold', // Make header titles bold
            },
            // Ensure rows have some visual separation
            '& .MuiDataGrid-row': {
              '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover, // Subtle zebra striping
              },
            },
            '& .MuiDataGrid-cell': {
                borderBottom: `1px solid ${theme.palette.divider}`, // Add border to cells
            }
          }}
        />
      ) : (
        status === 'succeeded' && <Typography>No products found.</Typography>
      )}
    </Box>
  );
}

export default ProductDataGrid;