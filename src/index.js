import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Register from './components/register/Register'
import Register2 from './components/register/Register2'
import Login from './components/login/Login'
import Login2 from './components/login/Login2'
import Seleccion from './components/selection/Seleccion'
import reportWebVitals from './reportWebVitals'
import axios from 'axios';
import './StyleLogin.css'
import Profile from './components/profile/Profile';

ReactDOM.render(
  <React.StrictMode>
    <Seleccion />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
