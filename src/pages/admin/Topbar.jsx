import { useLocation } from 'react-router-dom'

const PAGE_TITLES = {
  '/admin': 'Dashboard',
  '/admin/payments': 'Payment Approval',
  '/admin/members': 'Members',
  '/admin/bazaar': 'Monthly Bazaar',
  '/admin/achievements': 'Achievements',
}

export default function Topbar() {
  const { pathname } = useLocation()
  const title = PAGE_TITLES[pathname] || 'Admin'

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
      <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-56 border border-slate-300 rounded-lg px-4 text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div className="relative">
          <span className="text-xl cursor-pointer">🔔</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">👤</div>
          <span className="text-sm font-medium text-slate-700">Admin</span>
        </div>
      </div>
    </header>
  )
}