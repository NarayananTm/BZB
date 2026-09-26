'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft, CheckCircle2, ChevronDown, CircleDollarSign, Clock3,
  Download, Filter, MoreVertical, RotateCcw, Search, SlidersHorizontal, Wallet,
  X, XCircle,
} from 'lucide-react';

type RequestStatus = 'Pending' | 'Approved' | 'Rejected';
type Withdrawal = {
  id: string;
  member_id: string | null;
  member_name: string | null;
  member_email: string | null;
  amount: number | string;
  requested_date: string;
  approved_date: string | null;
  status: RequestStatus;
  payout_method: string | null;
  remarks: string | null;
};

const pageSize = 10;
const statuses: RequestStatus[] = ['Pending', 'Approved', 'Rejected'];
const currency = (value: number | string) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
}).format(Number(value) || 0);
const dateLabel = (value: string) => {
  if (!value) return '-';
  const date = new Date(`${value.slice(0, 10)}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  }).format(date);
};
const initials = (value: string | null) => (value || '?')
  .split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();

export default function WithdrawalRequestsPage() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [tab, setTab] = useState<'All Requests' | RequestStatus>('All Requests');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All Status');
  const [method, setMethod] = useState('All Methods');
  const [date, setDate] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<RequestStatus[]>(['Pending']);
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({ statuses: [] as RequestStatus[], methods: [] as string[], from: '', to: '' });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<Withdrawal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadWithdrawals = async () => {
    setLoading(true);
    setError('');
    try {
      const token = window.localStorage.getItem('super_admin_token');
      const response = await fetch('/supper-admin/api/withdrawals', {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Unable to load withdrawal requests');
      setWithdrawals(result.data || []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load withdrawal requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void loadWithdrawals(); }, []);

  const methods = useMemo(() => Array.from(new Set(withdrawals.map((item) => item.payout_method).filter((item): item is string => Boolean(item)))), [withdrawals]);
  const filtered = useMemo(() => withdrawals.filter((item) => {
    const query = search.trim().toLowerCase();
    const requestDate = item.requested_date?.slice(0, 10) || '';
    const haystack = `${item.member_name || ''} ${item.member_email || ''} ${item.member_id || ''} ${item.id}`.toLowerCase();
    return (!query || haystack.includes(query))
      && (tab === 'All Requests' || item.status === tab)
      && (status === 'All Status' || item.status === status)
      && (method === 'All Methods' || item.payout_method === method)
      && (!date || requestDate === date)
      && (!appliedFilters.statuses.length || appliedFilters.statuses.includes(item.status))
      && (!appliedFilters.methods.length || appliedFilters.methods.includes(item.payout_method || ''))
      && (!appliedFilters.from || requestDate >= appliedFilters.from)
      && (!appliedFilters.to || requestDate <= appliedFilters.to);
  }), [withdrawals, search, tab, status, method, date, appliedFilters]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  const pageStart = Math.min(Math.max(1, page - 2), Math.max(1, pageCount - 4));
  const pageNumbers = Array.from({ length: Math.min(5, pageCount) }, (_, index) => pageStart + index);
  const pendingCount = withdrawals.filter((item) => item.status === 'Pending').length;
  const approvedCount = withdrawals.filter((item) => item.status === 'Approved').length;
  const rejectedCount = withdrawals.filter((item) => item.status === 'Rejected').length;
  const pendingAmount = withdrawals.filter((item) => item.status === 'Pending').reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const selectedVisible = visible.length > 0 && visible.every((item) => selectedIds.includes(item.id));

  useEffect(() => { setPage(1); }, [tab, search, status, method, date, appliedFilters]);
  useEffect(() => { if (page > pageCount) setPage(pageCount); }, [page, pageCount]);

  const processRequest = async (item: Withdrawal, action: 'approve' | 'reject') => {
    setUpdatingId(item.id);
    setError('');
    try {
      const token = window.localStorage.getItem('super_admin_token');
      const response = await fetch(`/supper-admin/api/withdrawals/${encodeURIComponent(item.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ action }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Unable to update request');
      const nextStatus: RequestStatus = action === 'approve' ? 'Approved' : 'Rejected';
      setWithdrawals((items) => items.map((entry) => entry.id === item.id ? { ...entry, status: nextStatus } : entry));
      setDetail((current) => current?.id === item.id ? { ...current, status: nextStatus } : current);
      setSelectedIds((items) => items.filter((id) => id !== item.id));
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Unable to update request');
    } finally {
      setUpdatingId(null);
    }
  };

  const processSelected = async (action: 'approve' | 'reject') => {
    const eligible = withdrawals.filter((item) => selectedIds.includes(item.id) && item.status === 'Pending');
    for (const item of eligible) await processRequest(item, action);
  };

  const resetFilters = () => {
    setSearch(''); setTab('All Requests'); setStatus('All Status'); setMethod('All Methods'); setDate('');
    setSelectedStatuses([]); setSelectedMethods([]); setFromDate(''); setToDate('');
    setAppliedFilters({ statuses: [], methods: [], from: '', to: '' });
  };

  const exportCsv = () => {
    const rows = [['Request ID', 'Member', 'Email', 'Member ID', 'Amount', 'Payout Method', 'Requested Date', 'Status']];
    filtered.forEach((item) => rows.push([
      item.id, item.member_name || '', item.member_email || '', item.member_id || '', String(item.amount),
      item.payout_method || '', item.requested_date || '', item.status,
    ]));
    const csv = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    link.download = 'withdrawal-requests.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const toggleStatus = (value: RequestStatus) => setSelectedStatuses((items) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value]);
  const toggleMethod = (value: string) => setSelectedMethods((items) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value]);

  return <div className="withdrawals-page">
    <style>{`
      .withdrawals-page{min-height:calc(100vh - 80px);padding:22px 28px 38px;background:#fafbfc;color:#171a1f;font-family:Arial,sans-serif}.withdrawals-page *{box-sizing:border-box}.withdrawals-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:18px}.withdrawals-head h1{margin:0;font-size:26px;font-weight:650}.withdrawals-head p{margin:6px 0 0;color:#727983;font-size:13px}.export-button,.toolbar button,.pager button,.action-button,.bulk-button{display:inline-flex;align-items:center;justify-content:center;gap:7px;border:1px solid #e0e3e7;border-radius:6px;background:#fff;color:#343a40;cursor:pointer}.export-button{height:37px;padding:0 12px;font-size:12px;white-space:nowrap}.withdrawal-summary{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:13px}.withdrawal-stat{display:flex;min-height:96px;align-items:center;gap:14px;padding:14px 16px;border:1px solid #e5e7ea;border-radius:7px;background:#fff}.withdrawal-stat-icon{width:42px;height:42px;flex:none;display:grid;place-items:center;border-radius:50%}.withdrawal-stat-label{font-size:11px;color:#666f79}.withdrawal-stat-value{margin-top:5px;font-size:21px;font-weight:650}.withdrawal-stat-note{margin-top:6px;font-size:10px;color:#78808a}.tone-pending{background:#fff7dc;color:#d6a800}.tone-approved{background:#eaf7ed;color:#44a65a}.tone-rejected{background:#fff0ef;color:#e45650}.tone-amount{background:#f3efff;color:#8061d5}.withdrawal-layout{display:grid;grid-template-columns:minmax(0,1fr) 228px;gap:13px;align-items:start}.withdrawal-panel,.filter-panel{border:1px solid #e5e7ea;border-radius:7px;background:white;overflow:hidden}.withdrawal-tabs{height:45px;display:flex;align-items:stretch;border-bottom:1px solid #e9ebed;padding:0 9px}.withdrawal-tab{position:relative;padding:0 13px;border:0;background:none;color:#424950;font-size:12px;cursor:pointer}.withdrawal-tab.active{color:#c7a000;font-weight:650}.withdrawal-tab.active:after{position:absolute;right:5px;bottom:0;left:5px;height:2px;background:#dbb500;content:''}.toolbar{display:flex;align-items:center;gap:8px;padding:10px;border-bottom:1px solid #eceef0}.withdrawal-search{display:flex;min-width:150px;flex:1;align-items:center;gap:8px;height:34px;padding:0 9px;border:1px solid #dfe2e6;border-radius:5px;color:#7f8790}.withdrawal-search input{width:100%;min-width:0;border:0;outline:none;font-size:11px}.withdrawal-search input::placeholder{color:#9299a1}.withdrawal-select,.toolbar-date{height:34px;border:1px solid #dfe2e6;border-radius:5px;background:#fff;color:#4c535c;font-size:11px}.withdrawal-select{width:120px;padding:0 8px}.toolbar-date{width:145px;padding:0 7px}.bulk-actions{display:flex;align-items:center;gap:7px;padding:8px 12px;background:#fffaf0;border-bottom:1px solid #f0e5be;color:#584b1d;font-size:11px}.bulk-button{height:27px;padding:0 9px;font-size:10px}.bulk-button:disabled{opacity:.5;cursor:not-allowed}.table-scroll{width:100%;overflow:auto}.withdrawal-table{width:100%;min-width:850px;border-collapse:collapse;text-align:left}.withdrawal-table th{padding:10px 8px;border-bottom:1px solid #e8eaed;color:#3f454d;font-size:10px;font-weight:650;white-space:nowrap}.withdrawal-table td{padding:9px 8px;border-bottom:1px solid #eff0f2;color:#4e555e;font-size:10px;white-space:nowrap}.withdrawal-table tbody tr:hover{background:#fafbfc}.withdrawal-table input,.filter-panel input[type=checkbox]{accent-color:#d5ae00}.withdrawal-member{display:flex;align-items:center;gap:9px;min-width:130px}.withdrawal-avatar{width:30px;height:30px;display:grid;flex:none;place-items:center;border-radius:50%;background:#e8edf1;color:#41515e;font-size:10px;font-weight:700}.withdrawal-member-name{color:#282e34;font-size:11px;font-weight:550}.withdrawal-member-email{margin-top:3px;color:#89919b;font-size:9px}.request-status{display:inline-flex;align-items:center;gap:4px;padding:5px 8px;border-radius:4px;font-size:9px;font-weight:600}.request-status.pending{background:#fff8df;color:#b88c00}.request-status.approved{background:#ebf8ee;color:#449d56}.request-status.rejected{background:#fff0ef;color:#d9524c}.row-actions{display:flex;align-items:center;gap:5px}.action-button{height:28px;padding:0 9px;border-color:#e0b900;color:#a27f00;font-size:10px}.icon-action{width:28px;height:28px;border:1px solid #e1e4e7;border-radius:5px;background:white;color:#4b535a;cursor:pointer}.pagination{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px;color:#717984;font-size:10px}.pager{display:flex;align-items:center;gap:5px}.pager button{height:29px;min-width:29px;padding:0 7px;font-size:10px}.pager button.active{border-color:#d6b000;background:#d6b000;color:white}.pager button:disabled{color:#aeb4ba;cursor:not-allowed}.filter-panel{padding:14px}.filter-title{display:flex;align-items:center;gap:9px;margin-bottom:21px;font-size:13px;font-weight:650}.filter-group{margin-bottom:20px}.filter-group-title{margin-bottom:10px;font-size:11px;font-weight:600}.filter-option{display:flex;align-items:center;gap:9px;margin:9px 0;color:#4a5057;font-size:11px}.filter-option span:nth-child(2){flex:1}.filter-count{color:#79818a}.filter-date{display:grid;gap:7px}.filter-date input{width:100%;height:32px;padding:0 7px;border:1px solid #dfe2e6;border-radius:5px;font-size:10px}.apply-button,.reset-button{width:100%;height:34px;display:flex;align-items:center;justify-content:center;gap:7px;border-radius:5px;cursor:pointer;font-size:11px}.apply-button{border:0;background:#ddb600;color:white;font-weight:600}.reset-button{margin-top:8px;border:1px solid #dfe2e6;background:white;color:#41474e}.withdrawal-error{margin:0 0 12px;padding:10px 12px;border:1px solid #f0c5c1;border-radius:5px;background:#fff5f4;color:#a83a34;font-size:12px}.withdrawal-empty{display:grid;min-height:220px;place-items:center;color:#7d858e;font-size:12px}.detail-backdrop{position:fixed;inset:0;z-index:1100;display:flex;justify-content:flex-end;background:#11182766}.detail-drawer{width:min(420px,100%);height:100%;overflow:auto;background:white;box-shadow:-8px 0 30px #1112}.detail-heading{display:flex;align-items:center;justify-content:space-between;padding:19px;border-bottom:1px solid #eceef0}.detail-heading h2{margin:0;font-size:17px}.detail-heading p{margin:5px 0 0;color:#7c848d;font-size:11px}.detail-close{width:32px;height:32px;border:0;border-radius:5px;background:#f3f4f5;cursor:pointer}.detail-content{display:grid;gap:15px;padding:20px}.detail-field label{display:block;margin-bottom:5px;color:#7b838c;font-size:10px}.detail-field strong{font-size:12px;font-weight:550}.detail-actions{display:flex;gap:9px;padding:0 20px 20px}.detail-actions button{flex:1;height:36px;border:0;border-radius:5px;color:white;font-size:11px;font-weight:600;cursor:pointer}.approve-action{background:#48a85d}.reject-action{background:#dc5951}.detail-actions button:disabled{opacity:.6;cursor:wait}
      @media(max-width:1050px){.withdrawal-layout{grid-template-columns:minmax(0,1fr) 205px}.withdrawal-summary{gap:8px}.withdrawal-stat{gap:10px;padding:12px}.toolbar{flex-wrap:wrap}.withdrawal-search{flex-basis:40%}}
      @media(max-width:760px){.withdrawals-page{padding:18px 14px 28px}.withdrawals-head h1{font-size:22px}.withdrawal-summary{grid-template-columns:repeat(2,minmax(0,1fr))}.withdrawal-layout{grid-template-columns:1fr}.filter-panel{order:-1}.filter-group{margin-bottom:13px}.toolbar-date{flex:1}.withdrawal-select{flex:1;min-width:105px}.withdrawal-search{flex-basis:100%}.pagination{align-items:flex-start;flex-direction:column}.withdrawal-tabs{overflow:auto}.withdrawal-tab{flex:none}.bulk-actions{flex-wrap:wrap}}
      @media(max-width:420px){.withdrawal-stat{min-height:85px;padding:10px}.withdrawal-stat-icon{width:34px;height:34px}.withdrawal-stat-value{font-size:18px}.export-button{height:33px;padding:0 8px;font-size:10px}.withdrawals-head{align-items:center}}
    `}</style>
    <style>{`.withdrawals-head h1{font-size:25px}@media(max-width:760px){.withdrawals-head h1{font-size:22px}}`}</style>

    <div className="withdrawals-head">
      <div><h1>Withdrawal Requests</h1><p>Manage and process member withdrawal requests.</p></div>
      <button className="export-button" onClick={exportCsv}><Download size={15} />Export Report</button>
    </div>
    {error && <div className="withdrawal-error" role="alert">{error}</div>}

    <div className="withdrawal-summary">
      <Summary icon={<Wallet size={20} />} tone="tone-pending" title="Pending" value={pendingCount.toLocaleString()} note="Requires action" />
      <Summary icon={<CheckCircle2 size={20} />} tone="tone-approved" title="Approved" value={approvedCount.toLocaleString()} note="Processed requests" />
      <Summary icon={<XCircle size={20} />} tone="tone-rejected" title="Rejected" value={rejectedCount.toLocaleString()} note="Declined requests" />
      <Summary icon={<CircleDollarSign size={20} />} tone="tone-amount" title="Pending Amount" value={currency(pendingAmount)} note="Awaiting payout" />
    </div>

    <div className="withdrawal-layout">
      <section className="withdrawal-panel">
        <div className="withdrawal-tabs">{(['All Requests', ...statuses] as const).map((item) => <button key={item} className={`withdrawal-tab ${tab === item ? 'active' : ''}`} onClick={() => setTab(item)}>{item}</button>)}</div>
        <div className="toolbar">
          <label className="withdrawal-search"><Search size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, Member ID or Request ID..." /></label>
          <select className="withdrawal-select" value={status} onChange={(event) => setStatus(event.target.value)}><option>All Status</option>{statuses.map((item) => <option key={item}>{item}</option>)}</select>
          <select className="withdrawal-select" value={method} onChange={(event) => setMethod(event.target.value)}><option>All Methods</option>{methods.map((item) => <option key={item}>{item}</option>)}</select>
          <input className="toolbar-date" type="date" aria-label="Filter by request date" value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        {selectedIds.length > 0 && <div className="bulk-actions"><strong>{selectedIds.length} selected</strong><button className="bulk-button" disabled={Boolean(updatingId)} onClick={() => void processSelected('approve')}>Approve pending</button><button className="bulk-button" disabled={Boolean(updatingId)} onClick={() => void processSelected('reject')}>Reject pending</button></div>}

        {loading ? <div className="withdrawal-empty">Loading withdrawal requests...</div> : filtered.length === 0 ? <div className="withdrawal-empty">No withdrawal requests match these filters.</div> : <div className="table-scroll"><table className="withdrawal-table">
          <thead><tr><th><input type="checkbox" aria-label="Select visible requests" checked={selectedVisible} onChange={() => setSelectedIds((items) => selectedVisible ? items.filter((id) => !visible.some((entry) => entry.id === id)) : Array.from(new Set([...items, ...visible.map((entry) => entry.id)])))} /></th><th>Member</th><th>Member ID</th><th>Request ID</th><th>Amount</th><th>Payout Method</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>{visible.map((item) => <tr key={item.id}>
            <td><input type="checkbox" aria-label={`Select ${item.id}`} checked={selectedIds.includes(item.id)} onChange={() => setSelectedIds((items) => items.includes(item.id) ? items.filter((id) => id !== item.id) : [...items, item.id])} /></td>
            <td><div className="withdrawal-member"><span className="withdrawal-avatar">{initials(item.member_name)}</span><span><span className="withdrawal-member-name">{item.member_name || 'Unknown member'}</span><span className="withdrawal-member-email">{item.member_email || 'Email unavailable'}</span></span></div></td>
            <td>{item.member_id || '-'}</td><td>{item.id}</td><td><strong>{currency(item.amount)}</strong></td><td>{item.payout_method || '-'}</td>
            <td>{dateLabel(item.requested_date)}</td>
            <td><span className={`request-status ${item.status.toLowerCase()}`}>{item.status === 'Pending' ? <Clock3 size={11} /> : item.status === 'Approved' ? <CheckCircle2 size={11} /> : <XCircle size={11} />}{item.status}</span></td>
            <td><div className="row-actions"><button className="action-button" onClick={() => setDetail(item)}>{item.status === 'Pending' ? 'Review' : 'View'}</button><button className="icon-action" aria-label={`View ${item.id} details`} onClick={() => setDetail(item)}><MoreVertical size={15} /></button></div></td>
          </tr>)}</tbody>
        </table></div>}

        <div className="pagination"><span>Showing {filtered.length ? (page - 1) * pageSize + 1 : 0} to {Math.min(page * pageSize, filtered.length)} of {filtered.length} requests</span><div className="pager"><button aria-label="Previous page" disabled={page <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))}><ArrowLeft size={13} /></button>{pageNumbers.map((value) => <button key={value} className={page === value ? 'active' : ''} onClick={() => setPage(value)}>{value}</button>)}<button aria-label="Next page" disabled={page >= pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}><ChevronDown size={13} style={{ transform: 'rotate(-90deg)' }} /></button><span>{pageSize} / page</span></div></div>
      </section>

      <aside className="filter-panel">
        <div className="filter-title"><SlidersHorizontal size={16} />Filter Requests</div>
        <FilterGroup title="Status">{statuses.map((item) => <label className="filter-option" key={item}><input type="checkbox" checked={selectedStatuses.includes(item)} onChange={() => toggleStatus(item)} /><span>{item}</span><span className="filter-count">{withdrawals.filter((entry) => entry.status === item).length}</span></label>)}</FilterGroup>
        <FilterGroup title="Payout Method">{methods.length ? methods.map((item) => <label className="filter-option" key={item}><input type="checkbox" checked={selectedMethods.includes(item)} onChange={() => toggleMethod(item)} /><span>{item}</span><span className="filter-count">{withdrawals.filter((entry) => entry.payout_method === item).length}</span></label>) : <div className="filter-option">No methods available</div>}</FilterGroup>
        <FilterGroup title="Date Range"><div className="filter-date"><input aria-label="From date" type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} /><input aria-label="To date" type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} /></div></FilterGroup>
        <button className="apply-button" onClick={() => setAppliedFilters({ statuses: selectedStatuses, methods: selectedMethods, from: fromDate, to: toDate })}><Filter size={14} />Apply Filters</button>
        <button className="reset-button" onClick={resetFilters}><RotateCcw size={13} />Reset</button>
      </aside>
    </div>

    {detail && <div className="detail-backdrop" onClick={() => setDetail(null)}><aside className="detail-drawer" onClick={(event) => event.stopPropagation()}>
      <div className="detail-heading"><div><h2>{detail.member_name || 'Withdrawal request'}</h2><p>{detail.id}</p></div><button className="detail-close" aria-label="Close details" onClick={() => setDetail(null)}><X size={17} /></button></div>
      <div className="detail-content"><DetailField label="Member ID" value={detail.member_id || '-'} /><DetailField label="Email" value={detail.member_email || '-'} /><DetailField label="Amount" value={currency(detail.amount)} /><DetailField label="Payout method" value={detail.payout_method || '-'} /><DetailField label="Requested date" value={dateLabel(detail.requested_date)} /><DetailField label="Status" value={detail.status} /><DetailField label="Remarks" value={detail.remarks || '-'} /></div>
      {detail.status === 'Pending' && <div className="detail-actions"><button className="approve-action" disabled={updatingId === detail.id} onClick={() => void processRequest(detail, 'approve')}>Approve request</button><button className="reject-action" disabled={updatingId === detail.id} onClick={() => void processRequest(detail, 'reject')}>Reject request</button></div>}
    </aside></div>}
  </div>;
}

function Summary({ icon, tone, title, value, note }: { icon: React.ReactNode; tone: string; title: string; value: string; note: string }) {
  return <div className="withdrawal-stat"><div className={`withdrawal-stat-icon ${tone}`}>{icon}</div><div><div className="withdrawal-stat-label">{title}</div><div className="withdrawal-stat-value">{value}</div><div className="withdrawal-stat-note">{note}</div></div></div>;
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="filter-group"><div className="filter-group-title">{title}</div>{children}</div>;
}

function DetailField({ label, value }: { label: string; value: string }) {
  return <div className="detail-field"><label>{label}</label><strong>{value}</strong></div>;
}