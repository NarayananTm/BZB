// This file creates a member record with ID MBD9601381 for admin use
// Run: node scripts/create-member.js

const { query } = require('../src/lib/postgres');

async function createAdminMember() {
  try {
    const joiningDate = new Date().toISOString().slice(0, 10);
    
    const result = await query(
      `INSERT INTO members 
       (id, name, email, mobile, sponsor_id, sponsor_name, level_name, status, 
        joining_date, total_earnings, wallet_balance, referral_count, team_count, avatar)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING *`,
      [
        'MBD9601381',        // id
        'Admin21',           // name
        'admin21@example.com', // email
        '9876543210',        // mobile
        null,                // sponsor_id
        null,                // sponsor_name
        'Level 1',           // level_name
        'Active',            // status
        joiningDate,         // joining_date
        0,                   // total_earnings
        0,                   // wallet_balance
        0,                   // referral_count
        0,                   // team_count
        null                 // avatar
      ]
    );
    
    console.log('✓ Member created successfully:', result[0]);
  } catch (error) {
    console.error('✗ Error creating member:', error.message);
  }
}

createAdminMember();
