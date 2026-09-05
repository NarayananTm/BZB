'use client';

import { X } from 'lucide-react';
import AddMemberForm from './AddMemberForm';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: any) => void;
  sponsorId?: string;
  sponsorName?: string;
}

export default function AddMemberModal({
  isOpen,
  onClose,
  onSuccess,
  sponsorId,
  sponsorName,
}: AddMemberModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg sm:rounded-xl max-w-5xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-yellow-400 to-yellow-500 px-3 sm:px-6 py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-md">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-white">Add New Member</h2>
            <p className="text-xs sm:text-sm text-yellow-50 mt-1">Complete all steps to submit your request</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-yellow-600 p-2 rounded-lg transition-colors flex-shrink-0 w-fit"
          >
            <X size={20} className="sm:w-[24px] sm:h-[24px]" />
          </button> 
        </div>

        {/* Form Content */}
        <div className="p-3 sm:p-6 md:p-8">
          <AddMemberForm
            onSuccess={(data) => {
              onSuccess?.(data);
            }}
            onClose={onClose}
            sponsorId={sponsorId}
            sponsorName={sponsorName}
          />
        </div>
      </div>
    </div>
  );
}
