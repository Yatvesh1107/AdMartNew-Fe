import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

const USER_MENU = [
  { name: 'Dashboard', icon: '📊', route: '/user/dashboard' },
  { name: 'Monthly Bazaar', icon: '🏪', route: '/user/bazaar' },
  { name: 'Total Members List', icon: '👥', route: '/user/members' },
  { name: 'Add Member', icon: '➕', route: '/user/add-member' },
]

const USER_NAME = 'Rajnish'

const PAGE_TITLES = {
  '/user/dashboard': 'Dashboard',
  '/user/bazaar': 'Monthly Bazaar',
  '/user/members': 'Total Members List',
  '/user/add-member': 'Add Member',
  '/user/profile': 'Profile',
}

export default function UserLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const title = PAGE_TITLES[pathname] || 'User'

  const goToProfile = () => {
    setSidebarOpen(false)
    navigate('/user/profile')
  }

  const handleNav = () => setSidebarOpen(false)

  return (
    <div className="flex h-screen bg-sky-50 overflow-hidden">
      {/* Overlay for mobile when sidebar open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-[240px] bg-sky-100 p-4 flex flex-col flex-shrink-0 z-40
        fixed lg:static inset-y-0 left-0
        transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="flex items-center mb-[30px] pl-2">
          <div className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-green-500 via-orange-500 to-orange-600 bg-clip-text text-transparent">AdMart</div>
        </div>

        {/* User info */}
        <div
          className="flex items-center gap-[10px] mb-8 pl-2 cursor-pointer hover:opacity-80"
          onClick={goToProfile}
          title="Profile"
        >
          <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white text-base">👤</div>
          <div className="text-sm font-medium text-slate-800">{USER_NAME}</div>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-[6px]">
          {USER_MENU.map((item) => (
            <NavLink
              key={item.name}
              to={item.route}
              onClick={handleNav}
              className={({ isActive }) =>
                `flex items-center gap-3 px-[14px] py-[11px] rounded-lg text-sm cursor-pointer no-underline ${
                  isActive ? 'bg-blue-500 text-white' : 'text-slate-600 hover:bg-sky-300'
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Right side */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 gap-3 shrink-0">
          {/* Hamburger (mobile) + Title */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
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

          {/* Right controls */}
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
            <button
              onClick={goToProfile}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 md:hidden"
              aria-label="Profile"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">👤</div>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-8 sm:py-7">
          <Outlet />
        </main>
      </div>
    </div>
  )
}