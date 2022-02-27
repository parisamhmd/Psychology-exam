/* eslint-disable react/prop-types */
import * as React from 'react';

import Box from '@mui/material/Box';
import { Typography, Button } from '@mui/material';
import Container from '@mui/material/Container';

import ContentWrapper from '../assets/ContentWrapper';

export default function WellComeCard({ onClick: handleClick }) {
  return (
    <Container component="main" maxWidth="lg">
      <ContentWrapper>
        <Box>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              lineHeight: '3rem',
            }}
          >
            شرکت‌کنندۀ گرامی، این مطالعه به منظور انجام پژوهشی جهت بررسی اثر
            تکرار کلامی روی تجربۀ هیجانی شما صورت می‌گیرد. خواهشمند است با
            اختصاص دقایقی از زمان خود ما را در انجام این مطالعه یاری نمایید.
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 5, mb: 0 }}
            onClick={() => handleClick()}
          >
            ورود برای شرکت در پژوهش{' '}
          </Button>
        </Box>
      </ContentWrapper>
    </Container>
  );
}
