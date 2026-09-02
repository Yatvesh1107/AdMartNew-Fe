import { useState } from 'react'

export default function UserProfile() {
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState('Rajnish Kotmire')
  const [mobile, setMobile] = useState('9422413073')
  const [address, setAddress] = useState('Pune, Maharashtra')
  const [showPassword, setShowPassword] = useState(false)

  const toggleEdit = () => {
    setEditMode((m) => !m)
    if (editMode) setShowPassword(false)
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[22px] font-semibold text-slate-900">Profile</h1>
        <button
          onClick={toggleEdit}
          className={`px-[18px] py-2 rounded-lg text-[13px] font-medium cursor-pointer border ${
            editMode ? 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
          }`}
        >
          {editMode ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div className="bg-white rounded-2xl px-8 py-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] max-w-[780px]">
        {/* Profile Header */}
        <div className="flex items-center gap-[18px] mb-7">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-[26px] font-semibold text-blue-600">R</div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{name}</h2>
            <p className="text-[13px] text-slate-500 mt-[3px]">User ID: U12345</p>
          </div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-[18px]">
          <Field label="Full Name" icon="👤" editable={editMode} value={name} onChange={setName} />
          <Field label="Mobile Number" icon="📞" editable={editMode} value={mobile} onChange={setMobile} />
          <div className="sm:col-span-2">
            <Field label="Address" icon="🏠" editable={editMode} value={address} onChange={setAddress} />
          </div>
          <Field label="Aadhaar Number" icon="🆔" value="XXXX-XXXX-1234" lock />
          <Field label="Aadhaar Document" icon="📄" value="Uploaded" lock />
          <Field label="PAN Number" icon="💳" value="ABCDE1234F" lock />
          <Field label="PAN Card Document" icon="📄" value="Uploaded" lock />
        </div>

        {/* Change Password Button (View Mode) */}
        {!showPassword && (
          <button
            onClick={() => setShowPassword(true)}
            className="mt-7 bg-sky-100 border-none text-sky-700 px-6 py-[11px] rounded-lg text-sm font-medium cursor-pointer hover:bg-sky-200"
          >
            Change Password
          </button>
        )}

        {/* Password Fields */}
        {showPassword && (
          <div className="mt-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-[18px] mt-5">
              <div className="sm:col-span-2">
                <PasswordField label="Current Password" placeholder="Enter Current Password" />
              </div>
              <PasswordField label="New Password" placeholder="Enter New Password" />
              <PasswordField label="Confirm New Password" placeholder="Confirm New Password" />
            </div>

            <div className="flex gap-3 mt-6">
              <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-700">Save Changes</button>
              <button onClick={() => setShowPassword(false)} className="bg-white border border-slate-300 text-slate-500 px-6 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-slate-50">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

function Field({ label, icon, value, editable, onChange, lock }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-slate-500">{label}</label>
      <div className="bg-sky-100 rounded-lg px-3.5 py-[11px] text-sm text-slate-900 flex items-center gap-2">
        <span>{icon}</span>
        {editable ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border-none bg-transparent outline-none text-sm text-slate-900"
          />
        ) : (
          <span>{value}</span>
        )}
        {lock && <span className="ml-auto text-slate-400 text-xs">LOCKED</span>}
      </div>
    </div>
  )
}

function PasswordField({ label, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-slate-500">{label}</label>
      <div className="bg-sky-100 rounded-lg px-3.5 py-[11px] text-sm text-slate-900 flex items-center gap-2">
        <span>🔐</span>
        <input type="password" placeholder={placeholder} className="w-full border-none bg-transparent outline-none text-sm text-slate-900" />
      </div>
    </div>
  )
}