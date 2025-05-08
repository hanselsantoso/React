import React from 'react';
import { Card as MuiCard, CardContent, CardActions, Typography } from '@mui/material';
import Button from './Button';

const Card = ({ title, description, buttonText }) => {
  return (
    <MuiCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button text={buttonText} />
      </CardActions>
    </MuiCard>
  );
};

export default Card;