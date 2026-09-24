'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  CalendarDays,
  Camera,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react';

type Profile = {
  name: string;
  email: string;
  mobile: string;
  alternateMobile: string;
  employeeId: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  avatar: string;
};

const defaultProfile: Profile = {
  name: 'Super Admin',
  email: 'superadmin@mbd.com',
  mobile: '+91 98765 43210',
  alternateMobile: '+91 91234 56789',
  employeeId: 'ADM001',
  dateOfBirth: '1997-06-08',
  gender: 'Male',
  address: 'Vellore, Tamil Nadu, India',
  avatar: '/images/admin/Mask_group.svg',
};

type PasswordState = { current: string; next: string; confirm: string };

const emptyPasswords: PasswordState = { current: '', next: '', confirm: '' };

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="field">
      <span>{label}{required && <b aria-hidden="true"> *</b>}</span>
      {children}
    </label>
  );
}

function InputIcon({ children }: { children: React.ReactNode }) {
  return <span className="input-icon">{children}</span>;
}

export default function SuperAdminManagementPage() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [savedProfile, setSavedProfile] = useState<Profile>(defaultProfile);
  const [passwords, setPasswords] = useState<PasswordState>(emptyPasswords);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<keyof PasswordState, boolean>>({ current: false, next: false, confirm: false });
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('super_admin_profile');
    if (stored) {
      try {
        const parsed = { ...defaultProfile, ...JSON.parse(stored) } as Profile;
        setProfile(parsed);
        setSavedProfile(parsed);
      } catch {
        localStorage.removeItem('super_admin_profile');
      }
    }
  }, []);

  const updateProfile = (field: keyof Profile, value: string) => {
    setNotice('');
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const saveChanges = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!profile.name.trim() || !profile.email.trim() || !profile.mobile.trim()) {
      setNotice('Please complete all required fields.');
      return;
    }
    localStorage.setItem('super_admin_profile', JSON.stringify(profile));
    window.dispatchEvent(new Event('super-admin-profile-updated'));
    setSavedProfile(profile);
    setNotice('Profile changes saved successfully.');
  };

  const changePassword = () => {
    if (!passwords.current || !passwords.next || !passwords.confirm) {
      setNotice('Please complete all password fields.');
    } else if (passwords.next.length < 8) {
      setNotice('New password must be at least 8 characters.');
    } else if (passwords.next !== passwords.confirm) {
      setNotice('New password and confirmation do not match.');
    } else {
      setPasswords(emptyPasswords);
      setNotice('Password changed successfully.');
    }
  };

  const uploadAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateProfile('avatar', String(reader.result));
    reader.readAsDataURL(file);
  };

  const cancelChanges = () => {
    setProfile(savedProfile);
    setPasswords(emptyPasswords);
    setNotice('Unsaved changes discarded.');
  };

  return (
    <div className="profile-page">
      <style>{`
        .profile-page { min-height: calc(100vh - 80px); padding: 30px 32px 44px; color: #20242b; }
        .profile-heading { margin-bottom: 22px; }
        .profile-heading h2 { margin: 0; font-size: 24px; line-height: 1.2; font-weight: 700; }
        .profile-heading p { margin: 5px 0 0; color: #6d737c; font-size: 13px; }
        .profile-grid { display: grid; grid-template-columns: 244px minmax(0, 1fr); gap: 20px; max-width: 1110px;  }
        .profile-card, .editor-card { background: #fff; border: 1px solid #e1e4e8; border-radius: 7px; box-shadow: 0 1px 3px rgba(31, 35, 40, .03); }
        .profile-card { padding: 25px 16px; text-align: center; align-self: start; }
        .avatar-wrap { position: relative; width: 130px; height: 130px; margin: 0 auto 13px; }
        .avatar { width: 130px; height: 130px; border-radius: 50%; object-fit: cover; background: #e8eaed; }
        .avatar-upload { position: absolute; right: -3px; bottom: 2px; display: grid; place-items: center; width: 34px; height: 34px; color: #fff; background: #27303b; border: 3px solid #fff; border-radius: 50%; cursor: pointer; }
        .avatar-upload input { display: none; }
        .profile-card h3 { margin: 0; font-size: 20px; font-weight: 700; }
        .profile-card .role { margin: 3px 0 10px; color: #777d86; font-size: 13px; }
        .status { display: inline-flex; align-items: center; gap: 7px; padding: 5px 12px; border-radius: 5px; background: #e4f6e9; color: #20823b; font-size: 12px; font-weight: 600; }
        .status i { width: 8px; height: 8px; border-radius: 50%; background: #24a148; }
        .profile-summary { margin-top: 13px; padding-top: 10px; border-top: 1px solid #e5e7ea; text-align: left; }
        .summary-row { display: flex; align-items: center; gap: 14px; padding: 9px 3px; font-size: 12px; }
        .summary-row svg { flex: 0 0 auto; color: #30363d; }
        .editor-card { overflow: hidden; }
        .card-section { padding: 19px 16px 20px; border-bottom: 1px solid #e5e7ea; }
        .card-section:last-of-type { border-bottom: 0; }
        .section-heading { display: flex; align-items: center; gap: 12px; margin-bottom: 19px; }
        .section-heading svg { color: #2f3740; }
        .section-heading h3 { margin: 0; font-size: 15px; font-weight: 700; }
        .section-heading p { margin: 3px 0 0; color: #777d86; font-size: 12px; }
        .form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 20px; }
        .field { display: block; min-width: 0; }
        .field > span { display: block; margin-bottom: 6px; font-size: 12px; font-weight: 600; }
        .field b { color: #dc2626; }
        .input-wrap { position: relative; }
        .input-wrap input, .input-wrap textarea, .field select { box-sizing: border-box; width: 100%; min-height: 34px; padding: 8px 11px; color: #2e343b; background: #fff; border: 1px solid #dfe2e6; border-radius: 6px; outline: none; font: inherit; font-size: 12px; transition: border .2s, box-shadow .2s; }
        .input-wrap input:focus, .input-wrap textarea:focus, .field select:focus { border-color: #d4a900; box-shadow: 0 0 0 2px rgba(228, 184, 0, .15); }
        .input-wrap input { padding-left: 37px; }
        .input-wrap input.password-input { padding-right: 36px; }
        .input-icon { position: absolute; top: 50%; left: 11px; display: inline-flex; color: #737a83; transform: translateY(-50%); pointer-events: none; }
        .input-action { position: absolute; top: 50%; right: 9px; display: inline-flex; padding: 0; color: #737a83; background: none; border: 0; cursor: pointer; transform: translateY(-50%); }
        .field select { appearance: none; padding-right: 32px; }
        .select-wrap { position: relative; }
        .select-wrap svg { position: absolute; top: 50%; right: 9px; color: #737a83; pointer-events: none; transform: translateY(-50%); }
        .textarea-wrap textarea { min-height: 56px; resize: vertical; padding: 10px 11px; }
        .full-width { grid-column: 1 / -1; }
        .disabled input { color: #8b9199; background: #f1f3f5; }
        .actions { display: flex; justify-content: flex-end; gap: 14px; padding: 18px 16px 14px; }
        .button { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-width: 76px; padding: 10px 17px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; }
        .button.secondary { color: #343a40; background: #fff; border: 1px solid #dfe2e6; }
        .button.primary { color: #fff; background: #e2b500; border: 1px solid #e2b500; }
        .button:hover { filter: brightness(.96); }
        .notice { margin: 0 16px 2px; padding: 8px 10px; color: #59616b; background: #f7f8f9; border-radius: 5px; font-size: 12px; }
        @media (max-width: 800px) { .profile-page { padding: 22px 16px 32px; } .profile-grid { grid-template-columns: 1fr; } .profile-card { display: grid; grid-template-columns: 130px 1fr; gap: 0 18px; text-align: left; } .profile-card .avatar-wrap { grid-row: span 3; margin: 0; } .profile-card .status { margin-bottom: 0; } .profile-summary { grid-column: 1 / -1; } }
        @media (max-width: 560px) { .profile-heading h2 { font-size: 21px; } .profile-card { display: block; text-align: center; } .profile-card .avatar-wrap { margin: 0 auto 13px; } .profile-summary { text-align: left; } .form-grid { grid-template-columns: 1fr; gap: 13px; } .full-width { grid-column: auto; } .actions { flex-direction: column-reverse; } .button { width: 100%; } }
      `}</style>

      <div className="profile-heading">
        <h2>Super Admin Profile</h2>
        <p>Manage your personal information, profile picture and account details.</p>
      </div>

      <form className="profile-grid" onSubmit={saveChanges}>
        <aside className="profile-card">
          <div className="avatar-wrap">
            <img className="avatar" src={profile.avatar} alt="Super Admin profile" />
            <label className="avatar-upload" title="Change profile picture">
              <Camera size={16} />
              <input type="file" accept="image/*" onChange={uploadAvatar} />
            </label>
          </div>
          <h3>{profile.name || 'Super Admin'}</h3>
          <p className="role">Administrator</p>
          <span className="status"><i /> Active</span>
          <div className="profile-summary">
            <div className="summary-row"><Mail size={16} /><span>{profile.email}</span></div>
            <div className="summary-row"><Phone size={16} /><span>{profile.mobile}</span></div>
            <div className="summary-row"><ShieldCheck size={16} /><span>Super Admin</span></div>
            <div className="summary-row"><CalendarDays size={16} /><span>Joined on 01 Jan 2026</span></div>
          </div>
        </aside>

        <section className="editor-card">
          <div className="card-section">
            <div className="section-heading"><UserRound size={21} /><div><h3>Edit Profile Details</h3><p>Update your personal and contact information.</p></div></div>
            <div className="form-grid">
              <Field label="Full Name" required><div className="input-wrap"><InputIcon><UserRound size={16} /></InputIcon><input value={profile.name} onChange={(e) => updateProfile('name', e.target.value)} /></div></Field>
              <Field label="Email Address" required><div className="input-wrap"><InputIcon><Mail size={16} /></InputIcon><input type="email" value={profile.email} onChange={(e) => updateProfile('email', e.target.value)} /></div></Field>
              <Field label="Mobile Number" required><div className="input-wrap"><InputIcon><Phone size={16} /></InputIcon><input value={profile.mobile} onChange={(e) => updateProfile('mobile', e.target.value)} /></div></Field>
              <Field label="Alternate Mobile Number"><div className="input-wrap"><InputIcon><Phone size={16} /></InputIcon><input value={profile.alternateMobile} onChange={(e) => updateProfile('alternateMobile', e.target.value)} /></div></Field>
              <Field label="Role"><div className="input-wrap disabled"><input value="Super Admin" disabled /></div></Field>
              <Field label="Employee ID (Optional)"><div className="input-wrap"><InputIcon><ShieldCheck size={16} /></InputIcon><input value={profile.employeeId} onChange={(e) => updateProfile('employeeId', e.target.value)} /></div></Field>
              <Field label="Date of Birth (Optional)"><div className="input-wrap"><InputIcon><CalendarDays size={16} /></InputIcon><input type="date" value={profile.dateOfBirth} onChange={(e) => updateProfile('dateOfBirth', e.target.value)} /></div></Field>
              <Field label="Gender (Optional)"><div className="select-wrap"><select value={profile.gender} onChange={(e) => updateProfile('gender', e.target.value)}><option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option></select><ChevronDown size={16} /></div></Field>
              <Field label="Address" ><div className="input-wrap textarea-wrap"><InputIcon><MapPin size={16} /></InputIcon><textarea value={profile.address} onChange={(e) => updateProfile('address', e.target.value)} /></div></Field>
            </div>
          </div>

          <div className="card-section">
            <div className="section-heading"><LockKeyhole size={21} /><div><h3>Change Password</h3><p>Update your password to keep your account secure.</p></div></div>
            <div className="form-grid">
              {([['Current Password', 'current'], ['New Password', 'next'], ['Confirm New Password', 'confirm']] as const).map(([label, key]) => (
                <Field key={key} label={label}>
                  <div className="input-wrap"><InputIcon><LockKeyhole size={16} /></InputIcon><input className="password-input" type={visiblePasswords[key] ? 'text' : 'password'} placeholder={`Enter ${label.toLowerCase()}`} value={passwords[key]} onChange={(e) => setPasswords((current) => ({ ...current, [key]: e.target.value }))} /><button type="button" className="input-action" onClick={() => setVisiblePasswords((current) => ({ ...current, [key]: !current[key] }))} aria-label={visiblePasswords[key] ? 'Hide password' : 'Show password'}>{visiblePasswords[key] ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>
                </Field>
              ))}
            </div>
          </div>

          {notice && <p className="notice" role="status">{notice}</p>}
          <div className="actions"><button type="button" className="button secondary" onClick={cancelChanges}><X size={15} /> Cancel</button><button type="submit" className="button primary"><Save size={15} /> Save Changes</button></div>
        </section>
      </form>
    </div>
  );
}