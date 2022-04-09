/* eslint-disable react/prop-types */
import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import ShowImages from './ShowImages';

export default function SecondLevel({
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
        <Box
          sx={{
            mt: { sm: 15, xs: 5 },
          }}
        >
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
                mt: { sm: 20, xs: 3 },
              }}
            >
              <Typography variant="h6" sx={{ width: { sm: '60%', xs: '80%' } }}>
                در این مرحله 11 تصویر ناخوشایند خواهید دید تا تجربۀ هیجانی شما
                در مواجهه با تصاویر مختلف ثبت شود. لطفاً تا زمانی که تماشای
                تصویر برای شما ناخوشایند نیست، به دقت آن را نگاه کنید و پس از آن
                با زدن دگمۀ کافی به قسمت بعدی بروید و احساس خود را با انتخاب یک
                عدد (از 1 تا 9) از آدمک‌های ستون اول و یک عدد از آدمک‌های ستون
                دوم (از 1 تا 9) نشان دهید.{' '}
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
            <ShowImages images={images} onClick={handleClick} />
          )}
        </>
      )}
    </div>
  );
}
