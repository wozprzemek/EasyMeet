import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AppRoutes } from 'routes';

function App() {
  return (
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
  )
}

export default App;