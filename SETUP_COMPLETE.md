# Contact Us Form & Registration - Complete Setup Guide

## ✅ What's Been Done

### 1. **Separated Database Tables**
- ✅ Created `website_users` table for login credentials
- ✅ Kept `members` table for MLM participants
- ✅ Updated `contacts` table to store contact form submissions

### 2. **Registration System (Fixed)**
- ✅ Registration API now only creates website_users
- ✅ Removed automatic member creation (prevents errors)
- ✅ Simplified register form (no sponsor fields)

### 3. **Contact Form (Completed)**
- ✅ Contact API endpoint (`/api/contact`)
- ✅ Form component updated to send correct data
- ✅ Admin dashboard to view submissions (`/admin/contacts`)
- ✅ Contact service for backend operations

---

## 📋 Database Migrations Required

Run these SQL commands on your PostgreSQL database:

### Migration 1: Create website_users table
```bash
# File: database/migration_website_users.sql
CREATE TABLE IF NOT EXISTS website_users (
  id VARCHAR(50) PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  mobile VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_website_users_email ON website_users(LOWER(email));
CREATE INDEX idx_website_users_mobile ON website_users(mobile);
```

### Migration 2: Update contacts table
```bash
# File: database/migration_contacts_update.sql
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS name VARCHAR(255);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
```

---

## 🚀 Quick Start

### 1. Run Migrations
```bash
# Execute migrations on your database
psql -h your-host -U your-user -d your-db -f database/migration_website_users.sql
psql -h your-host -U your-user -d your-db -f database/migration_contacts_update.sql
```

### 2. Restart the Application
```bash
npm run dev
```

### 3. Test Registration
Visit: `http://localhost:3000/register`
- Enter name, email, mobile, password
- Click Register
- Should redirect to login page

### 4. Test Contact Form
Visit: `http://localhost:3000/contact`
- Fill the form (name, email, phone, subject, message)
- Click Submit
- Should see success message

### 5. View Contacts (Admin)
Visit: `http://localhost:3000/admin/contacts`
- See all contact submissions
- Click on any submission to view details
- Click "Reply via Email" to respond

---

## 📁 Files Created/Modified

### New Files
- `database/migration_website_users.sql` - Website users table
- `database/migration_contacts_update.sql` - Contacts table update
- `src/services/contactService.ts` - Contact service methods
- `src/app/admin/contacts/page.tsx` - Admin contacts dashboard
- `REGISTRATION_FIX.md` - Registration fix documentation
- `CONTACT_FORM_SETUP.md` - Contact form setup documentation

### Modified Files
- `src/lib/postgres.ts` - Updated to use website_users table
- `src/app/api/register/route.ts` - Simplified registration
- `src/app/api/contact/route.ts` - Updated to use database
- `src/app/register/page.tsx` - Removed sponsor logic
- `src/components/sections/ContactForm.tsx` - Updated form submission

---

## 🔍 API Endpoints

### Registration
```
POST /api/register
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "mobile": "9876543210",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### Contact Form
```
POST /api/contact
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "subject": "Inquiry",
  "message": "I would like to know more..."
}

GET /api/contact
// Returns all contacts (max 100)
```

---

## ✨ Features

### Registration
- ✅ Email validation
- ✅ Password strength (min 8 chars)
- ✅ Duplicate email/mobile check
- ✅ Password hashing with bcrypt
- ✅ Database storage in website_users

### Contact Form
- ✅ Form validation (email, phone, message length)
- ✅ Database storage
- ✅ Admin dashboard to view all submissions
- ✅ Search/filter by submission
- ✅ Reply via email functionality
- ✅ Statistics (total, unique emails, latest)

---

## 🛠️ Troubleshooting

### "Table does not exist" error
**Solution**: Run the migration SQL files

### Registration still failing
**Solution**: 
1. Check if website_users table exists
2. Verify database connection
3. Check logs for specific error

### Contact form not saving
**Solution**:
1. Ensure contacts table has name column
2. Check database connection
3. Verify all required fields are provided

---

## 📝 Next Steps

1. ✅ Apply database migrations
2. ✅ Test registration flow
3. ✅ Test contact form submission
4. ✅ Access admin dashboard to verify data
5. (Optional) Add email notifications for new contacts
6. (Optional) Add member profile setup flow after registration

---

Generated: 2026-09-08
