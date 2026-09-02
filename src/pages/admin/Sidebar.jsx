import { NavLink } from 'react-router-dom'

const SIDEBAR_MENU = [
  { name: 'Dashboard', icon: '📊', route: '/admin' },
  { name: 'Payment Approval', icon: '💳', route: '/admin/payments' },
  { name: 'Members', icon: '👥', route: '/admin/members' },
  { name: 'Monthly Bazaar', icon: '🏪', route: '/admin/bazaar' },
  { name: 'Achievements', icon: '🏆', route: '/admin/achievements' },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        w-[240px] bg-sky-100 p-4 flex flex-col flex-shrink-0 z-40
        fixed lg:static inset-y-0 left-0
        transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="flex items-center mb-[30px] pl-2">
          <div className="w-9 h-7 relative">
            <div className="absolute top-0 left-[7px] w-[22px] h-[10px] bg-green-500 rounded-t-[3px] -skew-x-[20deg]" />
            <div className="absolute bottom-0 left-0 w-[22px] h-[10px] bg-orange-500 rounded-b-[3px] -skew-x-[20deg]" />
          </div>
        </div>

        {/* Admin info */}
        <div className="flex items-center gap-[10px] mb-8 pl-2">
          <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white text-base">👤</div>
          <div className="text-sm font-medium text-slate-800">Admin</div>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-[6px]">
          {SIDEBAR_MENU.map((item) => (
            <NavLink
              key={item.name}
              to={item.route}
              end={item.route === '/admin'}
              onClick={onClose}
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
    </>
  )
}