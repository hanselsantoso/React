import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions, 
  CardHeader,
  Button, 
  Avatar, 
  IconButton,
  Divider,
  Rating,
  Stack,
  Chip,
  Container
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BookmarkIcon from '@mui/icons-material/Bookmark';

// Import placeholder images to prevent broken links
// In a real app, these would be actual image URLs
const placeholderImage = "https://placehold.co/600x400/1976d2/ffffff?text=Travel+Image";
const placeholderUserImage = "https://placehold.co/600x400/dc004e/ffffff?text=Food+Image";
const placeholderProductImage = "https://placehold.co/600x400/4caf50/ffffff?text=Product+Image";
const placeholderTeamImage = "https://placehold.co/600x400/ff9800/ffffff?text=Team+Member";

function CardPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Card Components
        </Typography>
        
        <Grid container spacing={4}>
          {/* Media Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={placeholderImage}
                alt="green iguana"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  Travel Destination
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Explore beautiful landscapes and experience local culture in this amazing
                  destination. Perfect for adventure seekers and photography enthusiasts.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">Share</Button>
                <Button size="small" color="primary">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          
          {/* Social Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: 'primary.main' }}>R</Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Robert Johnson"
                subheader="September 14, 2023"
              />
              <CardMedia
                component="img"
                height="200"
                image={placeholderUserImage}
                alt="post image"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Just visited this amazing restaurant downtown! The food was absolutely delicious
                  and the atmosphere was perfect for a Friday night out.
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  15 likes
                </Typography>
              </CardActions>
            </Card>
          </Grid>
          
          {/* Product Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={placeholderProductImage}
                alt="product"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography gutterBottom variant="h5" component="div">
                    Wireless Headphones
                  </Typography>
                  <Chip label="Sale" color="error" size="small" />
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Premium wireless headphones with noise cancellation technology and 20-hour battery life.
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <Rating name="read-only" value={4.5} precision={0.5} readOnly />
                  <Typography variant="body2" color="text.secondary">(142)</Typography>
                </Stack>
                <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                  $129.99
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                  $179.99
                </Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Button 
                  startIcon={<ShoppingCartIcon />} 
                  variant="contained" 
                  color="primary" 
                  sx={{ flexGrow: 1 }}
                >
                  Add to Cart
                </Button>
                <IconButton aria-label="bookmark">
                  <BookmarkIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
          
          {/* Simple Info Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" gutterBottom>
                  Getting Started
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Follow these steps to set up your account and start using our platform:
                </Typography>
                <Box component="ol" sx={{ pl: 2, mt: 2 }}>
                  <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                    Complete your profile information
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                    Verify your email address
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                    Set up two-factor authentication
                  </Typography>
                  <Typography component="li" variant="body2">
                    Explore the dashboard features
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Go to Profile
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          {/* Statistic Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography color="text.secondary" gutterBottom>
                  Monthly Revenue
                </Typography>
                <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
                  $24,568
                </Typography>
                <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                  +12% from last month
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography color="text.secondary" gutterBottom>
                      Orders
                    </Typography>
                    <Typography variant="h6">
                      1,543
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="text.secondary" gutterBottom>
                      Customers
                    </Typography>
                    <Typography variant="h6">
                      892
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Team Member Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={placeholderTeamImage}
                alt="team member"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div" align="center">
                  Sarah Johnson
                </Typography>
                <Typography variant="body2" color="primary.main" align="center" gutterBottom>
                  Senior UI/UX Designer
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  With over 8 years of experience in design, Sarah specializes in creating intuitive
                  user experiences and beautiful interfaces for web and mobile applications.
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button size="small" color="primary">Contact</Button>
                <Button size="small" color="primary">Portfolio</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default CardPage;