'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Profile = {
  id: string; name: string; email: string; mobile: string; avatar: string | null;
  dateOfBirth: string | null; gender: string | null; address: string | null; district: string | null;
  pincode: string | null; state: string | null; nomineeName: string | null; nomineeRelation: string | null;
  bankName: string | null; accountNumber: string | null; accountHolder: string | null; branch: string | null;
  ifscCode: string | null; pan: string | null; upiId: string | null;
};

const emptyProfile: Profile = {
  id: '', name: '', email: '', mobile: '', avatar: null, dateOfBirth: null, gender: null, address: null,
  district: null, pincode: null, state: null, nomineeName: null, nomineeRelation: null, bankName: null,
  accountNumber: null, accountHolder: null, branch: null, ifscCode: null, pan: null, upiId: null,
};

export default function AdminProfileTabs() {
  const [tab, setTab] = useState<'edit' | 'password' | 'kyc'>('edit');
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [message, setMessage] = useState('Loading profile...');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/admin/profile').then(async (response) => {
      const data = await response.json();
      if (!response.ok || !data.profile) throw new Error(data.message || 'Unable to load profile');
      setProfile({ ...emptyProfile, ...data.profile });
      setMessage('');
    }).catch((error) => setMessage(error instanceof Error ? error.message : 'Unable to load profile'));
  }, []);

  const updateField = (field: keyof Profile, value: string) => setProfile((current) => ({ ...current, [field]: value }));

  const saveProfile = async () => {
    setMessage('Saving...');
    const response = await fetch('/api/admin/profile', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profile) });
    const data = await response.json();
    setMessage(response.ok ? 'Profile updated successfully' : data.message || 'Unable to update profile');
    if (response.ok && data.profile) setProfile({ ...emptyProfile, ...data.profile });
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setMessage('Uploading image...');
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/admin/profile/avatar', { method: 'POST', body: formData });
    const data = await response.json();
    setMessage(response.ok ? 'Image uploaded successfully' : data.message || 'Unable to upload image');
    if (response.ok && data.profile) setProfile({ ...emptyProfile, ...data.profile });
  };

  const textInput = (label: string, field: keyof Profile, type = 'text') => (
    <div>
      <label className="text-xs text-slate-500">{label}</label>
      <input type={type} value={String(profile[field] ?? '')} onChange={(event) => updateField(field, event.target.value)} className="mt-2 w-full rounded-md border border-[#F0F0F0] bg-[#FAFAFA] p-3 text-sm" placeholder={label} />
    </div>
  );

  return (
    <div className="mx-0 px-1 py-1">
      <div className="grid grid-cols-[260px_1fr] gap-6">
        <div className="space-y-3">
          <div className="rounded-[10px] border border-[#EFEFEF] bg-white p-4">
            <ul className="text-sm text-slate-600">
              <li className="py-3 font-semibold text-[#E5C500]">My Home</li>
              {(['edit', 'password', 'kyc'] as const).map((item) => <li key={item} className={`py-3 ${tab === item ? 'font-semibold text-slate-900' : ''}`}><button className="w-full text-left" onClick={() => setTab(item)}>{item === 'edit' ? 'Edit Profile' : item === 'password' ? 'Change Password' : 'KYC Upload'}</button></li>)}
            </ul>
          </div>
          <div className="rounded-[10px] border border-[#EFEFEF] bg-white p-4">
            <div className="overflow-hidden rounded-md">
              <Image src={profile.avatar || '/images/admin/Mask_group.svg'} alt="Profile avatar" width={400} height={300} className="w-full object-cover" unoptimized />
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={uploadAvatar} className="hidden" />
            <button onClick={() => fileRef.current?.click()} className="mt-4 w-full rounded-lg bg-[#E5C500] px-6 py-3 font-semibold text-slate-900">Upload</button>
          </div>
        </div>

        <div>
          {message && <p className="mb-3 text-sm text-slate-500">{message}</p>}
          {tab === 'edit' && <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 rounded-[10px] border border-[#EFEFEF] bg-white p-6">
              <h3 className="text-lg font-semibold">Profile Details</h3><p className="text-sm text-slate-500">{profile.name} · {profile.mobile}</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {textInput('Date of Birth', 'dateOfBirth', 'date')}
                <div><label className="text-xs text-slate-500">Gender</label><select value={profile.gender || ''} onChange={(event) => updateField('gender', event.target.value)} className="mt-2 w-full rounded-md border border-[#F0F0F0] bg-[#FAFAFA] p-3 text-sm"><option value="">Select gender</option><option>Male</option><option>Female</option><option>Other</option></select></div>
                {textInput('Address', 'address')}{textInput('District', 'district')}{textInput('Pincode', 'pincode')}{textInput('State', 'state')}{textInput('Email ID', 'email', 'email')}{textInput('Nominee Name', 'nomineeName')}<div className="col-span-2">{textInput('Nominee Relation', 'nomineeRelation')}</div>
              </div>
              <button onClick={saveProfile} disabled={!profile.id} className="mt-4 rounded-md bg-[#E5C500] px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-50">Update</button>
            </div>
            <div className="rounded-[10px] border border-[#EFEFEF] bg-white p-6"><h3 className="text-lg font-semibold">Bank Details</h3><p className="text-sm text-slate-500">Fill your bank account details</p><div className="mt-2 space-y-3">{textInput('Name of Bank', 'bankName')}{textInput('Bank Account No', 'accountNumber')}{textInput('Account Holder Name', 'accountHolder')}{textInput('Branch', 'branch')}{textInput('IFSC Code', 'ifscCode')}{textInput('PAN', 'pan')}{textInput('GPAY Number | UPI ID', 'upiId')}<button onClick={saveProfile} disabled={!profile.id} className="rounded-md bg-[#E5C500] px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-50">Update Bank</button></div></div>
          </div>}
          {tab === 'password' && <div className="rounded-[10px] border border-[#EFEFEF] bg-white p-6"><h3 className="text-lg font-semibold">Change Password</h3><p className="mt-2 text-sm text-slate-500">Password updates are not connected to this profile API yet.</p></div>}
          {tab === 'kyc' && <div className="rounded-[10px] border border-[#EFEFEF] bg-white p-6"><h3 className="text-lg font-semibold">KYC Upload</h3><p className="mt-2 text-sm text-slate-500">KYC document upload can be connected to member_documents next.</p></div>}
        </div>
      </div>
    </div>
  );
}
