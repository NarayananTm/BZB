-- Member Requests Table (for admin to approve/reject member submissions)
CREATE TABLE IF NOT EXISTS member_requests (
  id                    VARCHAR(50)     PRIMARY KEY,
  user_id               VARCHAR(50),
  name                  VARCHAR(255)    NOT NULL,
  email                 VARCHAR(255)    NOT NULL,
  mobile                VARCHAR(20)     NOT NULL,
  sponsor_id            VARCHAR(50)     REFERENCES members(id) ON DELETE SET NULL,
  sponsor_name          VARCHAR(255),
  date_of_birth         DATE,
  gender                VARCHAR(20),
  address               TEXT,
  district              VARCHAR(100),
  pincode               VARCHAR(20),
  state                 VARCHAR(100),
  nominee_name          VARCHAR(255),
  nominee_relation      VARCHAR(100),
  bank_name             VARCHAR(255),
  bank_account_no       VARCHAR(50),
  bank_account_holder   VARCHAR(255),
  ifsc_code             VARCHAR(20),
  pan                   VARCHAR(20),
  g_pay                 VARCHAR(100),
  status                VARCHAR(20)     NOT NULL DEFAULT 'Pending',  -- Pending | Approved | Rejected | Submitted
  rejection_reason      TEXT,
  submitted_by_admin_id VARCHAR(50)     REFERENCES admin_users(id),
  approved_by_admin_id  VARCHAR(50)     REFERENCES admin_users(id),
  submitted_date        TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  approved_date         TIMESTAMPTZ,
  created_at            TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_member_requests_status ON member_requests(status);
CREATE INDEX IF NOT EXISTS idx_member_requests_email ON member_requests(email);
CREATE INDEX IF NOT EXISTS idx_member_requests_mobile ON member_requests(mobile);
CREATE INDEX IF NOT EXISTS idx_member_requests_submitted_date ON member_requests(submitted_date DESC);
CREATE INDEX IF NOT EXISTS idx_member_requests_sponsor_id ON member_requests(sponsor_id);
