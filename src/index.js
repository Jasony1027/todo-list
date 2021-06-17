import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import AppProvider from "./components/AppProvider";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
         <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
