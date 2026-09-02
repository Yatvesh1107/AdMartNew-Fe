import { useState } from 'react'

const MEMBERS = [
  { id: 1, name: 'Amit Sharma', mobile: '9857127834', joinDate: '12 Jan 2026', month: 'January', monthlyBazaar: '₹2,500', status: 'Active' },
  { id: 2, name: 'Amit Sharma', mobile: '9857127834', joinDate: '12 Jan 2026', month: 'January', monthlyBazaar: '₹2,500', status: 'Active' },
  { id: 3, name: 'Amit Sharma', mobile: '9857127834', joinDate: '12 Jan 2026', month: 'January', monthlyBazaar: '₹2,500', status: 'Active' },
  { id: 4, name: 'Amit Sharma', mobile: '9857127834', joinDate: '12 Jan 2026', month: 'January', monthlyBazaar: '₹2,500', status: 'Active' },
]

const PROFILE = {
  fullName: 'Rajnish Sharma',
  mobile: '9857127834',
  joinDate: '10 Jan 2026',
  referralCode: 'REF12345',
  address: { flat: 'Flat 302', area: 'MG Road', colony: 'Shivaji Nagar', city: 'Pune', state: 'Maharashtra', pincode: '411001' },
  kycs: { aadhaar: 'XXXX XXXX 1234', pan: 'ABCDE1234F' },
  summary: { bazaar: '₹2,500 (January)', earnings: '₹1,200', referrals: '10' },
}

const MONTHS = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function UserMembers() {
  const [selected, setSelected] = useState(false)

  return (
    <>
      <h1 className="text-[22px] font-semibold text-slate-900 mb-6">Total Members List</h1>

      {/* Filters */}
      <div className="flex gap-3 items-end mb-6 flex-wrap">
        <FilterInput label="Search by Name" placeholder="Search by Name" />
        <FilterInput label="Search by Mobile Name" placeholder="Search by Mobile" />
        <FilterSelect label="Search by Month" options={MONTHS} />
        <FilterInput label="Search by Date" placeholder="Search by Date" />
        <FilterSelect label="Search by Status" options={['All', 'Active', 'Inactive']} />
        <FilterInput label="Search by Amount" placeholder="Search by Amount" />
        <button className="h-9 px-5 bg-blue-500 text-white rounded-md text-[13px] font-medium cursor-pointer hover:bg-blue-600">Apply</button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-x-auto shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <table className="w-full border-collapse min-w-[680px]">
          <thead className="bg-sky-100">
            <tr>
              {['Name', 'Mobile', 'Join Date', 'Month', 'Monthly Bazaar', 'Status', 'Action'].map((h) => (
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
                <td className="px-4 py-4 border-b border-slate-100">
                  <button onClick={() => setSelected(true)} className="px-3 py-[5px] rounded-md text-xs font-medium bg-blue-100 text-blue-600 cursor-pointer hover:opacity-90">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Member Profile Modal */}
      {selected && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50">
          <div className="bg-white w-[720px] max-w-[95%] rounded-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.15)] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold text-slate-900">Member Profile</h2>
              <button onClick={() => setSelected(false)} className="text-slate-500 text-[22px] cursor-pointer bg-transparent border-none">×</button>
            </div>

            {/* Basic Details */}
            <div className="mb-5">
              <div className="text-sm font-semibold text-slate-900 mb-3">Basic Details</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Full Name" value={PROFILE.fullName} />
                <Field label="Mobile" value={PROFILE.mobile} />
                <Field label="Joining Date" value={PROFILE.joinDate} />
                <Field label="Referral Code" value={PROFILE.referralCode} />
              </div>
            </div>

            {/* Address Details */}
            <div className="mb-5">
              <div className="text-sm font-semibold text-slate-900 mb-3">Address Details</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Flat / House No" value={PROFILE.address.flat} />
                <Field label="Area / Street" value={PROFILE.address.area} />
                <Field label="Colony / Locality" value={PROFILE.address.colony} />
                <Field label="City" value={PROFILE.address.city} />
                <Field label="State" value={PROFILE.address.state} />
                <Field label="Pincode" value={PROFILE.address.pincode} />
              </div>
            </div>

            {/* KYC Details */}
            <div className="mb-5">
              <div className="text-sm font-semibold text-slate-900 mb-3">KYC Details</div>
              <div className="flex gap-8 flex-wrap">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Aadhaar Number</div>
                  <div className="text-sm font-medium text-slate-900">{PROFILE.kycs.aadhaar}</div>
                </div>                <div>
                  <div className="text-xs text-slate-500 mb-1">Aadhaar Front</div>
                  <a href="#" className="text-blue-600 text-[13px] font-medium no-underline">View Image</a>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Aadhaar Back</div>
                  <a href="#" className="text-blue-600 text-[13px] font-medium no-underline">View Image</a>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">PAN Number</div>
                  <div className="text-sm font-medium text-slate-900">{PROFILE.kycs.pan}</div>
                </div>
              </div>
            </div>

            {/* System Summary */}
            <div>
              <div className="text-sm font-semibold text-slate-900 mb-3">System Summary</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <SummaryCard label="Monthly Bazaar" value={PROFILE.summary.bazaar} />
                <SummaryCard label="Current Earnings" value={PROFILE.summary.earnings} />
                <SummaryCard label="Total Referred Members" value={PROFILE.summary.referrals} />
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