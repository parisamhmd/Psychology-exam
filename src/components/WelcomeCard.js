import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography, Button } from '@mui/material';
import Container from '@mui/material/Container';

export default function SignIn() {
  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          fontFamily: 'Vazir',
        }}
      >
        <Typography component="h1" variant="h5">
          شرکت‌کنندۀ گرامی، این مطالعه به منظور انجام پژوهشی جهت بررسی اثر تکرار
          کلامی روی تجربۀ هیجانی شما صورت می‌گیرد. خواهشمند است با اختصاص دقایقی
          از زمان خود ما را در انجام این مطالعه یاری نمایید.
        </Typography>
        <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
          ورود برای شرکت در پژوهش{' '}
        </Button>
      </Box>
    </Container>
  );
}
