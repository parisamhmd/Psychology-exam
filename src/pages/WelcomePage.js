import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => ({
  container: {},
}));

const WelcomePage = () => {
  const classes = useStyle();
  return <div className={classes.container}>x df</div>;
};

export default WelcomePage;
