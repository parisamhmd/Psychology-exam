/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { makeStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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

import vector from '../assets/images/vector.png';
import horizontalVector from '../assets/images/horizontalVector.png';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '50rem',
    [theme.breakpoints.down('sm')]: {
      width: '22rem',
    },
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  vectorImg: {
    height: '79rem',
    width: '4rem',
    marginRight: '-1rem',
  },
  horizontalVectorImg: {
    width: '84%',
  },
}));

export default function RobotsCard({ description, onChange: handleChange }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const [valence, setValence] = useState(null);
  const [arousal, setArousal] = useState(null);

  useEffect(() => {
    if (valence !== null && arousal !== null) {
      setTimeout(function () {
        handleChange(valence, arousal);
      }, 150);
    }
  }, [valence, arousal]);

  return (
    <div className={classes.container}>
      <ContentWrapper component="main" maxWidth="xl">
        <Grid container xs={12}>
          <Typography component="h6" variant="subtitle2" sx={{ mb: 3 }}>
            {description}
          </Typography>
        </Grid>
        {matches ? (
          <>
            <Grid
              container
              sx={{ gap: 3 }}
              wrap="nowrap"
              alignItems="center"
              flexDirection="row-reverse"
            >
              {[v1, v2, v3, v4, v5].map((v, index) => (
                <Grid key={`v${index + 1}`} item xs={3}>
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
              wrap="nowrap"
              alignItems="center"
              justifyContent="space-between"
              flexDirection="row-reverse"
            >
              <Grid item xs={1} sx={{ ml: -1 }}>
                <Radio
                  disableRipple
                  checked={valence === 0}
                  onChange={() => setValence(0)}
                  value={0}
                  name="radio-buttons"
                />
                <Typography>{'<..'}</Typography>
              </Grid>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <>
                  <Grid item key={i} xs={8}>
                    <Radio
                      disableRipple
                      checked={valence === i}
                      onChange={() => setValence(i)}
                      value={i}
                      name="radio-buttons"
                    />
                    <Typography>{i}</Typography>
                  </Grid>
                  <Grid item key={i} xs={1} justifyContent="flex-start"></Grid>
                </>
              ))}
              <Grid item xs={1} sx={{ mr: -2 }}>
                <Radio
                  disableRipple
                  checked={valence === 10}
                  onChange={() => setValence(10)}
                  value={10}
                  name="radio-buttons"
                />
                <Typography>{'>..'}</Typography>
              </Grid>
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>خوشایند</Typography>
              <img
                src={horizontalVector}
                className={classes.horizontalVectorImg}
              />
              <Typography>ناخوشایند</Typography>
            </Grid>
            <Grid
              container
              sx={{ gap: 3, mt: 4 }}
              wrap="nowrap"
              alignItems="center"
              flexDirection="row-reverse"
            >
              {[a1, a2, a3, a4, a5].map((a, index) => (
                <Grid key={`a${index + 1}`} item xs={3}>
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
              wrap="nowrap"
              alignItems="center"
              justifyContent="space-between"
              flexDirection="row-reverse"
            >
              <Grid item xs={1} sx={{ ml: -1 }}>
                <Radio
                  disableRipple
                  checked={arousal === 0}
                  onChange={() => setArousal(0)}
                  value={0}
                  name="radio-buttons"
                />
                <Typography>{'<..'}</Typography>
              </Grid>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <>
                  <Grid item key={i} xs={8} justifyContent="flex-start">
                    <Radio
                      disableRipple
                      checked={arousal === i}
                      onChange={() => setArousal(i)}
                      value={i}
                      name="radio-buttons"
                    />
                    <Typography>{i}</Typography>
                  </Grid>
                  <Grid item key={i} xs={1} justifyContent="flex-start"></Grid>
                </>
              ))}
              <Grid item xs={1} sx={{ mr: -2 }}>
                <Radio
                  disableRipple
                  checked={arousal === 10}
                  onChange={() => setArousal(10)}
                  value={10}
                  name="radio-buttons"
                />
                <Typography>{'>..'}</Typography>
              </Grid>
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>برانگیخته</Typography>
              <img
                src={horizontalVector}
                className={classes.horizontalVectorImg}
              />
              <Typography>آرام</Typography>
            </Grid>
          </>
        ) : (
          <>
            <Grid container justifyContent="space-between">
              <Grid item xs={1} sx={{ height: '100%' }}>
                <Typography>ناخوشایند</Typography>
                <img src={vector} className={classes.vectorImg} />
                <Typography>خوشایند</Typography>
              </Grid>
              <Grid
                item
                xs={3}
                container
                alignItems="center"
                justifyContent="space-between"
                flexDirection="column"
              >
                <Grid item container sx={{ mt: 1 }} alignItems="center">
                  <Radio
                    disableRipple
                    checked={valence === 0}
                    onChange={() => setValence(0)}
                    value={0}
                    name="radio-buttons"
                  />
                  <Typography>{'>..'}</Typography>
                </Grid>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <>
                    <Grid item />
                    <Grid item key={i}>
                      <Radio
                        disableRipple
                        checked={valence === i}
                        onChange={() => setValence(i)}
                        value={i}
                        name="radio-buttons"
                      />
                      {i}
                    </Grid>
                  </>
                ))}
                <Grid
                  item
                  container
                  alignItems="center"
                  sx={{ mb: 1, mt: 2.5 }}
                >
                  <Radio
                    disableRipple
                    checked={valence === 10}
                    onChange={() => setValence(10)}
                    value={10}
                    name="radio-buttons"
                  />
                  <Typography>{'<..'}</Typography>
                </Grid>{' '}
              </Grid>
              <Grid
                item
                xs={7}
                container
                // sx={{ gap: }}
                wrap="wrap"
                alignItems="center"
                flexDirection="row-reverse"
              >
                {[v1, v2, v3, v4, v5].map((v, index) => (
                  <Grid key={`v${index + 1}`} item xs={12}>
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
            </Grid>
            <Grid container justifyContent="space-between" sx={{ mt: 10 }}>
              <Grid item xs={1} sx={{ height: '100%' }}>
                <Typography>آرام</Typography>
                <img src={vector} className={classes.vectorImg} />
                <Typography>برانگیخته</Typography>
              </Grid>
              <Grid
                item
                xs={3}
                container
                alignItems="center"
                justifyContent="space-between"
                flexDirection="column"
              >
                <Grid item container sx={{ mt: 1 }} alignItems="center">
                  <Radio
                    disableRipple
                    checked={arousal === 0}
                    onChange={() => setArousal(0)}
                    value={0}
                    name="radio-buttons"
                  />
                  <Typography>{'>..'}</Typography>
                </Grid>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <>
                    <Grid item />
                    <Grid item key={i}>
                      <Radio
                        disableRipple
                        checked={arousal === i}
                        onChange={() => setArousal(i)}
                        value={i}
                        name="radio-buttons"
                      />
                      {i}
                    </Grid>
                  </>
                ))}
                <Grid
                  item
                  container
                  alignItems="center"
                  sx={{ mb: 1, mt: 2.5 }}
                >
                  <Radio
                    disableRipple
                    checked={arousal === 10}
                    onChange={() => setArousal(10)}
                    value={10}
                    name="radio-buttons"
                  />
                  <Typography>{'<..'}</Typography>
                </Grid>{' '}
              </Grid>
              <Grid
                item
                xs={7}
                container
                sx={{ gap: 5 }}
                wrap="wrap"
                alignItems="center"
                flexDirection="row-reverse"
              >
                {[a1, a2, a3, a4, a5].map((a, index) => (
                  <Grid key={`a${index + 1}`} item xs={12}>
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
            </Grid>
          </>
        )}
      </ContentWrapper>
    </div>
  );
}
