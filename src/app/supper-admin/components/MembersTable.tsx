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
      <style>{`
        .members-table {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          background: white;
        }

        .table-head {
          display: grid;
          grid-template-columns: 300px 250px 150px 150px 150px 100px;;
          gap: 16px;
          padding: 16px;
          min-width: 846px;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .table-body {
         
          overflow-x: auto;
          overflow-y: auto;
        }

        .table-row {
          display: grid;
          grid-template-columns: 300px 250px 150px 150px 150px 100px;
          gap: 16px;
          padding: 16px;
          min-width: 846px;
          border-bottom: 1px solid #e5e7eb;
          align-items: center;
          font-size: 13px;
          color: #374151;
          transition: all 0.2s;
        }

        .table-row > * {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .table-row:hover {
          background: #f9fafb;
        }

        .member-cell {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
          font-weight: 500;
          color: #1f2937;
        }

        .member-cell > div {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .member-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f5c400 0%, #e6b400 100%);
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          flex-shrink: 0;
          overflow: hidden;
          white-space: nowrap;
        }

        .table-row .email {
          color: #6b7280;
          font-size: 12px;
        }

        .table-row .more {
          width: 32px;
          height: 32px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          background: white;
          color: #374151;
          cursor: pointer;
          font-size: 18px;
          transition: all 0.2s;
        }

        .table-row .more:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
        }

        .actions-cell { position: relative; overflow: visible !important; }
        .member-menu { position: absolute; right: 0; top: 38px; z-index: 10; width: 170px; padding: 6px; border: 1px solid #e5e7eb; border-radius: 8px; background: white; box-shadow: 0 10px 25px rgba(15, 23, 42, .14); }
        .member-menu button { display: block; width: 100%; padding: 9px 10px; border: 0; border-radius: 5px; background: transparent; color: #374151; text-align: left; cursor: pointer; font-size: 13px; }
        .member-menu button:hover { background: #f3f4f6; }
        .member-menu .danger { color: #b91c1c; }
        .modal-backdrop { position: fixed; inset: 0; z-index: 30; display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(17, 24, 39, .45); }
        .member-modal { width: min(520px, 100%); max-height: 90vh; overflow-y: auto; padding: 24px; border-radius: 10px; background: white; box-shadow: 0 20px 45px rgba(15, 23, 42, .2); }
        .member-modal h3 { margin: 0 0 18px; color: #111827; font-size: 20px; }
        .member-form { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .member-form label { display: grid; gap: 6px; color: #4b5563; font-size: 12px; font-weight: 600; }
        .member-form input { width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; color: #111827; font: inherit; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 22px; }
        .modal-actions button { padding: 9px 14px; border: 1px solid #d1d5db; border-radius: 6px; background: white; color: #374151; cursor: pointer; }
        .modal-actions .primary { border-color: #111827; background: #111827; color: white; }
        .modal-actions .danger { border-color: #b91c1c; background: #b91c1c; color: white; }
        .modal-message { margin: 0 0 14px; color: #b91c1c; font-size: 13px; }
        @media (max-width: 560px) { .member-form { grid-template-columns: 1fr; } }

        .empty-state {
          padding: 40px 16px;
          text-align: center;
          color: #9ca3af;
          font-size: 13px;
        }

        .loading-state {
          padding: 40px 16px;
          text-align: center;
          color: #9ca3af;
          font-size: 13px;
        }

        @media (max-width: 1024px) {
          .table-head,
          .table-row {
            grid-template-columns: 150px 120px 100px 100px auto 40px;
          }
        }

        @media (max-width: 768px) {
          .table-head,
          .table-row {
            grid-template-columns: 1fr;
            gap: 8px;
            padding: 12px;
            min-width: 0;
          }

          .table-head {
            display: none;
          }

          .table-row {
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            margin-bottom: 8px;
          }

          .table-row::before {
            content: attr(data-label);
            font-weight: 600;
            color: #6b7280;
            font-size: 11px;
            text-transform: uppercase;
            display: block;
            margin-bottom: 4px;
          }
        }
      `}</style>

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
            filteredMembers.map((member) => (
              <div className="table-row" key={member.id}>
                <span className="member-cell">
                  <span className="member-avatar">{member.avatar || member.name.charAt(0).toUpperCase()}</span>
                  <div>
                    <div style={{ color: '#000000' }}>{member.name}</div>
                    <div className="email">{member.id}</div>
                  </div>
                </span>
                <span className="email">{member.email}</span>
                <span>{member.level}</span>
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
                    {member.status}
                  </span>
                </span>
                <span>{member.joined}</span>
                <span className="actions-cell">
                  <button className="more" onClick={() => setOpenMenu(openMenu === member.id ? null : member.id)} title="Member actions" aria-label={`Actions for ${member.name}`}>
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
            ))
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
