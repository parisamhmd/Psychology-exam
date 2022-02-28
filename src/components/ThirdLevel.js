/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

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
      {item < 10 ? (
        <>
          <img src={images[item].picture} className={classes.imageContainer} />
          <Button
            variant="contained"
            onClick={() => {
              const end = new Date().getTime();
              if (item === 0) setData({ [item]: end - start });
              else setData({ ...data, [item]: end - data[item - 1] - start });
              setFinalData({
                ...finalData,
                [images[item].id]: `${data[item]}ss${item}`,
              });
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
