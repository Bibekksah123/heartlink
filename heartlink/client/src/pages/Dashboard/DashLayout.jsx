import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/layout/Sidebar/Sidebar';

function DashLayout() {
  return (
    <div className="dash-layout" style={{ display: 'flex', minHeight: '100vh' ,backgroundColor:"white"}}>
      {/* sidebar will stay present on all dashboard routes */}
      <Sidebar />

      <main style={{ flex: 1, padding: '24px' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default DashLayout