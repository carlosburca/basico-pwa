import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// views
import Routes from './Routes'

// styles
import './styles/estilos.css';

function App() {
  return (
    <BrowserRouter><Routes /></BrowserRouter>

  );
}

export default App;
