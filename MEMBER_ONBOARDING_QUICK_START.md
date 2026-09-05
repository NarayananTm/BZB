# Member Onboarding Workflow - Quick Start Guide

## What's Been Implemented

Your complete member onboarding workflow is now ready! Here's what happens:

### 🎯 User Journey
1. **User clicks "Add Member"** → Opens multi-step form
2. **User fills 3 steps** → Basic Info → Personal Details → Bank Details
3. **User submits** → Request saved to database
4. **Admin reviews** → Can view all pending requests
5. **Admin approves** → Member created, SMS sent with credentials
6. **User logs in** → Access dashboard with referral info tracked

---

## Getting Started (3 Steps)

### Step 1: Update Database
Run this SQL to create the member_requests table:

```bash
psql -U your_user -d your_db -f database/migration_add_member_requests.sql
```

Or copy & paste the SQL from: `database/migration_add_member_requests.sql`

### Step 2: Configure SMS Service
Edit `src/lib/smsService.ts` and replace the SMS provider:

```typescript
// Currently it just logs to console
// Replace with Twilio, AWS SNS, or your SMS provider
```

### Step 3: (Optional) Add Environment Variables
If using SMS provider that needs credentials:

```bash
TWILIO_ACCOUNT_SID=xxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_PHONE_NUMBER=xxx
```

---

## Key Files

| File | Purpose |
|------|---------|
| `src/app/admin/add-member/page.tsx` | Main page for adding members |
| `src/components/admin/AddMemberForm.tsx` | 3-step form component |
| `src/components/admin/AddMemberModal.tsx` | Modal wrapper |
| `src/components/admin/PendingRequestsCard.tsx` | Admin dashboard for requests |
| `src/services/memberRequestService.ts` | Database operations |
| `src/lib/smsService.ts` | SMS sending logic |
| `src/app/api/member/request/route.ts` | Submit request API |
| `src/app/api/admin/member-requests/route.ts` | Get requests API |
| `src/app/api/admin/member-requests/approve/route.ts` | Approve API |
| `src/app/api/admin/member-requests/reject/route.ts` | Reject API |

---

## How to Use

### For Users (adding members):
1. Go to `/admin` dashboard
2. Click **"Add Member"** button (top right)
3. Fill form across 3 steps:
   - Step 1: Name, Email, Mobile, Sponsor
   - Step 2: DOB, Gender, Address, State, Nominee
   - Step 3: Bank details, PAN, UPI
4. Click **"Submit"** → Success message appears
5. Wait for admin approval
6. Receive SMS with login credentials

### For Admins (approving requests):
1. Go to `/admin/add-member`
2. See "Pending Requests" table
3. Click buttons:
   - 👁️ **View** - See full details
   - ✅ **Approve** - Create member, send SMS
   - ❌ **Reject** - Send rejection reason via SMS
4. Member records auto-created on approval
5. SMS sent automatically with credentials

---

## What Happens Behind the Scenes

### On User Submit:
- Request saved to `member_requests` table
- Validation checks for duplicate email/mobile
- Unique request ID generated (REQ-XXXXX)

### On Admin Approval:
1. ✅ Creates new `members` record with:
   - Unique Member ID (BZB-XXXXX)
   - Generated password
   - Status set to "Active"
   - Joining date = today
   
2. ✅ Creates `referrals` record linking sponsor → member

3. ✅ Sends SMS with:
   ```
   Welcome to BZB!
   User ID: BZB12345
   Password: PWD123ABC
   Login at: [your-url]
   ```

4. ✅ Updates request status to "Approved"

### On Admin Rejection:
- Sends SMS: "Your request was rejected"
- Includes rejection reason (if provided)
- Updates request status to "Rejected"

---

## Features

| Feature | Details |
|---------|---------|
| **Multi-Step Form** | Organized 3-step process for better UX |
| **Validation** | Email, phone, bank details validated |
| **SMS Alerts** | Credentials & approvals sent automatically |
| **Referral Tracking** | Sponsor info auto-captured & linked |
| **Admin Dashboard** | View, approve, reject all in one place |
| **Secure** | Super admin role required for approvals |
| **Database Indexed** | Fast queries for status, email, mobile |
| **Error Handling** | Clear error messages at every step |

---

## Testing Without SMS

If you don't have SMS configured yet:

1. The form still works end-to-end
2. Check console/logs to see what SMS would be sent
3. In `smsService.ts`, currently it logs to console:
   ```
   📱 SMS to 9876543210: Welcome to BZB...
   ```

Once you configure a real SMS provider, it will send actual SMS automatically.

---

## API Endpoints Summary

```
POST   /api/member/request                    → User submits request
GET    /api/admin/member-requests             → Admin views requests
PUT    /api/admin/member-requests             → Admin updates request
POST   /api/admin/member-requests/approve     → Admin approves
POST   /api/admin/member-requests/reject      → Admin rejects
```

---

## Security Notes

- ✅ Super admin role required for approve/reject
- ✅ Passwords auto-generated and hashed
- ✅ Database queries parameterized (SQL injection safe)
- ✅ Input validation on all forms
- ✅ Admin auth verification on all endpoints

---

## Next Steps

1. **Run database migration** (required)
2. **Configure SMS** (optional but recommended)
3. **Test the workflow**:
   - Go to `/admin/add-member`
   - Submit a test request
   - Approve it as superadmin
   - Check console/SMS

---

## Troubleshooting

### Page not found (404)
- ✅ Files created at: `src/app/admin/add-member/page.tsx`
- Clear Next.js cache: `rm -rf .next && npm run dev`

### Form not submitting
- Check browser console for errors
- Verify API endpoint is working
- Check auth token is valid

### SMS not received
- Verify SMS service configured
- Check phone number format (should include country code)
- Check SMS provider account has credits

### Request not appearing in admin list
- Verify database migration ran
- Check `member_requests` table exists
- Make sure you're logged in as admin/superadmin
- Check status filter is set to "Pending"

---

## Support Docs

For more detailed information, see: `MEMBER_ONBOARDING_SETUP.md`

---

**Ready to go!** 🚀 Click "Add Member" on your admin dashboard to get started.
