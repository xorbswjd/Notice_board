import React from 'react';
import Navigation from './Navigation';
import { BrowserRouter } from 'react-router-dom';

import Menu from './Menu'

function App() {
  
  return (   
    <BrowserRouter>
      <Navigation/>
      &nbsp;
      &nbsp;
      <Menu />      
      &nbsp;
      &nbsp;
    </BrowserRouter>   
  )
}

export default App;
