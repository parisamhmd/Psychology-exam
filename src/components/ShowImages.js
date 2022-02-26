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
  const [countDownTrial, setCountDownTrial] = React.useState(1);
  const [runTimer, setRunTimer] = React.useState(false);
  const [showImages, setShowImages] = React.useState(false);

  //   Intervention
  const [countDownIntervention, setCountDownIntervention] = React.useState(1);
  const [runInterventionTimer, setRunInterventionTimer] = React.useState(false);
  const [showIntervention, setShowIntervention] = React.useState(false);

  const [show, setShow] = React.useState('images');
  const [data, setData] = React.useState({});

  //   images timer
  React.useEffect(() => {
    setShow('images');
    setRunTimer(true);
  }, []);

  React.useEffect(() => {
    let timerIdTrial;

    if (runTimer) {
      // TODO 5ms
      setCountDownTrial(2);
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
      setCountDownTrial(1);
      setItem((item) => item + 1);
      setShowImages(true);
    }
  }, [countDownTrial, runTimer]);

  //   Intervention
  React.useEffect(() => {
    let timerIdIntervention;

    if (runInterventionTimer) {
      // TODO 30ms
      setCountDownIntervention(3);
      timerIdIntervention = setInterval(() => {
        setCountDownIntervention((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerIdIntervention);
    }

    return () => clearInterval(timerIdIntervention);
  }, [runInterventionTimer]);

  React.useEffect(() => {
    if (countDownIntervention < 1 && runInterventionTimer) {
      setRunInterventionTimer(false);
      setCountDownIntervention(1);
      setItem((item) => item + 1);
      //   setShowImages(true);
    }
  }, [countDownIntervention, runInterventionTimer]);

  React.useEffect(() => {
    if (item > 9) {
      setShow('intervention');
      setShowIntervention(true);
      setRunInterventionTimer(true);
    }
    if (item > 19) {
      setShow('ff');
      setShowIntervention(false);
    }
  }, [item]);

  const renderImage = () => (
    <div style={{ width: '50rem' }}>
      {!showImages ? (
        <>
          {/* TODO ID  */}
          <img src={images[item]} className={classes.imageContainer} />
          <Typography component="h6" variant="subtitle1">
            countDownTrial: {countDownTrial}
            به دقت نگاه کنید{' '}
          </Typography>
        </>
      ) : (
        <RobotsCard
          // TODO ID
          onChange={(valence, arousal) => {
            setData({ valence_before: valence, arousal_before: arousal });
            setItem((item) => (item = item + 1));
            setRunTimer(true);
            setShowImages(false);
          }}
        />
      )}
    </div>
  );

  const renderIntervention = () => (
    <div style={{ width: '50rem' }}>
      {/* TODO ID  */}
      <img src={images[item]} className={classes.imageContainer} />
      <Typography component="h6" variant="subtitle1">
        countDownIntervention{item}: {countDownIntervention}• به تصویر نگاه کنید
        • صحنه را توصیف کنید • در مورد موضوع دیگری صحبت کنید • هیجان غالب خود را
        تکرار کنید به دقت نگاه کنید{' '}
      </Typography>
    </div>
  );

  return (
    <div>
      {/* {!showIntervention
        ? showImages
          ? renderImage()
          : renderIntervention()
        : 'gg'} */}
      {show === 'images'
        ? renderImage()
        : show === 'intervention'
        ? renderIntervention()
        : 'finish '}
    </div>
  );
}
