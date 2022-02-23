import React, { useState } from 'react';

import { useMutation, QueryClient } from 'react-query';
import axios from 'axios';

import WelcomeCard from './components/WelcomeCard';
import LoginCard from './components/LoginCard';
import PersonalInfoForm from './components/PersonalInfoForm';
import BMISCARD from './components/BMISCard';

import './App.css';

const queryClient = new QueryClient();

function App() {
  const [step, setStep] = useState(1);
  const [registrationData, setRegistrationData] = useState({});

  const register = async (data) => {
    await axios.post('/register', data);
  };
  //   const { mutate: create } = useMutation(createArtist, {
  //     onSuccess: () => {
  //       history.push('/artists');
  //       alert.success({ text: 'هنرمند با موفقیت افزوده شد' });
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
      component: <BMISCARD />,
    },
  ];

  return (
    <div className="App">
      {stepsArray.map((item) => item.id === step && item.component)}
    </div>
  );
}

export default App;
