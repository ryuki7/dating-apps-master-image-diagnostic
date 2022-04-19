import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Top from './Top';
import NotFound404 from './NotFound404';
import Diagnostic from './Diagnostic';
import Terms from './Terms';
import Privacy from './Privacy';

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Top/> } />
          <Route path='/diagnostic' element={ <Diagnostic/> } />
          <Route path='/diagnostic_redirect' element={<Navigate to='/diagnostic' />} />
          <Route path='/terms' element={ <Terms/> } />
          <Route path='/privacy' element={ <Privacy/> } />
          <Route path='/*' element={ <NotFound404/> } />
        </Routes>
      </BrowserRouter>
    )
}

export default App;