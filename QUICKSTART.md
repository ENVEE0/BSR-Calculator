# Quick Start Guide

## First Time Setup

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Create Environment File
```bash
# In the backend folder, copy the example:
copy .env.example .env
```

### 3. Edit `.env` File
Open `backend/.env` and change:
```
ADMIN_PASSWORD=your-super-secret-password
SESSION_SECRET=generate-a-random-string-here
```

### 4. Start the Server
```bash
cd backend
npm start
```

You should see:
```
🚀 Server running on http://localhost:3000
```

### 5. Open in Browser
Visit: `http://localhost:3000`

---

## For Development (Auto Reload)

```bash
cd backend
npm run dev
```

This uses `nodemon` to automatically restart when you make changes.

---

## File Structure Reference

**Frontend files** (what users see):
- `frontend/index.html` - Main page
- `frontend/scripts.js` - Calculator logic & login
- `frontend/styles.css` - Styling
- `frontend/tabs/` - Tab content
- `frontend/fonts/` - Font files

**Backend files** (secure server):
- `backend/server.js` - Express server & API endpoints
- `backend/package.json` - Dependencies
- `backend/.env` - Passwords (NOT COMMITTED)

---

## Pushing to GitHub

After making changes:
1. Open GitHub Desktop
2. Write commit message
3. Click "Commit to main"
4. Click "Push origin"

**Note:** `.env` is in `.gitignore` so your password never gets committed! ✅

---

## Production Deployment

See `README.md` for deployment options (Heroku, Railway, Render, etc.)
