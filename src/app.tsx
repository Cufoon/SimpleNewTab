import React from 'react';
import ReactDOM from 'react-dom';
import { printCopyright } from './utils/copyright';
import './global.scss';
import Home from './pages/home/index';

printCopyright();

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('app')
);
