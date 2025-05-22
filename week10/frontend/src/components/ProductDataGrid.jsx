import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography, CircularProgress, Alert, IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { fetchAllProducts, deleteProduct } from '../store/productSlice';
import { fetchAllCategories } from '../store/categorySlice';


const getColumns = (theme, handleDelete, handleEdit) => [
  {
    field: 'name',
    headerName: 'Name',
    flex: 2,
    minWidth: 150,
  },
  {
    field: 'category',
    headerName: 'Category',
    flex: 1.5,
    minWidth: 120,
    // valueGetter: (params) => {
    //   if (params.row && params.row.category && typeof params.row.category === 'object') {
    //     return params.row.category.name || 'N/A';
    //   }
    //   if (params.row && params.row.category) {
    //       return String(params.row.category); // Fallback
    //   }
    //   return 'N/A';
    // },
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'stock',
    headerName: 'Stock',
    type: 'number',
    flex: 0.8,
    minWidth: 80,
  },
  {
    field: 'supplier',
    headerName: 'Supplier',
    flex: 1.5,
    minWidth: 150,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 120,
    cellClassName: 'actions',
    getActions: (params) => { // params has { id, row }
      return [
        <GridActionsCellItem
          key={`edit-${params.id}`}
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEdit(params.row)} // Use the handleEdit passed to getColumns
          color="primary"
        />,
        <GridActionsCellItem
          key={`delete-${params.id}`}
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.id)} // Use the handleDelete passed to getColumns
          color="error"
        />,
      ];
    },
  },
];

function ProductDataGrid({ onEditProduct }) { // Destructure onEditProduct
  const dispatch = useDispatch();
  const theme = useTheme();
  const { items: products, status: productStatus, error: productError } = useSelector((state) => state.products);
  const { status: categoryStatus } = useSelector((state) => state.categories);

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  // *** THIS IS THE FIX ***
  // Pass the actual functions to getColumns:
  // - handleDeleteProduct is defined locally
  // - onEditProduct is the prop received from App.jsx (which is App.jsx's handleEditProduct function)
  const columns = getColumns(theme, handleDeleteProduct, onEditProduct);

  useEffect(() => {
    if (productStatus === 'idle' || productStatus === 'failed') {
      dispatch(fetchAllProducts());
    }
    if (categoryStatus === 'idle' || categoryStatus === 'failed') {
      dispatch(fetchAllCategories());
    }
  }, [productStatus, categoryStatus, dispatch]);

  if (productStatus === 'loading' || (categoryStatus === 'loading' && products.length === 0)) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (productStatus === 'failed' && products.length === 0) {
    return (
      <Box sx={{ padding: 3 }}>
        <Alert severity="error">Error fetching products: {productError}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '70vh', width: '100%', mt: 2 }}>
      {productStatus === 'failed' && products.length > 0 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Could not refresh product data: {productError}
        </Alert>
      )}
      {products.length > 0 ? (
        <DataGrid
          rows={products.filter(p => p != null)} 
          columns={columns}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          getRowId={(row) => row._id}
          autoHeight={false}
          sx={{
            border: 1,
            borderColor: 'divider',
            '& .MuiDataGrid-columnHeaders': { 
              backgroundColor: theme.palette.primary.main, 
              color: theme.palette.primary.contrastText,  
              fontSize: '1rem',
            },
            '& .MuiDataGrid-columnHeaderTitle': { 
              fontWeight: 'bold',
            },
             '& .MuiDataGrid-row': {
              '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
              },
            },
            '& .MuiDataGrid-cell': {
                borderBottom: `1px solid ${theme.palette.divider}`,
            }
          }}
        />
      ) : (
        productStatus === 'succeeded' && <Typography>No products found. Add some using the form above!</Typography>
      )}
    </Box>
  );
}

export default ProductDataGrid;