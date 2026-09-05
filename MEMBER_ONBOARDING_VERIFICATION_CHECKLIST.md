# Member Onboarding - Verification Checklist

## ✅ Pre-Deployment Checklist

### Database Setup
- [ ] Run migration SQL
  ```bash
  psql -U username -d database -f database/migration_add_member_requests.sql
  ```
- [ ] Verify `member_requests` table exists
  ```sql
  SELECT * FROM member_requests LIMIT 1;
  ```
- [ ] Check indexes are created
  ```sql
  \di member_requests*
  ```

### Files Verification
- [ ] File: `src/lib/smsService.ts` exists
- [ ] File: `src/services/memberRequestService.ts` exists
- [ ] File: `src/components/admin/AddMemberForm.tsx` exists
- [ ] File: `src/components/admin/AddMemberModal.tsx` exists
- [ ] File: `src/components/admin/PendingRequestsCard.tsx` exists
- [ ] File: `src/app/admin/add-member/page.tsx` exists
- [ ] File: `src/app/api/member/request/route.ts` exists
- [ ] File: `src/app/api/admin/member-requests/route.ts` exists
- [ ] File: `src/app/api/admin/member-requests/approve/route.ts` exists
- [ ] File: `src/app/api/admin/member-requests/reject/route.ts` exists

### Code Verification
- [ ] `src/app/admin/page.tsx` imports `Link` from `next/link`
- [ ] "Add Member" button links to `/admin/add-member`
- [ ] `AddMemberForm.tsx` has proper validation
- [ ] API routes have auth checks
- [ ] SMS service is configured

### Dependencies
- [ ] `bcryptjs` installed (for password hashing)
- [ ] `sonner` installed (for toast notifications)
- [ ] `lucide-react` installed (for icons)

---

## 🧪 Testing Checklist

### Test 1: Form Submission
**Purpose:** Verify user can submit member request
- [ ] Navigate to `/admin/add-member`
- [ ] Click "Add Member" button
- [ ] Fill Step 1:
  - [ ] Enter name: "Test User"
  - [ ] Enter email: "test@example.com"
  - [ ] Enter mobile: "9876543210"
  - [ ] Click "Next"
- [ ] Fill Step 2:
  - [ ] Select DOB
  - [ ] Select gender
  - [ ] Enter address
  - [ ] Click "Next"
- [ ] Fill Step 3:
  - [ ] Enter bank name
  - [ ] Enter account number
  - [ ] Enter IFSC code
  - [ ] Click "Submit"
- [ ] Success message appears
- [ ] Modal closes after 2 seconds
- [ ] Check database:
  ```sql
  SELECT * FROM member_requests WHERE email = 'test@example.com';
  ```
- [ ] Verify record exists with status "Submitted"

### Test 2: Validation
**Purpose:** Verify form validation works
- [ ] Try submit without name → Error: "Name is required"
- [ ] Try submit with invalid email → Error: "Invalid email format"
- [ ] Try submit with short phone → Error: "Must be 10+ digits"
- [ ] Try submit with short password → Error shows (if required)

### Test 3: Duplicate Check
**Purpose:** Verify duplicate email prevention
- [ ] Submit form with email "test@example.com"
- [ ] Try submit again with same email
- [ ] Error message appears: "Email already pending"
- [ ] Check database shows only 1 record

### Test 4: Admin Dashboard
**Purpose:** Verify admin can see pending requests
- [ ] Log in as admin (superadmin role)
- [ ] Navigate to `/admin/add-member`
- [ ] Verify "Pending Requests" card shows:
  - [ ] Count badge displays correct number
  - [ ] Table shows pending requests
  - [ ] Columns: Name, Email, Mobile, Sponsor, Date, Actions
  - [ ] Action buttons visible: View (👁), Approve (✅), Reject (❌)

### Test 5: View Request Details
**Purpose:** Verify admin can see full request details
- [ ] Click "View" (👁) button on any request
- [ ] Modal opens showing:
  - [ ] Basic information section
  - [ ] Personal details section
  - [ ] Bank details section
  - [ ] Close button works
  - [ ] Approve/Reject buttons present

### Test 6: Approve Request
**Purpose:** Verify member creation on approval
- [ ] Click "Approve" button (✅)
- [ ] Wait for processing
- [ ] Success message: "Member approved and credentials sent"
- [ ] Request disappears from table
- [ ] Check database - member_requests:
  ```sql
  SELECT status, approved_by_admin_id FROM member_requests 
  WHERE email = 'test@example.com';
  ```
  Should show: status="Approved"
- [ ] Check database - members table:
  ```sql
  SELECT * FROM members WHERE email = 'test@example.com';
  ```
  Should show: New member record with status="Active"
- [ ] Check database - referrals table (if sponsor was set):
  ```sql
  SELECT * FROM referrals WHERE member_id = (
    SELECT id FROM members WHERE email = 'test@example.com'
  );
  ```
  Should show: Referral record created

### Test 7: SMS Sending (Development)
**Purpose:** Verify SMS preparation
- [ ] Approve a request
- [ ] Check console/logs for SMS message
- [ ] Should see: `📱 SMS to 9876543210: Welcome to BZB!...`
- [ ] Verify it contains:
  - [ ] Welcome message
  - [ ] User ID (BZB-XXXXX format)
  - [ ] Password
  - [ ] Login URL

### Test 8: Reject Request
**Purpose:** Verify rejection workflow
- [ ] Click "Reject" (❌) button on pending request
- [ ] Modal opens asking for rejection reason
- [ ] Enter reason: "Documents incomplete"
- [ ] Click "Reject" button
- [ ] Success message: "Request rejected and notification sent"
- [ ] Request disappears from pending list
- [ ] Check database:
  ```sql
  SELECT status, rejection_reason FROM member_requests 
  WHERE email = 'rejected@example.com';
  ```
  Should show: status="Rejected", reason="Documents incomplete"
- [ ] Check console for rejection SMS

### Test 9: Database Integrity
**Purpose:** Verify data integrity
- [ ] Count total requests:
  ```sql
  SELECT COUNT(*) FROM member_requests;
  ```
- [ ] Count by status:
  ```sql
  SELECT status, COUNT(*) FROM member_requests GROUP BY status;
  ```
- [ ] Check for orphaned records:
  ```sql
  SELECT * FROM member_requests WHERE sponsor_id IS NOT NULL 
  AND sponsor_id NOT IN (SELECT id FROM members);
  ```
  Should be empty (or 0 results)

---

## 🔍 Common Issues & Fixes

### Issue: Page returns 404
**Solution:**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Issue: Form not submitting
**Solution:**
```bash
# Check console for errors (F12)
# Verify API endpoint returns 200
# Check auth token validity
```

### Issue: Request not appearing in admin list
**Solution:**
```bash
# 1. Verify database migration ran
SELECT * FROM member_requests;

# 2. Check status is "Pending" or "Submitted"
SELECT status FROM member_requests LIMIT 5;

# 3. Verify you're logged in as admin
# 4. Clear browser cache (Ctrl+Shift+Delete)
```

### Issue: SMS not sending
**Solution:**
```typescript
// Check smsService configuration
// Look for console message: 📱 SMS to 9876543210:...

// If not present, check:
// 1. sendSMS function is being called
// 2. Phone number format is correct
// 3. SMS provider credentials (if configured)
```

### Issue: Member not created after approval
**Solution:**
```bash
# Check member_requests table
SELECT * FROM member_requests WHERE status='Approved';

# Check members table
SELECT * FROM members ORDER BY created_at DESC LIMIT 5;

# If member exists but can't log in:
# 1. Check password is hashed correctly
# 2. Verify username/email in login form
```

---

## 📊 Performance Checks

### Database Indexes
- [ ] Verify indexes exist:
  ```sql
  SELECT indexname FROM pg_indexes 
  WHERE tablename = 'member_requests';
  ```
  Should show: idx_member_requests_status, idx_member_requests_email, etc.

### Query Performance
- [ ] Test pending requests query:
  ```sql
  EXPLAIN ANALYZE
  SELECT * FROM member_requests WHERE status = 'Pending' 
  ORDER BY submitted_date DESC LIMIT 50;
  ```
  Should show index usage (not seq scan)

### Load Test
- [ ] Submit 10+ requests in rapid succession
- [ ] Admin dashboard should still load quickly
- [ ] No timeouts or errors

---

## 🔐 Security Checks

### Authentication
- [ ] Non-admin users cannot access `/admin/add-member`
- [ ] Non-superadmin cannot approve/reject requests
- [ ] API routes check auth headers

### Input Validation
- [ ] SQL injection prevention:
  ```
  Try: email = "test@example.com'; DROP TABLE member_requests; --"
  Should: Be rejected or safely escaped
  ```
- [ ] XSS prevention:
  ```
  Try: name = "<script>alert('xss')</script>"
  Should: Be escaped in display
  ```

### Password Security
- [ ] Generated passwords are at least 8 chars
- [ ] Passwords are hashed before storage
- [ ] Original passwords never logged

---

## 📱 SMS Provider Setup

### Twilio Setup
- [ ] Sign up at twilio.com
- [ ] Get Account SID and Auth Token
- [ ] Get Twilio phone number
- [ ] Set environment variables:
  ```bash
  TWILIO_ACCOUNT_SID=your_sid
  TWILIO_AUTH_TOKEN=your_token
  TWILIO_PHONE_NUMBER=+1234567890
  ```
- [ ] Install Twilio package:
  ```bash
  npm install twilio
  ```
- [ ] Update `src/lib/smsService.ts` to use Twilio

### AWS SNS Setup
- [ ] Create AWS account
- [ ] Set up SNS service
- [ ] Create IAM user with SNS permissions
- [ ] Set environment variables:
  ```bash
  AWS_REGION=us-east-1
  AWS_ACCESS_KEY_ID=your_key
  AWS_SECRET_ACCESS_KEY=your_secret
  ```
- [ ] Install AWS SDK:
  ```bash
  npm install aws-sdk
  ```
- [ ] Update `src/lib/smsService.ts` to use AWS SNS

---

## ✅ Final Verification

Run this checklist before going live:

- [ ] All database migrations applied
- [ ] All files created (11 total)
- [ ] All tests passing (9+ tests)
- [ ] No console errors (F12)
- [ ] SMS service configured and tested
- [ ] Admin authentication working
- [ ] Form validation working
- [ ] Database queries performing well
- [ ] Security checks passing
- [ ] Documentation reviewed

---

## 📞 Support Commands

### Check Database Setup
```bash
# Connect to database
psql -U username -d database_name

# Check member_requests table
\d member_requests

# Check members table
\d members

# Check referrals table
\d referrals
```

### Check Application Logs
```bash
# In development (Next.js)
npm run dev

# In production (check your hosting provider)
# Usually in: /var/log/ or service dashboard
```

### Reset Database (Development Only)
```bash
# Drop and recreate tables
psql -U username -d database_name << 'EOF'
DROP TABLE IF EXISTS member_requests CASCADE;
\i database/migration_add_member_requests.sql
EOF
```

---

**Your implementation is complete! Use this checklist to verify everything works correctly.** ✅
