'use client';

import React, { useState } from 'react';

interface MembersTableProps {
  members: Member[];
  search: string;
  loading?: boolean;
  onViewMember?: (memberId: string) => void;
}

interface Member {
  id: string;
  name: string;
  email: string;
  level: string;
  status: 'Active' | 'Pending' | 'Suspended';
  joined: string;
  avatar?: string;
}

interface MemberDetails extends Member {
  mobile?: string;
  level_name?: string;
  pan?: string;
  aadhar?: string;
  sponsor_name?: string | null;
  joining_date?: string;
}

export default function MembersTable({
  members,
  search,
  loading = false,
}: MembersTableProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [editingMember, setEditingMember] = useState<MemberDetails | null>(null);
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);
  const [form, setForm] = useState({ name: '', email: '', mobile: '', level_name: '', sponsor_name: '', joining_date: '', pan: '', aadhar: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadMemberForEdit = async (member: Member) => {
    setOpenMenu(null);
    setMessage('');
    const response = await fetch(`/supper-admin/api/members/${encodeURIComponent(member.id)}`);
    const result = await response.json();
    if (!response.ok || !result.data) {
      setMessage(result.message || 'Unable to load member details.');
      return;
    }
    const details = result.data as MemberDetails;
    setEditingMember(details);
    setForm({
      name: details.name || '',
      email: details.email || '',
      mobile: details.mobile || '',
      level_name: details.level_name || details.level || '',
      sponsor_name: details.sponsor_name || '',
      joining_date: details.joining_date ? details.joining_date.slice(0, 10) : '',
      pan: details.pan || '',
      aadhar: details.aadhar || '',
    });
  };

  const updateStatus = async (member: Member) => {
    setOpenMenu(null);
    const response = await fetch(`/supper-admin/api/members/${encodeURIComponent(member.id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: member.status === 'Suspended' ? 'Active' : 'Suspended' }),
    });
    if (response.ok) window.location.reload();
    else setMessage('Unable to update member status.');
  };

  const saveMember = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingMember) return;
    setSaving(true);
    const response = await fetch(`/supper-admin/api/members/${encodeURIComponent(editingMember.id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (response.ok) window.location.reload();
    else setMessage('Unable to save member details.');
  };

  const deleteMember = async () => {
    if (!deletingMember) return;
    setSaving(true);
    const response = await fetch(`/supper-admin/api/members/${encodeURIComponent(deletingMember.id)}`, { method: 'DELETE' });
    setSaving(false);
    if (response.ok) window.location.reload();
    else setMessage('Unable to delete member.');
  };
  const filteredMembers = members.filter((m) =>
    `${m.name} ${m.id} ${m.email} ${m.level} ${m.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <div className="members-table">
        <div className="table-head">
          <span>Member</span>
          <span>Email</span>
          <span>Level</span>
          <span>Status</span>
          <span>Joined</span>
          <span></span>
        </div>
        <div className="table-body">
          {loading && (
            <div className="loading-state">Loading members...</div>
          )}
          {!loading && filteredMembers.length > 0 ? (
            filteredMembers.map((member) => {
              const name = String(member.name ?? '').trim() || 'Unknown member';
              const id = String(member.id ?? '').trim() || '—';
              const email = String(member.email ?? '').trim() || 'Not provided';
              const level = String(member.level ?? '').trim() || '—';
              const joined = String(member.joined ?? '').trim() || 'Recently';
              const avatar = String(member.avatar ?? '').trim();
              const initial = avatar.length === 1 ? avatar : name.charAt(0).toUpperCase();

              return (
                <div className="table-row" key={member.id}>
                  <span className="member-cell">
                    <span className="member-avatar" aria-hidden="true">{initial}</span>
                    <div>
                      <div title={name} style={{ color: '#000000' }}>{name}</div>
                      <div className="email" title={id}>{id}</div>
                    </div>
                  </span>
                  <span className="email" title={email}>{email}</span>
                  <span title={level}>{level}</span>
                  <span>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '600',
                        backgroundColor:
                          member.status === 'Active'
                            ? '#d1fae5'
                            : member.status === 'Pending'
                              ? '#fef3c7'
                              : '#fee2e2',
                        color:
                          member.status === 'Active'
                            ? '#065f46'
                            : member.status === 'Pending'
                              ? '#92400e'
                              : '#7f1d1d',
                      }}
                    >
                      {member.status || 'Pending'}
                    </span>
                  </span>
                  <span title={joined}>{joined}</span>
                  <span className="actions-cell">
                    <button className="more" onClick={() => setOpenMenu(openMenu === member.id ? null : member.id)} title="Member actions" aria-label={`Actions for ${name}`}>
                      ⋮
                    </button>
                    {openMenu === member.id && (
                      <div className="member-menu">
                        <button onClick={() => loadMemberForEdit(member)}>Edit member</button>
                        <button onClick={() => updateStatus(member)}>{member.status === 'Suspended' ? 'Resume member' : 'Pause or suspend'}</button>
                        <button className="danger" onClick={() => { setOpenMenu(null); setDeletingMember(member); setMessage(''); }}>Delete member</button>
                      </div>
                    )}
                  </span>
                </div>
              );
            })
          ) : (
            !loading && (
              <div className="empty-state">
                {search ? 'No members found matching your search' : 'No members found'}
              </div>
            )
          )}
        </div>
      </div>
      {editingMember && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setEditingMember(null)}>
          <div className="member-modal" role="dialog" aria-modal="true" aria-labelledby="edit-member-title">
            <h3 id="edit-member-title">Edit member</h3>
            {message && <p className="modal-message">{message}</p>}
            <form className="member-form" onSubmit={saveMember}>
              {(['name', 'email', 'mobile', 'level_name', 'sponsor_name', 'joining_date', 'pan', 'aadhar'] as const).map((field) => (
                <label key={field}>{field === 'level_name' ? 'Level' : field.charAt(0).toUpperCase() + field.slice(1)}
                  <input value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} required={field === 'name' || field === 'email' || field === 'mobile'} />
                </label>
              ))}
              <div className="modal-actions" style={{ gridColumn: '1 / -1' }}>
                <button type="button" onClick={() => setEditingMember(null)}>Cancel</button>
                <button className="primary" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deletingMember && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setDeletingMember(null)}>
          <div className="member-modal" role="dialog" aria-modal="true" aria-labelledby="delete-member-title">
            <h3 id="delete-member-title">Delete member?</h3>
            {message && <p className="modal-message">{message}</p>}
            <p>Delete <strong>{deletingMember.name}</strong> permanently? This action cannot be undone.</p>
            <div className="modal-actions"><button onClick={() => setDeletingMember(null)}>Cancel</button><button className="danger" onClick={deleteMember} disabled={saving}>{saving ? 'Deleting...' : 'Delete member'}</button></div>
          </div>
        </div>
      )}
    </>
  );
}
