import React,  { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductDataGrid from './components/ProductDataGrid';
import CategoryManager from './components/CategoryManager'; // Import CategoryManager
import { CssBaseline, Container, Typography, Box, Divider, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const theme = createTheme({
  // ... (your existing theme definition)
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f4f6f8', paper: '#ffffff' },
    action: { hover: 'rgba(0, 0, 0, 0.04)' }
  },
  typography: {
    h4: { fontWeight: 600, marginBottom: '1rem' },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 }
  },
});


function App() {
  const [productToEdit, setProductToEdit] = useState(null);
  const handleEditProduct = (product) => {
      setProductToEdit(product);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  const handleFormClose = () => {
      setProductToEdit(null);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ mt: 2, mb: 4, p: { xs: 1, sm: 2 } }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Product & Category Management
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={5} lg={4}>
            <CategoryManager />
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            {/* Pass productToEdit and handleFormClose to ProductForm */}
            <ProductForm
              productToEdit={productToEdit}
              onFormSubmitSuccess={handleFormClose} // Renamed for clarity
              onCancelEdit={handleFormClose}
            />
            <Divider sx={{ my: 3 }} />
            <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 2 }}>
              Product List
            </Typography>
            {/* Pass handleEditProduct to ProductDataGrid */}
            <ProductDataGrid onEditProduct={handleEditProduct} />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;