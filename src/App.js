import React, { useState } from 'react';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import { ThemeProvider } from '@mui/material/styles';
import WelcomeCard from './components/WelcomeCard';
import LoginCard from './components/LoginCard';
import PersonalInfoForm from './components/PersonalInfoForm';
import BMISCARD from './components/BMISCard';
//  172.27.224.1

import theme from './assets/theme';
import './App.css';

const queryClient = new QueryClient();

function App() {
  const [step, setStep] = useState(1);
  const [registrationData, setRegistrationData] = useState({});

  //   const { mutate } = useMutation(postTodo, {
  //     onSuccess: () => {
  //       setStep(4);
  //     },
  //   });

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
            // mutate({ ...registrationData, ...data });
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
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          {stepsArray.map((item) => item.id === step && item.component)}
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
