import React from 'react'
import Header from './Header'
import Sidebar from './sidebar'

export const AccessDenied = () => {
  return (
    <div className="min-h-screen grid grid-cols-6 ">
      <Sidebar />
      <div className="xl:col-span-5  ">
        <Header />
        <div className="xl:col-span-5 p-8">
          <h1>Acceso denegado, no eres Administrador</h1>
        </div>
      </div>
    </div>
  )
}
