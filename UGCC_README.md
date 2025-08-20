# UGCC (University of Guyana Computer Club) Implementation

This project implements the University of Guyana Computer Club (UGCC) Single Page Application as specified in the assignment requirements. The implementation includes a three-tier architecture with frontend (Vue.js), backend (Node.js/Express), and database (MySQL).

## Architecture Overview

### Three-Tier Architecture

1. **Frontend (Vue.js SPA)**
   - User interface built with Vue.js 3 and Vuetify
   - Client-side validation and real-time user feedback
   - Responsive design with Tailwind CSS

2. **Backend (Node.js/Express API)**
   - RESTful API server handling business logic
   - Server-side validation and authentication
   - JWT-based authentication system
   - National ID verification service integration

3. **Database (MySQL)**
   - Persistent data storage for members, prospects, and profiles
   - Structured schema with proper relationships and constraints

## Section A: National ID Validation Solution (18 marks)

### 1a. Client-Side and Server-Side Validation (6 marks)

**Client-Side Validation (Vue.js)**
- Implemented in `NationalIdField.vue` component
- Real-time format validation using regex: `/^[A-Z]{2}\d{7}$/`
- Immediate user feedback with visual indicators
- Auto-formatting to uppercase for user convenience

**Server-Side Validation (Node.js/Express)**
- Duplicate validation on all API endpoints
- Format validation using the same regex pattern
- Security measure against client-side bypassing

```javascript
// Client-Side Validation Function
const validateNationalId = (id) => {
  const regex = /^[A-Z]{2}\d{7}$/;
  return regex.test(id);
};

// Server-Side Validation (Express Route)
app.post('/api/ugcc/register', (req, res) => {
  const { nationalId } = req.body;
  const regex = /^[A-Z]{2}\d{7}$/;
  
  if (!regex.test(nationalId)) {
    return res.status(400).json({ error: 'Invalid National ID format.' });
  }
  // ... proceed with registration if valid
});
```

### 1b. Real-Time Verification (6 marks)

**Technical Implementation:**
- Implemented mock government API verification service
- Real-time API calls after format validation
- Visual feedback during verification process
- Asynchronous verification with loading indicators

**Verification Flow:**
1. User enters National ID → Format validation
2. If format valid → API call to backend
3. Backend calls government verification service
4. Response displayed to user with success/failure indication

```javascript
// Frontend verification call
async performVerification() {
  const response = await useClient().http({
    method: 'post',
    path: '/api/verify-national-id',
    data: { nationalId: this.nationalId }
  });
  
  this.verificationStatus = response.valid ? 'verified' : 'invalid';
}
```

### 1c. Design Pattern/Architecture Explanation (6 marks)

**Client-Server Architecture with API Gateway Pattern**

- **Client (Vue.js App)**: User interface layer handling input validation and user feedback
- **Server (Node.js/Express API)**: Middleware layer acting as API Gateway
  - Receives validation requests from client
  - Performs server-side validation for security
  - Acts as client to external government API
  - Processes and formats responses for frontend
- **External Government API**: Source of truth for National ID verification

**Benefits of this pattern:**
- Security: Client never directly accesses sensitive government database
- Scalability: Server can handle authentication secrets and rate limiting
- Maintainability: Clear separation of concerns
- Reliability: Server-side validation prevents client-side bypassing

## Section B: UGCC Single Page Application (30 marks)

### Project Structure

```
paymentFE/
├── src/
│   ├── components/
│   │   └── NationalIdField.vue          # Reusable National ID validation component
│   ├── views/
│   │   ├── UgccInterest.vue             # Prospect interest registration
│   │   ├── UgccLogin.vue                # Member login
│   │   ├── UgccRegister.vue             # Member registration
│   │   └── UgccDashboard.vue            # Member dashboard
│   └── router/
│       └── app-router.js                # Route definitions
├── ugcc-backend/
│   ├── server.js                        # Express server with API endpoints
│   ├── package.json                     # Backend dependencies
│   ├── database_schema.sql              # MySQL database schema
│   └── .env.example                     # Environment configuration
```

### Database Schema

```sql
-- Table for prospective members
CREATE TABLE prospects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    national_id VARCHAR(9) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    interest TEXT,
    academic_level VARCHAR(100),
    field_of_study VARCHAR(255),
    experience_level VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for registered members
CREATE TABLE members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    national_id VARCHAR(9) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    academic_level VARCHAR(100),
    field_of_study VARCHAR(255),
    experience_level VARCHAR(100),
    status ENUM('active', 'inactive', 'pending') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for member profiles
CREATE TABLE profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT NOT NULL,
    bio TEXT,
    skills TEXT,
    profile_picture_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);
```

### Key Features Implemented

1. **Interest Registration** (`/ugcc/interest`)
   - Form for prospective members
   - National ID validation with real-time verification
   - Academic level and experience tracking

2. **Member Registration** (`/ugcc/register`)
   - Full member account creation
   - Password hashing with bcrypt
   - Profile creation with skills and bio

3. **Member Login** (`/ugcc/login`)
   - JWT-based authentication
   - Remember me functionality
   - Secure password comparison

4. **Member Dashboard** (`/ugcc/dashboard`)
   - Protected route requiring authentication
   - Member statistics and club information
   - Upcoming events and activities
   - Profile management

### API Endpoints

```javascript
// Interest registration
POST /api/ugcc/interest

// National ID verification
POST /api/verify-national-id

// Member registration
POST /api/ugcc/register

// Member login
POST /api/ugcc/login

// Protected profile access
GET /api/ugcc/profile (requires JWT)

// Dashboard statistics
GET /api/ugcc/dashboard/stats (requires JWT)
```

## Section C: Implementation Evidence

### Screenshots
1. Homepage with UGCC integration
2. UGCC Interest Registration form with National ID validation
3. UGCC Member Login page
4. UGCC Member Registration page with all fields

### Key Technologies Used

- **Frontend**: Vue.js 3, Vuetify, Tailwind CSS, Vue Router, Pinia
- **Backend**: Node.js, Express.js, MySQL2, bcryptjs, jsonwebtoken
- **Database**: MySQL with proper indexing and relationships
- **Validation**: Client-side and server-side regex validation
- **Authentication**: JWT tokens with secure password hashing

## Installation and Setup

### Frontend Setup
```bash
cd /paymentFE
npm install
npm run dev
```

### Backend Setup
```bash
cd ugcc-backend
npm install
cp .env.example .env
# Configure database credentials in .env
npm start
```

### Database Setup
```bash
mysql -u root -p < database_schema.sql
```

## Demo Flow

1. **Homepage**: Shows integrated UGCC access
2. **Interest Registration**: Demonstrates National ID validation
3. **Member Registration**: Full account creation with validation
4. **Login**: Secure authentication
5. **Dashboard**: Protected member area with club information

This implementation fulfills all requirements specified in the assignment, demonstrating a complete three-tier web application with proper validation, security, and user experience considerations.