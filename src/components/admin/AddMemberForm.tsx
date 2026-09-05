'use client';

import { useState } from 'react';
import { Upload, Copy, Check } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

interface AddUserFormData {
  sponsor_name: string;
  name: string;
  pan: string;
  aadhar: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  amount: string;
  transaction_proof?: File;
  transaction_utr: string;
}

interface AddUserFormProps {
  onSuccess?: (data: any) => void;
  onClose?: () => void;
  sponsorId?: string;
  sponsorName?: string;
}

export default function AddMemberForm({
  onSuccess,
  onClose,
  sponsorId,
  sponsorName = '',
}: AddUserFormProps) {
  const [formData, setFormData] = useState<AddUserFormData>({
    sponsor_name: sponsorName,
    name: '',
    pan: '',
    aadhar: '',
    phone_number: '',
    password: '',
    confirm_password: '',
    amount: '',
    transaction_proof: undefined,
    transaction_utr: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFormData((prev) => ({ ...prev, transaction_proof: selectedFile }));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateForm = (): boolean => {
    if (!formData.sponsor_name.trim()) {
      toast.error('Sponsor name is required');
      return false;
    }
    if (!formData.name.trim()) {
      toast.error('Your name is required');
      return false;
    }
    if (!formData.pan.trim()) {
      toast.error('PAN is required');
      return false;
    }
    if (!formData.aadhar.trim()) {
      toast.error('Aadhar is required');
      return false;
    }
    if (!formData.phone_number.trim()) {
      toast.error('Phone number is required');
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirm_password) {
      toast.error('Passwords do not match');
      return false;
    }
    if (!formData.amount.trim()) {
      toast.error('Amount is required');
      return false;
    }
    if (!file) {
      toast.error('Transaction proof is required');
      return false;
    }
    if (!formData.transaction_utr.trim()) {
      toast.error('Transaction UTR number is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const submitData = new FormData();
      submitData.append('sponsor_name', formData.sponsor_name);
      submitData.append('name', formData.name);
      submitData.append('pan', formData.pan);
      submitData.append('aadhar', formData.aadhar);
      submitData.append('phone_number', formData.phone_number);
      submitData.append('password', formData.password);
      submitData.append('amount', formData.amount);
      submitData.append('transaction_utr', formData.transaction_utr);
      
      if (file) {
        submitData.append('transaction_proof', file);
      }

      const response = await fetch('/api/member/register', {
        method: 'POST',
        body: submitData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register member');
      }

      toast.success('Registration successful!');
      if (onSuccess) onSuccess(data);
      if (onClose) onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const upiId = 'mprema7771880@oikaxis';

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-white p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-1 sm:mb-2 text-xl sm:text-2xl font-bold text-slate-900">Welcome in, {formData.name || 'User'}</h1>
        <p className="mb-4 sm:mb-8 text-xs sm:text-sm text-slate-500">{sponsorId}</p>

        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <div>
              <label className="mb-1 sm:mb-2 block text-xs sm:text-sm font-medium text-slate-700">Sponsor Name</label>
              <input
                type="text"
                name="sponsor_name"
                value={formData.sponsor_name}
                readOnly
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-600"
              />
            </div>

            <div>
              <label className="mb-1 sm:mb-2 block text-xs sm:text-sm font-medium text-slate-700">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 sm:mb-2 block text-xs sm:text-sm font-medium text-slate-700">PAN</label>
              <input
                type="text"
                name="pan"
                value={formData.pan}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 sm:mb-2 block text-xs sm:text-sm font-medium text-slate-700">Aadhar</label>
              <input
                type="text"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 sm:mb-2 block text-xs sm:text-sm font-medium text-slate-700">Phone Number</label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 sm:mb-2 block text-xs sm:text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <div>
              <label className="mb-1 sm:mb-2 block text-xs sm:text-sm font-medium text-slate-700">Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 sm:mb-2 block text-xs sm:text-sm font-medium text-slate-700">Amount Rs.</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 sm:mb-3 block text-xs sm:text-sm font-medium text-slate-700">Our Bank Details</label>
              <div className="rounded-lg border border-slate-200 bg-slate-900 p-3 sm:p-4 text-white w-full sm:w-60">
                <div className="mb-2 sm:mb-3 flex items-center justify-between">
                  <div className="h-48 sm:h-56 md:h-80 w-full sm:w-56 md:w-60 rounded-lg p-1">
                    <Image
                      src="/images/admin/upi/upi-qr-code.png"
                      alt="UPI QR Code"
                      width={96}
                      height={96}
                      className="h-full w-full rounded object-cover"
                    />
                  </div>
                </div>
                <div className="border-t border-slate-700 pt-2 sm:pt-3 text-xs">
                  <p className="mb-1 text-slate-400">Indian Bank 1221</p>
                  <p className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs sm:text-sm">UPI ID: {upiId}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(upiId)}
                      className="text-blue-400 hover:text-blue-300 flex-shrink-0"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs sm:text-sm font-medium text-slate-700">Transaction Proof</label>
              <label className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-4 sm:p-6 hover:border-blue-400 hover:bg-blue-50">
                <div className="text-center">
                  <Upload className="mx-auto mb-2 h-5 sm:h-6 w-5 sm:w-6 text-slate-400" />
                  <p className="text-xs sm:text-sm font-medium text-slate-600">
                    {file ? file.name : 'Drag files here or Browse'}
                  </p>
                </div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,.pdf"
                />
              </label>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Transaction UTR Number</label>
              <input
                type="text"
                name="transaction_utr"
                value={formData.transaction_utr}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-200 px-4 py-3 focus:border-blue-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-white hover:bg-yellow-500 disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
