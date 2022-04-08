import GlobalStyle, { AdaptingFont } from './GlobalStyle';
import Router from './Router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { DarkTheme, LightTheme } from './theme';
import { useState } from 'react';

const App = () => {
  const [isDarkMode, setDarkMode] = useState(true);

  const onToggleModeHandler = () => {
    setDarkMode(prevState => !prevState);
  };

  return (
    <ThemeProvider theme={isDarkMode ? DarkTheme : LightTheme}>
      <AdaptingFont />
      <GlobalStyle />
      <Router isDarkMode={isDarkMode} onToggle={onToggleModeHandler} />
    </ThemeProvider>
  );
};

export default App;
