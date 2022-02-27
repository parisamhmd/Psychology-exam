/* eslint-disable react/prop-types */
import * as React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ContentWrapper from '../assets/ContentWrapper';

const useStyles = makeStyles({
  textInputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
});

export default function PersonalInfoForm({ onClick: handleClick }) {
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleClick({
      name: data.get('name'),
      family_name: data.get('family_name'),
      age: +data.get('age'),
      gender: data.get('gender'),
      education_level: +data.get('education_level'),
    });
  };

  return (
    <ContentWrapper component="main" maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'start',
          gap: '1rem',
        }}
      >
        <div className={classes.textInputContainer}>
          <Typography component="h6" variant="subtitle1">
            نام
          </Typography>
          <TextField
            required
            fullWidth
            id="name"
            name="name"
            autoFocus
            size="small"
            inputProps={{ maxLength: 100 }}
          />
        </div>
        <div className={classes.textInputContainer}>
          <Typography component="h6" variant="subtitle1">
            نام‌خانودگی
          </Typography>
          <TextField
            required
            fullWidth
            id="family_name"
            name="family_name"
            size="small"
            inputProps={{ maxLength: 100 }}
          />
        </div>
        <div className={classes.textInputContainer}>
          <Typography component="h6" variant="subtitle1">
            سن
          </Typography>
          <TextField
            required
            fullWidth
            id="age"
            name="age"
            type="number"
            size="small"
            InputProps={{ inputProps: { min: 5, max: 90 } }}
          />
        </div>
        <div className={classes.textInputContainer}>
          <Typography component="h6" variant="subtitle1">
            جنسیت
          </Typography>
          <FormControl fullWidth>
            <Select size="small" required fullWidth id="gender" name="gender">
              <MenuItem value="female">زن</MenuItem>
              <MenuItem value="male">مرد</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.textInputContainer}>
          <Typography component="h6" variant="subtitle1">
            سطح تحصیلات
          </Typography>
          <FormControl fullWidth>
            <Select
              size="small"
              required
              fullWidth
              id="education_level"
              name="education_level"
            >
              <MenuItem value="1">زیر دیپلم</MenuItem>
              <MenuItem value="2">دیپلم</MenuItem>
              <MenuItem value="3">کارشناسی</MenuItem>
              <MenuItem value="4">کارشناسی ارشد</MenuItem>
              <MenuItem value="5">دکترا و بالاتر</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 1 }}
        >
          ورود به مرحله اول آزمون{' '}
        </Button>
      </Box>
    </ContentWrapper>
  );
}
