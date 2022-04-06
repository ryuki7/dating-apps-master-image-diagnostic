import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Top from './Top';
import NotFound404 from './NotFound404';
import Diagnostic from './Diagnostic';

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Top/> } />
          <Route path='/diagnostic' element={ <Diagnostic/> } />
          <Route path='/*' element={ <NotFound404/> } />
        </Routes>
      </BrowserRouter>
    )
}

export default App;