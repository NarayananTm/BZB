# Super Admin Module Documentation

## Overview
All super admin related functionality is contained within the `/src/app/supper-admin/` directory for better organization and maintainability.

## Folder Structure

```
src/app/supper-admin/
├── api/                                    # API Routes (Next.js Route Handlers)
│   ├── auth/
│   │   ├── login/route.ts                 # POST: Admin login
│   │   └── logout/route.ts                # POST: Admin logout
│   └── members/
│       ├── pending/route.ts               # GET: Fetch pending members with filters
│       ├── stats/route.ts                 # GET: Fetch dashboard statistics
│       └── decision/route.ts              # POST: Approve/Reject member
│
├── services/                               # Business Logic & Database Layer
│   └── memberReviewService.ts             # Member review specific queries
│
├── login/
│   └── page.tsx                           # Login page (public route)
│
├── PendingReview/
│   └── page.tsx                           # Main pending members page (protected)
│
├── page.tsx                               # Root super admin page (redirect handler)
│
└── README.md                              # This file
```

## API Routes

### Authentication APIs

#### `POST /supper-admin/api/auth/login`
Authenticates super admin with username and password.
```typescript
Request: { username: string, password: string }
Response: { success: boolean, message: string, token: string }
```

#### `POST /supper-admin/api/auth/logout`
Logs out the super admin and clears session.
```typescript
Request: empty
Response: { success: boolean, message: string }
```

### Member APIs

#### `GET /supper-admin/api/members/pending`
Fetches pending members with pagination and filters.
```typescript
Query Params:
  - page: number (default: 1)
  - limit: number (default: 10)
  - search: string (optional - search by name, email, mobile, ID)
  - level: string (optional - filter by level 1, 2, or 3)
  - status: string (default: 'Pending')

Response: {
  success: boolean,
  data: Member[],
  pagination: {
    total: number,
    page: number,
    limit: number,
    totalPages: number
  }
}
```

#### `GET /supper-admin/api/members/stats`
Fetches dashboard statistics for pending members.
```typescript
Response: {
  success: boolean,
  data: {
    pendingReview: number,
    todaysSubmissions: number,
    thisWeek: number,
    rejected7Days: number
  }
}
```

#### `POST /supper-admin/api/members/decision`
Approves or rejects a member registration.
```typescript
Request: { memberId: string, action: 'approve' | 'reject' }
Response: { success: boolean, message: string, data: Member }
```

## Pages

### Login Page (`/supper-admin/login`)
- Public route for super admin authentication
- Credentials:
  - Username: `supperadmin`
  - Password: `supperadmin@123`
- Redirects to PendingReview on successful login

### Pending Review Page (`/supper-admin/PendingReview`)
- Protected route (requires authentication)
- Displays pending member registrations
- Features:
  - Pagination
  - Search functionality
  - Level filtering
  - Approve/Reject members
  - Member profile review in drawer panel

### Root Page (`/supper-admin`)
- Handles redirects based on authentication status
- Redirects to login if not authenticated
- Redirects to PendingReview if already logged in

## Authentication Flow

1. User visits `/supper-admin` → Checks localStorage
2. If not authenticated → Redirects to `/supper-admin/login`
3. User enters credentials → Calls `POST /supper-admin/api/auth/login`
4. On success → Stores token in localStorage & redirects to PendingReview
5. PendingReview page checks auth before rendering
6. Click logout → Calls `POST /supper-admin/api/auth/logout` & redirects to login

## Database Integration

All database queries are in:
- `src/app/supper-admin/services/memberReviewService.ts` (super admin specific)
- `src/services/memberService.ts` (shared member service)

Key functions:
- `getPendingMembersForReview()` - Fetch pending members
- `countPendingMembers()` - Count filtered members
- `getPendingMembersStats()` - Get statistics
- `approveMember()` - Approve member registration
- `rejectMember()` - Reject member registration

## Client-Side Session Management

The application uses localStorage for session management:
- `super_admin_logged_in`: boolean flag indicating login status
- `super_admin_token`: JWT token for API authentication

**Note**: Implement server-side session validation in production.

## Security Considerations

- ✅ Password-protected login
- ✅ Session-based access control
- ✅ Protected routes with auth checks
- ⚠️ TODO: Implement server-side session validation
- ⚠️ TODO: Add rate limiting on login attempts
- ⚠️ TODO: Use HTTPS only cookies in production
- ⚠️ TODO: Add CSRF protection

## Configuration

To change super admin credentials, modify:
- File: `src/app/supper-admin/api/auth/login/route.ts`
- Update the hardcoded values in the validation logic

```typescript
if (username === 'supperadmin' && password === 'supperadmin@123') {
  // Change 'supperadmin' and 'supperadmin@123' to desired credentials
}
```

## Future Enhancements

- [ ] Implement proper authentication system (OAuth, Sessions)
- [ ] Add rate limiting on login
- [ ] Add audit logging for admin actions
- [ ] Add bulk approval/rejection
- [ ] Add export functionality
- [ ] Add member search and advanced filters
- [ ] Add email notifications for approved/rejected members
