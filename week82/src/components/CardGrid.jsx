import React from 'react';
import { Grid, Typography, Container } from '@mui/material';
import Card from './Card';

const CardGrid = () => {
  const cardData = [
    { id: 1, title: "Card 1", description: "This is the first card with some sample content.", buttonText: "Learn More" },
    { id: 2, title: "Card 2", description: "This is the second card with different content.", buttonText: "View Details" },
    { id: 3, title: "Card 3", description: "This is the third card with unique information.", buttonText: "Explore" },
    { id: 4, title: "Card 4", description: "This is the fourth card with interesting details.", buttonText: "Read More" },
    { id: 5, title: "Card 5", description: "This is the fifth card with compelling content.", buttonText: "Discover" },
    { id: 6, title: "Card 6", description: "This is the sixth card with engaging information.", buttonText: "Check Out" },
    { id: 7, title: "Card 7", description: "This is the seventh card with fascinating details.", buttonText: "See More" },
    { id: 8, title: "Card 8", description: "This is the eighth card with important content.", buttonText: "Get Started" },
    { id: 9, title: "Card 9", description: "This is the ninth card with helpful information.", buttonText: "Find Out" }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h2" align="center" gutterBottom>
        Our Services
      </Typography>
      <Grid container spacing={4}>
        {cardData.map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={4}>
            <Card
              title={card.title}
              description={card.description}
              buttonText={card.buttonText}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CardGrid;