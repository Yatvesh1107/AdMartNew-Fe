const BAZAAR = [
  { month: 'January', amount: '₹5,000' },
  { month: 'February', amount: '₹4,000' },
  { month: 'March', amount: '₹5,000' },
  { month: 'April', amount: '₹3,000' },
]

export default function UserMonthlyBazaar() {
  return (
    <>
      <h1 className="text-[22px] font-semibold text-slate-900 mb-7">Monthly Bazaar</h1>

      <div className="bg-white rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)] max-w-[500px]">
        <table className="w-full border-collapse">
          <thead className="bg-sky-100">
            <tr>
              {['Month', 'Total Bazaar Amount'].map((h) => (
                <th key={h} className="text-left px-5 py-[14px] text-[13px] font-semibold text-slate-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BAZAAR.map((b) => (
              <tr key={b.month} className="last:border-none">
                <td className="px-5 py-4 text-sm text-slate-700 border-b border-slate-100">{b.month}</td>
                <td className="px-5 py-4 text-sm text-slate-700 border-b border-slate-100">{b.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}