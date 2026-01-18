# CareerPath AI - Quick Setup Guide

## MongoDB Atlas Setup (5 minutes)

Since MongoDB is not installed locally, we'll use MongoDB Atlas (free cloud database):

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a FREE account
3. Create a FREE cluster (M0 Sandbox)
4. Choose a cloud provider and region (any will work)

### Step 2: Setup Database Access
1. In Atlas dashboard, go to "Database Access"
2. Click "Add New Database User"
3. Create a username and password (save these!)
4. Set privileges to "Read and write to any database"

### Step 3: Setup Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Confirm

### Step 4: Get Connection String
1. Go to "Database" → Click "Connect"
2. Choose "Connect your application"
3. Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`)
4. Replace `<password>` with your actual password
5. Add database name at the end: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/careerpath`

### Step 5: Update Backend .env
Open `backend/.env` and replace the MONGO_URI with your Atlas connection string:
```
MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/careerpath
```

### Step 6: Restart Backend
Stop the backend (Ctrl+C) and run again:
```bash
cd backend
npm run dev
```

---

## Alternative: Use In-Memory Database (Quick Test)

If you want to test immediately without MongoDB, I can switch to an in-memory database. Let me know!
