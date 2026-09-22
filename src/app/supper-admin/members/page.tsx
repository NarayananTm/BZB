import { getAllMembers } from '@/services/memberService';
import MembersTable from '../components/MembersTable';

export const dynamic = 'force-dynamic';

function formatMemberDate(value: string | null | undefined) {
  if (!value) return 'Recently';
  const datePart = String(value).slice(0, 10);
  const [year, month, day] = datePart.split('-');
  return year && month && day ? `${day}/${month}/${year}` : 'Recently';
}

export default async function SuperAdminMembersPage() {
  const members = await getAllMembers();
  const activeCount = members.filter((member) => member.status === 'Active').length;
  const pendingCount = members.filter((member) => member.status === 'Pending').length;

  const tableMembers = members.map((member) => ({
    id: member.id,
    name: member.name,
    email: member.email,
    level: member.level_name,
    status: member.status === 'Active' || member.status === 'Pending'
      ? member.status
      : member.status === 'Approved'
        ? 'Active'
        : 'Suspended' as 'Active' | 'Pending' | 'Suspended',
    joined: formatMemberDate(member.joining_date),
    avatar: member.avatar || undefined,
  }));

  return (
    <div style={{ padding: '32px', background: '#f8f9fb', minHeight: '100%' }}>
      <style>{`
        .members-summary {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .members-summary-card {
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: white;
        }

        .members-summary-label {
          color: #6b7280;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .members-summary-value {
          margin-top: 8px;
          color: #111827;
          font-size: 28px;
          font-weight: 700;
        }

        .members-list {
          background: white;
          border-radius: 8px;
          padding: 20px;
          border: 1px solid #e5e7eb;
        }

        .members-list h2 {
          margin: 0 0 4px;
          color: #111827;
          font-size: 20px;
        }

        .members-list p {
          margin: 0 0 20px;
          color: #6b7280;
          font-size: 13px;
        }

        @media (max-width: 768px) {
          .members-summary {
            grid-template-columns: 1fr;
          }

          .members-list,
          .members-page {
            padding: 16px;
          }
        }
      `}</style>

      <div className="members-summary">
        <div className="members-summary-card">
          <div className="members-summary-label">Total Members</div>
          <div className="members-summary-value">{members.length}</div>
        </div>
        <div className="members-summary-card">
          <div className="members-summary-label">Active Members</div>
          <div className="members-summary-value">{activeCount}</div>
        </div>
        <div className="members-summary-card">
          <div className="members-summary-label">Pending Approvals</div>
          <div className="members-summary-value">{pendingCount}</div>
        </div>
      </div>

      <section className="members-list">
        <h2>All Members</h2>
        <p>View all registered members and their current status.</p>
        <MembersTable members={tableMembers} search="" />
      </section>
    </div>
  );
}
