/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';

import ContentWrapper from '../assets/ContentWrapper';

import v1 from '../assets/images/v1.png';
import v2 from '../assets/images/v2.png';
import v3 from '../assets/images/v3.png';
import v4 from '../assets/images/v4.png';
import v5 from '../assets/images/v5.png';

import a1 from '../assets/images/a1.png';
import a2 from '../assets/images/a2.png';
import a3 from '../assets/images/a3.png';
import a4 from '../assets/images/a4.png';
import a5 from '../assets/images/a5.png';

const useStyles = makeStyles({
  imageContainer: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});
export default function RobotsCard({ description, onChange: handleChange }) {
  const classes = useStyles();
  const [valence, setValence] = useState(null);
  const [arousal, setArousal] = useState(null);
  const [countDownTrial, setCountDownTrial] = useState(1);
  const [runTimer, setRunTimer] = useState(false);

  useEffect(() => {
    setRunTimer(true);
  }, []);

  useEffect(() => {
    let timerIdTrial;

    if (runTimer) {
      // TODO  change to 10
      setCountDownTrial(10);
      timerIdTrial = setInterval(() => {
        setCountDownTrial((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerIdTrial);
    }

    return () => clearInterval(timerIdTrial);
  }, [runTimer]);

  useEffect(() => {
    if (countDownTrial < 1 && runTimer) {
      setRunTimer(false);
      setCountDownTrial(1);
      handleChange(valence, arousal);
    }
  }, [countDownTrial, runTimer]);

  return (
    <Container component="main" maxWidth="xl">
      <ContentWrapper>
        <Grid container xs={11}>
          <Typography component="h6" variant="subtitle1" sx={{ mb: 3, mx: 2 }}>
            {description}
          </Typography>
        </Grid>
        <Grid
          container
          sx={{ gap: 2 }}
          wrap="nowrap"
          alignItems="center"
          flexDirection="row-reverse"
        >
          <Grid item xs={1}>
            <Typography> valence </Typography>
          </Grid>
          {[v1, v2, v3, v4, v5].map((v, index) => (
            <Grid key={`v${index + 1}`} item xs={2}>
              <Card>
                <img
                  src={v}
                  alt={`v${index + 1}`}
                  className={classes.imageContainer}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          sx={{ mr: 3.5 }}
          wrap="nowrap"
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row-reverse"
        >
          <Grid item xs={4}></Grid>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Grid item key={i} xs={2} justifyContent="flex-start">
              <Radio
                checked={valence === i}
                onChange={() => setValence(i)}
                value={i}
                name="radio-buttons"
              />
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          sx={{ gap: 3, mt: 4 }}
          wrap="nowrap"
          alignItems="center"
          flexDirection="row-reverse"
        >
          <Grid item xs={1}>
            <Typography> arousal </Typography>
          </Grid>
          {[a1, a2, a3, a4, a5].map((a, index) => (
            <Grid key={`a${index + 1}`} item xs={2}>
              <Card>
                <img
                  src={a}
                  alt={`a${index + 1}`}
                  className={classes.imageContainer}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          sx={{ mr: 3.5 }}
          wrap="nowrap"
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row-reverse"
        >
          <Grid item xs={4}></Grid>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Grid item key={i} xs={2} justifyContent="flex-start">
              <Radio
                checked={arousal === i}
                onChange={() => setArousal(i)}
                value={i}
                name="radio-buttons"
              />
            </Grid>
          ))}
        </Grid>
      </ContentWrapper>
    </Container>
  );
}
