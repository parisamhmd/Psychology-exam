/* eslint-disable react/prop-types */
import React from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AddIcon from '@mui/icons-material/Add';

import RobotsCard from './RobotsCard';
import ContentWrapper from '../assets/ContentWrapper';

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    width: '28rem',
    height: '29rem',
    [theme.breakpoints.down('md')]: {
      width: '20rem',
      height: '21rem',
    },
  },
}));

export default function ShowImages({ type, images, onClick: handleClick }) {
  const classes = useStyles();

  const [item, setItem] = React.useState(0);

  const [start, setStart] = React.useState(new Date().getTime());

  //   Fixtation Cross
  const [countDownFixCross, setCountDownFixCross] = React.useState(1);
  const [runFixCrossTimer, setRunFixCrossTimer] = React.useState(false);

  // images
  const [countDownTrial, setCountDownTrial] = React.useState(1);
  const [runTimer, setRunTimer] = React.useState(false);

  //   Intervention
  const [countDownIntervention, setCountDownIntervention] = React.useState(1);
  const [runInterventionTimer, setRunInterventionTimer] = React.useState(false);

  //   Break
  const [countDownBreak, setCountDownBreak] = React.useState(1);
  const [runBreakTimer, setRunBreakTimer] = React.useState(false);

  const [show, setShow] = React.useState('fix_cross');
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    setShow('fix_cross');
    setRunFixCrossTimer(true);
  }, []);

  //   fixation cross
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
      setShow('images');
      setRunTimer(true);
      setStart(new Date().getTime());
    }
  }, [countDownFixCross, runFixCrossTimer]);

  // images
  React.useEffect(() => {
    let timerIdTrial;

    if (runTimer) {
      setCountDownTrial(60);
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
      setData({
        ...data,
        [images[item].id]: {
          ...data[images[item].id],
          tolerance1: null,
        },
      });
      setShow('robots_bofore');
    }
  }, [countDownTrial, runTimer]);

  //   Intervention
  React.useEffect(() => {
    let timerIdIntervention;

    if (runInterventionTimer) {
      setCountDownIntervention(30);
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
      setShow('robots_after');
    }
  }, [countDownIntervention, runInterventionTimer]);

  //   Break
  React.useEffect(() => {
    let timerIdBreak;

    if (runBreakTimer) {
      setCountDownBreak(60);
      timerIdBreak = setInterval(() => {
        setCountDownBreak((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerIdBreak);
    }

    return () => clearInterval(timerIdBreak);
  }, [runBreakTimer]);

  React.useEffect(() => {
    if (countDownBreak < 1 && runBreakTimer) {
      setRunBreakTimer(false);
      setCountDownBreak(1);
      setShow('fix_cross');
      setRunFixCrossTimer(true);
    }
  }, [countDownBreak, runBreakTimer]);

  const renderTrial = () => (
    <div>
      {show === 'fix_cross' ? (
        <Card
          sx={{
            width: { lg: 275, xs: 190 },
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
      ) : show === 'images' ? (
        <>
          <img src={images[item]?.picture} className={classes.imageContainer} />
          <Typography component="h6" variant="h6" sx={{ my: 2 }}>
            به دقت به تصویر نگاه کنید
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              const end = new Date().getTime();
              setData({
                ...data,
                [images[item].id]: {
                  ...data[images[item].id],
                  tolerance1: end - start,
                },
              });
              setRunTimer(false);
              setCountDownTrial(1);
              setShow('robots_bofore');
            }}
          >
            کافی
          </Button>
        </>
      ) : show === 'robots_bofore' ? (
        <RobotsCard
          description="
          لطفا احساس خود را با انتخاب یک عدد (از 1 تا 9) از آدمک‌های ردیف اول و یک عدد از آدمک‌های ردیف دوم (1 تا 9) نشان دهید.
          "
          onChange={(valence, arousal) => {
            setData({
              ...data,
              [images[item].id]: {
                ...data[images[item].id],
                valence1: valence,
                arousal1: arousal,
              },
            });
            setShow('intervention');
            setRunInterventionTimer(true);
          }}
        />
      ) : show === 'intervention' ? (
        <>
          <img src={images[item]?.picture} className={classes.imageContainer} />
          <Typography component="h6" variant="h6" sx={{ mt: 2 }}>
            {type === 'see' && 'به تصویر نگاه کنید'}
            {type === 'description' && 'صحنه را توصیف کنید'}
            {type === 'room' && 'نام یک شیء در اتاق را تکرار کنید'}
            {type === 'repeat' && 'هیجان غالب خود را تکرار کنید'}
          </Typography>
        </>
      ) : show === 'robots_after' ? (
        <RobotsCard
          description="
          لطفا مجدداً احساس خود را با انتخاب یک عدد (از 1 تا 9) از آدمک‌های
          ردیف اول و یک عدد از آدمک‌های ردیف دوم (1 تا 9) نشان دهید.
          "
          onChange={(valence, arousal) => {
            setData({
              ...data,
              [images[item].id]: {
                ...data[images[item].id],
                valence2: valence,
                arousal2: arousal,
              },
            });
            setItem((item) => item + 1);
            setShow(item === 4 ? 'break' : 'fix_cross');
            item === 4 ? setRunBreakTimer(true) : setRunFixCrossTimer(true);
          }}
        />
      ) : show === 'break' ? (
        <>
          <Typography component="h6" variant="h4" sx={{ mt: 7 }}>
            یک دقیقه استراحت کنید
          </Typography>
          <Typography component="h6" variant="h4" sx={{ mt: 2 }}>
            {countDownBreak}
          </Typography>
        </>
      ) : null}
    </div>
  );
  return (
    <div>
      {item < 11 ? (
        renderTrial()
      ) : (
        <ContentWrapper>
          <Typography component="h6" variant="h5">
            پایان مرحلۀ دوم آزمون{' '}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              handleClick(data);
            }}
            sx={{ my: 5 }}
          >
            ورود به مرحلۀ پایانی آزمون{' '}
          </Button>
          <Typography variant="h5">
            در این مرحله ده تصویر قبل را مشاهده خواهید کرد. لطفاً طبق دستورالعمل
            زیر هر تصویر عمل کنید.
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            برای تصاویر مثبت: لطفاً تا زمانی که علاقه دارید به تصویر نگاه کنید.
            در غیر این صورت با انتخاب دگمۀ کافی به مرحلۀ بعد بروید.
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            برای تصاویر منفی: لطفاً تا زمانی که تحمل تماشای تصویر را دارید آن را
            نگاه کنید. در غیر این صورت با انتخاب دگمۀ کافی به مرحلۀ بعد بروید.{' '}
          </Typography>
        </ContentWrapper>
      )}
    </div>
  );
}
