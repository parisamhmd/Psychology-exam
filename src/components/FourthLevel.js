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

export default function FourthLevel({ type, images, onClick: handleClick }) {
  const classes = useStyles();

  const [item, setItem] = React.useState(0);

  const [start, setStart] = React.useState(new Date().getTime());

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
          tolerance2: null,
        },
      });
      setItem((item) => item + 1);
      setShow('fix_cross');
      setRunFixCrossTimer(true);
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
                  tolerance2: end - start,
                },
              });
              setRunTimer(false);
              setCountDownTrial(1);
              setItem((item) => item + 1);
              setShow('fix_cross');
              setRunFixCrossTimer(true);
            }}
          >
            کافی
          </Button>
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
            پایان مرحلۀ چهارم آزمون{' '}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              handleClick(data);
            }}
            sx={{ my: 5 }}
          >
            ورود به مرحلۀ آخر آزمون{' '}
          </Button>
        </ContentWrapper>
      )}
    </div>
  );
}
