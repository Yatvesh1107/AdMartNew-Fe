import { useState } from 'react'

const ACHIEVEMENTS = [
  { id: 1, name: 'Rajnish', mobile: '9857127834', totalMembers: 5 },
]

const MEMBERS = [
  { id: 1, name: 'Rajnish', mobile: '9857127834', joinDate: '10 Jan 2026', month: 'January', monthlyBazaar: '₹2,500', status: 'Active', earning: '₹1,200', fullName: 'Rajnish Sharma', referralCode: 'REF12345' },
  { id: 2, name: 'Rajnish', mobile: '9857127834', joinDate: '10 Jan 2026', month: 'January', monthlyBazaar: '₹2,500', status: 'Active', earning: '₹1,200', fullName: 'Rajnish Sharma', referralCode: 'REF12345' },
  { id: 3, name: 'Rajnish', mobile: '9857127834', joinDate: '10 Jan 2026', month: 'January', monthlyBazaar: '₹2,500', status: 'Active', earning: '₹1,200', fullName: 'Rajnish Sharma', referralCode: 'REF12345' },
  { id: 4, name: 'Rajnish', mobile: '9857127834', joinDate: '10 Jan 2026', month: 'January', monthlyBazaar: '₹2,500', status: 'Active', earning: '₹1,200', fullName: 'Rajnish Sharma', referralCode: 'REF12345' },
]

const ADDRESS = {
  flat: 'Flat 302',
  area: 'MG Road',
  colony: 'Shivaji Nagar',
  city: 'Pune',
  state: 'Maharashtra',
  pincode: '411001',
}

const KYC = {
  aadhaar: 'XXXX XXXX 1234',
  pan: 'ABCDE1234F',
}

export default function Achievements() {
  const [view, setView] = useState('list')
  const [selected, setSelected] = useState(null)

  return (
    <>
      {view === 'list' ? (
        /* ========== VIEW 1: Achievements List ========== */
        <>
          <h1 className="text-[22px] font-semibold text-slate-900 mb-6">Achievements</h1>

          <div className="flex gap-3 items-end mb-6 flex-wrap">
            <FilterInput label="Search by Name" placeholder="Search by Name" />
            <FilterInput label="Search by Mobile Name" placeholder="Search by Mobile" />
            <FilterInput label="Search by Members" placeholder="Search by Members" />
            <button className="h-9 px-5 bg-blue-500 text-white rounded-md text-[13px] font-medium cursor-pointer hover:bg-blue-600">Apply</button>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <table className="w-full border-collapse">
              <thead className="bg-sky-100">
                <tr>
                  {['Name', 'Mobile', 'Action', 'Total Members', ''].map((h, i) => (
                    <th key={i} className="text-left px-4 py-[14px] text-[13px] font-semibold text-slate-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ACHIEVEMENTS.map((a, idx) => {
                  const member = { name: a.name, mobile: a.mobile, fullName: 'Rajnish Sharma', referralCode: 'REF12345' }
                  return (
                    <tr key={a.id}>
                      <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{a.name}</td>
                      <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{a.mobile}</td>
                      <td className="px-4 py-4 border-b border-slate-100">
                        <button onClick={() => setSelected(member)} className="px-3 py-[5px] rounded-md text-xs font-medium bg-blue-100 text-blue-600 cursor-pointer hover:opacity-90">View</button>
                      </td>
                      <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{a.totalMembers}</td>
                      <td className="px-4 py-4 border-b border-slate-100">
                        <button onClick={() => setView('members')} className="px-3 py-[5px] rounded-md text-xs font-medium bg-blue-500 text-white cursor-pointer hover:opacity-90">View Members</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* ========== VIEW 2: Achievements → Members ========== */
        <>
          <h1 className="text-[22px] font-semibold text-slate-900 mb-1">Achievements</h1>
          <div className="text-[15px] text-slate-500 mb-5">
            Members
            <button onClick={() => setView('list')} className="ml-3 text-xs text-blue-500 hover:underline cursor-pointer bg-transparent border-none">← Back</button>
          </div>

          <div className="flex gap-3 items-end mb-6 flex-wrap">
            <FilterInput label="Search by Name" placeholder="Search by Name" />
            <FilterInput label="Search by Mobile Name" placeholder="Search by Mobile" />
            <FilterSelect label="Search by Month" options={['All', 'January', 'February']} />
            <FilterInput label="Search by Date" placeholder="Search by Date" />
            <FilterSelect label="Search by Status" options={['Active', 'Inactive']} />
            <FilterInput label="Search by Amount" placeholder="Search by Amount" />
            <button className="h-9 px-5 bg-blue-500 text-white rounded-md text-[13px] font-medium cursor-pointer hover:bg-blue-600">Apply</button>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <table className="w-full border-collapse">
              <thead className="bg-sky-100">
                <tr>
                  {['Name', 'Mobile', 'Join Date', 'Month', 'Monthly Bazaar', 'Status', 'Earning', 'Action'].map((h) => (
                    <th key={h} className="text-left px-4 py-[14px] text-[13px] font-semibold text-slate-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MEMBERS.map((m) => (
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
        </>
      )}

      {/* ========== MEMBER PROFILE MODAL ========== */}
      {selected && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50">
          <div className="bg-white w-[720px] max-w-[95%] rounded-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.15)] relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold text-slate-900">Member Profile</h2>
              <button onClick={() => setSelected(null)} className="text-slate-500 text-[22px] cursor-pointer leading-none bg-transparent border-none">×</button>
            </div>

            {/* Basic Details */}
            <div className="mb-5">
              <div className="text-sm font-semibold text-slate-900 mb-3">Basic Details</div>
              <div className="grid grid-cols-3 gap-4">
                <Field label="Full Name" value={selected.fullName} />
                <Field label="Mobile" value={selected.mobile} />
                <Field label="Joining Date" value={selected.joinDate || '10 Jan 2026'} />
                <Field label="Referral Code" value={selected.referralCode} />
              </div>
            </div>

            {/* Address Details */}
            <div className="mb-5">
              <div className="text-sm font-semibold text-slate-900 mb-3">Address Details</div>
              <div className="grid grid-cols-3 gap-4">
                <Field label="Flat / House No" value={ADDRESS.flat} />
                <Field label="Area / Street" value={ADDRESS.area} />
                <Field label="Colony / Locality" value={ADDRESS.colony} />
                <Field label="City" value={ADDRESS.city} />
                <Field label="State" value={ADDRESS.state} />
                <Field label="Pincode" value={ADDRESS.pincode} />
              </div>
            </div>

            {/* KYC Details */}
            <div className="mb-5">
              <div className="text-sm font-semibold text-slate-900 mb-3">KYC Details</div>
              <div className="flex gap-8 flex-wrap">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Aadhaar Number</div>
                  <div className="text-sm font-medium text-slate-900">{KYC.aadhaar}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Aadhaar Front</div>
                  <a href="#" className="text-blue-600 text-[13px] font-medium no-underline">View Image</a>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Aadhaar Back</div>
                  <a href="#" className="text-blue-600 text-[13px] font-medium no-underline">View Image</a>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">PAN Number</div>
                  <div className="text-sm font-medium text-slate-900">{KYC.pan}</div>
                </div>
              </div>
            </div>

            {/* System Summary */}
            <div>
              <div className="text-sm font-semibold text-slate-900 mb-3">System Summary</div>
              <div className="grid grid-cols-3 gap-4">
                <SummaryCard label="Monthly Bazaar" value="₹2,500 (January)" />
                <SummaryCard label="Current Earnings" value="₹1,200" />
                <SummaryCard label="Total Referred Members" value="10" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function FilterInput({ label, placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-slate-500">{label}</label>
      <input type="text" placeholder={placeholder} className="h-9 border border-slate-300 rounded-md px-3 text-[13px] outline-none bg-white min-w-[140px] focus:border-blue-500" />
    </div>
  )
}

function FilterSelect({ label, options }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-slate-500">{label}</label>
      <select className="h-9 border border-slate-300 rounded-md px-3 text-[13px] outline-none bg-white min-w-[140px] focus:border-blue-500">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
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