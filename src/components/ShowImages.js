/* eslint-disable react/prop-types */
import React from 'react';

import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

import RobotsCard from './RobotsCard';

const useStyles = makeStyles({
  imageContainer: {
    width: '18rem',
    height: '20rem',
  },
});

export default function ShowImages({ images }) {
  const classes = useStyles();

  const [item, setItem] = React.useState(0);
  const [countDown, setCountDown] = React.useState(1);
  const [countDownTrial, setCountDownTrial] = React.useState(1);
  const [runTimer, setRunTimer] = React.useState(false);
  const [runTrialTimer, setRunTrialTimer] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [showImages, setShowImages] = React.useState(false);

  React.useEffect(() => {
    setRunTimer(true);
  }, []);

  React.useEffect(() => {
    let timerIdTrial;

    if (runTimer) {
      setCountDownTrial(5);
      timerIdTrial = setInterval(() => {
        setCountDownTrial((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerIdTrial);
    }

    return () => clearInterval(timerIdTrial);
  }, [runTimer]);

  React.useEffect(() => {
    if (countDownTrial < 1 && runTimer) {
      setRunTimer(false);
      setItem((item) => item + 1);
      setCountDownTrial(1);
      setShowImages(true);
    }
  }, [countDownTrial, runTimer]);

  return (
    <div style={{ width: '50rem' }}>
      countDownTrial: {countDownTrial}
      {!showImages ? (
        <>
          <img src={images[item]} className={classes.imageContainer} />
          <Typography component="h6" variant="subtitle1">
            به دقت نگاه کنید{' '}
          </Typography>
        </>
      ) : (
        <RobotsCard />
      )}
    </div>
  );
}
