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

export default function ThirdLevel({ type, images, onClick: handleClick }) {
  const classes = useStyles();

  const [item, setItem] = React.useState(0);

  //   Fixation Cross
  const [countDownFixCross, setCountDownFixCross] = React.useState(1);
  const [runFixCrossTimer, setRunFixCrossTimer] = React.useState(false);

  // images
  const [countDownTrial, setCountDownTrial] = React.useState(1);
  const [runTimer, setRunTimer] = React.useState(false);

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
      setCountDownFixCross(10);
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
    }
  }, [countDownFixCross, runFixCrossTimer]);

  // images
  React.useEffect(() => {
    let timerIdTrial;

    if (runTimer) {
      setCountDownTrial(30);
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
      setShow('robots');
    }
  }, [countDownTrial, runTimer]);

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
            {type === 'see' && 'به تصویر نگاه کنید'}
            {type === 'description' && 'صحنه را توصیف کنید'}
            {type === 'room' && 'نام یک شیء در اتاق را تکرار کنید'}
            {type === 'repeat' && 'هیجان غالب خود را تکرار کنید'}{' '}
          </Typography>
        </>
      ) : show === 'robots' ? (
        <RobotsCard
          hasExtraButton
          description="
          لطفا احساس خود را با انتخاب یک عدد (از 1 تا 9) از آدمک‌های ردیف اول و یک عدد از آدمک‌های ردیف دوم (1 تا 9) نشان دهید.
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
            setShow('fix_cross');
            setRunFixCrossTimer(true);
          }}
        />
      ) : null}
    </div>
  );
  return (
    <div>
      {item < images?.length ? (
        renderTrial()
      ) : (
        <ContentWrapper>
          <Typography component="h6" variant="h5">
            پایان مرحلۀ سوم آزمون{' '}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              handleClick(data);
            }}
            sx={{ my: 5 }}
          >
            ورود به مرحلۀ چهارم آزمون{' '}
          </Button>
          <Typography variant="h5">
            لطفاً تا زمانی که تا زمانی که تماشای تصویر برای شما ناخوشایند نیست،
            آن را نگاه کنید و پس از آن با زدن دگمه کافی به قسمت بعدی بروید.{' '}
          </Typography>
        </ContentWrapper>
      )}
    </div>
  );
}
