import React, { createContext, useState, useMemo, useContext } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  const theme = useMemo(() => {
    const lightTheme = createTheme({
      palette: {
        mode: 'light',
        primary: {
          main: '#6C5CE7',
        },
        background: {
          default: '#F4F6F8',
          paper: '#FFFFFF',
        },
      },
    });

    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#A095E5',
        },
        background: {
          default: '#121212',
          paper: '#1E1E1E',
        },
      },
    });

    return mode === 'light' ? lightTheme : darkTheme;
  }, [mode]);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};