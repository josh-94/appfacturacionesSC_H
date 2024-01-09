import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FacturaPage from './pages/FacturaPage'
import PersonalPage from './pages/PersonalPage'
import DatosEnviados from './pages/DatosEnviados'

export default function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path='/' >
            <Route index element={<HomePage />}/>
            <Route path='/detalles/:numeroFactura' element={<FacturaPage/>} />
            <Route path='/personal' element={<PersonalPage/>}/>
            <Route path='/datos_enviados' element={<DatosEnviados/>}/>
        </Route>

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  )
}
