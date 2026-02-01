import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // <-- import ThemeProvider
import App from './App.jsx';
import './index.css';

// Create a theme with your fonts
const theme = createTheme({
  typography: {
    fontFamily: "'Inter', sans-serif", // default for body
    h1: { fontFamily: "'Montserrat', sans-serif" },
    h2: { fontFamily: "'Montserrat', sans-serif" },
    h3: { fontFamily: "'Montserrat', sans-serif" },
    h4: { fontFamily: "'Montserrat', sans-serif" },
    h5: { fontFamily: "'Montserrat', sans-serif" },
    h6: { fontFamily: "'Montserrat', sans-serif" },
    button: { fontFamily: "'Montserrat', sans-serif" },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}> {/* Wrap your app with ThemeProvider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
