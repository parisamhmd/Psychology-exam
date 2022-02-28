import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import WelcomeCard from './components/WelcomeCard';
import LoginCard from './components/LoginCard';
import PersonalInfoForm from './components/PersonalInfoForm';
import BMISCARD from './components/BMISCard';
import SecondLevel from './components/SecondLevel';
import ThirdLevel from './components/ThirdLevel';
import ThanksCard from './components/ThanksCard';

import './App.css';

function App() {
  const { link } = useParams();

  const [step, setStep] = useState(5);
  const [registrationData, setRegistrationData] = useState({});
  const [applyData, setApplyData] = useState({});
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAgree = () => {
    setStep(4);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getImages = async () => {
    const res = await axios.get('/images');
    return res.data;
  };
  const { data: images, status } = useQuery('/images', getImages);

  const register = async (data) => {
    await axios.post('/register', data);
  };

  //   const { mutate: create } = useMutation(submitAnswer, {
  //     onSuccess: () => {
  //       setStep(8)
  //     },
  //     onError: (error) => {},
  //   });

  const { mutate } = useMutation(register, {
    onSuccess: () => {
      handleClickOpen();
    },
  });

  const stepsArray = [
    {
      id: 1,
      component: <WelcomeCard onClick={() => setStep(2)} />,
    },
    {
      id: 2,
      component: (
        <LoginCard
          onClick={(data) => {
            setRegistrationData(data);
            setStep(3);
          }}
        />
      ),
    },
    {
      id: 3,
      component: (
        <PersonalInfoForm
          onClick={(data) => {
            mutate({ ...registrationData, ...data });
          }}
        />
      ),
    },
    {
      id: 4,
      component: (
        <BMISCARD
          buttonTitle="پایان مرحلۀ اول آزمون"
          onClick={(data) => {
            setApplyData({ ...applyData, BMIS_before: data });
            setStep(5);
          }}
        />
      ),
    },
    {
      id: 5,
      component: (
        <SecondLevel
          isLoading={!status || status === 'loading'}
          images={images}
          type={link ?? 'see'}
          onClick={(data) => {
            setApplyData({
              ...applyData,
              image_actions: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => ({
                image: item,
                ...data[item],
              })),
            });
            setStep(6);
          }}
        />
      ),
    },
    {
      id: 6,
      component: (
        <ThirdLevel
          images={images}
          onClick={(data) => {
            setApplyData({
              ...applyData,
              image_actions: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => ({
                reaction_time: data[item],
                ...applyData.image_actions[item],
              })),
            });
            setStep(7);
          }}
        />
      ),
    },
    {
      id: 7,
      component: (
        <BMISCARD
          buttonTitle="پایان آزمون"
          onClick={(data) => {
            setApplyData({ ...applyData, BMIS_after: data });
            // TODO call mutate and set step on success
            setStep(8);
          }}
        />
      ),
    },
    {
      id: 8,
      component: <ThanksCard />,
    },
  ];

  return (
    <div className="App">
      {stepsArray.map((item) => item.id === step && item.component)}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {/* TODO change text */} شما قبلا به این آزمون پاسخ داده اید
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* TODO change text */}. با ادامه دادن به آزمون، پاسخ شما به آژمون
            قبلی پاک خواهد شد
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>انصراف</Button>
          <Button onClick={handleAgree} autoFocus>
            ادامه
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
