import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        mt: 'auto',
        py: 3,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800],
      }}
    >
      <Divider />
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              My React MUI Application
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A comprehensive example of React with Material UI featuring forms, widgets, and card components.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Navigation
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Form Page
            </Link>
            <Link href="/widgets" color="inherit" display="block" sx={{ mb: 1 }}>
              Widgets Page
            </Link>
            <Link href="/cards" color="inherit" display="block">
              Cards Page
            </Link>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            <Link href="https://mui.com" target="_blank" rel="noopener" color="inherit" display="block" sx={{ mb: 1 }}>
              Material UI Documentation
            </Link>
            <Link href="https://reactjs.org" target="_blank" rel="noopener" color="inherit" display="block" sx={{ mb: 1 }}>
              React Documentation
            </Link>
            <Link href="https://reactrouter.com" target="_blank" rel="noopener" color="inherit" display="block">
              React Router Documentation
            </Link>
          </Grid>
        </Grid>
      </Container>
      
      <Divider />
      <Box sx={{ py: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © 2025 React & MUI Tutorial - All rights reserved
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;