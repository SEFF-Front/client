import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/login/Login';
import { Provider } from 'react-redux';
import Store from './components/redux/store';
import"bootstrap/dist/css/bootstrap.min.css"
import"bootstrap/dist/js/bootstrap.min.js"
import { ToastContainer } from "react-toastify";
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from "@material-tailwind/react";
import 'react-toastify/dist/ReactToastify.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <Provider store={Store}>
        <ThemeProvider>
          <BrowserRouter>
            <App />
            <ToastContainer position="top-right" autoClose={5000}/>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
  </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
