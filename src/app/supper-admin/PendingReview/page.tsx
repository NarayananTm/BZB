"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  ChevronDown,
  ChevronRight,
  Download,
  Bell,
  Search,
  CalendarDays,
  SlidersHorizontal,
  RotateCcw,
  MoreVertical,
  UserRound,
  CheckCircle2,
  XCircle,
  Eye,
  WalletCards,
  UsersRound,
  Clock3,
  Settings,
  LogOut,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  FileText,
  X,
  Ban,
  Loader,
} from "lucide-react";

type Member = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  level_name: string;
  referral_count: number;
  wallet_balance: number;
  created_at: string;
  avatar: string | null;
  joining_date: string;
  status: string;
  pan?: string;
  aadhar?: string;
  amount?: number;
  utr_number?: string;
  transaction_proof_name?: string;
  transaction_proof_type?: string;
  sponsor_name?: string;
  sponsor_mobile?: string;
};

type Stats = {
  pendingReview: number;
  todaysSubmissions: number;
  thisWeek: number;
  rejected7Days: number;
};

const levelClass: Record<string, string> = {
  "Level 1": "bg-amber-50 text-amber-600",
  "Level 2": "bg-blue-50 text-blue-600",
  "Level 3": "bg-violet-50 text-violet-600",
};

export default function PendingReviewPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [stats, setStats] = useState<Stats>({
    pendingReview: 0,
    todaysSubmissions: 0,
    thisWeek: 0,
    rejected7Days: 0,
  });
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [decision, setDecision] = useState<"approve" | "reject" | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [loadingMemberDetails, setLoadingMemberDetails] = useState(false);

  // Fetch complete member details including PAN, Aadhar, UTR
  const fetchMemberDetails = useCallback(async (memberId: string) => {
    try {
      setLoadingMemberDetails(true);
      const response = await fetch(`/supper-admin/api/members/${memberId}`);
      if (!response.ok) throw new Error("Failed to fetch member details");
      const data = await response.json();
      setSelectedMember(data.data || null);
    } catch (err) {
      console.error("Error fetching member details:", err);
    } finally {
      setLoadingMemberDetails(false);
    }
  }, []);

  // Check authentication
  useEffect(() => {
    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('super_admin_logged_in') === 'true';
    if (!isLoggedIn) {
      router.push('/supper-admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('super_admin_logged_in');
    localStorage.removeItem('super_admin_token');
    fetch('/supper-admin/api/auth/logout', { method: 'POST' }).catch(err => console.error(err));
    router.push('/supper-admin/login');
  };
  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
        ...(levelFilter && { level: levelFilter }),
      });
      const response = await fetch(`/supper-admin/api/members/pending?${params}`);
      if (!response.ok) throw new Error("Failed to fetch members");
      const data = await response.json();
      setMembers(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, levelFilter]);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch("/supper-admin/api/members/stats");
      if (!response.ok) throw new Error("Failed to fetch stats");
      const data = await response.json();
      setStats(data.data || {
        pendingReview: 0,
        todaysSubmissions: 0,
        thisWeek: 0,
        rejected7Days: 0,
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);;

  const closeDrawer = () => {
    setSelectedMember(null);
    setDecision(null);
  };

  // Show loading while checking auth
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader size={32} className="animate-spin text-[#eab900]" />
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#161616]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[220px] bg-[#171b1e] text-white transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[74px] items-center gap-3 border-b border-white/10 px-6">
          <div className="text-[32px] leading-none text-[#f5c400]">♕</div>
          <div>
            <div className="text-[21px] font-bold leading-none text-[#f5c400]">MBD</div>
            <div className="mt-1 text-[12px] font-medium tracking-wide">SUPER ADMIN</div>
          </div>
        </div>

        <nav className="px-3 py-5 text-[13px]">
          <NavItem icon={<LayoutIcon />} label="Dashboard" />
          <div className="mt-2 rounded-xl bg-[#f3c400] text-[#171717]">
            <div className="flex items-center gap-3 px-4 py-3 font-semibold">
              <UsersRound size={18} />
              <span className="flex-1">Members</span>
              <ChevronDown size={16} />
            </div>
            <div className="space-y-1 px-2 pb-3">
              <SubNav label="All Members" />
              <SubNav label="Add Member" />
              <SubNav label="Bulk Upload" />
              <SubNav label="Member Approvals" active />
            </div>
          </div>

          <NavItem icon={<UsersRound size={18} />} label="Referrals" />
          <NavItem icon={<WalletCards size={18} />} label="Income & Wallets" chevron />
          <NavItem icon={<WalletCards size={18} />} label="Withdrawals" />
          <NavItem icon={<Clock3 size={18} />} label="Top-up Requests" />
          <NavItem icon={<span className="text-lg">♜</span>} label="Rewards" />
          <NavItem icon={<FileText size={18} />} label="Reports" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
          <NavItem icon={<UserRound size={18} />} label="Admin Management" />
        </nav>

        <div className="absolute bottom-20 left-5 right-5 rounded-lg border border-white/10 bg-[#1e2428] p-4">
          <div className="mb-3 text-[12px] font-semibold">Platform Health</div>
          <div className="flex items-center gap-2 text-[12px] text-white/80">
            <ShieldCheck size={17} />
            All Systems Operational
            <span className="ml-auto h-2.5 w-2.5 rounded-full bg-green-500" />
          </div>
        </div>

        <div className="absolute bottom-5 left-6 flex items-center gap-3 text-[13px]">
          <button onClick={handleLogout} className="flex items-center gap-3 hover:text-[#f5c400] transition-colors">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={`${sidebarOpen ? "ml-[220px]" : "ml-0"} min-h-screen transition-all duration-200`}>
        <header className="flex h-[74px] items-center justify-between border-b border-[#e7e8eb] bg-white px-7">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="rounded-md p-1 hover:bg-gray-100">
              <Menu size={21} />
            </button>
            <div className="flex items-center gap-2 text-[13px]">
              <span className="font-semibold">Members</span>
              <ChevronRight size={15} className="text-gray-400" />
              <span className="text-gray-500">Member Approvals</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-semibold shadow-sm">
              <Download size={16} />
              Export
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-[#eab900] px-5 py-2.5 text-[13px] font-semibold text-white">
              <CheckCircle2 size={16} />
              Bulk Actions
              <ChevronDown size={15} />
            </button>
            <div className="relative">
              <Bell size={22} />
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#e5b700] text-[10px] font-bold text-white">
                12
              </span>
            </div>
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/80?img=68" alt="Admin avatar" className="h-10 w-10 rounded-full" />
              <div className="leading-tight">
                <div className="text-[13px] font-semibold">Super Admin</div>
                <div className="text-[11px] text-gray-500">Administrator</div>
              </div>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        <div className="p-6">
          <section className="mb-6">
            <h1 className="text-[30px] font-bold tracking-tight">Pending Review</h1>
            <p className="mt-1 text-[14px] text-gray-500">
              Review and approve or reject new member registration requests.
            </p>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-4 gap-4">
            <StatCard icon={<UserRound size={30} />} iconBg="bg-amber-50" iconColor="text-amber-600" title="Pending Review" value={stats.pendingReview.toString()} note="Requires your review" noteColor="text-orange-500" />
            <StatCard icon={<UsersRound size={30} />} iconBg="bg-green-50" iconColor="text-green-600" title="Today's Submissions" value={stats.todaysSubmissions.toString()} note={`${stats.todaysSubmissions} submissions`} noteColor="text-green-600" />
            <StatCard icon={<Clock3 size={30} />} iconBg="bg-violet-50" iconColor="text-violet-600" title="This Week" value={stats.thisWeek.toString()} note="Pending this week" noteColor="text-green-600" />
            <StatCard icon={<XCircle size={30} />} iconBg="bg-red-50" iconColor="text-red-600" title="Rejected" value={stats.rejected7Days.toString()} note="Last 7 days" noteColor="text-gray-500" />
          </section>

          {/* Filters */}
          <section className="mt-4 rounded-xl border border-[#e5e7eb] bg-white p-4">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_auto_auto] items-end gap-4">
              <Field label="Search">
                <div className="relative">
                  <input
                    className="h-10 w-full rounded-lg border border-gray-200 px-3 pr-10 text-[13px] outline-none focus:border-[#e5b900]"
                    placeholder="Search by name, mobile number or Member ID..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setPage(1);
                    }}
                  />
                  <Search className="absolute right-3 top-2.5 text-gray-500" size={17} />
                </div>
              </Field>
              <Field label="Status">
                <Select text="Pending Review" />
              </Field>
              <Field label="Level">
                <select
                  className="h-10 w-full rounded-lg border border-gray-200 px-3 text-[13px] outline-none focus:border-[#e5b900]"
                  value={levelFilter}
                  onChange={(e) => {
                    setLevelFilter(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">All Levels</option>
                  <option value="1">Level 1</option>
                  <option value="2">Level 2</option>
                  <option value="3">Level 3</option>
                </select>
              </Field>
              <Field label="Submitted Date">
                <div className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 px-3 text-[13px] text-gray-400">
                  <CalendarDays size={17} />
                  Select Date Range
                </div>
              </Field>
              <button className="flex h-10 items-center gap-2 rounded-lg bg-[#eab900] px-5 text-[13px] font-semibold text-white">
                <SlidersHorizontal size={16} /> Filter
              </button>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setLevelFilter("");
                  setPage(1);
                }}
                className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-[13px] font-semibold">
                <RotateCcw size={16} /> Reset
              </button>
            </div>
          </section>

          {/* Table */}
          <section className="mt-4 overflow-visible rounded-xl border border-[#e5e7eb] bg-white">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h2 className="text-[15px] font-semibold">Pending Members <span className="text-gray-500">({stats.pendingReview})</span></h2>
              <div className="flex items-center gap-3">
                <Select text="Newest First" compact />
                <button className="rounded-lg border border-gray-200 p-2.5"><Settings size={17} /></button>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="flex flex-col items-center gap-3">
                  <Loader size={32} className="animate-spin text-[#eab900]" />
                  <p className="text-sm text-gray-500">Loading pending members...</p>
                </div>
              </div>
            ) : error ? (
              <div className="p-6 text-center">
                <p className="text-red-600">Error: {error}</p>
              </div>
            ) : members.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">No pending members found</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1000px] text-left">
                    <thead className="bg-[#fbfbfc] text-[12px] font-semibold text-gray-700">
                      <tr className="border-b border-gray-100">
                        <th className="w-12 px-5 py-4"><input type="checkbox" /></th>
                        <th className="px-3 py-4">Member</th>
                        <th className="px-3 py-4">Member ID</th>
                        <th className="px-3 py-4">Mobile Number</th>
                        <th className="px-3 py-4">Level</th>
                        <th className="px-3 py-4">Referrals ⓘ</th>
                        <th className="px-3 py-4">Wallet Balance ⓘ</th>
                        <th className="px-3 py-4">Submitted On</th>
                        <th className="px-5 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member) => (
                        <tr key={member.id} className="border-b border-gray-100 text-[13px] last:border-0 hover:bg-gray-50/70">
                          <td className="px-5 py-4"><input type="checkbox" /></td>
                          <td className="px-3 py-4">
                            <div className="flex items-center gap-3">
                              <img src={member.avatar || `https://i.pravatar.cc/80?img=${Math.random() * 100}`} alt={member.name} className="h-9 w-9 rounded-full object-cover" />
                              <div>
                                <div className="font-semibold">{member.name}</div>
                                <div className="text-[11px] text-gray-500">{member.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-4 font-medium">{member.id}</td>
                          <td className="px-3 py-4">{member.mobile}</td>
                          <td className="px-3 py-4">
                            <span className={`rounded-md px-3 py-1.5 text-[11px] font-semibold ${levelClass[member.level_name] || "bg-gray-50 text-gray-600"}`}>
                              {member.level_name}
                            </span>
                          </td>
                          <td className="px-3 py-4">{member.referral_count}</td>
                          <td className={`px-3 py-4 font-semibold ${member.wallet_balance > 0 ? "text-green-600" : ""}`}>₹{member.wallet_balance}</td>
                          <td className="px-3 py-4">
                            <div>{new Date(member.created_at).toLocaleDateString()}</div>
                            <div className="text-[11px] text-gray-500">{new Date(member.created_at).toLocaleTimeString()}</div>
                          </td>
                          <td className="relative px-5 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  fetchMemberDetails(member.id);
                                  setOpenMenu(null);
                                  setDecision(null);
                                }}
                                className="flex items-center gap-2 rounded-lg border border-gray-200 px-3.5 py-2 text-[12px] font-semibold hover:bg-gray-50"
                              >
                                Review <ChevronDown size={14} />
                              </button>
                              <button
                                onClick={() => setOpenMenu(openMenu === member.id ? null : member.id)}
                                className="rounded-lg border border-gray-200 p-2"
                              >
                                <MoreVertical size={16} />
                              </button>
                            </div>
                            {openMenu === member.id && (
                              <div className="absolute right-5 top-14 z-20 w-44 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
                                <MenuAction icon={<Eye size={15} />} text="View Profile" onClick={() => {
                                  fetchMemberDetails(member.id);
                                  setOpenMenu(null);
                                }} />
                                <MenuAction icon={<CheckCircle2 size={15} />} text="Approve" green onClick={() => { fetchMemberDetails(member.id); setDecision("approve"); setOpenMenu(null); }} />
                                <MenuAction icon={<XCircle size={15} />} text="Reject" red onClick={() => { fetchMemberDetails(member.id); setDecision("reject"); setOpenMenu(null); }} />
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between px-5 py-4 text-[12px] text-gray-600">
                  <span>Showing {members.length} pending members</span>
                  <div className="flex items-center gap-2">
                    <PageButton onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>←</PageButton>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
                      <PageButton key={i + 1} active={page === i + 1} onClick={() => setPage(i + 1)}>{i + 1}</PageButton>
                    ))}
                    {totalPages > 5 && <span>...</span>}
                    <PageButton onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>→</PageButton>
                    <Select text="10 / page" compact />
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </main>

      {/* Review Drawer */}
      {selectedMember && (
        <>
          <div
            onClick={closeDrawer}
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[1px]"
          />
          <aside className="fixed right-0 top-0 z-50 flex h-screen w-[470px] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <div className="text-[18px] font-bold">Member Review</div>
                <div className="mt-1 text-[12px] text-gray-500">Registration request details</div>
              </div>
              <button onClick={closeDrawer} className="rounded-lg p-2 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="rounded-xl border border-gray-200 bg-[#fbfbfc] p-5">
                <div className="flex items-center gap-4">
                  <img src={selectedMember.avatar || `https://i.pravatar.cc/80?img=68`} alt={selectedMember.name} className="h-16 w-16 rounded-full object-cover" />
                  <div className="flex-1">
                    <h3 className="text-[18px] font-bold">{selectedMember.name}</h3>
                    <div className="mt-1 text-[12px] text-gray-500">{selectedMember.email}</div>
                    <div className="mt-2 inline-flex rounded-md bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-600">
                      Pending Review
                    </div>
                  </div>
                </div>
              </div>

              <ReviewSection title="Basic Information">
                <Detail icon={<UserRound />} label="Member ID" value={selectedMember.id} />
                <Detail icon={<Phone />} label="Mobile Number" value={selectedMember.mobile} />
                <Detail icon={<Mail />} label="Email Address" value={selectedMember.email} />
                <Detail icon={<MapPin />} label="Member Since" value={new Date(selectedMember.joining_date || selectedMember.created_at).toLocaleDateString()} />
              </ReviewSection>

              <ReviewSection title="Membership Details">
                <div className="grid grid-cols-2 gap-3">
                  <MiniStat label="Membership Level" value={selectedMember.level_name} />
                  <MiniStat label="Referrals" value={String(selectedMember.referral_count)} />
                  <MiniStat label="Wallet Balance" value={`₹${selectedMember.wallet_balance}`} />
                  <MiniStat label="Submitted On" value={new Date(selectedMember.created_at).toLocaleDateString()} />
                </div>
              </ReviewSection>

              <ReviewSection title="Registration Information">
                {loadingMemberDetails ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader size={20} className="animate-spin text-[#eab900]" />
                  </div>
                ) : (
                  <>
                    {/* KYC Details */}
                    <div className="space-y-3">
                      <div className="rounded-lg border border-gray-200 p-4">
                        <div className="text-[12px] font-semibold text-gray-600 mb-3">KYC Details</div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-[11px] text-gray-500">PAN</div>
                            <div className="text-[13px] font-semibold mt-1">{selectedMember?.pan || 'N/A'}</div>
                          </div>
                          <div>
                            <div className="text-[11px] text-gray-500">Aadhar</div>
                            <div className="text-[13px] font-semibold mt-1">****{selectedMember?.aadhar?.slice(-4) || 'N/A'}</div>
                          </div>
                        </div>
                      </div>

                      {/* Transaction Details */}
                      <div className="rounded-lg border border-gray-200 p-4">
                        <div className="text-[12px] font-semibold text-gray-600 mb-3">Transaction Details</div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-[11px] text-gray-500">Amount</div>
                            <div className="text-[13px] font-semibold mt-1 text-green-600">₹{selectedMember?.amount || '0'}</div>
                          </div>
                          <div>
                            <div className="text-[11px] text-gray-500">UTR Number</div>
                            <div className="text-[13px] font-semibold mt-1">{selectedMember?.utr_number || 'N/A'}</div>
                          </div>
                        </div>
                        {selectedMember?.transaction_proof_name && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-center gap-2">
                            <FileText size={16} className="text-blue-600" />
                            <div className="flex-1">
                              <div className="text-[11px] font-semibold text-blue-600">{selectedMember.transaction_proof_name}</div>
                              <div className="text-[10px] text-blue-500">{selectedMember.transaction_proof_type}</div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Sponsor/Referrer Details */}
                      {selectedMember?.sponsor_name && (
                        <div className="rounded-lg border border-gray-200 p-4">
                          <div className="text-[12px] font-semibold text-gray-600 mb-3">Referrer Details</div>
                          <div>
                            <div className="text-[11px] text-gray-500">Sponsor Name</div>
                            <div className="text-[13px] font-semibold mt-1">{selectedMember.sponsor_name}</div>
                          </div>
                          {selectedMember?.sponsor_mobile && (
                            <div className="mt-3">
                              <div className="text-[11px] text-gray-500">Sponsor Mobile</div>
                              <div className="text-[13px] font-semibold mt-1">{selectedMember.sponsor_mobile}</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </ReviewSection>

              {decision && (
                <div className={`mt-5 rounded-xl border p-4 ${decision === "approve" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                  <div className="flex gap-3">
                    {decision === "approve" ? <CheckCircle2 className="text-green-600" /> : <Ban className="text-red-600" />}
                    <div>
                      <div className="text-[13px] font-semibold">
                        {decision === "approve" ? "Approve this member?" : "Reject this member?"}
                      </div>
                      <div className="mt-1 text-[11px] text-gray-600">
                        {decision === "approve"
                          ? "The member will become active after approval."
                          : "The registration request will be rejected and removed from the pending queue."}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 bg-white p-5">
              {!decision ? (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setDecision("reject")}
                    className="flex h-11 items-center justify-center gap-2 rounded-lg border border-red-200 text-[13px] font-semibold text-red-600 hover:bg-red-50"
                  >
                    <XCircle size={17} /> Reject
                  </button>
                  <button
                    onClick={() => setDecision("approve")}
                    className="flex h-11 items-center justify-center gap-2 rounded-lg bg-[#eab900] text-[13px] font-semibold text-white hover:bg-[#dcae00]"
                  >
                    <CheckCircle2 size={17} /> Approve Member
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setDecision(null)} className="h-11 rounded-lg border border-gray-200 text-[13px] font-semibold">
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const response = await fetch("/supper-admin/api/members/decision", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            memberId: selectedMember?.id,
                            action: decision,
                          }),
                        });
                        const data = await response.json();
                        if (data.success) {
                          alert(`${selectedMember?.name} ${decision === "approve" ? "approved" : "rejected"} successfully.`);
                          closeDrawer();
                          fetchMembers();
                          fetchStats();
                        } else {
                          alert(`Error: ${data.message}`);
                        }
                      } catch (err) {
                        alert("An error occurred while processing the decision");
                        console.error(err);
                      }
                    }}
                    className={`h-11 rounded-lg text-[13px] font-semibold text-white ${decision === "approve" ? "bg-green-600" : "bg-red-600"}`}
                  >
                    Confirm {decision === "approve" ? "Approval" : "Rejection"}
                  </button>
                </div>
              )}
            </div>
          </aside>
        </>
      )}
    </div>
  );
}

function NavItem({
  icon,
  label,
  chevron,
}: {
  icon: React.ReactNode;
  label: string;
  chevron?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/90 hover:bg-white/5">
      {icon}
      <span className="flex-1">{label}</span>
      {chevron && <ChevronDown size={15} />}
    </div>
  );
}

function SubNav({ label, active }: { label: string; active?: boolean }) {
  return (
    <div className={`rounded-lg px-4 py-2.5 text-[12px] ${active ? "font-semibold text-[#f3c400]" : "text-white/90"}`}>
      {label}
      {active && <span className="float-right mt-1 h-2 w-2 rounded-full bg-[#f3c400]" />}
    </div>
  );
}

function LayoutIcon() {
  return (
    <span className="grid grid-cols-2 gap-0.5">
      <span className="h-2 w-2 rounded-sm border border-current" />
      <span className="h-2 w-2 rounded-sm border border-current" />
      <span className="h-2 w-2 rounded-sm border border-current" />
      <span className="h-2 w-2 rounded-sm border border-current" />
    </span>
  );
}

function StatCard({
  icon,
  iconBg,
  iconColor,
  title,
  value,
  note,
  noteColor,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  value: string;
  note: string;
  noteColor: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-4">
        <div className={`flex h-14 w-14 items-center justify-center rounded-full ${iconBg} ${iconColor}`}>
          {icon}
        </div>
        <div>
          <div className="text-[13px] text-gray-500">{title}</div>
          <div className="mt-1 text-[28px] font-bold">{value}</div>
        </div>
      </div>
      <div className={`mt-4 text-[12px] font-semibold ${noteColor}`}>{note}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[12px] font-semibold text-gray-700">{label}</span>
      {children}
    </label>
  );
}

function Select({ text, compact }: { text: string; compact?: boolean }) {
  return (
    <div className={`flex h-10 items-center justify-between rounded-lg border border-gray-200 bg-white px-3 text-[13px] ${compact ? "min-w-[120px]" : ""}`}>
      <span>{text}</span>
      <ChevronDown size={15} className="text-gray-500" />
    </div>
  );
}

function MenuAction({
  icon,
  text,
  onClick,
  green,
  red,
}: {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  green?: boolean;
  red?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] hover:bg-gray-50 ${
        green ? "text-green-600" : red ? "text-red-600" : "text-gray-700"
      }`}
    >
      {icon}
      {text}
    </button>
  );
}

function PageButton({ children, active, onClick, disabled }: { children: React.ReactNode; active?: boolean; onClick?: () => void; disabled?: boolean }) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`h-9 min-w-9 rounded-lg border px-3 text-[12px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${active ? "border-[#eab900] bg-[#eab900] text-white" : "border-gray-200 bg-white"}`}>
      {children}
    </button>
  );
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h4 className="mb-3 text-[13px] font-bold">{title}</h4>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3.5">
      <div className="text-gray-400 [&>svg]:h-4 [&>svg]:w-4">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-wide text-gray-400">{label}</div>
        <div className="mt-0.5 truncate text-[12px] font-semibold">{value}</div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-200 p-3.5">
      <div className="text-[10px] uppercase tracking-wide text-gray-400">{label}</div>
      <div className="mt-1 text-[13px] font-bold">{value}</div>
    </div>
  );
}
