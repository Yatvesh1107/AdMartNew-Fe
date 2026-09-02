import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import UserLogin from './pages/user/UserLogin'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import PaymentApproval from './pages/admin/PaymentApproval'
import Members from './pages/admin/Members'
import MonthlyBazaar from './pages/admin/MonthlyBazaar'
import Achievements from './pages/admin/Achievements'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/user/login" replace />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Routes with shared layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="payments" element={<PaymentApproval />} />
          <Route path="members" element={<Members />} />
          <Route path="bazaar" element={<MonthlyBazaar />} />
          <Route path="achievements" element={<Achievements />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App