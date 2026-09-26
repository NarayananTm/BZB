'use client';
import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";


/**
 * MBD Super Admin Dashboard
 * React + TypeScript with API Integration
 * Fetches real data from super admin dashboard APIs
 */

type Status = "Active" | "Pending" | "Suspended";

type Member = {
  name: string;
  id: string;
  level: string;
  status: Status;
  joined: string;
  avatar: string;
};

type DashboardData = {
  dashboardStats: {
    total_members: number;
    active_members: number;
    pending_members: number;
    suspended_members: number;
    total_referrals: number;
    pending_referrals: number;
    total_earnings: number;
    total_withdrawals: number;
    pending_withdrawals: number;
    total_topups: number;
    pending_topups: number;
    unread_notifications: number;
    levels: Array<{ name: string; reward: string | null; members_count: number; percentage: number }>;
  };
  financialStats: {
    total_income: number;
    pending_withdrawals: number;
    pending_topups: number;
    completed_withdrawals: number;
    completed_topups: number;
    total_platform_balance: number;
  };
  topMembers: any[];
  pendingRequests: Array<{
    type: "member_registration" | "withdrawal" | "topup" | "referral";
    requested_date: string;
  }>;
  recentActivities: Array<{
    type: string;
    description: string;
    timestamp: string;
    status: string;
  }>;
};

function Arrow() {
  return <span className="arrow">→</span>;
}

function IconBubble({
  children,
  tone = "yellow",
}: {
  children: React.ReactNode;
  tone?: "yellow" | "green" | "blue" | "orange" | "red" | "purple";
}) {
  return <span className={`icon-bubble ${tone}`}>{children}</span>;
}

function StatCard({
  icon,
  tone,
  label,
  value,
  note,
  noteType = "positive",
}: {
  icon: React.ReactNode;
  tone: "yellow" | "green" | "blue" | "orange";
  label: string;
  value: string;
  note: string;
  noteType?: "positive" | "warning";
}) {
  return (
    <div className="stat-card">
      <IconBubble tone={tone}>{icon}</IconBubble>
      <div className="stat-copy">
        <div className="muted">{label}</div>
        <strong>{value}</strong>
        <div className={`stat-note ${noteType}`}>
          {noteType === "positive" && <span>↑</span>} {note}
        </div>
      </div>
    </div>
  );
}

function FinancialCard({
  icon,
  tone,
  label,
  value,
  subtitle,
  action,
}: {
  icon: React.ReactNode;
  tone: "yellow" | "red" | "blue" | "green";
  label: string;
  value: string;
  subtitle: string;
  action: string;
}) {
  return (
    <div className="financial-card">
      <div className="financial-top">
        <IconBubble tone={tone}>{icon}</IconBubble>
        <div>
          <div className="muted">{label}</div>
          <strong>{value}</strong>
        </div>
      </div>
      <div className="financial-subtitle">{subtitle}</div>
      <button className="gold-button">{action} <Arrow /></button>
    </div>
  );
}

function StatusPill({ status }: { status: Status }) {
  return <span className={`status ${status.toLowerCase()}`}>{status}</span>;
}

function ActionRow({
  icon,
  title,
  sub,
  tone,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  tone: string;
  onClick?: () => void;
}) {
  return (
    <div className="action-row" onClick={onClick} style={onClick ? { cursor: 'pointer' } : {}}>
      <IconBubble tone={tone as any}>{icon}</IconBubble>
      <div>
        <strong>{title}</strong>
        <span>{sub}</span>
      </div>
      <button className="review-button" onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}>Review <Arrow /></button>
    </div>
  );
}

function Notification({
  icon,
  tone,
  title,
  text,
  time,
}: {
  icon: React.ReactNode;
  tone: string;
  title: string;
  text: string;
  time: string;
}) {
  return (
    <div className="notification-row">
      <IconBubble tone={tone as any}>{icon}</IconBubble>
      <div className="notification-copy">
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
      <small>{time}</small>
    </div>
  );
}

function formatDate(value: string | null | undefined) {
  if (!value) return "Recently";
  const [year, month, day] = String(value).slice(0, 10).split("-");
  return year && month && day ? `${day}/${month}/${year}` : "Recently";
}

function formatRelativeTime(timestamp: string, now: number | null) {
  if (now === null) return "Recently";
  const elapsed = now - new Date(timestamp).getTime();
  const minutes = Math.max(0, Math.floor(elapsed / 60000));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function getActivityTitle(type: string) {
  const titles: Record<string, string> = {
    member_joined: "New Member Registration",
    referral_created: "New Referral",
    earning_created: "New Earning",
    withdrawal_requested: "New Withdrawal Request",
  };

  return titles[type] || "Platform Activity";
}

function Reward({
  rank,
  title,
  name,
  qualified,
  visual,
}: {
  rank: string;
  title: string;
  name: string;
  qualified: string;
  visual: string;
}) {
  return (
    <div className="reward">
      <div className="rank">{rank}</div>
      <div className="reward-art">{visual}</div>
      <div className="reward-copy">
        <span>{title}</span>
        <strong>{name}</strong>
        <small>{qualified}</small>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [currentTime, setCurrentTime] = useState<number | null>(null);

  useEffect(() => {
    setCurrentTime(Date.now());
  }, []);

  // Fetch dashboard data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('super_admin_token');
        const response = await fetch('/api/super-admin/dashboard', {
          credentials: 'include',
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            router.push('/supper-admin/login');
          }
          throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
        }
        
        const result = await response.json();
        if (result.success && result.data) {
          setDashboardData(result.data);
          
          // Transform top members to match Member type
          const transformedMembers = (result.data.topMembers || []).map((m: any) => ({
            name: m.name || 'Unknown',
            id: m.id || '',
            level: m.level_name || 'Level 1',
            status: (m.status || 'Pending') as Status,
            joined: formatDate(m.joining_date),
            avatar: m.name ? m.name.charAt(0).toUpperCase() : '?',
          }));
          setMembers(transformedMembers);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    // // Refresh data every 30 seconds
    // const interval = setInterval(fetchDashboardData, 30000);
    // return () => clearInterval(interval);
  }, []);

  // Handle member click - navigate to pending review page
  const handleMemberClick = (memberId: string) => {
    router.push(`/supper-admin/members/pending?memberId=${memberId}`);
  };

  // Navigate to pending review page
  const navigateToPendingReview = () => {
    router.push('/supper-admin/members/pending');
  };
  const navigateToMembers = () => {
    router.push('/supper-admin/members/pending');
  };

  const filteredMembers = useMemo(
    () =>
      members.filter((m) =>
        `${m.name} ${m.id} ${m.level} ${m.status}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search, members]
  );

  // Format currency in Indian format
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format number with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const recentActivities = (dashboardData?.recentActivities || []).slice(0, 3);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontSize: '18px', color: '#666' }}>
        Loading dashboard data...
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>

      <div style={{ padding: '24px' }}>
        <div className="content">
            {/* Dashboard View */}
            <section className="dashboard-grid">
              <div className="left-column">
                <div className="stats-grid">
                  <StatCard
                    icon="♙"
                    tone="yellow"
                    label="Total Members"
                    value={formatNumber(dashboardData?.dashboardStats.total_members || 0)}
                    note={`${dashboardData?.dashboardStats.active_members || 0} Active`}
                  />
                  <StatCard
                    icon="♙"
                    tone="green"
                    label="Active Members"
                    value={formatNumber(dashboardData?.dashboardStats.active_members || 0)}
                    note={dashboardData?.dashboardStats.total_members ? `${Math.round((dashboardData.dashboardStats.active_members / dashboardData.dashboardStats.total_members) * 100)}% of total` : "0%"}
                  />
                  <StatCard
                    icon="♧"
                    tone="blue"
                    label="Total Referrals"
                    value={formatNumber(dashboardData?.dashboardStats.total_referrals || 0)}
                    note={`${dashboardData?.dashboardStats.pending_referrals || 0} Pending`}
                  />
                  <StatCard
                    icon="▣"
                    tone="orange"
                    label="Pending Requests"
                    value={formatNumber((dashboardData?.dashboardStats.pending_referrals || 0))}
                    note="Requires attention"
                    noteType="warning"
                  />
                </div>

                <section className="panel financial-panel">
                  <div className="panel-heading">
                    <h2 className="text-black">Financial Overview</h2>
                    <button className="text-link">View All Details <Arrow /></button>
                  </div>

                  <div className="financial-grid">
                    <FinancialCard
                      icon="▣"
                      tone="yellow"
                      label="Total Income"
                      value={formatCurrency(dashboardData?.financialStats.total_income || 0)}
                      subtitle="Platform-wide recorded income"
                      action="View Details"
                    />
                    <FinancialCard
                      icon="⇩"
                      tone="red"
                      label="Withdrawal Requests"
                      value={formatCurrency(dashboardData?.financialStats.pending_withdrawals || 0)}
                      subtitle="Pending withdrawal amount"
                      action="Review Requests"
                    />
                    <FinancialCard
                      icon="⇧"
                      tone="blue"
                      label="Top-up Requests"
                      value={formatCurrency(dashboardData?.financialStats.pending_topups || 0)}
                      subtitle="Pending top-up amount"
                      action="Review Requests"
                    />
                    <FinancialCard
                      icon="✓"
                      tone="green"
                      label="Completed Withdrawals"
                      value={formatCurrency(dashboardData?.financialStats.completed_withdrawals || 0)}
                      subtitle="Total amount withdrawn"
                      action="View History"
                    />
                  </div>
                </section>

                <div className="lower-grid">
                  <section className="panel levels-panel">
                    <div className="panel-heading ">
                      <h2 className="text-black">Member Level Distribution</h2>
                      <button className="text-link" onClick={navigateToMembers}>
                        Manage Levels <Arrow />
                      </button>
                    </div>

                    {dashboardData?.dashboardStats.levels.map((level, idx) => (
                      <div className="level-row" key={level.name}>
                        <IconBubble tone={["yellow", "orange", "purple"][idx] as any}>
                          {["♟", "♧", "♛"][idx]}
                        </IconBubble>
                        <div className="level-info">
                          <strong>{level.name}</strong>
                          <span>{formatNumber(level.members_count)} Members</span>
                          <div className="progress">
                            <i style={{ width: `${level.percentage}%` }} />
                          </div>
                        </div>
                        <span className="percentage">{level.percentage}%</span>
                      </div>
                    ))}
                  </section>

                  <section className="panel members-panel">
                    <div className="panel-heading">
                      <h2 className="text-black">Recent Members</h2>
                      
                      <button className="text-link" onClick={navigateToMembers}>
                        See All <Arrow />
                      </button>
                    </div>

                    <div className="table-search">
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search members..."
                      />
                    </div>

                    <div className="members-table">
                      <div className="table-head">
                        <span>Member</span>
                        <span>Member ID</span>
                        <span>Level</span>
                        <span>Status</span>
                        <span>Joined</span>
                        <span />
                      </div>

                      {filteredMembers.length > 0 ? (
                        filteredMembers.map((member) => (
                          <div 
                            className="table-row" 
                            key={member.id}
                            onClick={() => handleMemberClick(member.id)}
                            style={{ cursor: 'pointer' }}
                          >
                            <span className="member-cell">
                              <span className="member-avatar">{member.avatar || '?'}</span>
                              <span>{member.name || 'Unknown member'}</span>
                            </span>
                            <span>{member.id || '—'}</span>
                            <span>{member.level || '—'}</span>
                            <span><StatusPill status={member.status || 'Pending'} /></span>
                            <span>{member.joined || 'Recently'}</span>
                            <button 
                              className="more"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMemberClick(member.id);
                              }}
                            >
                              ⋮
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="table-row" style={{ textAlign: 'center', color: '#999' }}>
                          No members found
                        </div>
                      )}
                    </div>
                  </section>
                </div>

                <section className="rewards">
                  <div className="rewards-heading">
                    <div>
                      <h2 className="text-white">Rewards &amp; Achievements</h2>
                      <p>Manage achievement levels and reward configuration</p>
                    </div>
                    <button className="primary-button">Manage Rewards <Arrow /></button>
                  </div>

                  <div className="reward-grid">
                    {(dashboardData?.dashboardStats.levels || []).slice(0, 3).map((level, idx) => (
                      <Reward
                        key={level.name}
                        rank={String(idx + 1)}
                        title={level.name}
                        name={level.reward || `${level.name} Reward`}
                        qualified={`${formatNumber(level.members_count)} Qualified`}
                        visual={["🏍️", "🚗", "🏠"][idx] || "🏆"}
                      />
                    ))}
                  </div>
                </section>
              </div>

              <aside className="right-column">
                <section className="panel pending-panel">
                  <div className="panel-heading">
                    <h2 className="text-black">Pending Actions</h2>
                    <button className="text-link">View All <Arrow /></button>
                  </div>

                  <ActionRow icon="⇩" title="Withdrawal Requests" sub={`${dashboardData?.dashboardStats.pending_withdrawals || 0} Pending`} tone="red" />
                  <ActionRow icon="⇧" title="Top-up Requests" sub={`${dashboardData?.dashboardStats.pending_topups || 0} Pending`} tone="blue" />
                  <ActionRow 
                    icon="♙" 
                    title="Member Approvals" 
                    sub={`${dashboardData?.dashboardStats.pending_members || 0} Pending`}
                    tone="purple"
                    onClick={navigateToPendingReview}
                  />
                  <ActionRow icon="♧" title="KYC / Verification" sub={`${dashboardData?.dashboardStats.pending_members || 0} Pending`} tone="green" />
                </section>

                <section className="panel network-panel">
                  <div className="panel-heading">
                    <h2 className="text-black">Referral Network</h2>
                    <button className="text-link">View Network <Arrow /></button>
                  </div>
                  <div className="muted">Total Referral Connections</div>
                  <div className="network-total">{formatNumber(dashboardData?.dashboardStats.total_referrals || 0)}</div>
                  <div className="network-body">
                    <div className="network-list">
                      <div><i className="dot yellow" />Level 1 Referrals <b>{formatNumber(dashboardData?.dashboardStats.levels[0]?.members_count || 0)}</b></div>
                      <div><i className="dot orange" />Level 2 Referrals <b>{formatNumber(dashboardData?.dashboardStats.levels[1]?.members_count || 0)}</b></div>
                      <div><i className="dot purple" />Level 3 Referrals <b>{formatNumber(dashboardData?.dashboardStats.levels[2]?.members_count || 0)}</b></div>
                    </div>
                    <div className="network-graphic">
                      <span>♙</span>
                      <div><span>♙</span><span>♙</span><span>♙</span></div>
                    </div>
                  </div>
                </section>

                <section className="panel notifications-panel">
                  <div className="panel-heading">
                    <h2 className="text-black">Notifications</h2>
                    <button className="text-link">View All <Arrow /></button>
                  </div>

                  {recentActivities.length > 0 ? recentActivities.map((activity) => (
                    <Notification
                      key={`${activity.type}-${activity.timestamp}`}
                      icon={activity.type === "withdrawal_requested" ? "⇩" : activity.type === "member_joined" ? "♙" : "⇧"}
                      tone={activity.type === "withdrawal_requested" ? "red" : activity.type === "member_joined" ? "green" : "blue"}
                      title={getActivityTitle(activity.type)}
                      text={activity.description}
                      time={formatRelativeTime(activity.timestamp, currentTime)}
                    />
                  )) : <div className="empty-state">No recent activity</div>}
                </section>
              </aside>
            </section>
          </div>
      </div>
    </>
  );
}

const styles = `
  * { box-sizing: border-box; }
  :root {
    font-family: Arial, sans-serif;
    color: #171717;
    background: #f7f7f6;
  }
  body { margin: 0; background: #f7f7f6; }
  button, input { font: inherit; }
  button { cursor: pointer; }

  .content { padding: 20px 30px 24px; max-width: 1900px; margin: auto; }
  .dashboard-grid { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 18px; }
  .left-column { min-width: 0; display: grid; gap: 16px; align-content: start; }
  .right-column { display: grid; gap: 16px; align-content: start; }

  .stats-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
  .stat-card, .panel, .financial-card {
    background: #fff;
    border: 1px solid #e8e8e6;
    border-radius: 10px;
    box-shadow: 0 1px 2px rgba(0,0,0,.02);
  }
  .stat-card {
    min-height: 122px;
    padding: 17px;
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }
  .icon-bubble {
    flex: 0 0 auto;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 20px;
    font-weight: 600;
  }
  .icon-bubble.yellow { color: #c9a300; background: #fff8dc; }
  .icon-bubble.green { color: #48a53f; background: #ecf9e9; }
  .icon-bubble.blue { color: #3977d5; background: #eef4ff; }
  .icon-bubble.orange { color: #e88939; background: #fff1e5; }
  .icon-bubble.red { color: #ed5a5a; background: #fff0f0; }
  .icon-bubble.purple { color: #8c65d7; background: #f3efff; }

  .stat-copy { min-width: 0; padding-top: 1px; }
  .muted { color: #757575; font-size: 11px; }
  .stat-copy strong { display: block; color: #171717; font-size: 19px; margin-top: 5px; letter-spacing: -.3px; }
  .stat-note { margin-top: 12px; font-size: 11px; color: #777; }
  .stat-note.positive { color: #49aa48; }
  .stat-note.warning { color: #e98b42; }

  .panel { padding: 15px 14px; }
  .panel-heading { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 14px; }
  .panel-heading h2, .rewards h2 { color: #000000; font-size: 14px; margin: 0; letter-spacing: -.15px; }
  .text-link { border: 0; background: transparent; color: #444; font-size: 11px; white-space: nowrap; padding: 2px; }
  .arrow { font-size: 17px; vertical-align: -1px; margin-left: 4px; }

  .financial-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
  .financial-card { padding: 15px 14px 13px; border-radius: 9px; }
  .financial-top { display: flex; align-items: center; gap: 10px; }
  .financial-top .icon-bubble { width: 40px; height: 40px; font-size: 18px; }
  .financial-top strong { display: block; color: #171717; font-size: 16px; margin-top: 3px; }
  .financial-subtitle { color: #888; font-size: 10px; margin: 9px 0 13px; min-height: 12px; }
  .gold-button {
    border: 0;
    background: #e8bd00;
    color: #fff;
    border-radius: 6px;
    width: 100%;
    height: 31px;
    font-size: 11px;
    font-weight: 700;
  }

  .lower-grid { display: grid; grid-template-columns: 0.75fr 1.25fr; gap: 16px; }
  .levels-panel, .members-panel { min-width: 0; }
  .level-row { display: grid; grid-template-columns: 40px 1fr 35px; gap: 9px; align-items: center; padding: 10px 0; border-top: 1px solid #f0f0ee; }
  .level-row:first-of-type { border-top: 0; padding-top: 2px; }
  .level-row .icon-bubble { width: 38px; height: 38px; font-size: 17px; }
  .level-info { min-width: 0; }
  .level-info strong { display: block; color: #171717; font-size: 11px; }
  .level-info span { display: block; font-size: 10px; color: #555; margin-top: 2px; }
  .progress { height: 7px; background: #eee; border-radius: 20px; margin-top: 7px; overflow: hidden; }
  .progress i { display: block; height: 100%; border-radius: inherit; background: #e6bd00; }
  .percentage { color: #777; font-size: 10px; text-align: right; }

  .table-search { display: none; }
  .members-table { width: 100%; overflow: hidden; }
  .table-head, .table-row {
    display: grid;
    grid-template-columns: 1.25fr 1.1fr .75fr .8fr .7fr 15px;
    gap: 8px;
    align-items: center;
  }
  .table-head { padding: 2px 0 9px; color: #666; font-size: 10px; }
  .table-row { min-height: 38px; border-top: 1px solid #f0f0ef; font-size: 10px; color: #313131; }
  .table-row > * { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .table-row .member-cell { overflow: hidden; }
  .table-row .member-cell > span:last-child { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .member-cell { display: flex; align-items: center; gap: 7px; font-weight: 500; }
  .member-avatar { width: 24px; height: 24px; border-radius: 50%; display: grid; place-items: center; background: #e9ecef; color: #39414b; font-size: 8px; font-weight: 800; }
  .status { display: inline-flex; padding: 6px 9px; border-radius: 5px; font-size: 10px; }
  .status.active { color: #479e47; background: #ecf8ea; }
  .status.pending { color: #c39500; background: #fff7dc; }
  .status.suspended { color: #e46666; background: #fff0f0; }
  .more { border: 0; background: transparent; font-size: 16px; color: #666; padding: 0; }

  .rewards {
    color: #000000;
    border-radius: 10px;
    padding: 15px 18px;
    background: linear-gradient(115deg, #171819, #262728);
    border: 1px solid #151515;
  }
  .rewards-heading { display: flex; align-items: center; justify-content: space-between; gap: 15px; }
  .rewards h2 { color: #ffff; font-size: 14px; }
  .rewards p { color: #bbb; font-size: 10px; margin: 4px 0 0; }
  .rewards .primary-button { min-height: 31px; font-size: 11px; padding: 0 13px; }
  .reward-grid { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 14px; }
  .reward { position: relative; min-height: 68px; display: grid; grid-template-columns: 30px 92px 1fr; align-items: center; gap: 7px; padding: 5px 13px; }
  .reward + .reward { border-left: 1px solid #686868; }
  .rank { width: 27px; height: 27px; border-radius: 50%; background: #e5b900; color: #000000; display: grid; place-items: center; font-size: 11px; font-weight: 800; align-self: start; }
  .reward:nth-child(2) .rank { background: #ee9138; }
  .reward:nth-child(3) .rank { background: #8a5ed0; }
  .reward-art {  color: #ccc; font-size: 48px; text-align: center; filter: drop-shadow(0 5px 4px rgba(0,0,0,.45)); }
  .reward-copy span, .reward-copy strong, .reward-copy small { display: block; }
  .reward-copy span { color: #ccc; font-size: 10px; color: #d2d2d2; }
  .reward-copy strong {  color: #ccc; font-size: 11px; margin-top: 2px; }
  .reward-copy small { color: #ccc; font-size: 10px; margin-top: 5px; }

  .action-row { display: grid; grid-template-columns: 38px 1fr auto; gap: 9px; align-items: center; padding: 10px 0; border-top: 1px solid #f0f0ee; }
  .action-row:first-of-type { border-top: 0; }
  .action-row .icon-bubble { width: 36px; height: 36px; font-size: 17px; }
  .action-row strong, .action-row span { display: block; }
  .action-row strong { color: #171717; font-size: 11px; }
  .action-row span { color: #555; font-size: 10px; margin-top: 3px; }
  .review-button { border: 0; background: #fff8dc; color: #444; border-radius: 5px; min-width: 68px; height: 28px; font-size: 10px; }
  .review-button .arrow { font-size: 13px; }

  .network-total {  color: #000000; font-size: 20px; font-weight: 700; margin: 5px 0 13px; }
  .network-body { color: #000000;display: grid; grid-template-columns: 1fr 88px; gap: 5px; align-items: center; }
  .network-list { color: #000000;display: grid; gap: 10px; }
  .network-list div { display: grid; grid-template-columns: 9px 1fr auto; gap: 6px; align-items: center; font-size: 10px; }
  .network-list b { font-weight: 500; }
  .dot { width: 7px; height: 7px; border-radius: 50%; display: block; }
  .dot.yellow { background: #dfb800; }
  .dot.orange { background: #f08c2d; }
  .dot.purple { background: #8b62ce; }
  .network-graphic {
    width: 80px; height: 80px; border-radius: 50%;
    background: #f5f8fd; color: #5e83d0;
    display: grid; place-items: center;
    font-size: 25px;
  }
  .network-graphic div { margin-top: -12px; display: flex; gap: 5px; font-size: 18px; }

  .notification-row { display: grid; grid-template-columns: 36px 1fr auto; gap: 9px; align-items: start; padding: 10px 0; border-top: 1px solid #f0f0ee; }
  .notification-row:first-of-type { border-top: 0; }
  .notification-row .icon-bubble { width: 34px; height: 34px; font-size: 15px; }
  .notification-copy strong, .notification-copy span { display: block; }
  .notification-copy strong { color: #171717; font-size: 10px; }
  .notification-copy span { font-size: 9px; color: #777; margin-top: 4px; line-height: 1.35; }
  .notification-row small { color: #888; font-size: 9px; white-space: nowrap; }

  @media (max-width: 1280px) {
    .content { padding: 16px; }
    .dashboard-grid { grid-template-columns: minmax(0, 1fr) 290px; }
    .stats-grid, .financial-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 1000px) {
    .dashboard-grid { grid-template-columns: 1fr; }
    .right-column { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .lower-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 760px) {
    .content { padding: 12px; }
    .stats-grid, .financial-grid, .right-column { grid-template-columns: 1fr; }
    .reward-grid { grid-template-columns: 1fr; }
    .reward + .reward { border-left: 0; border-top: 1px solid #555; }
    .reward { padding: 9px; }
    .table-head { display: none; }
    .table-row { grid-template-columns: 1.1fr 1fr .7fr; padding: 7px 0; }
    .table-row > :nth-child(2), .table-row > :nth-child(4), .table-row > :nth-child(5) { display: none; }
    .table-search { display: block; margin: -2px 0 8px; }
    .table-search input { width: 100%; height: 32px; border: 1px solid #e4e4e4; border-radius: 6px; padding: 0 9px; outline: none; font-size: 11px; }
    .table-search input:focus { border-color: #dcb500; }
  }

  /* Members Review Styles */
  .members-review-container { padding: 20px 0; }
  .members-review-header { margin-bottom: 24px; }
  .members-review-header h2 {  color: #000000; margin: 0 0 4px; font-size: 25px; }
  .members-review-header p { margin: 0; color: #666; font-size: 13px; }

  .members-list-view { display: grid; gap: 16px; }
  .search-bar { display: flex; justify-content: center; margin-bottom: 8px; }
  .search-input {
    width: 100%;
    max-width: 600px;
    height: 42px;
    padding: 0 16px;
    border: 1px solid #e4e4e4;
    border-radius: 8px;
    font-size: 13px;
    outline: none;
  }
  .search-input:focus { border-color: #dcb500; box-shadow: 0 0 0 3px rgba(220, 181, 0, .1); }

  .members-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
  }

  .member-card {
    background: #fff;
    border: 1px solid #e8e8e6;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    transition: all .2s ease;
  }
  .member-card:hover { box-shadow: 0 8px 20px rgba(0,0,0,.08); transform: translateY(-2px); }

  .member-card-header {
    padding: 16px;
    display: grid;
    grid-template-columns: 48px 1fr auto;
    gap: 12px;
    align-items: center;
    border-bottom: 1px solid #f0f0ee;
  }

  .member-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: #e8bd00;
    color: #fff;
    font-size: 16px;
    font-weight: 800;
  }

  .member-card-info { display: grid; gap: 4px; }
  .member-card-info h4 { margin: 0; font-size: 13px; }
  .member-id-small { color: #777; font-size: 10px; margin: 0; }

  .days-badge {
    background: #fff8dc;
    color: #c39500;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 9px;
    font-weight: 700;
  }

  .member-card-body {
    padding: 12px 16px;
    display: grid;
    gap: 8px;
  }

  .info-item {
    display: grid;
    gap: 3px;
  }

  .info-item .label {
    display: block;
    color: #999;
    font-size: 9px;
    text-transform: uppercase;
  }

  .info-item .value {
    display: block;
    color: #333;
    font-size: 11px;
  }

  .member-card-footer {
    padding: 12px 16px;
    border-top: 1px solid #f0f0ee;
  }

  .view-button {
    border: 0;
    background: #fff8dc;
    color: #444;
    padding: 8px 12px;
    border-radius: 5px;
    font-size: 10px;
    font-weight: 700;
    width: 100%;
    cursor: pointer;
  }
  .view-button:hover { background: #fff0c7; }

  /* Member Detail Review */
  .member-detail-review { display: grid; gap: 16px; }

  .back-button {
    border: 0;
    background: transparent;
    color: #666;
    font-size: 12px;
    padding: 8px 0;
    text-align: left;
    cursor: pointer;
  }
  .back-button:hover { color: #333; }

  .review-panel {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 20px;
  }

  .review-left { display: grid; gap: 16px; }

  .member-detail-card {
    background: #fff;
    border: 1px solid #e8e8e6;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
  }

  .member-avatar-large {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: #e8bd00;
    color: #fff;
    font-size: 36px;
    font-weight: 800;
    margin: 0 auto 12px;
  }

  .member-detail-card h3 { margin: 0 0 4px; font-size: 18px; }
  .member-detail-card .member-id { margin: 0; color: #777; font-size: 11px; }
  .member-detail-card .status-label { margin: 8px 0 0; display: block; font-size: 10px; }
  .member-detail-card .days-pending { margin: 6px 0 0; color: #c39500; font-size: 10px; font-weight: 700; }

  .member-info-section {
    background: #fff;
    border: 1px solid #e8e8e6;
    border-radius: 10px;
    padding: 16px;
  }

  .member-info-section h4 { margin: 0 0 12px; font-size: 11px; text-transform: uppercase; letter-spacing: .5px; color: #666; }

  .info-row {
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 12px;
    padding: 8px 0;
    border-bottom: 1px solid #f5f5f3;
  }

  .info-row:last-child { border-bottom: 0; }

  .info-row .label {
    color: #888;
    font-size: 10px;
    font-weight: 600;
  }

  .info-row .value {
    color: #333;
    font-size: 11px;
  }

  .review-right { display: grid; gap: 16px; }

  .review-actions-card {
    background: #fff;
    border: 1px solid #e8e8e6;
    border-radius: 10px;
    padding: 16px;
    position: sticky;
    top: 80px;
  }

  .review-actions-card h4 { margin: 0 0 16px; font-size: 12px; }

  .action-group {
    display: grid;
    gap: 8px;
    margin-bottom: 16px;
  }

  .action-group label {
    font-size: 10px;
    font-weight: 600;
    color: #666;
    text-transform: uppercase;
  }

  .review-select, .review-textarea {
    border: 1px solid #e4e4e4;
    border-radius: 6px;
    padding: 8px 10px;
    font-size: 10px;
    outline: none;
    font-family: inherit;
  }

  .review-select:focus, .review-textarea:focus {
    border-color: #dcb500;
    box-shadow: 0 0 0 3px rgba(220, 181, 0, .1);
  }

  .review-textarea {
    resize: vertical;
    line-height: 1.4;
  }

  .review-buttons {
    display: grid;
    gap: 8px;
  }

  .button-approve, .button-reject {
    border: 0;
    padding: 10px 12px;
    border-radius: 6px;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
    transition: all .2s ease;
  }

  .button-approve {
    background: #ecf8ea;
    color: #479e47;
  }

  .button-approve:hover:not(:disabled) { background: #dcf0d8; }
  .button-approve:disabled { opacity: .5; cursor: not-allowed; }

  .button-reject {
    background: #fff0f0;
    color: #e46666;
  }

  .button-reject:hover:not(:disabled) { background: #ffe6e6; }
  .button-reject:disabled { opacity: .5; cursor: not-allowed; }

  @media (max-width: 1200px) {
    .review-panel { grid-template-columns: 1fr; }
    .review-actions-card { position: static; }
  }

  @media (max-width: 900px) {
    .members-grid { grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); }
  }

  @media (max-width: 600px) {
    .members-grid { grid-template-columns: 1fr; }
  }
`;

