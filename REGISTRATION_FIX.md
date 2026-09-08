# Registration Fix - Database Separation

## Issue Fixed
PostgreSQL error `22P02` (invalid text representation) during registration caused by:
1. Attempting to create member records during registration
2. Mixing website login users with MLM members

## Solution Implemented

### 1. Created New Table: `website_users`
- Dedicated table for website login users only
- Located in: [database/migration_website_users.sql](database/migration_website_users.sql)
- Fields: `id`, `full_name`, `email`, `mobile`, `password`, `is_active`, `created_at`, `updated_at`

### 2. Updated Database Layer (`src/lib/postgres.ts`)
- Changed `readUsers()` to query from `website_users` table
- Changed `findUserByEmailOrMobile()` to query from `website_users` table
- Changed `registerUser()` to insert into `website_users` table

### 3. Simplified Registration API (`src/app/api/register/route.ts`)
- Removed automatic member creation
- Now only creates website user account
- Member profile creation can be done separately via admin or dedicated endpoint

### 4. Updated Register Form (`src/app/register/page.tsx`)
- Removed sponsor info fetching on registration
- Simplified to only collect basic user info (name, email, mobile, password)
- Sponsor/referral linking can be done later through member profile setup

## Database Migration Steps

### Execute this SQL on your database:

```sql
-- Create website_users table
CREATE TABLE IF NOT EXISTS website_users (
  id          VARCHAR(50)  PRIMARY KEY,
  full_name   VARCHAR(255) NOT NULL,
  email       VARCHAR(255) NOT NULL UNIQUE,
  mobile      VARCHAR(20)  NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  is_active   BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_website_users_email ON website_users(LOWER(email));
CREATE INDEX IF NOT EXISTS idx_website_users_mobile ON website_users(mobile);
```

## Testing Registration

After migration, registration will:
1. ✅ Accept user details (name, email, mobile, password)
2. ✅ Validate inputs (email format, password length, duplicates)
3. ✅ Hash password with bcrypt
4. ✅ Create website_user record
5. ✅ Return success response with userId

No more errors related to member table integer conversions!

## Next Steps

1. Create separate endpoints for member profile management (admin or user-initiated)
2. Link website users to member profiles when they complete KYC/onboarding
3. Handle sponsor/referral linking at that time
