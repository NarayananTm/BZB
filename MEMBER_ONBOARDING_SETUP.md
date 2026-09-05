# Member Onboarding Workflow - Setup Guide

## Overview

This document explains the complete member onboarding workflow implemented for the BZB platform. The system allows users to request membership through a multi-step form, which is then reviewed by admins and can be approved to automatically send SMS credentials.

## Workflow Steps

### 1. User Submits Member Request
- User clicks "Add Member" button on the admin dashboard
- Opens `/admin/add-member` page with modal form
- Form has 3 steps:
  - **Step 1: Basic Info** (Name, Email, Mobile, Sponsor)
  - **Step 2: Personal Details** (DOB, Gender, Address, District, State, Nominee)
  - **Step 3: Bank Details** (Bank Name, Account, IFSC, PAN, UPI)
- User submits the form

### 2. Request Stored in Database
- Request saved to `member_requests` table with status "Submitted"
- Stored fields include all personal, banking, and referral information
- Request gets unique ID (REQ-XXXXX format)

### 3. Admin Reviews Pending Requests
- Admin can view all pending requests at `/admin/add-member`
- Dashboard displays:
  - All pending member requests
  - Request details (name, email, mobile, sponsor)
  - Submission date
  - Action buttons (View, Approve, Reject)

### 4. Admin Approves/Rejects Request
- Admin clicks approve or reject button
- If rejecting, can provide reason (sent via SMS)
- Super admin role required for approval/rejection

### 5. Automatic SMS Credentials Sent
- Upon approval, system:
  - Generates unique Member ID (BZB-XXXXX format)
  - Creates temporary password
  - Creates new member record in `members` table
  - Creates referral record linking to sponsor (if applicable)
  - Sends SMS with login credentials to mobile number
- If rejected, sends rejection notification SMS

### 6. Member Logs In
- Member receives SMS with:
  - User ID
  - Temporary Password
  - Login URL
- Member can log in and access dashboard
- Member's referral is already tracked in system

## Files Created/Modified

### New Files

#### 1. **Services**
- `src/lib/smsService.ts` - SMS integration service
- `src/services/memberRequestService.ts` - Database operations for member requests

#### 2. **API Routes**
- `src/app/api/member/request/route.ts` - Submit member request
- `src/app/api/admin/member-requests/route.ts` - Get/update member requests (admin)
- `src/app/api/admin/member-requests/approve/route.ts` - Approve request
- `src/app/api/admin/member-requests/reject/route.ts` - Reject request

#### 3. **Components**
- `src/components/admin/AddMemberForm.tsx` - Multi-step form component
- `src/components/admin/AddMemberModal.tsx` - Modal wrapper for form
- `src/components/admin/PendingRequestsCard.tsx` - Admin dashboard for requests

#### 4. **Pages**
- `src/app/admin/add-member/page.tsx` - Main add member page

#### 5. **Database**
- `database/migration_add_member_requests.sql` - Schema for member_requests table

### Modified Files
- `src/app/admin/page.tsx` - Updated "Add Member" button to link to new page

## Database Schema

### member_requests Table

```sql
CREATE TABLE member_requests (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  sponsor_id VARCHAR(50) REFERENCES members(id),
  sponsor_name VARCHAR(255),
  date_of_birth DATE,
  gender VARCHAR(20),
  address TEXT,
  district VARCHAR(100),
  pincode VARCHAR(20),
  state VARCHAR(100),
  nominee_name VARCHAR(255),
  nominee_relation VARCHAR(100),
  bank_name VARCHAR(255),
  bank_account_no VARCHAR(50),
  bank_account_holder VARCHAR(255),
  ifsc_code VARCHAR(20),
  pan VARCHAR(20),
  g_pay VARCHAR(100),
  status VARCHAR(20) NOT NULL DEFAULT 'Pending',
  rejection_reason TEXT,
  submitted_by_admin_id VARCHAR(50),
  approved_by_admin_id VARCHAR(50),
  submitted_date TIMESTAMPTZ NOT NULL,
  approved_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
)
```

## Setup Instructions

### 1. Apply Database Migration

Run the migration SQL to create the member_requests table:

```bash
# Using psql
psql -U username -d database_name -f database/migration_add_member_requests.sql
```

Or run the SQL manually through your database management tool.

### 2. Configure SMS Service

Edit `src/lib/smsService.ts` to integrate with your SMS provider:

#### Option A: Twilio
```typescript
import { Twilio } from 'twilio';

export async function sendSMS(phoneNumber: string, message: string) {
  const client = new Twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  
  const response = await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  });
  
  return { success: true, messageId: response.sid };
}
```

#### Option B: AWS SNS
```typescript
import AWS from 'aws-sdk';

export async function sendSMS(phoneNumber: string, message: string) {
  const sns = new AWS.SNS();
  const response = await sns.publish({
    Message: message,
    PhoneNumber: phoneNumber,
  }).promise();
  
  return { success: true, messageId: response.MessageId };
}
```

#### Option C: Local Service (e.g., AWS Pinpoint, Firebase)
Implement your preferred service similarly.

### 3. Set Environment Variables

Add to `.env.local`:

```bash
# For Twilio
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# For AWS SNS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
```

### 4. Test the Workflow

1. Navigate to admin dashboard
2. Click "Add Member" button
3. Fill in form across 3 steps
4. Submit the request
5. Admin views pending requests at `/admin/add-member`
6. Admin clicks approve
7. Member receives SMS with credentials

## API Endpoints

### Submit Member Request
```
POST /api/member/request
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "9876543210",
  "sponsor_id": "BZB12345",
  "sponsor_name": "Jane Doe",
  "date_of_birth": "1990-01-01",
  "gender": "Male",
  "address": "123 Main St",
  ...
}

Response: { success: true, data: { id: "REQ-XXXXX", ... } }
```

### Get Pending Requests (Admin)
```
GET /api/admin/member-requests?status=Pending&page=1&limit=50
Headers: Authorization: Bearer {admin_token}

Response: { 
  success: true, 
  data: [ { id, name, email, ... } ], 
  pagination: { total, page, pages }
}
```

### Approve Request (Super Admin)
```
POST /api/admin/member-requests/approve
Headers: Authorization: Bearer {superadmin_token}
Content-Type: application/json

{
  "requestId": "REQ-XXXXX"
}

Response: { 
  success: true, 
  data: { member, request, smsSent }
}
```

### Reject Request (Super Admin)
```
POST /api/admin/member-requests/reject
Headers: Authorization: Bearer {superadmin_token}
Content-Type: application/json

{
  "requestId": "REQ-XXXXX",
  "reason": "Documents incomplete"
}

Response: { 
  success: true,
  data: { request, smsSent }
}
```

## Key Features

✅ **Multi-Step Form** - Users fill info across 3 organized steps
✅ **Validation** - Client and server-side validation of all fields
✅ **SMS Integration** - Automated SMS with credentials upon approval
✅ **Referral Tracking** - Automatically creates referral link when member is approved
✅ **Admin Dashboard** - View, approve, and reject pending requests
✅ **Audit Trail** - Track who approved/rejected and when
✅ **Error Handling** - Comprehensive error messages
✅ **Security** - Super admin role restriction for approvals
✅ **Database Indexed** - Fast queries on status, email, mobile

## User Experience Flow

1. **User Side:**
   - Click "Add Member" on dashboard
   - Fill form (3 steps, ~2 minutes)
   - Submit and see success message
   - Receive SMS when approved

2. **Admin Side:**
   - Navigate to add-member page
   - View pending requests in table
   - Click "View" to see full details
   - Click "Approve" or "Reject"
   - System sends SMS automatically

## Troubleshooting

### SMS Not Sending
1. Check `src/lib/smsService.ts` configuration
2. Verify environment variables are set
3. Check SMS provider account (credits, phone number format)
4. Check console logs for error messages

### Member Request Not Appearing
1. Verify database migration ran successfully
2. Check that status filter is set to "Pending"
3. Verify admin is logged in with correct role
4. Check browser console for API errors

### Password Generation Issues
1. Ensure `idGenerator` utility is working
2. Check bcryptjs package is installed
3. Verify environment variables for encryption

## Future Enhancements

- [ ] Add email notifications alongside SMS
- [ ] Implement KYC document verification
- [ ] Add bulk approval/rejection
- [ ] Create member request status history
- [ ] Add payment verification before approval
- [ ] Implement tier-based activation (basic, premium, VIP)
- [ ] Add auto-rejection rules based on criteria
- [ ] Create approval analytics dashboard

## Support & Customization

For further customization or issues:
1. Review component props in `AddMemberForm.tsx`
2. Modify API validation in route handlers
3. Adjust SMS message templates in `smsService.ts`
4. Update database schema as needed

---

**Last Updated:** 2026-09-05
**Version:** 1.0.0
