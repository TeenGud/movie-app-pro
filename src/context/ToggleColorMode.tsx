import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { createContext, useEffect, useState } from 'react';

export const ColorModeContext = createContext({
  mode: '',
  toggleColorMode: () => {},
});

export default function ToggleColorMode({ children }) {
  const [mode, setMode] = useState<PaletteMode | undefined>('dark');
  const theme = createTheme({ palette: { mode } });
  useEffect(() => {
    const modeFromLocalStorage = localStorage.getItem('theme');
    if (modeFromLocalStorage) {
      setMode(modeFromLocalStorage as PaletteMode | undefined);
    } else {
      localStorage.setItem('theme', 'dark');
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('theme', mode as string);
  }, [mode]);
  const toggleColorMode = () => {
    setMode(prevState => (prevState === 'light' ? 'dark' : 'light'));
  };
  return (
    <ColorModeContext.Provider
      value={{ mode: mode as string, toggleColorMode }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
