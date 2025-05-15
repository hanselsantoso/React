import React from 'react';
import ProductDataGrid from './components/ProductDataGrid';
import { CssBaseline, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Optional: For custom theme

// Optional: Define a simple theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // A standard blue
    },
    secondary: {
      main: '#dc004e', // A standard pink
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}> {/* Optional: Apply theme */}
      <CssBaseline /> {/* MUI's baseline CSS reset */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}> {/* maxWidth="lg" makes it wider */}
        <ProductDataGrid />
      </Container>
    </ThemeProvider>
  );
}

export default App;