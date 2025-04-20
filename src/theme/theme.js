import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5', // style green
    },
    secondary: {
      main: '#ff7043', // Accent color
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

export default theme;