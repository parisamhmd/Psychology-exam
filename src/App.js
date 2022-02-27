import React, { useState } from 'react';

import { useQuery, useMutation, QueryClient } from 'react-query';
import axios from 'axios';

import WelcomeCard from './components/WelcomeCard';
import LoginCard from './components/LoginCard';
import PersonalInfoForm from './components/PersonalInfoForm';
import BMISCARD from './components/BMISCard';
import SecondLevel from './components/SecondLevel';
import ThirdLevel from './components/ThirdLevel';
import ThanksCard from './components/ThanksCard';

import a1 from './assets/images/a1.png';
import a2 from './assets/images/a2.png';
import a3 from './assets/images/a3.png';
import a4 from './assets/images/a4.png';
import a5 from './assets/images/a5.png';

import './App.css';

function App() {
  const [step, setStep] = useState(6);
  const [registrationData, setRegistrationData] = useState({});

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
      setStep(4);
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
            console.log({ ...registrationData, ...data });
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
            console.log(data);
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
          images={[a1, a2, a3, a4, a5, a1, a2, a3, a4, a5]}
          onClick={(data, images) => {
            console.log(images);
            setStep(7);
          }}
        />
      ),
    },
    {
      id: 6,
      component: (
        <ThirdLevel
          images={[a1, a2, a3, a4, a5, a1, a2, a3, a4, a5]}
          onClick={(data) => {
            console.log(data);
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
            console.log(data);
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
    </div>
  );
}

export default App;
