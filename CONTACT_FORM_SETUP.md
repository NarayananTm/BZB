# Contact Us Form - Database Setup

## Overview
Successfully configured the Contact Us form to store data in PostgreSQL instead of JSON files.

## Changes Made

### 1. Database Table
**Migration File**: `database/migration_contacts_update.sql`

Run this migration against the PostgreSQL database used by the app before
submitting the form. It adds the missing `name` column and repairs automatic ID
generation for existing `contacts` tables.

The migration is safe to run more than once.

**Table Structure**:
```
- id (BIGINT) - Auto-generated
- name (VARCHAR) - Full name
- email (VARCHAR) - Email address
- phone (VARCHAR) - Phone number
- subject (VARCHAR) - Contact subject
- message (TEXT) - Message content
- created_at (TIMESTAMPTZ) - Submission timestamp
```

### 2. API Endpoint
**Route**: `src/app/api/contact/route.ts`

#### POST Request
Creates a new contact submission.

**Request Body**:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "subject": "Project Inquiry",
  "message": "I would like to know more about..."
}
```

**Response** (Success - 201):
```json
{
  "success": true,
  "message": "Message saved successfully.",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "subject": "Project Inquiry",
    "message": "...",
    "created_at": "2026-09-08T10:30:00Z"
  }
}
```

#### GET Request
Retrieves all contact submissions (latest 100).

**Response** (Success - 200):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "subject": "Project Inquiry",
      "message": "...",
      "created_at": "2026-09-08T10:30:00Z"
    }
  ]
}
```

### 3. Contact Form Component
**File**: `src/components/sections/ContactForm.tsx`

**Updated to**:
- Combine `firstName` and `lastName` into `fullName`
- Send correct field names to API
- Validate phone number (10 digits)
- Validate message length (minimum 10 characters)
- Show success/error toast notifications

### 4. Admin Dashboard
**Route**: `src/app/admin/contacts/page.tsx`

**Features**:
- View all contact submissions
- Click to view detailed message
- Display stats (total submissions, unique emails, latest submission)
- Responsive list/detail view
- One-click email reply button
- Real-time formatting of dates

**Access**: `/admin/contacts`

## Validation Rules

| Field | Validation |
|-------|-----------|
| Full Name | Required, non-empty |
| Email | Required, valid email format |
| Phone | Required, 10 digits |
| Subject | Required, non-empty |
| Message | Required, minimum 10 characters |

## Error Handling

| Status | Error |
|--------|-------|
| 400 | Missing/invalid fields |
| 400 | Invalid email format |
| 400 | Invalid phone number (not 10 digits) |
| 400 | Message too short (<10 chars) |
| 500 | Database error |

## Usage

### Submit a Contact Form
Users fill the contact form on `/contact` page and submit. Data is stored in the database.

### View Submissions
Admins access `/admin/contacts` to view all submissions with details.

### Respond to Contacts
Click "Reply via Email" to open email client with pre-filled recipient.

## Database Migration Commands

Execute these SQL commands on your PostgreSQL database:

```bash
# Run the migration file
psql -h [host] -U [user] -d [database] -f database/migration_contacts_update.sql
```

Or run the commands manually in your database client.

## Testing

### Example cURL Request
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "subject": "Test Subject",
    "message": "This is a test message with more than 10 characters"
  }'
```

## Files Modified
- `src/app/api/contact/route.ts` - Updated to use PostgreSQL
- `src/components/sections/ContactForm.tsx` - Updated form submission logic
- `src/app/admin/contacts/page.tsx` - Created admin dashboard
- `database/migration_contacts_update.sql` - New migration file
