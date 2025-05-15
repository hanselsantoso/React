import React from 'react';
import ProductDataGrid from './components/ProductDataGrid';
import { CssBaseline, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    mode: 'light', 
    primary: {
      main: '#1976d2', 
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f4f6f8', 
      paper: '#ffffff',   
    },
    action: {
        hover: 'rgba(0, 0, 0, 0.04)' 
    }
  },
  typography: {
    h4: {
      fontWeight: 600,
    }
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
        },
      },
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ mt: 2, mb: 2, p: { xs: 1, sm: 2 } }}> {/* Wider container, responsive padding */}
        <ProductDataGrid />
      </Container>
    </ThemeProvider>
  );
}

export default App;