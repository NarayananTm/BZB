'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Check, X, Eye, Loader2 } from 'lucide-react';
import type { MemberRequest } from '@/services/memberRequestService';

interface PendingRequestsCardProps {
  onRefresh?: () => void;
}

export default function PendingRequestsCard({ onRefresh }: PendingRequestsCardProps) {
  const [requests, setRequests] = useState<MemberRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<MemberRequest | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/member-requests?status=Pending&limit=50');
      const data = await response.json();

      if (data.success) {
        setRequests(data.data || []);
      } else {
        toast.error('Failed to fetch requests');
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Error loading requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (requestId: string) => {
    setProcessingId(requestId);
    try {
      const response = await fetch('/api/admin/member-requests/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Member approved and credentials sent via SMS');
        setRequests(requests.filter((r) => r.id !== requestId));
        onRefresh?.();
      } else {
        toast.error(data.message || 'Failed to approve request');
      }
    } catch (error) {
      console.error('Error approving request:', error);
      toast.error('Error approving request');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async () => {
    if (!selectedRequest) return;

    setProcessingId(selectedRequest.id);
    try {
      const response = await fetch('/api/admin/member-requests/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: selectedRequest.id,
          reason: rejectionReason,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Member request rejected and notification sent');
        setRequests(requests.filter((r) => r.id !== selectedRequest.id));
        setShowModal(false);
        setRejectionReason('');
        setSelectedRequest(null);
        onRefresh?.();
      } else {
        toast.error(data.message || 'Failed to reject request');
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast.error('Error rejecting request');
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-yellow-400" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Pending Requests</h2>
            <p className="text-gray-600 mt-1">{requests.length} pending member requests</p>
          </div>
          <div className="bg-yellow-100 px-4 py-2 rounded-full">
            <span className="text-yellow-800 font-bold text-lg">{requests.length}</span>
          </div>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-gray-600">No pending requests at this time</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Mobile
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Sponsor
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Submitted Date
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {request.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{request.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{request.mobile}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {request.sponsor_name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(request.submitted_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowModal(false);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleApprove(request.id)}
                        disabled={processingId === request.id}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Approve"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowModal(true);
                        }}
                        disabled={processingId === request.id}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Reject"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      {selectedRequest && !showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-yellow-400 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Request Details</h3>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-white hover:bg-yellow-500 p-1 rounded"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <h4 className="font-bold text-gray-800 mb-4">Basic Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium text-gray-900">{selectedRequest.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{selectedRequest.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mobile</p>
                    <p className="font-medium text-gray-900">{selectedRequest.mobile}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sponsor</p>
                    <p className="font-medium text-gray-900">
                      {selectedRequest.sponsor_name || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              {(selectedRequest.date_of_birth ||
                selectedRequest.gender ||
                selectedRequest.address) && (
                <div>
                  <h4 className="font-bold text-gray-800 mb-4">Personal Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedRequest.date_of_birth && (
                      <div>
                        <p className="text-sm text-gray-600">Date of Birth</p>
                        <p className="font-medium text-gray-900">
                          {selectedRequest.date_of_birth}
                        </p>
                      </div>
                    )}
                    {selectedRequest.gender && (
                      <div>
                        <p className="text-sm text-gray-600">Gender</p>
                        <p className="font-medium text-gray-900">{selectedRequest.gender}</p>
                      </div>
                    )}
                    {selectedRequest.address && (
                      <div className="col-span-2">
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-medium text-gray-900">{selectedRequest.address}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Bank Details */}
              {(selectedRequest.bank_name || selectedRequest.bank_account_no) && (
                <div>
                  <h4 className="font-bold text-gray-800 mb-4">Bank Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedRequest.bank_name && (
                      <div>
                        <p className="text-sm text-gray-600">Bank Name</p>
                        <p className="font-medium text-gray-900">{selectedRequest.bank_name}</p>
                      </div>
                    )}
                    {selectedRequest.bank_account_holder && (
                      <div>
                        <p className="text-sm text-gray-600">Account Holder</p>
                        <p className="font-medium text-gray-900">
                          {selectedRequest.bank_account_holder}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 p-6 flex gap-4 justify-end">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowModal(true);
                }}
                className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Reject Request
              </button>
              <button
                onClick={() => handleApprove(selectedRequest.id)}
                disabled={processingId === selectedRequest.id}
                className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {processingId === selectedRequest.id ? 'Processing...' : 'Approve Request'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="bg-red-500 px-6 py-4">
              <h3 className="text-lg font-bold text-white">Reject Request</h3>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-700">
                Are you sure you want to reject the request for <strong>{selectedRequest.name}</strong>?
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rejection Reason (optional)
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Provide a reason for rejection (will be sent to applicant)"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                ></textarea>
              </div>
            </div>

            <div className="border-t border-gray-200 p-6 flex gap-4 justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                  setRejectionReason('');
                }}
                disabled={processingId === selectedRequest.id}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={processingId === selectedRequest.id}
                className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {processingId === selectedRequest.id ? 'Processing...' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
