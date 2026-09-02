import { useState } from 'react'

const INITIAL_PAYMENTS = [
  {
    id: 1,
    name: 'Rajnish Kotmire',
    type: 'Online',
    txnId: 'RZP983734',
    dateTime: '16 Jan 2020 | 10:42 AM',
    amount: '₹5,000',
    status: 'pending',
  },
  {
    id: 2,
    name: 'Rajnish Kotmire',
    type: 'Offline',
    txnId: 'RZP983734',
    dateTime: '15 Jan 2020 | 10:42 AM',
    amount: '₹4,000',
    status: 'completed',
  },
]

const STATUS_CLASSES = {
  pending: 'bg-amber-100 text-amber-600',
  completed: 'bg-emerald-100 text-emerald-600',
}

const STATUS_LABELS = {
  pending: 'Pending',
  completed: 'Completed',
}

export default function PaymentApproval() {
  const [payments, setPayments] = useState(INITIAL_PAYMENTS)
  const [filters, setFilters] = useState({ name: '', type: '', date: '', status: '', action: '' })

  const handleFilterChange = (key, value) => {
    setFilters((f) => ({ ...f, [key]: value }))
  }

  const approve = (id) => setPayments((p) => p.map((item) => (item.id === id ? { ...item, status: 'completed' } : item)))
  const reject = (id) => setPayments((p) => p.filter((item) => item.id !== id))

  return (
    <>
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-slate-900">Payment Approval</h1>
      </div>

      {/* Filters */}
      <div className="flex gap-3 items-start mb-6 flex-wrap">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Search by Name</label>
          <input
            type="text"
            placeholder="Search by Name"
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
            className="h-9 border border-slate-300 rounded-md px-3 text-[13px] outline-none bg-white min-w-[140px] focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Search by Type</label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="h-9 border border-slate-300 rounded-md px-3 text-[13px] outline-none bg-white min-w-[140px] focus:border-blue-500"
          >
            <option value="">All</option>
            <option>Online</option>
            <option>Offline</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Search by Date</label>
          <input
            type="text"
            placeholder="Search by Date"
            value={filters.date}
            onChange={(e) => handleFilterChange('date', e.target.value)}
            className="h-9 border border-slate-300 rounded-md px-3 text-[13px] outline-none bg-white min-w-[140px] focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Search by Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="h-9 border border-slate-300 rounded-md px-3 text-[13px] outline-none bg-white min-w-[140px] focus:border-blue-500"
          >
            <option value="">All</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Search by Action</label>
          <select
            value={filters.action}
            onChange={(e) => handleFilterChange('action', e.target.value)}
            className="h-9 border border-slate-300 rounded-md px-3 text-[13px] outline-none bg-white min-w-[140px] focus:border-blue-500"
          >
            <option value="">All</option>
            <option>Reject</option>
            <option>Approve</option>
          </select>
        </div>

        <button className="h-9 px-5 bg-blue-500 text-white rounded-md text-[13px] font-medium cursor-pointer hover:bg-blue-600 mt-[18px]">
          Apply
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <table className="w-full border-collapse">
          <thead className="bg-sky-100">
            <tr>
              {['Name', 'Type', 'Txn ID', 'Date & Time', 'Amount', 'Status', 'Action'].map((h) => (
                <th key={h} className="text-left px-4 py-[14px] text-[13px] font-semibold text-slate-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="last:border-none">
                <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{p.name}</td>
                <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{p.type}</td>
                <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{p.txnId}</td>
                <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{p.dateTime}</td>
                <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{p.amount}</td>
                <td className="px-4 py-4 border-b border-slate-100">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${STATUS_CLASSES[p.status]}`}>
                    {STATUS_LABELS[p.status]}
                  </span>
                </td>
                <td className="px-4 py-4 border-b border-slate-100">
                  <div className="flex gap-2">
                    <button className="px-3 py-[5px] rounded-md text-xs font-medium bg-blue-100 text-blue-600 cursor-pointer hover:opacity-90">View</button>
                    {p.status === 'pending' ? (
                      <button onClick={() => reject(p.id)} className="px-3 py-[5px] rounded-md text-xs font-medium bg-red-100 text-red-600 cursor-pointer hover:opacity-90">Reject</button>
                    ) : (
                      <button onClick={() => approve(p.id)} className="px-3 py-[5px] rounded-md text-xs font-medium bg-emerald-100 text-emerald-600 cursor-pointer hover:opacity-90">Approved</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}