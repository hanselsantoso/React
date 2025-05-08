import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function Header() {
  const location = useLocation();
  
  return (
    <AppBar position="fixed" sx={{ bgcolor: '#1976d2' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/" 
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'white',
              fontWeight: 700 
            }}
          >
            MUI React App
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/"
              sx={{ 
                mx: 1, 
                fontWeight: location.pathname === '/' ? 'bold' : 'normal',
                borderBottom: location.pathname === '/' ? '2px solid white' : 'none'
              }}
            >
              FORM
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/widgets"
              sx={{ 
                mx: 1, 
                fontWeight: location.pathname === '/widgets' ? 'bold' : 'normal',
                borderBottom: location.pathname === '/widgets' ? '2px solid white' : 'none'
              }}
            >
              WIDGETS
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/cards"
              sx={{ 
                mx: 1, 
                fontWeight: location.pathname === '/cards' ? 'bold' : 'normal',
                borderBottom: location.pathname === '/cards' ? '2px solid white' : 'none'
              }}
            >
              CARDS
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;