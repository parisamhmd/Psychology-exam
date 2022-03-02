/* eslint-disable react/prop-types */
import * as React from 'react';

import Box from '@mui/material/Box';
import { Typography, Button } from '@mui/material';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';

import ContentWrapper from '../assets/ContentWrapper';
import thanksImage from '../assets/images/thank.png';

const useStyles = makeStyles({
  imageContainer: {
    width: '25rem',
    height: '20rem',
  },
});

export default function ThanksCard() {
  const classes = useStyles();
  React.useEffect(() => {
    localStorage.removeItem('step');
  });
  return (
    <Container component="main" maxWidth="sm">
      <ContentWrapper>
        <Box>
          <img
            src={thanksImage}
            alt="thank-you"
            className={classes.imageContainer}
          />
          <Typography component="h1" variant="h5">
            با تشکر از مشارکت شما در این پژوهش{' '}
          </Typography>
        </Box>
      </ContentWrapper>
    </Container>
  );
}
