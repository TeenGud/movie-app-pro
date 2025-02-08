import { CssBaseline } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/App.tsx';
import { store } from './store/store.ts';

import 'bear-react-carousel/dist/index.css';

import ToggleColorMode from './context/ToggleColorMode.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ToggleColorMode>
        <CssBaseline />
        <App />
      </ToggleColorMode>
    </Provider>
  </StrictMode>,
);
