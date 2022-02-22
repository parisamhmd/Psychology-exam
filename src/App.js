import React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import WelcomeCard from './components/WelcomeCard';
import LoginCard from './components/LoginCard';
import PersonalInfoForm from './components/PersonalInfoForm';

import theme from './assets/theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <WelcomeCard /> */}
        {/* <LoginCard /> */}
        <PersonalInfoForm />
      </div>
    </ThemeProvider>
  );
}

export default App;
