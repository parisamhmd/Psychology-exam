import React, { useState, useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function ShowPictures() {
  const [countDown, setCountDown] = React.useState(1);
  const [runTimer, setRunTimer] = React.useState(false);

  React.useEffect(() => {
    let timerId;

    if (runTimer) {
      setCountDown(3);
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);

  React.useEffect(() => {
    if (countDown < 1 && runTimer) {
      setRunTimer(false);
      setCountDown(1);
    }
  }, [countDown, runTimer]);

  const getImages = async () => {
    const res = await axios.get('/images');
    return res.data;
  };
  const { data: images, status } = useQuery('/images', getImages);

  return (
    <div className="App">
      {status !== 'success' ? (
        <Box sx={{ mt: 15 }}>
          <CircularProgress size={70} />
          <Typography variant="h4" sx={{ mt: 5 }}>
            در حال بارگیری تصاویر آزمون
          </Typography>
        </Box>
      ) : (
        <Box sx={{ mt: 20 }}>
          {runTimer ? (
            <Typography variant="h1">{countDown}</Typography>
          ) : (
            <Button
              variant="contained"
              sx={{ mt: 5 }}
              onClick={() => setRunTimer(true)}
            >
              شروع مرحله‌ی دوم آزمون
            </Button>
          )}
        </Box>
      )}
    </div>
  );
}
