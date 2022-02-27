/* eslint-disable react/prop-types */
import React from 'react';

import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';

const useStyles = makeStyles({
  container: {
    borderRadius: '10px',
    boxShadow: '0px 0px 20px 5px #d8dde2',
    padding: '3rem',
    width: '100%',
  },
});
const ContentWrapper = ({ component = 'main', maxWidth = 'md', children }) => {
  const classes = useStyles();
  return (
    <Container
      className={classes.container}
      component={component}
      maxWidth={maxWidth}
      //   {...config}
    >
      {children}
    </Container>
  );
};
export default ContentWrapper;
