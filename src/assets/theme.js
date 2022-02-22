import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Vazir',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
            font-family: "Vazir";
            src: url("./assets/fonts/vazir-font-v18.0.0/Vazir-Bold.woff");
            font-family: Vazir;
            src: url("./assets/fonts/vazir-font-v18.0.0/Vazir.ttf") format("ttf");
            src: url("./assets/fonts/vazir-font-v18.0.0/Vazir.woff") format("woff");
            src: url("./assets/fonts/vazir-font-v18.0.0/Vazir.woff") format("woff2");
            }
        `,
    },
  },
});

export default theme;
