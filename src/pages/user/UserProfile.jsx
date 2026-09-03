import { useState, useEffect } from 'react'
import { authAPI } from '../../services/api'

export default function UserProfile() {
  const [editMode, setEditMode] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    house: '',
    street: '',
    locality: '',
    city: '',
    state: '',
    pincode: '',
  })

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const fetchProfile = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await authAPI.getProfile()
      setProfile(data)
      setForm({
        fullName: data.fullName || '',
        mobile: data.mobile || '',
        house: data.address?.house || '',
        street: data.address?.street || '',
        locality: data.address?.locality || '',
        city: data.address?.city || '',
        state: data.address?.state || '',
        pincode: data.address?.pincode || '',
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const toggleEdit = () => {
    setEditMode((m) => !m)
    if (!editMode) {
      // reset form to current profile when entering edit
      setForm({
        fullName: profile?.fullName || '',
        mobile: profile?.mobile || '',
        house: profile?.address?.house || '',
        street: profile?.address?.street || '',
        locality: profile?.address?.locality || '',
        city: profile?.address?.city || '',
        state: profile?.address?.state || '',
        pincode: profile?.address?.pincode || '',
      })
    }
    if (editMode) setShowPassword(false)
    setError('')
    setSuccess('')
  }

  const handleFormChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      const data = await authAPI.updateProfile({
        fullName: form.fullName,
        address: {
          house: form.house,
          street: form.street,
          locality: form.locality,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        },
      })
      await fetchProfile()
      setEditMode(false)
      setSuccess('Profile updated successfully')
    } catch (err) {
      setError(err.message)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      setError('Please fill in all password fields')
      return
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('New passwords do not match')
      return
    }
    if (passwords.newPassword.length < 6) {
      setError('New password must be at least 6 characters')
      return
    }

    try {
      await authAPI.changePassword(passwords.currentPassword, passwords.newPassword)
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setShowPassword(false)
      setSuccess('Password changed successfully')
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) {
    return <div className="text-slate-500 text-sm p-6">Loading profile...</div>
  }

  if (error && !profile) {
    return <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">{error}</div>
  }

  const initial = (profile?.fullName || 'U').charAt(0).toUpperCase()

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

      {(error || success) && (
        <div className={`mb-4 p-3 rounded-md text-sm ${error ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'}`}>
          {error || success}
        </div>
      )}

      <form onSubmit={editMode ? handleSave : undefined} className="bg-white rounded-2xl px-8 py-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] max-w-[780px]">
        {/* Profile Header */}
        <div className="flex items-center gap-[18px] mb-7">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-[26px] font-semibold text-blue-600">{initial}</div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{editMode ? form.fullName : (profile?.fullName || '')}</h2>
            <p className="text-[13px] text-slate-500 mt-[3px]">
              {profile?.status ? `Status: ${profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}` : ''}
              {profile?.referralCode ? ` | Referral: ${profile.referralCode}` : ''}
            </p>
          </div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-[18px]">
          <Field label="Full Name" icon="👤" editable={editMode} value={form.fullName} onChange={handleFormChange('fullName')} />
          <Field label="Mobile Number" icon="📞" value={profile?.mobile || form.mobile} lock />
          <div className="sm:col-span-2">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Address</h3>
          </div>
          <Field label="Flat / House No." icon="🏠" editable={editMode} value={form.house} onChange={handleFormChange('house')} />
          <Field label="Area / Street" icon="🛣️" editable={editMode} value={form.street} onChange={handleFormChange('street')} />
          <Field label="Colony / Locality" icon="🏘️" editable={editMode} value={form.locality} onChange={handleFormChange('locality')} />
          <Field label="City" icon="🏙️" editable={editMode} value={form.city} onChange={handleFormChange('city')} />
          <Field label="State" icon="🗺️" editable={editMode} value={form.state} onChange={handleFormChange('state')} />
          <Field label="Pincode" icon="📮" editable={editMode} value={form.pincode} onChange={handleFormChange('pincode')} />

          <Field label="Aadhaar Number" icon="🆔" value={profile?.kyc?.aadhaarNumber || '-'} lock />
          <Field label="PAN Number" icon="💳" value={profile?.kyc?.panNumber || '-'} lock />
        </div>

        {/* Edit Save Button */}
        {editMode && (
          <div className="flex gap-3 mt-6">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-700">Save Changes</button>
            <button type="button" onClick={toggleEdit} className="bg-white border border-slate-300 text-slate-500 px-6 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-slate-50">Cancel</button>
          </div>
        )}

        {/* Change Password Button (View Mode) */}
        {!showPassword && !editMode && (
          <button
            type="button"
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
                <PasswordField label="Current Password" placeholder="Enter Current Password" value={passwords.currentPassword} onChange={(e) => setPasswords((p) => ({ ...p, currentPassword: e.target.value }))} />
              </div>
              <PasswordField label="New Password" placeholder="Enter New Password" value={passwords.newPassword} onChange={(e) => setPasswords((p) => ({ ...p, newPassword: e.target.value }))} />
              <PasswordField label="Confirm New Password" placeholder="Confirm New Password" value={passwords.confirmPassword} onChange={(e) => setPasswords((p) => ({ ...p, confirmPassword: e.target.value }))} />
            </div>

            <div className="flex gap-3 mt-6">
              <button type="button" onClick={handlePasswordChange} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-700">Save Changes</button>
              <button type="button" onClick={() => setShowPassword(false)} className="bg-white border border-slate-300 text-slate-500 px-6 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-slate-50">Cancel</button>
            </div>
          </div>
        )}
      </form>
    </>
  )
}

function Field({ label, icon, value, editable, onChange, lock }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-slate-500">{label}</label>
      <div className={`bg-sky-100 rounded-lg px-3.5 py-[11px] text-sm text-slate-900 flex items-center gap-2 ${editable ? 'ring-1 ring-blue-300' : ''}`}>
        <span>{icon}</span>
        {editable ? (
          <input
            type="text"
            value={value || ''}
            onChange={onChange}
            className="w-full border-none bg-transparent outline-none text-sm text-slate-900"
          />
        ) : (
          <span>{value || '-'}</span>
        )}
        {lock && <span className="ml-auto text-slate-400 text-xs">LOCKED</span>}
      </div>
    </div>
  )
}

function PasswordField({ label, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-slate-500">{label}</label>
      <div className="bg-sky-100 rounded-lg px-3.5 py-[11px] text-sm text-slate-900 flex items-center gap-2">
        <span>🔐</span>
        <input type="password" placeholder={placeholder} value={value || ''} onChange={onChange} className="w-full border-none bg-transparent outline-none text-sm text-slate-900" />
      </div>
    </div>
  )
}
