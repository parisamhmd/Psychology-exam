import React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import WelcomeCard from './components/WelcomeCard';
import LoginCard from './components/LoginCard';
import PersonalInfoForm from './components/PersonalInfoForm';
import BMISCARD from './components/BMISCard';
//  172.27.224.1

import theme from './assets/theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <WelcomeCard /> */}
        {/* <LoginCard /> */}
        {/* <PersonalInfoForm /> */}
        <BMISCARD />
      </div>
    </ThemeProvider>
  );
}

export default App;
