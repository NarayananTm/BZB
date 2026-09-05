# Member Onboarding Workflow - Visual Guide

## Complete Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        MEMBER ONBOARDING WORKFLOW                            │
└─────────────────────────────────────────────────────────────────────────────┘

                              🎯 USER JOURNEY

┌──────────────────┐
│  Admin Dashboard │
│  /admin          │
│                  │
│  Click "Add      │
│  Member" Button  │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────────────────────┐
│  Add Member Modal Opens                          │
│  /admin/add-member (modal)                       │
│                                                  │
│  Progress: [●────────] Step 1 of 3               │
└──────────────────────────────────────────────────┘
         │
         ▼
    ┌─────────────────────────────────────────┐
    │ STEP 1: Basic Information               │
    ├─────────────────────────────────────────┤
    │ • Full Name        (required)            │
    │ • Email            (required, validated)  │
    │ • Mobile Number    (required, 10+ digits)│
    │ • Sponsor Name     (auto-populated)      │
    ├─────────────────────────────────────────┤
    │ [Previous] ──────────────── [Next ➤]    │
    └─────────────────────────────────────────┘
         │
         ▼
    ┌─────────────────────────────────────────┐
    │ STEP 2: Personal Details                │
    ├─────────────────────────────────────────┤
    │ • Date of Birth    (DD/MM/YYYY)         │
    │ • Gender           (M/F/Other)          │
    │ • Address          (full address)       │
    │ • District         (text)               │
    │ • Pincode          (numbers)            │
    │ • State            (text)               │
    │ • Nominee Name     (text)               │
    │ • Nominee Relation (text)               │
    ├─────────────────────────────────────────┤
    │ [➤ Previous] ────────────── [Next ➤]    │
    └─────────────────────────────────────────┘
         │
         ▼
    ┌─────────────────────────────────────────┐
    │ STEP 3: Bank & Payment Details          │
    ├─────────────────────────────────────────┤
    │ • Bank Name        (text)               │
    │ • Account Holder   (text)               │
    │ • Account Number   (9+ digits)          │
    │ • IFSC Code        (text)               │
    │ • PAN              (10 chars)           │
    │ • G-Pay/UPI        (UPI ID)             │
    ├─────────────────────────────────────────┤
    │ [➤ Previous] ──────────── [Submit ✓]    │
    └─────────────────────────────────────────┘
         │
         ▼ (Form submitted)
    ┌─────────────────────────────────────────┐
    │ Success Message                         │
    │ "Request submitted successfully!"       │
    │ Modal closes after 2 seconds            │
    └─────────────────────────────────────────┘

                              📋 ADMIN JOURNEY

    ┌─────────────────────────────────────────┐
    │ Request Stored in Database              │
    │ member_requests table                   │
    │ Status: "Submitted" → "Pending"         │
    │ Assigned unique ID: REQ-XXXXX           │
    └─────────────────────────────────────────┘
         │
         ▼
    ┌────────────────────────────────────────────────────┐
    │ Admin Dashboard                                    │
    │ /admin/add-member (Pending Requests Card)          │
    │                                                    │
    │ ┌────────────────────────────────────────────────┐ │
    │ │ Pending Requests                          [5]  │ │
    │ ├────────────────────────────────────────────────┤ │
    │ │ Name   │ Email        │ Mobile      │ Actions  │ │
    │ ├────────────────────────────────────────────────┤ │
    │ │ John   │ john@ex.com  │ 9876543210  │👁✅❌   │ │
    │ │ Jane   │ jane@ex.com  │ 9123456789  │👁✅❌   │ │
    │ │ ...    │ ...          │ ...         │...      │ │
    │ └────────────────────────────────────────────────┘ │
    └────────────────────────────────────────────────────┘
         │
         ├─────────────────┬─────────────────┐
         │                 │                 │
         ▼                 ▼                 ▼
    [VIEW]            [APPROVE]         [REJECT]
         │                 │                 │
         │        ┌────────▼────────┐       │
         │        │ Request Details │       │
         │        │ Modal Opens     │       │
         │        │ Shows all info  │       │
         │        │ [Close]         │       │
         │        └─────────────────┘       │
         │                 │                 │
         │        ┌────────▼────────┐       │
         │        │ APPROVAL        │       │
         │        │ PROCESS         │       │
         │        └────────┬────────┘       │
         │                 │                 │
         │        ┌────────▼─────────────────┼──────────┐
         │        │                          │          │
         │   [Approve]              [Reject Modal Opens]│
         │     Button                │              │  │
         │        │                  │              │  │
         │        ▼                  │              │  │
         │   ┌─────────────────────┐ │     ┌──────────▼────────┐
         │   │ Creating Member:    │ │     │ Rejection Reason  │
         │   │                     │ │     │ (optional)        │
         │   │ ✓ Generate ID       │ │     │ Textarea:         │
         │   │ ✓ Create password   │ │     │ "Reason why..."   │
         │   │ ✓ Hash password     │ │     │                   │
         │   │ ✓ Create members    │ │     │ [Cancel] [Reject] │
         │   │   record (Active)   │ │     └───────┬────────────┘
         │   │ ✓ Create referral   │ │            │
         │   │   (if sponsor)      │ │            ▼
         │   │ ✓ Insert in DB      │ │     ┌──────────────────┐
         │   └──────────┬──────────┘ │     │ Sending SMS:     │
         │              │             │     │ "Your request    │
         │    ┌─────────▼──────────┐  │     │ was rejected."   │
         │    │ Sending SMS:       │  │     │ [Reason]         │
         │    │ "Welcome to BZB!   │  │     └────────┬─────────┘
         │    │ User ID: BZB12345  │  │              │
         │    │ Password: PWD12345 │  │              ▼
         │    │ Login at: [url]"   │  │     ┌──────────────────┐
         │    └──────────┬─────────┘  │     │ Update Status:   │
         │               │             │     │ "Rejected"       │
         │    ┌──────────▼─────────┐  │     └──────────────────┘
         │    │ Update Request:    │  │
         │    │ Status="Approved"  │  │
         │    │ approved_by=admin  │  │
         │    │ approved_date=now  │  │
         │    └──────────┬─────────┘  │
         │               │             │
         │    ┌──────────▼─────────┐  │
         │    │ Success Message:   │  │
         │    │ "Member approved   │  │
         │    │ and SMS sent"      │  │
         │    └────────────────────┘  │
         │                            │
         └────────────────────────────┘
              │
              ▼
    ┌─────────────────────────────────────────┐
    │ Request Removed from Pending List       │
    │ Status updated in Database              │
    └─────────────────────────────────────────┘

                          👤 MEMBER EXPERIENCE

    ┌─────────────────────────────────────────┐
    │ Member Receives SMS                     │
    ├─────────────────────────────────────────┤
    │ 📱 "Welcome to BZB!                     │
    │                                         │
    │ Your login credentials:                 │
    │ User ID: BZB9601381                     │
    │ Password: PWD123456                     │
    │                                         │
    │ Login at: bzb.example.com               │
    │ Keep credentials secure!"               │
    └─────────────────────────────────────────┘
         │
         ▼
    ┌─────────────────────────────────────────┐
    │ Member Logs In                          │
    │ /login                                  │
    │ User ID: BZB9601381                     │
    │ Password: PWD123456                     │
    └─────────────────────────────────────────┘
         │
         ▼
    ┌─────────────────────────────────────────┐
    │ Member Dashboard                        │
    │ /profile                                │
    │                                         │
    │ ✓ Profile info updated                  │
    │ ✓ Referral tracked                      │
    │ ✓ Sponsor linked                        │
    │ ✓ Level 1 assigned                      │
    │ ✓ Ready to earn!                        │
    └─────────────────────────────────────────┘
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DATA FLOW                                    │
└─────────────────────────────────────────────────────────────────────┘

User Input (AddMemberForm)
  │
  ├─→ Validation (Client-side)
  │     • Email format
  │     • Phone number (10+ digits)
  │     • Required fields
  │
  └─→ POST /api/member/request
      │
      ├─→ Validation (Server-side)
      │     • Duplicate email check
      │     • Required fields
      │
      ├─→ Generate request ID
      │
      └─→ Database Insert
            ├─→ member_requests table
            ├─→ Status: "Submitted" → "Pending"
            └─→ Store all fields


Admin Action (Approve)
  │
  ├─→ POST /api/admin/member-requests/approve
  │
  ├─→ Auth Check (super admin only)
  │
  ├─→ Get member_requests record
  │
  ├─→ Generate Member ID (BZB-XXXXX)
  │
  ├─→ Generate & Hash Password
  │
  ├─→ Create member record
  │     ├─→ INSERT into members table
  │     └─→ Status: "Active"
  │
  ├─→ Create referral record (if sponsor)
  │     └─→ INSERT into referrals table
  │
  ├─→ Send SMS
  │     └─→ smsService.sendCredentialsSMS()
  │
  ├─→ Update member_requests
  │     ├─→ Status: "Approved"
  │     ├─→ approved_by_admin_id
  │     └─→ approved_date
  │
  └─→ Return success response


Database Structure
  │
  ├─→ member_requests
  │     • id (PK)
  │     • name, email, mobile
  │     • sponsor_id, sponsor_name
  │     • personal details
  │     • bank details
  │     • status
  │     • submitted/approved dates
  │
  ├─→ members (existing)
  │     • id (NEW)
  │     • name, email, mobile
  │     • sponsor_id
  │     • status
  │     • joining_date
  │
  └─→ referrals (existing)
        • id
        • sponsor_id → member_id
        • status
        • reward_amount
```

## Component Hierarchy

```
AdminLayout
  │
  └─→ AddMemberPage
        │
        ├─→ Header
        │   └─→ Button: "Add Member"
        │
        ├─→ Info Section
        │   └─→ "How It Works" (6 steps)
        │
        ├─→ PendingRequestsCard
        │   │
        │   ├─→ Pending Requests Table
        │   │   ├─→ Name
        │   │   ├─→ Email
        │   │   ├─→ Mobile
        │   │   ├─→ Sponsor
        │   │   ├─→ Date
        │   │   └─→ Actions (View/Approve/Reject)
        │   │
        │   ├─→ Details Modal
        │   │   ├─→ Show full request details
        │   │   └─→ Approve/Reject buttons
        │   │
        │   └─→ Rejection Modal
        │       ├─→ Rejection reason textarea
        │       └─→ Cancel/Reject buttons
        │
        └─→ AddMemberModal
            └─→ AddMemberForm
                ├─→ Step 1: Basic Info
                ├─→ Step 2: Personal Details
                ├─→ Step 3: Bank Details
                └─→ Navigation (Previous/Next/Submit)
```

## Status Flow

```
User Submission
    │
    ├─→ Status: "Submitted"
    │   (Request created, waiting for review)
    │
    ▼
Admin Review
    │
    ├─→ APPROVED PATH:
    │   Status: "Approved"
    │   └─→ Member Created (Status: "Active")
    │   └─→ Referral Created (Status: "Active")
    │   └─→ SMS Sent
    │
    └─→ REJECTED PATH:
        Status: "Rejected"
        └─→ Rejection Reason Stored
        └─→ Rejection SMS Sent
```

---

**This workflow ensures smooth member onboarding with proper validation, tracking, and automatic SMS notifications at each step!**
