import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.dark', color: 'white', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              My React App
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              © 2025 All rights reserved
            </Typography>
          </Grid>
          
          <Grid item xs={6} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link href="#" color="inherit" display="block" sx={{ mb: 0.5, color: 'rgba(255, 255, 255, 0.7)' }}>
                Home
              </Link>
              <Link href="#" color="inherit" display="block" sx={{ mb: 0.5, color: 'rgba(255, 255, 255, 0.7)' }}>
                About
              </Link>
              <Link href="#" color="inherit" display="block" sx={{ mb: 0.5, color: 'rgba(255, 255, 255, 0.7)' }}>
                Services
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={6} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5, color: 'rgba(255, 255, 255, 0.7)' }}>
              contact@example.com
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              123-456-7890
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;