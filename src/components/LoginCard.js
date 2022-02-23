/* eslint-disable react/prop-types */
import * as React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';

import ContentWrapper from '../assets/ContentWrapper';

import loginImage from '../assets/images/login.jpg';

const useStyles = makeStyles({
  imageContainer: {
    width: '18rem',
    height: '20rem',
  },
});

export default function LoginIn({ onClick: handleClick }) {
  const classes = useStyles();
  const [error, setError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!/^09[0-9]{9}$/.test(data.get('mobile_number'))) setError(true);
    else {
      handleClick({
        mobile_number: data.get('mobile_number'),
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <ContentWrapper>
        <Box>
          <img src={loginImage} className={classes.imageContainer} />
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'start',
            }}
          >
            <Typography component="h6" variant="subtitle1">
              شماره موبایل
            </Typography>
            <TextField
              error={error}
              required
              fullWidth
              id="mobile_number"
              name="mobile_number"
              autoFocus
              size="small"
              inputProps={{ maxLength: 11 }}
            />
            {error && (
              <Typography variant="subtitle2" color="error">
                شماره موبایل معتبر نمی باشد{' '}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ورود
            </Button>
          </Box>
        </Box>
      </ContentWrapper>
    </Container>
  );
}
