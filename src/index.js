import React from 'react';
import ReactDOM from 'react-dom/client';
import Map from './components/Map';
import Header from './components/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Map />
  </React.StrictMode>
);