import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/admin')
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left side - background image */}
      <div className="flex-1 bg-cover bg-center relative"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')` }}
      />

      {/* Right side */}
      <div className="w-[480px] bg-white flex flex-col items-center justify-center p-10">
        {/* Logo */}
        <div className="mb-[30px] text-3xl font-extrabold tracking-wide bg-gradient-to-r from-green-500 via-orange-500 to-orange-600 bg-clip-text text-transparent">
          AdMart
        </div>

        {/* Card */}
        <form onSubmit={handleSubmit} className="w-full max-w-[360px] bg-sky-100 rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <h2 className="text-center text-[22px] font-semibold text-[#111] mb-7">Admin</h2>

          <div className="mb-[18px]">
            <label className="block text-[13px] text-slate-500 mb-[6px]">Login</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base">📞</span>
              <input
                type="text"
                placeholder="User ID"
                className="w-full h-11 border border-slate-300 rounded-lg pl-10 pr-10 text-sm focus:outline-none focus:border-blue-500 bg-white"
              />
            </div>
          </div>

          <div className="mb-[18px]">
            <label className="block text-[13px] text-slate-500 mb-[6px]">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base">🔑</span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                className="w-full h-11 border border-slate-300 rounded-lg pl-10 pr-10 text-sm focus:outline-none focus:border-blue-500 bg-white"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer select-none"
                onClick={() => setShowPassword((p) => !p)}
              >
                👁️
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center my-[18px] text-[13px]">
            <div className="flex items-center gap-2 text-slate-500">
              <div
                className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${remember ? 'bg-blue-600' : 'bg-slate-300'}`}
                onClick={() => setRemember((r) => !r)}
              >
                <div className={`absolute w-4 h-4 bg-white rounded-full top-[2px] transition-all ${remember ? 'left-[18px]' : 'left-[2px]'}`} />
              </div>
              Remember me
            </div>
            <a href="#" className="text-blue-500 no-underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full h-[46px] bg-blue-600 text-white rounded-lg text-[15px] font-medium cursor-pointer hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
