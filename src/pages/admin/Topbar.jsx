import { useLocation } from 'react-router-dom'

const PAGE_TITLES = {
  '/admin': 'Dashboard',
  '/admin/payments': 'Payment Approval',
  '/admin/members': 'Members',
  '/admin/bazaar': 'Monthly Bazaar',
  '/admin/achievements': 'Achievements',
}

export default function Topbar({ onOpenSidebar }) {
  const { pathname } = useLocation()
  const title = PAGE_TITLES[pathname] || 'Admin'

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 gap-3 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-1.5 rounded-md hover:bg-slate-100 text-slate-700"
          aria-label="Open menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-slate-900 truncate">{title}</h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-56 border border-slate-300 rounded-lg px-4 text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div className="relative">
          <span className="text-xl cursor-pointer">🔔</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">👤</div>
          <span className="text-sm font-medium text-slate-700">Admin</span>
        </div>
      </div>
    </header>
  )
}