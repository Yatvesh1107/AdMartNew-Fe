import { useState } from 'react'

const INITIAL_MEMBERS = [
  {
    id: 1,
    name: 'Rajnish',
    mobile: '9857127834',
    joinDate: '10 Jan 2020',
    month: 'January',
    monthlyBazaar: '₹2,500',
    status: 'Active',
    earning: '₹1,200',
    fullName: 'Rajnish Bhamra',
    flat: 'Flat 302',
    area: 'MG Road',
    colony: 'Shivaji Nagar',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
    aadhaar: 'XXXX XXXX 1234',
  },
]

const MONTHS = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function Members() {
  const [members] = useState(INITIAL_MEMBERS)
  const [filters, setFilters] = useState({ name: '', mobile: '', month: '', date: '', status: '', amount: '' })
  const [selected, setSelected] = useState(null)

  const handleFilter = (key, val) => setFilters((f) => ({ ...f, [key]: val }))

  return (
    <>
      <h1 className="text-[22px] font-semibold text-slate-900 mb-6">Members</h1>

      {/* Filters */}
      <div className="flex gap-3 items-end mb-6 flex-wrap">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Search by Name</label>
          <input type="text" placeholder="Search by Name" value={filters.name} onChange={(e) => handleFilter('name', e.target.value)}
            className="h-9 border border-slate-300 rounded-md px-3 text-[13px] outline-none bg-white min-w-[130px] focus:border-blue-500" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Search by Mobile Number</label>
          <input type="text" placeholder="Search by Mobile" value={filters.mobile} onChange={(e) => handleFilter('mobile', e.target.value)}
            className="h-9 border border-slate-300 rounded-md px-3 text-[13px] outline-none bg-white min-w-[130px] focus:border-blue-500" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Search by Month</label>
          <select value={filters.month} onChange={(e) => handleFilter('month', e.target.value)}
            className="h-9 border border-slate-300 rounded-md px-3 text-[13px] outline-none bg-white min-w-[130px] focus:border-blue-500">
            {MONTHS.map((m) => <option key={m} value={m === 'All' ? '' : m}>{m}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Search by Date</label>
          <input type="text" placeholder="Search by Date" value={filters.date} onChange={(e) => handleFilter('date', e.target.value)}
            className="h-9 border border-slate-300 rounded-md px-3 text-[13px] outline-none bg-white min-w-[130px] focus:border-blue-500" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Search by Status</label>
          <select value={filters.status} onChange={(e) => handleFilter('status', e.target.value)}
            className="h-9 border border-slate-300 rounded-md px-3 text-[13px] outline-none bg-white min-w-[130px] focus:border-blue-500">
            <option value="">All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Search by Amount</label>
          <input type="text" placeholder="Search by Amount" value={filters.amount} onChange={(e) => handleFilter('amount', e.target.value)}
            className="h-9 border border-slate-300 rounded-md px-3 text-[13px] outline-none bg-white min-w-[130px] focus:border-blue-500" />
        </div>
        <button className="h-9 px-5 bg-blue-500 text-white rounded-md text-[13px] font-medium cursor-pointer hover:bg-blue-600">Apply</button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-x-auto shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <table className="w-full border-collapse min-w-[760px]">
          <thead className="bg-sky-100">
            <tr>
              {['Name', 'Mobile', 'Join Date', 'Month', 'Monthly Bazaar', 'Status', 'Earning', 'Action'].map((h) => (
                <th key={h} className="text-left px-4 py-[14px] text-[13px] font-semibold text-slate-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id}>
                <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{m.name}</td>
                <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{m.mobile}</td>
                <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{m.joinDate}</td>
                <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{m.month}</td>
                <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{m.monthlyBazaar}</td>
                <td className="px-4 py-4 border-b border-slate-100">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-600">{m.status}</span>
                </td>
                <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{m.earning}</td>
                <td className="px-4 py-4 border-b border-slate-100">
                  <button onClick={() => setSelected(m)} className="px-3 py-[5px] rounded-md text-xs font-medium bg-blue-100 text-blue-600 cursor-pointer hover:opacity-90">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Member Profile Modal */}
      {selected && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50">
          <div className="bg-white w-[680px] max-w-[95%] rounded-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.15)] relative max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold text-slate-900">Member Profile</h2>
              <div className="flex items-center gap-3">
                <button className="bg-green-500 text-white border-none px-4 py-1.5 rounded-md text-[13px] font-medium cursor-pointer">Edit</button>
                <button onClick={() => setSelected(null)} className="text-slate-500 text-xl cursor-pointer leading-none bg-transparent border-none">×</button>
              </div>
            </div>

            {/* Basic Details */}
            <div className="mb-5">
              <div className="text-sm font-semibold text-slate-900 mb-3">Basic Details</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Full Name" value={selected.fullName} />
                <Field label="Mobile" value={selected.mobile} />
                <Field label="Joining Date" value={selected.joinDate} />
              </div>
            </div>

            {/* Address Details */}
            <div className="mb-5">
              <div className="text-sm font-semibold text-slate-900 mb-3">Address Details</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Flat / House No." value={selected.flat} />
                <Field label="Area / Street" value={selected.area} />
                <Field label="Colony" value={selected.colony} />
                <Field label="City" value={selected.city} />
                <Field label="State" value={selected.state} />
                <Field label="Pincode" value={selected.pincode} />
              </div>
            </div>

            {/* KYC Details */}
            <div className="mb-5">
              <div className="text-sm font-semibold text-slate-900 mb-3">KYC Details</div>
              <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Aadhaar Number</div>
                  <div className="text-sm font-medium text-slate-900">{selected.aadhaar}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Aadhaar Front</div>
                  <a href="#" className="text-blue-600 text-[13px] font-medium no-underline">View Image</a>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Aadhaar Back</div>
                  <a href="#" className="text-blue-600 text-[13px] font-medium no-underline">View Image</a>
                </div>
              </div>
            </div>

            {/* System Summary */}
            <div>
              <div className="text-sm font-semibold text-slate-900 mb-3">System Summary</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <SummaryCard label="Monthly Bazaar" value={`${selected.monthlyBazaar} (${selected.month})`} />
                <SummaryCard label="Current Earnings" value={selected.earning} />
                <SummaryCard label="Total Referral Members" value="18" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function Field({ label, value }) {
  return (
    <div>
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div className="text-sm font-medium text-slate-900">{value}</div>
    </div>
  )
}

function SummaryCard({ label, value }) {
  return (
    <div className="bg-sky-50 rounded-[10px] p-4">
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div className="text-base font-semibold text-slate-900">{value}</div>
    </div>
  )
}