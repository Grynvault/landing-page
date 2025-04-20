import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './assets/styles/GlobalStyles';
import theme from './assets/styles/theme';
import { AppProvider } from './context/AppContext';
import './App.css';

// Components
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Vision from './components/Vision/Vision';
import Configurator from './components/Configurator/Configurator';
import Orderbook from './components/Orderbook/Orderbook';
import WhiteGlove from './components/WhiteGlove/WhiteGlove';
import Footer from './components/Footer/Footer';
import { initializeSocket, disconnectSocket } from './services/socket';

const App: React.FC = () => {
  // Initialize and clean up socket connection
  useEffect(() => {
    initializeSocket();
    
    return () => {
      disconnectSocket();
    };
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppProvider>
        <Header />
        <Hero />
        <Vision />
        <Configurator />
        <WhiteGlove />
        <Orderbook />
        <Footer />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;