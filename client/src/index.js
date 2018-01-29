import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './components/mainPage';

ReactDOM.render((
  <BrowserRouter>
    <MainPage />
  </BrowserRouter>
), document.getElementById('root'));
