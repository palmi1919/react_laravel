import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Inventory from '../pages/Inventory.jsx'
import Products from '../pages/Products.jsx'
import Sales from '../pages/Sales.jsx'
import Clients from '../pages/Clients.jsx'
import Reports from '../pages/Reports.jsx'
import Settings from '../pages/Settings.jsx'

export default function AppRoutes({ darkMode, toggleDarkMode }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="inventario" element={<Inventory />} />
        <Route path="productos" element={<Products />} />
        <Route path="ventas" element={<Sales />} />
        <Route path="clientes" element={<Clients />} />
        <Route path="reportes" element={<Reports />} />
        <Route path="configuracion" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
