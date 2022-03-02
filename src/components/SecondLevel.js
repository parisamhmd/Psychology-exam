/* eslint-disable react/prop-types */
import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import ShowImages from './ShowImages';

export default function SecondLevel({
  type,
  images,
  isLoading,
  onClick: handleClick,
}) {
  const [countDown, setCountDown] = React.useState(1);
  const [runTimer, setRunTimer] = React.useState(false);
  const [show, setShow] = React.useState(false);

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
      setShow(true);
    }
  }, [countDown, runTimer]);

  return (
    <div>
      {isLoading ? (
        <Box sx={{ mt: 15 }}>
          <CircularProgress size={70} />
          <Typography variant="h4" sx={{ mt: 5 }}>
            در حال بارگیری تصاویر آزمون
          </Typography>
        </Box>
      ) : (
        <>
          {runTimer ? (
            <Box sx={{ mt: 20 }}>
              <Typography variant="h1">{countDown}</Typography>
            </Box>
          ) : !show ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 20,
              }}
            >
              <Typography variant="h6" sx={{ width: '60%' }}>
                در این مرحله 10 تصویر (5 تصویر خوشایند و 5 تصویر ناخوشایند)
                خواهید دید تا تجربۀ هیجانی شما در مواجهه با تصاویر و حالت‌های
                مختلف ثبت شود. لطفاً طبق دستورالعمل‌هایی که طی آزمون داده می‌شود
                عمل کنید. بین هر 5 تصویر یک دقیقه استراحت خواهید داشت.
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 3 }}
                onClick={() => setRunTimer(true)}
              >
                شروع مرحله‌ی دوم آزمون
              </Button>
            </Box>
          ) : (
            <ShowImages type={type} images={images} onClick={handleClick} />
          )}
        </>
      )}
    </div>
  );
}
