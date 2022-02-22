import * as React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ContentWrapper from '../assets/ContentWrapper';

import loginImage from '../assets/images/login.jpg';

const useStyles = makeStyles({
  textInputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
});

export default function FormData() {
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    // console.log({
    //   'mobile-number': data.get('mobile-number'),
    // });
  };

  return (
    <Container component="main" maxWidth="xs">
      <ContentWrapper>
        <Box
          component="form"
          onSubmit={handleSubmit}
          // noValidate
          sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'start',
            gap: '1.5rem',
          }}
        >
          <div className={classes.textInputContainer}>
            <Typography component="h6" variant="subtitle1">
              نام و نام‌خاوندگی
            </Typography>
            <TextField
              required
              fullWidth
              id="name"
              name="name"
              autoFocus
              size="small"
              //   TODO
              inputProps={{ maxLength: 150 }}
            />
          </div>
          <div className={classes.textInputContainer}>
            <Typography component="h6" variant="subtitle1">
              سن
            </Typography>
            <TextField
              required
              fullWidth
              id="mobile-number"
              name="mobile-number"
              type="number"
              size="small"
              // TODO
              inputProps={{ inputProps: { min: '5', max: 90 } }}
            />
          </div>
          <div className={classes.textInputContainer}>
            <Typography component="h6" variant="subtitle1">
              جنسیت
            </Typography>
            <FormControl fullWidth>
              <Select size="small" required fullWidth id="gender" name="gender">
                <MenuItem value="women">زن</MenuItem>
                <MenuItem value="man">مرد</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.textInputContainer}>
            <Typography component="h6" variant="subtitle1">
              سطح تحصیلات
            </Typography>
            <FormControl fullWidth>
              <Select size="small" required fullWidth id="gender" name="gender">
                <MenuItem value="under-diploma">زیر دیپلم</MenuItem>
                <MenuItem value="diploma">دیپلم</MenuItem>
                <MenuItem value="masters">دیپلم</MenuItem>
                <MenuItem value="Bsc">کارشناسی ارشد</MenuItem>
                <MenuItem value="phd">دکترا و بالاتر</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* TODO */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ورود به مرحله اول آزمون{' '}
          </Button>
        </Box>
      </ContentWrapper>
    </Container>
  );
}
