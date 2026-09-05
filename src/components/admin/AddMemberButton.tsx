'use client';

import { useState } from 'react';
import AddMemberModal from './AddMemberModal';

export default function AddMemberButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex h-14 min-w-[220px] items-center justify-center rounded-[16px] bg-[#E5C500] px-6 text-base font-semibold text-white hover:bg-yellow-500 transition-colors"
      >
        Add Member
      </button>

      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          window.location.reload();
        }}
      />
    </>
  );
}
