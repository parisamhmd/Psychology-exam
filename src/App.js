import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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

  const [isLoading, setIsLoading] = useState(true);

  const [step, setStep] = useState(+localStorage.getItem('step') || 1);
  const [registrationData, setRegistrationData] = useState({});
  const [applyData, setApplyData] = useState(
    JSON.parse(localStorage.getItem('applyData')) || {}
  );
  const [open, setOpen] = React.useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAgree = () => {
    setStep(4);
    localStorage.setItem('step', 4);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cacheImage = async (srcArray) => {
    const promises = await srcArray.map((src) => {
      return new Promise(function (resolve, reject) {
        const img = new Image();

        img.src = src;
        img.onload = resolve();
        img.onerror = reject();
      });
    });

    await Promise.all(promises);
    setIsLoading(false);
  };

  const getImages = async () => {
    const res = await axios.get('/images');
    return res.data;
  };
  const { data: images } = useQuery('/images', getImages, {
    onSuccess: (data) => {
      cacheImage(data);
    },
  });

  const handleRegister = async (data) => {
    const res = await axios.post('/register', data);
    return res.data;
  };

  const { mutate: register } = useMutation(handleRegister, {
    onSuccess: (data) => {
      localStorage.setItem('id', data.id);
      if (data.have_test) handleClickOpen();
      else {
        setStep(4), localStorage.setItem('step', 4);
      }
    },
    onError: (error) => {
      setError(error.response.data);
      setOpenErrorModal(true);
    },
  });

  const submitAnswer = async (data) => {
    const res = await axios.post('/apply', data);
    return res.data;
  };

  const { mutate: apply } = useMutation(submitAnswer, {
    onSuccess: () => {
      localStorage.removeItem('applyData');
      localStorage.setItem('step', 8);
      setStep(8);
    },
    onError: (error) => {
      setError(error.response.data);
      setOpenErrorModal(true);
    },
  });

  const stepsArray = [
    {
      id: 1,
      component: (
        <WelcomeCard
          onClick={() => {
            localStorage.setItem('step', 2);
            setStep(2);
          }}
        />
      ),
    },
    {
      id: 2,
      component: (
        <LoginCard
          onClick={(data) => {
            setRegistrationData(data);
            localStorage.setItem('step', 2);
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
            register({ ...registrationData, ...data });
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
            localStorage.setItem(
              'applyData',
              JSON.stringify({ ...applyData, BMIS_before: data })
            );
            localStorage.setItem('step', 5);
            setStep(5);
          }}
        />
      ),
    },
    {
      id: 5,
      component: (
        <SecondLevel
          isLoading={isLoading}
          images={images}
          type={link ?? 'see'}
          onClick={(data) => {
            setApplyData({
              ...applyData,
              image_actions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => ({
                image: item,
                ...data[item],
              })),
            });
            localStorage.setItem(
              'applyData',
              JSON.stringify({
                ...applyData,
                image_actions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => ({
                  image: item,
                  ...data[item],
                })),
              })
            );
            localStorage.setItem('step', 6);
            setStep(6);
          }}
        />
      ),
    },
    {
      id: 6,
      component: isLoading ? (
        <Box sx={{ mt: 15 }}>
          <CircularProgress size={70} />
          <Typography variant="h4" sx={{ mt: 5 }}>
            در حال بارگیری تصاویر آزمون
          </Typography>
        </Box>
      ) : (
        <ThirdLevel
          images={images}
          onClick={(data) => {
            setApplyData({
              ...applyData,
              image_actions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => ({
                reaction_time: data[item],
                ...applyData.image_actions[item - 1],
              })),
            });

            localStorage.setItem(
              'applyData',
              JSON.stringify({
                ...applyData,
                image_actions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => ({
                  reaction_time: data[item],
                  ...applyData.image_actions[item - 1],
                })),
              })
            );
            localStorage.setItem('step', 7);
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
            apply({
              ...applyData,
              BMIS_after: data,
              kind: link,
              participant: localStorage.getItem('id'),
            });
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
          شما قبلا به این آزمون پاسخ داده اید
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            با ادامه دادن به آزمون، پاسخ شما به آزمون قبلی پاک خواهد شد
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>انصراف</Button>
          <Button onClick={handleAgree} autoFocus>
            ادامه
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="h5" color="error">
              خطا در ارسال اطلاعات
            </Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
