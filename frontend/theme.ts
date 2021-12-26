import { createTheme } from '@material-ui/core/styles';

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: '#9be6c7',
      // main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#f44336',
    },
  },

  overrides: {
    MuiButton: { // Name of the component ⚛️ / style sheet
        root: { // Name of the rule
            textTransform: 'none'
        },
    },
},
});


export default theme;