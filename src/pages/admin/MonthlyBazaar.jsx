import { useState } from 'react'

const MONTHS = ['All Months', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const INITIAL_BAZAAR = [
  { id: 1, month: 'January', amount: '₹5,000' },
  { id: 2, month: 'February', amount: '₹4,000' },
  { id: 3, month: 'March', amount: '₹5,000' },
  { id: 4, month: 'April', amount: '₹3,000' },
]

export default function MonthlyBazaar() {
  const [bazaar, setBazaar] = useState(INITIAL_BAZAAR)
  const [showForm, setShowForm] = useState(false)
  const [month, setMonth] = useState('All Months')
  const [amount, setAmount] = useState('')

  const toggleForm = () => {
    setShowForm((s) => !s)
    setMonth('All Months')
    setAmount('')
  }

  const addBazaar = (e) => {
    e.preventDefault()
    if (!amount || month === 'All Months') return
    setBazaar((b) => [...b, { id: Date.now(), month, amount: `₹${amount}` }])
    toggleForm()
  }

  const removeBazaar = (id) => setBazaar((b) => b.filter((item) => item.id !== id))

  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <h1 className="text-[22px] font-semibold text-slate-900">Monthly Bazaar</h1>
        <button
          onClick={toggleForm}
          className="bg-blue-500 text-white border-none px-5 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-600"
        >
          {showForm ? 'Back to List' : 'Add'}
        </button>
      </div>

      {showForm ? (
        /* ========== ADD FORM VIEW ========== */
        <form onSubmit={addBazaar} className="max-w-[500px] flex gap-6 items-end mb-6 flex-wrap">
          <div className="flex flex-col gap-[6px] flex-1 min-w-[180px]">
            <label className="text-[13px] text-slate-500">Select Month</label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="h-[42px] border border-slate-300 rounded-lg px-4 text-sm outline-none bg-white focus:border-blue-500"
            >
              {MONTHS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-[6px] flex-1 min-w-[180px]">
            <label className="text-[13px] text-slate-500">Enter Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">₹</span>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="h-[42px] border border-slate-300 rounded-lg pl-[28px] pr-4 text-sm outline-none bg-white w-full focus:border-blue-500"
              />
            </div>
          </div>

          <button type="submit" className="h-[42px] px-6 bg-green-500 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-green-600">
            Save
          </button>
        </form>
      ) : (
        /* ========== LIST VIEW ========== */
        <div className="bg-white rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)] max-w-[700px]">
          <table className="w-full border-collapse">
            <thead className="bg-sky-100">
              <tr>
                {['Month', 'Total Bazaar Amount', 'Action'].map((h) => (
                  <th key={h} className="text-left px-5 py-[14px] text-[13px] font-semibold text-slate-700">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bazaar.map((b) => (
                <tr key={b.id} className="last:border-none">
                  <td className="px-5 py-4 text-sm text-slate-700 border-b border-slate-100">{b.month}</td>
                  <td className="px-5 py-4 text-sm text-slate-700 border-b border-slate-100">{b.amount}</td>
                  <td className="px-5 py-4 border-b border-slate-100">
                    <div className="flex gap-3">
                      <button className="bg-transparent border-none cursor-pointer text-base text-slate-500 hover:text-blue-500" title="Edit">✏️</button>
                      <button onClick={() => removeBazaar(b.id)} className="bg-transparent border-none cursor-pointer text-base text-slate-500 hover:text-red-500" title="Delete">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}