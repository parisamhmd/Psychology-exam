export default function InterventionCard() {
  React.useEffect(() => {
    let timerIdIntervention;

    if (runTimer) {
      setCountDownIntervention(5);
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
      setItem((item) => item + 1);
      //   setShowImages(true);
    }
  }, [countDownIntervention, runInterventionTimer]);
  return (
    <div style={{ width: '50rem' }}>
      {/* TODO ID  */}
      <img src={images[item]} className={classes.imageContainer} />
      <Typography component="h6" variant="subtitle1">
        countDownIntervention: {countDownIntervention}
        به دقت نگاه کنید{' '}
      </Typography>
    </div>
  );
}
