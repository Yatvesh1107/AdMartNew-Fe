import { useState, useEffect } from 'react'
import { adminAPI } from '../../services/api'

const STATUS_CLASSES = {
  pending: 'bg-amber-100 text-amber-600',
  approved: 'bg-emerald-100 text-emerald-600',
  rejected: 'bg-red-100 text-red-600',
}

const STATUS_LABELS = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
}

const IMG_BASE = '' // /uploads goes through vite proxy

export default function PaymentApproval() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [actingId, setActingId] = useState(null)
  const [error, setError] = useState('')
  const [rejectUser, setRejectUser] = useState(null)
  const [rejectReason, setRejectReason] = useState('')

  const fetchUsers = async (status = '') => {
    setLoading(true)
    setError('')
    try {
      const data = await adminAPI.getPendingUsers(status)
      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(filter)
  }, [filter])

  const openDetails = async (userId) => {
    setDetailLoading(true)
    try {
      const data = await adminAPI.getUserDetails(userId)
      setSelectedUser(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setDetailLoading(false)
    }
  }

  const handleStatusChange = async (userId, status, reason = '') => {
    setActingId(userId)
    setError('')
    try {
      const res = await adminAPI.updateUserStatus(userId, status, reason)
      // update local list
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status, rejectionReason: res.rejectionReason || '' } : u)))
      // update modal if open
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser((prev) => ({ ...prev, status, rejectionReason: res.rejectionReason || '' }))
      }
      setRejectUser(null)
      setRejectReason('')
    } catch (err) {
      setError(err.message)
    } finally {
      setActingId(null)
    }
  }

  const openRejectModal = (user) => {
    setRejectUser(user)
    setRejectReason('')
  }


  const formatDate = (d) => {
    if (!d) return ''
    const date = new Date(d)
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) +
      ' | ' + date.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  const filteredUsers = users.filter((u) =>
    u.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-slate-900">Payment Approval</h1>
      </div>

      {/* Filters */}
      <div className="flex gap-3 items-end mb-6 flex-wrap">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Search by Name</label>
          <input
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 border border-slate-300 rounded-md px-3 text-[13px] outline-none bg-white min-w-[160px] focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Status</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-9 border border-slate-300 rounded-md px-3 text-[13px] outline-none bg-white min-w-[140px] focus:border-blue-500"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">{error}</div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl overflow-x-auto shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <table className="w-full border-collapse min-w-[760px]">
          <thead className="bg-sky-100">
            <tr>
              {['Name', 'Mobile', 'Date & Time', 'Status', 'Action'].map((h) => (
                <th key={h} className="text-left px-4 py-[14px] text-[13px] font-semibold text-slate-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-[13px] text-slate-500">Loading...</td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-[13px] text-slate-500">No registrations found</td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id} className="last:border-none">
                  <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{u.fullName}</td>
                  <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{u.mobile}</td>
                  <td className="px-4 py-4 text-[13px] text-slate-700 border-b border-slate-100">{formatDate(u.createdAt)}</td>
                  <td className="px-4 py-4 border-b border-slate-100">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${STATUS_CLASSES[u.status]}`}>
                      {STATUS_LABELS[u.status]}
                    </span>
                  </td>
                  <td className="px-4 py-4 border-b border-slate-100">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openDetails(u.id)}
                        className="px-3 py-[5px] rounded-md text-xs font-medium bg-blue-100 text-blue-600 cursor-pointer hover:opacity-90"
                      >
                        View
                      </button>
                      {u.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(u.id, 'approved')}
                            disabled={actingId === u.id}
                            className="px-3 py-[5px] rounded-md text-xs font-medium bg-emerald-100 text-emerald-600 cursor-pointer hover:opacity-90 disabled:opacity-50"
                          >
                            {actingId === u.id ? '...' : 'Approve'}
                          </button>
                          <button
                            onClick={() => openRejectModal(u)}
                            disabled={actingId === u.id}
                            className="px-3 py-[5px] rounded-md text-xs font-medium bg-red-100 text-red-600 cursor-pointer hover:opacity-90 disabled:opacity-50"
                          >
                            {actingId === u.id ? '...' : 'Reject'}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelectedUser(null)}>
          <div
            className="bg-white w-full max-w-2xl rounded-xl max-h-[90vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-slate-800">Registration Details</h2>
              <button onClick={() => setSelectedUser(null)} className="text-slate-400 hover:text-slate-700 text-xl leading-none cursor-pointer">×</button>
            </div>

            {detailLoading ? (
              <div className="p-8 text-center text-slate-500 text-sm">Loading details...</div>
            ) : (
              <div className="p-6 space-y-6">
                {/* Basic info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-sky-50 rounded-lg">
                    <p className="text-xs text-slate-500">Name</p>
                    <p className="text-sm font-medium text-slate-800">{selectedUser.fullName}</p>
                  </div>
                  <div className="p-3 bg-sky-50 rounded-lg">
                    <p className="text-xs text-slate-500">Mobile</p>
                    <p className="text-sm font-medium text-slate-800">{selectedUser.mobile}</p>
                  </div>
                  <div className="p-3 bg-sky-50 rounded-lg">
                    <p className="text-xs text-slate-500">Referral Code</p>
                    <p className="text-sm font-medium text-slate-800">{selectedUser.referralCode || '-'}</p>
                  </div>
                  <div className="p-3 bg-sky-50 rounded-lg">
                    <p className="text-xs text-slate-500">Submitted</p>
                    <p className="text-sm font-medium text-slate-800">{formatDate(selectedUser.createdAt)}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-600 font-medium">Status:</span>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${STATUS_CLASSES[selectedUser.status]}`}>
                    {STATUS_LABELS[selectedUser.status]}
                  </span>
                </div>

                {selectedUser.status === 'rejected' && selectedUser.rejectionReason && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-xs font-semibold text-red-600 mb-1">Rejection Reason</p>
                    <p className="text-sm text-red-700">{selectedUser.rejectionReason}</p>
                  </div>
                )}

                {/* Address */}
                {(selectedUser) => (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 mb-2">Address</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p className="text-slate-600">House: <span className="text-slate-800">{selectedUser.address?.house || '-'}</span></p>
                      <p className="text-slate-600">Street: <span className="text-slate-800">{selectedUser.address?.street || '-'}</span></p>
                      <p className="text-slate-600">Locality: <span className="text-slate-800">{selectedUser.address?.locality || '-'}</span></p>
                      <p className="text-slate-600">City: <span className="text-slate-800">{selectedUser.address?.city || '-'}</span></p>
                      <p className="text-slate-600">State: <span className="text-slate-800">{selectedUser.address?.state || '-'}</span></p>
                      <p className="text-slate-600">Pincode: <span className="text-slate-800">{selectedUser.address?.pincode || '-'}</span></p>
                    </div>
                  </div>
                )}

                {/* KYC */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">KYC Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-3">
                    <p className="text-slate-600">Aadhaar: <span className="text-slate-800">{selectedUser.kyc?.aadhaarNumber || '-'}</span></p>
                    <p className="text-slate-600">PAN: <span className="text-slate-800">{selectedUser.kyc?.panNumber || '-'}</span></p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedUser.kyc?.aadhaarFront && (
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Aadhaar Front</p>
                        <a href={`${IMG_BASE}/uploads/${selectedUser.kyc.aadhaarFront}`} target="_blank" rel="noreferrer">
                          <img src={`${IMG_BASE}/uploads/${selectedUser.kyc.aadhaarFront}`} alt="Aadhaar Front" className="w-full h-24 object-cover rounded-lg border border-slate-200" />
                        </a>
                      </div>
                    )}
                    {selectedUser.kyc?.aadhaarBack && (
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Aadhaar Back</p>
                        <a href={`${IMG_BASE}/uploads/${selectedUser.kyc.aadhaarBack}`} target="_blank" rel="noreferrer">
                          <img src={`${IMG_BASE}/uploads/${selectedUser.kyc.aadhaarBack}`} alt="Aadhaar Back" className="w-full h-24 object-cover rounded-lg border border-slate-200" />
                        </a>
                      </div>
                    )}
                    {selectedUser.kyc?.panPhoto && (
                      <div>
                        <p className="text-xs text-slate-500 mb-1">PAN Card</p>
                        <a href={`${IMG_BASE}/uploads/${selectedUser.kyc.panPhoto}`} target="_blank" rel="noreferrer">
                          <img src={`${IMG_BASE}/uploads/${selectedUser.kyc.panPhoto}`} alt="PAN Card" className="w-full h-24 object-cover rounded-lg border border-slate-200" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Receipt */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Payment Receipt</h3>
                  {selectedUser.paymentScreenshot ? (
                    <a href={`${IMG_BASE}/uploads/${selectedUser.paymentScreenshot}`} target="_blank" rel="noreferrer">
                      <img src={`${IMG_BASE}/uploads/${selectedUser.paymentScreenshot}`} alt="Payment Receipt" className="w-full max-w-xs h-40 object-cover rounded-lg border border-slate-200" />
                    </a>
                  ) : (
                    <p className="text-sm text-slate-500">No payment receipt uploaded</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2 border-t border-slate-100">
                  {selectedUser.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleStatusChange(selectedUser.id, 'approved')}
                        disabled={actingId === selectedUser.id}
                        className="px-5 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-50"
                      >
                        {actingId === selectedUser.id ? 'Approving...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => openRejectModal(selectedUser)}
                        disabled={actingId === selectedUser.id}
                        className="px-5 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50"
                      >
                        {actingId === selectedUser.id ? 'Rejecting...' : 'Reject'}
                      </button>
                    </>
                  ) : (
                    <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm">
                      Already {selectedUser.status}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reject Reason Modal */}
      {rejectUser && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setRejectUser(null)}>
          <div
            className="bg-white w-full max-w-md rounded-xl overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-base font-semibold text-slate-800">Reject Registration</h3>
              <button onClick={() => setRejectUser(null)} className="text-slate-400 hover:text-slate-700 text-xl leading-none cursor-pointer">×</button>
            </div>

            <div className="p-6">
              <p className="text-sm text-slate-600 mb-4">
                Rejecting <span className="font-semibold text-slate-800">{rejectUser.fullName}</span> ({rejectUser.mobile}). Please provide a reason so the user knows why.
              </p>

              <label className="block text-[13px] text-slate-500 mb-1.5">Rejection Reason *</label>
              <textarea
                rows="4"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g. Invalid documents, payment not received..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-red-500 resize-none"
              />

              {error && (
                <div className="mt-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded-md text-xs">{error}</div>
              )}

              <div className="flex gap-3 mt-5 justify-end">
                <button
                  onClick={() => setRejectUser(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleStatusChange(rejectUser.id, 'rejected', rejectReason)}
                  disabled={actingId === rejectUser.id || !rejectReason.trim()}
                  className="px-5 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50"
                >
                  {actingId === rejectUser.id ? 'Rejecting...' : 'Confirm Reject'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
