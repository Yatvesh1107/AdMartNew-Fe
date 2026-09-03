import { useState, useEffect, useRef } from 'react'

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api'

export default function QrManagement() {
  const [qrs, setQrs] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [title, setTitle] = useState('')
  const [upiId, setUpiId] = useState('')
  const [amount, setAmount] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const fileRef = useRef(null)

  const token = localStorage.getItem('token')

  const fetchQrs = async () => {
    try {
      const res = await fetch(`${API_URL}/qr`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (res.ok) setQrs(data)
    } catch (err) {
      console.error('Fetch QR error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchQrs() }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!selectedFile) {
      setError('Please select a QR image')
      return
    }

    setUploading(true)
    setError('')
    setSuccess('')

    try {
      const fd = new FormData()
      fd.append('qrImage', selectedFile)
      fd.append('title', title || 'Payment QR')
      fd.append('upiId', upiId)
      fd.append('amount', amount)

      const res = await fetch(`${API_URL}/qr`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      setSuccess('QR code uploaded successfully!')
      setTitle('')
      setUpiId('')
      setAmount('')
      setSelectedFile(null)
      setPreview(null)
      if (fileRef.current) fileRef.current.value = ''
      fetchQrs()
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleToggle = async (id) => {
    try {
      const res = await fetch(`${API_URL}/qr/${id}/toggle`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) fetchQrs()
    } catch (err) {
      console.error('Toggle error:', err)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this QR code?')) return
    try {
      const res = await fetch(`${API_URL}/qr/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) fetchQrs()
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">QR Code Management</h1>

      {/* Upload Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8 max-w-lg">
        <h2 className="text-lg font-semibold text-slate-700 mb-4">Upload New QR Code</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-sm">{success}</div>
        )}

        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Payment QR"
              className="w-full h-10 px-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">UPI ID (optional)</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="example@upi"
              className="w-full h-10 px-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Amount (optional, 0 = any)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full h-10 px-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">QR Image *</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full h-10 px-3 border border-slate-300 rounded-lg text-sm file:mr-3 file:border-0 file:bg-blue-500 file:text-white file:text-xs file:font-semibold file:py-1.5 file:px-3 file:rounded file:cursor-pointer"
            />
          </div>

          {preview && (
            <div className="flex justify-center">
              <img src={preview} alt="QR Preview" className="w-40 h-40 object-contain border border-slate-200 rounded-lg" />
            </div>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="w-full h-10 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload QR Code'}
          </button>
        </form>
      </div>

      {/* QR List */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-700 mb-4">All QR Codes</h2>

        {loading ? (
          <p className="text-slate-500 text-sm">Loading...</p>
        ) : qrs.length === 0 ? (
          <p className="text-slate-500 text-sm">No QR codes uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {qrs.map((qr) => (
              <div
                key={qr.id}
                className={`relative border-2 rounded-xl p-4 ${qr.isActive ? 'border-green-400 bg-green-50' : 'border-slate-200 bg-slate-50 opacity-60'}`}
              >
                {qr.isActive && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">ACTIVE</span>
                )}

                <div className="flex justify-center mb-3">
                  <img
                    src={qr.image}
                    alt={qr.title}
                    className="w-32 h-32 object-contain rounded-lg"
                  />
                </div>

                <p className="text-sm font-semibold text-slate-700 text-center">{qr.title}</p>
                {qr.upiId && <p className="text-xs text-slate-500 text-center mt-1">UPI: {qr.upiId}</p>}
                {qr.amount > 0 && <p className="text-xs text-slate-500 text-center">Amount: ₹{qr.amount}</p>}

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleToggle(qr.id)}
                    className={`flex-1 h-8 rounded-lg text-xs font-medium ${qr.isActive ? 'bg-yellow-400 text-white hover:bg-yellow-500' : 'bg-green-500 text-white hover:bg-green-600'}`}
                  >
                    {qr.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(qr.id)}
                    className="h-8 px-3 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
