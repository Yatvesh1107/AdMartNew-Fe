const STATS = [
  { title: 'Total Members', value: '18', sub: '', color: 'purple', icon: '👥' },
  { title: 'Total Earnings', value: '₹12,500', sub: '', color: 'blue', icon: '💰' },
  { title: 'This Month Bazaar', value: '₹5,000', sub: 'January', color: 'pink', icon: '📅' },
]

const COLOR_CLASSES = {
  purple: 'bg-purple-100',
  blue: 'bg-blue-100',
  pink: 'bg-pink-100',
}

const RECENT_MEMBERS = [
  { id: 1, name: 'Amit Sharma', mobile: '9857127834', joinDate: '12 Jan 2026', month: 'January', monthlyBazaar: '₹2,500', status: 'Active' },
]

export default function UserDashboard() {
  return (
    <>
      <h1 className="text-[22px] font-semibold text-slate-900 mb-6">Dashboard</h1>

      {/* Welcome Card */}
      <div className="bg-white rounded-2xl px-5 sm:px-7 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-[22px] mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="w-[72px] h-[72px] bg-blue-100 rounded-full flex items-center justify-center text-[34px] text-blue-500 flex-shrink-0">
          👤
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-1.5">👋 Welcome, Rajnish</h2>
          <p className="text-[13.5px] text-slate-500 mb-3.5 leading-snug">
            Share your referral code and earn commission on every member's bazaar purchase.
          </p>
          <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 rounded-lg px-3.5 py-1.5 text-[13px] text-sky-700">
            🔗 Referral Code: <strong className="font-semibold">REF12345</strong>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-7">
        {STATS.map((s) => (
          <div key={s.title} className={`rounded-[14px] p-5 relative ${COLOR_CLASSES[s.color]}`}>
            <div className="text-[13px] text-slate-500 mb-2">{s.title}</div>
            <div className="text-2xl font-semibold text-slate-900">{s.value}</div>
            {s.sub && <div className="text-xs text-slate-400 mt-1">{s.sub}</div>}
            <span className="absolute top-[18px] right-[18px] text-lg opacity-70">{s.icon}</span>
          </div>
        ))}
      </div>

      {/* Recent Members */}
      <div className="text-base font-semibold text-slate-900 mb-4">Recent Total Members Added</div>
      <div className="bg-white rounded-xl overflow-x-auto shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <table className="w-full border-collapse min-w-[680px]">
          <thead className="bg-sky-100">
            <tr>
              {['Name', 'Mobile', 'Join Date', 'Month', 'Monthly Bazaar', 'Status'].map((h) => (
                <th key={h} className="text-left px-4 py-[14px] text-[13px] font-semibold text-slate-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECENT_MEMBERS.map((m) => (
              <tr key={m.id}>
                <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{m.name}</td>
                <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{m.mobile}</td>
                <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{m.joinDate}</td>
                <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{m.month}</td>
                <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{m.monthlyBazaar}</td>
                <td className="px-4 py-4 border-b border-slate-100">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-600">{m.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}