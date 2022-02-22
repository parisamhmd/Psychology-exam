import React from 'react';

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import WelcomeCard from './components/WelcomeCard';

import theme from './assets/theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <WelcomeCard></WelcomeCard>
      </div>
    </ThemeProvider>
  );
}

export default App;
