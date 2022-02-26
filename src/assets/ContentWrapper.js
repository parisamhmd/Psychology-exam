/* eslint-disable react/prop-types */
import React from 'react';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    borderRadius: '10px',
    boxShadow: '0px 0px 20px 5px #d8dde2',
    padding: '3rem',
    width: '100%',
  },
});
const ContentWrapper = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.container}>{children}</div>;
};
export default ContentWrapper;
