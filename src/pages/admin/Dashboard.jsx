const CHART_DATA = [
  { month: 'Jan', height: 180 },
  { month: 'Feb', height: 90 },
  { month: 'Mar', height: 110 },
  { month: 'Apr', height: 70 },
  { month: 'May', height: 55 },
  { month: 'Jun', height: 95 },
  { month: 'Jul', height: 65 },
  { month: 'Aug', height: 140 },
  { month: 'Sep', height: 85 },
  { month: 'Oct', height: 105 },
  { month: 'Nov', height: 75 },
  { month: 'Dec', height: 95 },
]

export default function Dashboard() {
  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <div className="text-[13px] text-slate-500">Jan 15, 2024</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 mb-7">
        <div className="rounded-xl p-5 bg-pink-100">
          <div className="text-[13px] text-slate-500 mb-2">Total Members</div>
          <div className="text-[22px] font-semibold text-slate-900">18</div>
        </div>
        <div className="rounded-xl p-5 bg-purple-100">
          <div className="text-[13px] text-slate-500 mb-2">Total Earnings</div>
          <div className="text-[22px] font-semibold text-slate-900">₹12,500</div>
        </div>
        <div className="rounded-xl p-5 bg-rose-100">
          <div className="text-[13px] text-slate-500 mb-2">This Month Bazaar</div>
          <div className="text-[22px] font-semibold text-slate-900">₹5,000</div>
          <div className="text-xs text-slate-400 mt-1">January</div>
        </div>
        <div className="rounded-xl p-5 bg-blue-100">
          <div className="text-[13px] text-slate-500 mb-2">Total Users</div>
          <div className="text-[22px] font-semibold text-slate-900">1808</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-semibold text-slate-900">Total User Enrolled</h3>
          <select className="border border-slate-200 rounded-md px-3 py-1.5 text-[13px] text-slate-600 outline-none">
            <option>Last year</option>
          </select>
        </div>

        <div className="h-[260px] flex items-end gap-[18px] pt-[10px]">
          {CHART_DATA.map((d) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full max-w-[42px] bg-blue-400 rounded-t-md hover:bg-blue-500 transition-colors"
                style={{ height: d.height }}
              />
              <div className="text-xs text-slate-500">{d.month}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}