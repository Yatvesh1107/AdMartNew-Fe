import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import UserLogin from './pages/user/UserLogin'
import Register from './pages/user/Register'
import UserLayout from './pages/user/UserLayout'
import UserDashboard from './pages/user/UserDashboard'
import AddMember from './pages/user/AddMember'
import UserMembers from './pages/user/UserMembers'
import UserMonthlyBazaar from './pages/user/UserMonthlyBazaar'
import UserProfile from './pages/user/UserProfile'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import PaymentApproval from './pages/admin/PaymentApproval'
import Members from './pages/admin/Members'
import MonthlyBazaar from './pages/admin/MonthlyBazaar'
import Achievements from './pages/admin/Achievements'
import QrManagement from './pages/admin/QrManagement'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/user/login" replace />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />

        {/* User Routes with shared layout */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Navigate to="/user/dashboard" replace />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="add-member" element={<AddMember />} />
          <Route path="bazaar" element={<UserMonthlyBazaar />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="members" element={<UserMembers />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Routes with shared layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="payments" element={<PaymentApproval />} />
          <Route path="members" element={<Members />} />
          <Route path="bazaar" element={<MonthlyBazaar />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="qr" element={<QrManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App