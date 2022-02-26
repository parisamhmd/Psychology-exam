import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
export default function RobotsCard() {
  const classes = useStyles();
  const [valence, setValence] = useState(undefined);
  const [arousal, setArousal] = useState(undefined);

  return (
    <Container component="main" maxWidth="xl">
      <ContentWrapper>
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
          <Grid item xs={2}>
            <Card>
              <img src={v1} alt="v1" className={classes.imageContainer} />
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card>
              <img src={v2} alt="v2" className={classes.imageContainer} />
            </Card>{' '}
          </Grid>
          <Grid item xs={2}>
            <Card>
              <img src={v3} alt="v3" className={classes.imageContainer} />
            </Card>{' '}
          </Grid>
          <Grid item xs={2}>
            <Card>
              <img src={v4} alt="v4" className={classes.imageContainer} />
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card>
              <img src={v5} alt="v5" className={classes.imageContainer} />
            </Card>
          </Grid>
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
          <Grid item xs={2}>
            <Card>
              <img src={a1} alt="a1" className={classes.imageContainer} />
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card>
              <img src={a2} alt="a2" className={classes.imageContainer} />
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card>
              <img src={a3} alt="a3" className={classes.imageContainer} />
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card>
              <img src={a4} alt="a4" className={classes.imageContainer} />
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card>
              <img src={a5} alt="a5" className={classes.imageContainer} />
            </Card>
          </Grid>
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
