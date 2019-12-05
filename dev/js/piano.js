import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import theme from './theme';
import {ThemeProvider} from 'styled-components';
import Piano from './components/piano';
import Menu from './components/menu';
import ModeControls from './components/modeControls';
import TotalResults from './components/totalResults';

ReactDOM.render(
  <Provider store={store}>
      <ThemeProvider theme={theme}>
        <>
          <Piano />
          <Menu />
          <ModeControls />
          <TotalResults />
        </>
      </ThemeProvider>
  </Provider>, 
  document.getElementById('piano')
);
