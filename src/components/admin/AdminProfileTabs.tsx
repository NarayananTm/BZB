'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Profile = {
  id: string; name: string; email: string; mobile: string; avatar: string | null;
  dateOfBirth: string | null; gender: string | null; address: string | null; district: string | null;
  pincode: string | null; state: string | null; nomineeName: string | null; nomineeRelation: string | null;
  bankName: string | null; accountNumber: string | null; accountHolder: string | null; branch: string | null;
  ifscCode: string | null; pan: string | null; upiId: string | null;
};

type MemberDocument = {
  id: string; documentType: string; documentUrl: string | null; isVerified: boolean;
};

const kycDocuments = [
  'PAN Card',
  'Bank Cheque Leaf / Passbook First Page',
  'Address Proof / Aadhaar Card',
  'Passport Size Photo',
  'Bank QR Code',
];

const emptyProfile: Profile = {
  id: '', name: '', email: '', mobile: '', avatar: null, dateOfBirth: null, gender: null, address: null,
  district: null, pincode: null, state: null, nomineeName: null, nomineeRelation: null, bankName: null,
  accountNumber: null, accountHolder: null, branch: null, ifscCode: null, pan: null, upiId: null,
};

export default function AdminProfileTabs() {
  const [tab, setTab] = useState<'edit' | 'password' | 'kyc'>('edit');
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [message, setMessage] = useState('Loading profile...');
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [passwordMessage, setPasswordMessage] = useState('');
  const [documents, setDocuments] = useState<MemberDocument[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [kycMessage, setKycMessage] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const documentFileRef = useRef<HTMLInputElement>(null);

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

  const updatePassword = () => {
    if (!passwords.current || !passwords.next || !passwords.confirm) {
      setPasswordMessage('Please complete all password fields.');
      return;
    }
    if (passwords.next.length < 8) {
      setPasswordMessage('New password must be at least 8 characters.');
      return;
    }
    if (passwords.next !== passwords.confirm) {
      setPasswordMessage('New password and confirmation do not match.');
      return;
    }
    setPasswordMessage('Password updates are not available yet.');
  };

  const loadDocuments = async () => {
    const response = await fetch('/api/admin/profile/documents');
    const data = await response.json();
    if (response.ok) setDocuments(data.documents ?? []);
  };

  const openDocumentUpload = (documentType: string) => {
    setSelectedDocument(documentType);
    setKycMessage('');
  };

  const uploadDocument = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedDocument) return;
    setKycMessage('Uploading...');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', selectedDocument);
    const response = await fetch('/api/admin/profile/documents', { method: 'POST', body: formData });
    const data = await response.json();
    if (response.ok) {
      setDocuments((current) => [...current.filter((document) => document.documentType !== data.document.documentType), data.document]);
      setKycMessage('Document uploaded.');
      setSelectedDocument(null);
    } else setKycMessage(data.message || 'Unable to upload document.');
    event.target.value = '';
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

  useEffect(() => {
    if (tab === 'kyc') void loadDocuments();
  }, [tab]);

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
          {/* {message && <p className="mb-3 text-sm text-slate-500">{message}</p>} */}
          {message && <p className="mb-3 text-sm text-slate-500">{}</p>}
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
          {tab === 'password' && <div className="rounded-[10px] border border-[#EFEFEF] bg-white p-6">
            <h3 className="text-lg font-semibold">Change Password</h3>
            <p className="mt-1 text-sm text-slate-500">Change Account Login Password</p>
            <div className="mt-5 max-w-3xl space-y-4">
              {([
                ['Old Password', 'current'],
                ['New Password', 'next'],
                ['Confirm Password', 'confirm'],
              ] as const).map(([label, field]) => (
                <div key={field}>
                  <label className="text-sm text-slate-500">{label}</label>
                  <input
                    type="password"
                    value={passwords[field]}
                    onChange={(event) => setPasswords((current) => ({ ...current, [field]: event.target.value }))}
                    className="mt-2 w-full rounded-md border border-[#F0F0F0] bg-[#FAFAFA] px-4 py-2 text-sm"
                    placeholder={label}
                  />
                </div>
              ))}
              {passwordMessage && <p className="text-sm text-slate-500">{passwordMessage}</p>}
              <button onClick={updatePassword} className="rounded-md bg-[#E5C500] px-7 py-2 text-sm font-semibold text-white">Update</button>
            </div>
          </div>}
          {tab === 'kyc' && <div className="rounded-[10px] border border-[#EFEFEF] bg-white p-6">
            <div className="mx-auto max-w-4xl text-center"><h3 className="text-lg font-semibold">Submit Documents</h3><p className="mt-1 text-xs text-slate-500">We need to verify your information. Please submit the documents below to process your application.</p></div>
            <div className="mx-auto mt-4 grid max-w-4xl grid-cols-1 gap-3 md:grid-cols-2">
              {kycDocuments.map((documentType) => {
                const document = documents.find((item) => item.documentType === documentType);
                return <button key={documentType} onClick={() => openDocumentUpload(documentType)} className="flex min-h-[66px] items-center justify-between rounded-[10px] border border-[#F3F3F3] bg-[#FAFAFA] px-5 text-left">
                  <span><span className="block text-xs font-medium text-slate-800">{documentType}</span><span className="mt-1 block text-[11px] text-slate-500">{document?.isVerified ? 'Verified' : document ? 'Uploaded - pending verification' : 'Verify'}</span></span>
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${document ? 'border-[#E5C500] bg-[#E5C500] text-white' : 'border-[#E5C500]'}`} aria-label={document ? 'Uploaded' : 'Not uploaded'}>
                    {document && <Check size={13} strokeWidth={3} />}
                  </span>
                </button>;
              })}
            </div>
            {kycMessage && <p className="mx-auto mt-4 max-w-4xl text-sm text-slate-500">{kycMessage}</p>}
            <button onClick={() => setKycMessage('Documents are saved automatically after upload.')} className="mx-auto mt-4 block rounded-md bg-[#E5C500] px-7 py-2 text-sm font-semibold text-white">Update</button>
            {selectedDocument && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" role="dialog" aria-modal="true" aria-label={`Upload ${selectedDocument}`}>
              <div className="w-full max-w-xl rounded-[10px] bg-white p-8 shadow-xl"><h3 className="text-center text-xl font-semibold">File Upload</h3><p className="mt-2 text-center text-sm text-slate-500">{selectedDocument}</p><input ref={documentFileRef} type="file" accept="image/*,.pdf" onChange={uploadDocument} className="hidden" /><button onClick={() => documentFileRef.current?.click()} className="mt-7 flex h-36 w-full flex-col items-center justify-center rounded-md border border-dashed border-slate-300 text-sm text-slate-600">Choose a file to upload</button><div className="mt-5 flex justify-center gap-3"><button onClick={() => setSelectedDocument(null)} className="rounded-md border border-slate-200 px-5 py-2 text-sm">Cancel</button><button onClick={() => documentFileRef.current?.click()} className="rounded-md bg-[#E5C500] px-8 py-2 text-sm font-semibold text-white">Browse</button></div></div>
            </div>}
          </div>}
        </div>
      </div>
    </div>
  );
}
