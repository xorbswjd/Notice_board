import React from 'react';
import Navigation from './Navigation';
import { HashRouter } from 'react-router-dom';

import Menu from './Menu'

function App() {
  
  return (   
    <HashRouter>
      <Navigation/>
      &nbsp;
      &nbsp;
      <Menu />      
      &nbsp;
      &nbsp;
    </HashRouter>   
  )
}

export default App;
