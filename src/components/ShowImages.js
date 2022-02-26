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

  //   Intervention
  const [countDownIntervention, setCountDownIntervention] = React.useState(1);
  const [runInterventionTimer, setRunInterventionTimer] = React.useState(false);

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
      setShow('robots_bofore');
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
      setShow('robots_after');
      //   setShow('images');
      //   setRunTimer(true);
    }
  }, [countDownIntervention, runInterventionTimer]);

  React.useEffect(() => {
    if (item > 9) {
      setShow(undefined);
    }
  }, [item]);

  const renderTrial = () => (
    <div style={{ width: '50rem' }}>
      {show === 'images' ? (
        <>
          {/*  TODO save data with id of image   */}
          <img src={images[item]} className={classes.imageContainer} />
          <Typography component="h6" variant="subtitle1">
            countDownTrial: {countDownTrial}
            به دقت نگاه کنید{' '}
          </Typography>
        </>
      ) : show === 'robots_bofore' ? (
        <RobotsCard
          // TODO save data with id of image
          description="
          لطفا احساس خود را با انتخاب یک عدد (از 1 تا 9) از آدمک‌های ردیف اول و یک عدد از آدمک‌های ردیف دوم (1 تا 9) نشان دهید.
          "
          onChange={(valence, arousal) => {
            setData({ valence_before: valence, arousal_before: arousal });
            setShow('intervention');
            setRunInterventionTimer(true);
          }}
        />
      ) : show === 'intervention' ? (
        <>
          {/* TODO ID  */}
          <img src={images[item]} className={classes.imageContainer} />
          <Typography component="h6" variant="subtitle1">
            countDownIntervention{item}: {countDownIntervention}• به تصویر نگاه
            کنید • صحنه را توصیف کنید • در مورد موضوع دیگری صحبت کنید • هیجان
            غالب خود را تکرار کنید به دقت نگاه کنید{' '}
          </Typography>
        </>
      ) : show === 'robots_after' ? (
        <RobotsCard
          // TODO save data with id of image
          description="
          لطفا مجدداً احساس خود را با انتخاب یک عدد (از 1 تا 9) از آدمک‌های
          ردیف اول و یک عدد از آدمک‌های ردیف دوم (1 تا 9) نشان دهید.
          "
          onChange={(valence, arousal) => {
            setData({ valence_after: valence, arousal_after: arousal });
            setShow('images');
            setRunTimer(true);
          }}
        />
      ) : null}
    </div>
  );
  return <div>{item < 10 ? renderTrial() : 'kk'}</div>;
}
