const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ugcc_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// National ID validation function
const validateNationalId = (id) => {
  const regex = /^[A-Z]{2}\d{7}$/;
  return regex.test(id);
};

// Simulate government API verification
const verifyWithGovernmentAPI = async (nationalId) => {
  // In a real implementation, this would call an actual government API
  // For demo purposes, we'll simulate with some test valid IDs
  const validTestIds = ['AB1234567', 'CD9876543', 'EF5555555', 'GH1111111', 'XY9999999'];
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    valid: validTestIds.includes(nationalId),
    details: validTestIds.includes(nationalId) ? {
      name: 'John Doe',
      verified: true
    } : null
  };
};

// API ROUTES

// 1. Route for prospective members to register interest
app.post('/api/ugcc/interest', async (req, res) => {
  try {
    const { 
      first_name, 
      last_name, 
      national_id,
      email, 
      phone, 
      interest,
      academic_level,
      field_of_study,
      experience_level
    } = req.body;

    // Validate National ID format
    if (!validateNationalId(national_id)) {
      return res.status(400).json({ 
        error: 'Invalid National ID format. Must be 2 capital letters followed by 7 digits.' 
      });
    }

    // Server-side verification with government API
    const verification = await verifyWithGovernmentAPI(national_id);
    if (!verification.valid) {
      return res.status(400).json({ 
        error: 'National ID verification failed. ID not found in government database.' 
      });
    }

    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.execute(
        `INSERT INTO prospects (
          first_name, last_name, national_id, email, phone, interest, 
          academic_level, field_of_study, experience_level, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [first_name, last_name, national_id, email, phone, interest, 
         academic_level, field_of_study, experience_level]
      );
      
      res.status(201).json({ 
        message: 'Interest registered successfully!',
        id: result.insertId 
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error registering interest:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Email or National ID already registered' });
    } else {
      res.status(500).json({ error: 'Database error' });
    }
  }
});

// 2. Route for National ID verification
app.post('/api/verify-national-id', async (req, res) => {
  try {
    const { nationalId } = req.body;

    // Validate format first
    if (!validateNationalId(nationalId)) {
      return res.status(400).json({ 
        valid: false,
        error: 'Invalid National ID format' 
      });
    }

    // Verify with government API
    const verification = await verifyWithGovernmentAPI(nationalId);
    
    res.json({
      valid: verification.valid,
      details: verification.details
    });
  } catch (error) {
    console.error('Error verifying National ID:', error);
    res.status(500).json({ 
      valid: false,
      error: 'Verification service unavailable' 
    });
  }
});

// 3. Route for members to register
app.post('/api/ugcc/register', async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      national_id,
      username,
      email,
      password,
      phone,
      academic_level,
      field_of_study,
      experience_level,
      bio
    } = req.body;

    // Validate National ID format
    if (!validateNationalId(national_id)) {
      return res.status(400).json({ 
        error: 'Invalid National ID format' 
      });
    }

    // Verify with government API
    const verification = await verifyWithGovernmentAPI(national_id);
    if (!verification.valid) {
      return res.status(400).json({ 
        error: 'National ID verification failed' 
      });
    }

    // Hash password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const connection = await pool.getConnection();
    
    try {
      // Insert into members table
      const [memberResult] = await connection.execute(
        `INSERT INTO members (
          first_name, last_name, national_id, username, email, password_hash, 
          phone, academic_level, field_of_study, experience_level, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [first_name, last_name, national_id, username, email, password_hash, 
         phone, academic_level, field_of_study, experience_level]
      );

      const memberId = memberResult.insertId;

      // Insert into profiles table
      await connection.execute(
        `INSERT INTO profiles (member_id, bio, created_at) VALUES (?, ?, NOW())`,
        [memberId, bio || '']
      );

      res.status(201).json({ 
        message: 'Member account created successfully!',
        member_id: memberId 
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error creating member:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Username, email, or National ID already exists' });
    } else {
      res.status(500).json({ error: 'Database error' });
    }
  }
});

// 4. Route for members to login
app.post('/api/ugcc/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const connection = await pool.getConnection();
    
    try {
      // Check if user exists (search by username or email)
      const [rows] = await connection.execute(
        'SELECT * FROM members WHERE username = ? OR email = ?',
        [username, username]
      );

      if (rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const user = rows[0];

      // Compare password
      const passwordMatch = await bcrypt.compare(password, user.password_hash);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          id: user.id, 
          username: user.username, 
          email: user.email 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Remove password from user object
      delete user.password_hash;

      res.json({
        message: 'Login successful',
        token: token,
        user: user
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// 5. PROTECTED ROUTE: Get member profile
app.get('/api/ugcc/profile', authenticateToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    try {
      const [memberRows] = await connection.execute(
        'SELECT * FROM members WHERE id = ?',
        [req.user.id]
      );

      if (memberRows.length === 0) {
        return res.status(404).json({ error: 'Member not found' });
      }

      const [profileRows] = await connection.execute(
        'SELECT * FROM profiles WHERE member_id = ?',
        [req.user.id]
      );

      const member = memberRows[0];
      const profile = profileRows[0] || {};

      // Remove password hash
      delete member.password_hash;

      res.json({
        member: member,
        profile: profile
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// 6. Dashboard stats endpoint
app.get('/api/ugcc/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    try {
      // Get member count
      const [memberCount] = await connection.execute('SELECT COUNT(*) as count FROM members');
      
      res.json({
        totalMembers: memberCount[0].count,
        upcomingEvents: 3, // Mock data
        activeProjects: 8   // Mock data
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'UGCC API Server is running' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`UGCC API Server running on port ${PORT}`);
});

module.exports = app;