import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import theme from './theme';
import {ThemeProvider} from 'styled-components';
import Piano from './components/piano';
import Menu from './components/switch';

ReactDOM.render(
  <Provider store={store}>
      <ThemeProvider theme={theme}>
        <>
          <Piano />
          <Menu />
        </>
      </ThemeProvider>
  </Provider>, 
  document.getElementById('piano')
)
