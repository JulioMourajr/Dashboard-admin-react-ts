import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/login'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './contexts/AuthContexts'

const App:React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>      
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/*' element={<AppRoutes/>}/>       
        </Routes>       
      </BrowserRouter>
    </AuthProvider>
       
  )
}

export default App
