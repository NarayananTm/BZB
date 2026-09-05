'use client';

import { useState, useEffect } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import AddMemberModal from '@/components/admin/AddMemberModal';
import PendingRequestsCard from '@/components/admin/PendingRequestsCard';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AddMemberPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setIsModalOpen(false);
    // Trigger refresh of pending requests
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/admin"
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft size={24} className="text-gray-600" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Member Management</h1>
                  <p className="text-gray-600">Add new members and manage requests</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-white font-bold rounded-lg hover:bg-yellow-500 transition-colors shadow-md"
              >
                <Plus size={20} />
                Add Member
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Info Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-bold text-blue-900 mb-2">How It Works</h2>
            <ol className="text-blue-800 space-y-2">
              <li className="flex gap-3">
                <span className="font-bold">1.</span>
                <span>Click "Add Member" to open the registration form</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">2.</span>
                <span>Fill in all required information across 3 steps (Basic Info, Personal Details, Bank Details)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">3.</span>
                <span>Submit your request for admin review</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">4.</span>
                <span>Admin will approve or reject your request</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">5.</span>
                <span>Once approved, member login credentials will be sent via SMS</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">6.</span>
                <span>Member can then log in and access their dashboard, with referral info tracked</span>
              </li>
            </ol>
          </div>

          {/* Pending Requests Section */}
          <PendingRequestsCard key={refreshKey} onRefresh={() => setRefreshKey((prev) => prev + 1)} />
        </div>

        {/* Add Member Modal */}
        <AddMemberModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleSuccess}
        />
      </div>
    </AdminLayout>
  );
}
