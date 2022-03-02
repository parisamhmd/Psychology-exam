/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AddIcon from '@mui/icons-material/Add';

import ContentWrapper from '../assets/ContentWrapper';

const useStyles = makeStyles({
  imageContainer: {
    width: '28rem',
    height: '29rem',
  },
});

export default function ThirdLevel({ images, onClick: handleClick }) {
  const classes = useStyles();

  const [item, setItem] = useState(0);
  const [data, setData] = useState({});
  const [finalData, setFinalData] = useState({});
  const [start] = useState(new Date().getTime());
  const [showFixCross, setShowFixCross] = useState(true);

  //   Fixtation Cross
  const [countDownFixCross, setCountDownFixCross] = React.useState(1);
  const [runFixCrossTimer, setRunFixCrossTimer] = React.useState(true);

  React.useEffect(() => {
    let timerIdFixCross;

    if (runFixCrossTimer) {
      setCountDownFixCross(5);
      timerIdFixCross = setInterval(() => {
        setCountDownFixCross((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerIdFixCross);
    }

    return () => clearInterval(timerIdFixCross);
  }, [runFixCrossTimer]);

  React.useEffect(() => {
    if (countDownFixCross < 1 && runFixCrossTimer) {
      setRunFixCrossTimer(false);
      setCountDownFixCross(1);
      setShowFixCross(false);
    }
  }, [countDownFixCross, runFixCrossTimer]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        mt: 2,
        gap: 3,
      }}
    >
      {showFixCross ? (
        <Card
          sx={{
            minWidth: 275,
            backgroundColor: 'black',
            padding: '4rem',
            mt: 9,
          }}
        >
          <CardContent>
            <AddIcon
              fontSize="large"
              style={{ color: 'white', fontSize: '4rem' }}
            />
          </CardContent>
        </Card>
      ) : item < 10 ? (
        <>
          <img src={images[item].picture} className={classes.imageContainer} />
          <Button
            variant="contained"
            onClick={() => {
              const end = new Date().getTime();
              if (item === 0) {
                setData({ [item]: end - start });
                setFinalData({
                  ...finalData,
                  [images[item].id]: end - start,
                });
              } else {
                setData({ ...data, [item]: end - data[item - 1] - start });
                setFinalData({
                  ...finalData,
                  [images[item].id]: end - data[item - 1] - start,
                });
              }
              setItem((item) => (item = item + 1));
            }}
          >
            کافی
          </Button>
        </>
      ) : (
        <ContentWrapper>
          <Typography component="h6" variant="h5">
            پایان مرحلۀ سوم{' '}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              handleClick(finalData);
            }}
            sx={{ my: 5 }}
          >
            ورود به مرحلۀ پایانی آزمون
          </Button>
        </ContentWrapper>
      )}
    </Box>
  );
}
