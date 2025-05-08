import React, { useState } from 'react';
import { CssBaseline, Box, Container, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/Header';
import Footer from './components/Footer';
import CardGrid from './components/CardGrid';
import Button from './components/Button';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header />
        
        <CardGrid />
        
        <Container component="main" maxWidth="sm" sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h6" component="p" gutterBottom>
            You clicked the button {count} times
          </Typography>
          <Button text="Click me" onClick={handleClick} />
        </Container>
        
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;