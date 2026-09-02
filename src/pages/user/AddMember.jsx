import { useState } from 'react'

export default function AddMember() {
  const [step, setStep] = useState(1)

  // Step 1
  const [fullName, setFullName] = useState('')
  const [mobile, setMobile] = useState('')
  const [flat, setFlat] = useState('')
  const [area, setArea] = useState('')
  const [colony, setColony] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')

  // Step 2
  const [aadhaar, setAadhaar] = useState('')
  const [aadhaarFront, setAadhaarFront] = useState('No File Chosen')
  const [aadhaarBack, setAadhaarBack] = useState('No File Chosen')
  const [pan, setPan] = useState('')
  const [panPhoto, setPanPhoto] = useState('No File Chosen')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Step 3
  const [txnId, setTxnId] = useState('')
  const [receipt, setReceipt] = useState('No File Chosen')

  const handleFile = (setter) => (e) => {
    var f = e.target.files && e.target.files[0];
    setter(f ? f.name : 'No File Chosen');
  }

  return (
    <>
      <h1 className="text-[22px] font-semibold text-slate-900 mb-7">Add Member</h1>

      <div className="max-w-[520px]">
        {/* ========== STEP 1 : Personal + Address ========== */}
        {step === 1 && (
          <>
            <Input label="Full Name" icon="👤" placeholder="Full Name" value={fullName} onChange={setFullName} />
            <Input label="Mobile Number" icon="📞" placeholder="Mobile Number" value={mobile} onChange={setMobile} />
            <Input label="Flat / House No." icon="🏠" placeholder="Flat / House No." value={flat} onChange={setFlat} />
            <Input label="Area / Street" icon="📍" placeholder="Area / Street" value={area} onChange={setArea} />
            <Input label="Colony / Locality" icon="🏘️" placeholder="Colony / Locality" value={colony} onChange={setColony} />
            <Input label="City" icon="🏙️" placeholder="City" value={city} onChange={setCity} />
            <Input label="State" icon="🗺️" placeholder="State" value={state} onChange={setState} />
            <Input label="Pincode" icon="📌" placeholder="Pincode" value={pincode} onChange={setPincode} />

            <div className="flex justify-end mt-8">
              <Button type="next" onClick={() => setStep(2)}>Next</Button>
            </div>
          </>
        )}

        {/* ========== STEP 2 : KYC + Password ========== */}
        {step === 2 && (
          <>
            <Input label="Aadhaar Number" icon="🆔" placeholder="XXXX XXXX XXXX" value={aadhaar} onChange={setAadhaar} />
            <FileUpload label="Aadhaar Front Photo" fileName={aadhaarFront} onChange={handleFile(setAadhaarFront)} />
            <FileUpload label="Aadhaar Back Photo" fileName={aadhaarBack} onChange={handleFile(setAadhaarBack)} />
            <Input label="PAN Card Number" icon="💳" placeholder="ABCDE1234F" value={pan} onChange={setPan} />
            <FileUpload label="PAN Card Number Photo" fileName={panPhoto} onChange={handleFile(setPanPhoto)} />
            <Input label="Password" icon="🔒" type="password" placeholder="Create Password" value={password} onChange={setPassword} />
            <Input label="Confirm Password" icon="🔒" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} />
            <Input label="Referral Code" icon="🔗" value="REF12345" readOnly />

            <div className="flex justify-between mt-8">
              <Button type="back" onClick={() => setStep(1)}>Back</Button>
              <Button type="next" onClick={() => setStep(3)}>Next</Button>
            </div>
          </>
        )}

        {/* ========== STEP 3 : Offline / Manual Payment ========== */}
        {step === 3 && (
          <>
            <div className="mb-5">
              <label className="block text-[13px] text-slate-500 mb-1.5">Payment Mode</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[15px]">💰</span>
                <select className="w-full h-11 border border-slate-300 rounded-lg pl-[42px] pr-4 text-sm outline-none bg-slate-50 focus:border-blue-500 focus:bg-white">
                  <option>Offline Payment</option>
                </select>
              </div>
            </div>

            {/* QR Box */}
            <div className="bg-sky-50 border border-dashed border-sky-300 rounded-xl p-5 text-center mb-6">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=UPI://pay?pa=admin@upi&pn=Admin%20Bazaar&am=2500"
                alt="Payment QR"
                className="w-[180px] h-[180px] object-contain mx-auto mb-2.5 bg-white p-2 rounded-lg"
              />
              <p className="text-[13px] text-sky-700">Scan this QR code to pay (added by Admin)</p>
            </div>

            <Input label="Transaction ID" icon="🔢" placeholder="Enter Transaction ID" value={txnId} onChange={setTxnId} />
            <FileUpload label="Upload Receipt" fileName={receipt} onChange={handleFile(setReceipt)} />

            <div className="flex justify-between mt-8">
              <Button type="back" onClick={() => setStep(2)}>Back</Button>
              <Button type="submit">Submit</Button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

function Input({ label, icon, type = 'text', placeholder, value, onChange, readOnly }) {
  return (
    <div className="mb-[18px]">
      <label className="block text-[13px] text-slate-500 mb-1.5">{label}</label>
      <div className="relative">
        {icon && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[15px]">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
          onChange={readOnly ? undefined : (e) => onChange(e.target.value)}
          className={`w-full h-11 border border-slate-300 rounded-lg ${icon ? 'pl-[42px]' : 'pl-3.5'} pr-4 text-sm outline-none bg-slate-50 focus:border-blue-500 focus:bg-white ${readOnly ? 'bg-slate-100 text-slate-700' : ''}`}
        />
      </div>
    </div>
  )
}

function FileUpload({ label, fileName, onChange }) {
  return (
    <div className="mb-[18px]">
      <label className="block text-[13px] text-slate-500 mb-1.5">{label}</label>
      <div className="flex items-center gap-3 h-11 border border-slate-300 rounded-lg px-3.5 bg-slate-50">
        <label className="bg-sky-100 border border-sky-200 text-sky-700 px-3 py-[5px] rounded-md text-xs cursor-pointer hover:bg-sky-200">
          Choose File
          <input type="file" className="hidden" onChange={onChange} />
        </label>
        <span className="text-[13px] text-slate-400 truncate">{fileName}</span>
      </div>
    </div>
  )
}

function Button({ type, children, onClick }) {
  const styles = type === 'back'
    ? 'bg-white border border-slate-300 text-slate-500 hover:bg-slate-50'
    : 'bg-blue-600 text-white hover:bg-blue-700'
  return (
    <button type="button" onClick={onClick} className={`px-7 py-2.5 rounded-lg text-sm font-medium cursor-pointer border ${styles}`}>
      {children}
    </button>
  )
}