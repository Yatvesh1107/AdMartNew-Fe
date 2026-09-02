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

const BrandLogo = () => (
  <svg
    width="44"
    height="30"
    viewBox="0 0 78 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M40 7H62L70 17H48L40 7Z" fill="#159447" />
    <path d="M55 17H70L64 10L55 17Z" fill="#159447" />
    <path d="M16 30H53L61 40H24L16 30Z" fill="#F6A21A" />
    <path d="M16 30H31L24 22L16 30Z" fill="#F6A21A" />
    <path d="M30 20H59V27H30V20Z" fill="#159447" />
  </svg>
)

export default function UserLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const title = PAGE_TITLES[pathname] || 'User'

  const goToProfile = () => navigate('/user/profile')

  return (
    <div className="flex h-screen bg-sky-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[220px] bg-sky-100 p-4 flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-[30px] pl-2">
          <BrandLogo />
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
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
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
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-7">
          <Outlet />
        </main>
      </div>
    </div>
  )
}