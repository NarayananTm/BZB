"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export default function AdminProfileTabs() {
  const [tab, setTab] = useState< 'edit' | 'password' | 'kyc'>('edit');

  return (
    <div className="mx-0 px-1 py-2">
      <div className="grid grid-cols-[260px_1fr] gap-6">
        {/* LEFT MENU + Avatar */}
        <div className="space-y-3">
          <div className="rounded-[10px] border border-[#EFEFEF] bg-white p-4">
            <ul className="text-sm text-slate-600">
              <li className={`py-3 font-semibold text-[#E5C500]`}>
                <button className="w-full text-left" >My Home</button>
              </li>
              <li className={`py-3 ${tab === 'edit' ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>
                <button className="w-full text-left" onClick={() => setTab('edit')}>Edit Profile</button>
              </li>
              <li className={`py-3 ${tab === 'password' ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>
                <button className="w-full text-left" onClick={() => setTab('password')}>Change Password</button>
              </li>
              <li className={`py-3 ${tab === 'kyc' ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>
                <button className="w-full text-left" onClick={() => setTab('kyc')}>KYC Upload</button>
              </li>
            </ul>
          </div>

          <div className="rounded-[10px] border border-[#EFEFEF] bg-white p-4">
            <div className="overflow-hidden rounded-md">
              <Image src="/images/admin/Mask_group.svg" alt="avatar" width={400} height={300} className="w-full object-cover" />
            </div>
            <div className="mt-4">
              <button className="w-full rounded-lg bg-[#E5C500] px-6 py-3 font-semibold text-slate-900">Upload</button>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          {tab === 'edit' && (
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 rounded-[10px] border border-[#EFEFEF] bg-white p-6">
                <h3 className="text-lg font-semibold">Profile Details</h3>
                <p className="text-sm text-slate-500">Your Profile</p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-500">Date of Birth (DD/MM/YYYY)</label>
                    <input className="mt-2 w-full rounded-md border border-[#F0F0F0] bg-[#FAFAFA] p-3 text-sm" placeholder="Date of Birth (DD/MM/YYYY)" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Gender</label>
                    <div className="mt-2 text-sm text-slate-600">Male &nbsp; Female</div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-500">Address</label>
                    <input className="mt-2 w-full rounded-md border border-[#F0F0F0] bg-[#FAFAFA] p-3 text-sm" placeholder="Address" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">District</label>
                    <input className="mt-2 w-full rounded-md border border-[#F0F0F0] bg-[#FAFAFA] p-3 text-sm" placeholder="District" />
                  </div>

                  <div>
                    <label className="text-xs text-slate-500">Pincode</label>
                    <input className="mt-2 w-full rounded-md border border-[#F0F0F0] bg-[#FAFAFA] p-3 text-sm" placeholder="Pincode" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">State</label>
                    <input className="mt-2 w-full rounded-md border border-[#F0F0F0] bg-[#FAFAFA] p-3 text-sm" placeholder="State" />
                  </div>

                  <div>
                    <label className="text-xs text-slate-500">Email ID</label>
                    <input className="mt-2 w-full rounded-md border border-[#F0F0F0] bg-[#FAFAFA] p-3 text-sm" placeholder="Email ID" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Nominee Name</label>
                    <input className="mt-2 w-full rounded-md border border-[#F0F0F0] bg-[#FAFAFA] p-3 text-sm" placeholder="Nominee Name" />
                  </div>

                  <div className="col-span-2">
                    <label className="text-xs text-slate-500">Nominee Relation</label>
                    <input className="mt-2 w-full rounded-md border border-[#F0F0F0] bg-[#FAFAFA] p-3 text-sm" placeholder="Nominee Relation" />
                  </div>
                </div>

                <div className="mt-6">
                  <button className="rounded-md bg-[#E5C500] px-4 py-2 text-sm font-semibold text-slate-900">Update</button>
                </div>
              </div>

              <div className="rounded-[10px] border border-[#EFEFEF] bg-white p-6">
                <h3 className="text-lg font-semibold">Bank Details</h3>
                <p className="text-sm text-slate-500">Fill your bank account details</p>

                <div className="mt-6 space-y-4">
                  <input className="w-full rounded-md border border-[#F0F0F0] bg-[#FAFAFA] p-3 text-sm" placeholder="Name of Bank" />
                  <input className="w-full rounded-md border border-[#F0F0F0] bg-[#FAFAFA] p-3 text-sm" placeholder="Bank Account No" />
                  <input className="w-full rounded-md border border-[#F0F0F0] bg-[#FAFAFA] p-3 text-sm" placeholder="Account Holder Name" />
                  <input className="w-full rounded-md border border-[#F0F0F0] bg-[#FAFAFA] p-3 text-sm" placeholder="Branch" />
                  <input className="w-full rounded-md border border-[#F0F0F0] bg-[#FAFAFA] p-3 text-sm" placeholder="IFSC Code" />
                  <input className="w-full rounded-md border border-[#F0F0F0] bg-[#FAFAFA] p-3 text-sm" placeholder="PAN" />
                  <input className="w-full rounded-md border border-[#F0F0F0] bg-[#FAFAFA] p-3 text-sm" placeholder="GPAY Number | UPI ID" />

                  <div className="mt-4">
                    <button className="rounded-md bg-[#E5C500] px-4 py-2 text-sm font-semibold text-slate-900">Update Bank</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'password' && (
            <div className="rounded-[10px] border border-[#EFEFEF] bg-white p-6">
              <h3 className="text-lg font-semibold">Change Password</h3>
              <p className="text-sm text-slate-500">Change Account Login Password</p>

              <div className="mt-6 space-y-4">
                <input className="w-full rounded-md border border-[#F0F0F0] bg-[#FAFAFA] p-3 text-sm" placeholder="Old Password" />
                <input className="w-full rounded-md border border-[#F0F0F0] bg-[#FAFAFA] p-3 text-sm" placeholder="New Password" />
                <input className="w-full rounded-md border border-[#F0F0F0] bg-[#FAFAFA] p-3 text-sm" placeholder="Confirm Password" />
                <div>
                  <button className="rounded-md bg-[#E5C500] px-4 py-2 text-sm font-semibold text-slate-900">Update</button>
                </div>
              </div>
            </div>
          )}

          {tab === 'kyc' && (
            <div>
              <h3 className="mb-4 text-lg font-semibold">Submit Documents</h3>
              <p className="mb-6 text-sm text-slate-500">We need to verify your information. Please submit the documents below to process your application.</p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  'PAN Card',
                  'Bank Cheque Leaf / Passbook First Page',
                  'Address Proof / Aadhar Card',
                  'Passport size Photo',
                  'Bank QR Code',
                ].map((label) => (
                  <div key={label} className="flex items-center justify-between rounded-[10px] border border-[#EFEFEF] bg-white p-4">
                    <div>
                      <p className="font-medium">{label}</p>
                      <p className="text-sm text-slate-500">Verify</p>
                    </div>
                    <div className="h-6 w-6 rounded-full border-2 border-[#E5C500]" />
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button className="rounded-md bg-[#E5C500] px-4 py-2 text-sm font-semibold text-slate-900">Update</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
