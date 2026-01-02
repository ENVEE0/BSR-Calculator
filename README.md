# BSR Calculator - Bleach Soul Resonance

A resource calculator for Bleach Soul Resonance with admin dashboard.

## Project Structure

```
BSR-Calculator/
├── frontend/              # Client-side files
│   ├── index.html
│   ├── styles.css
│   ├── scripts.js
│   ├── fonts/
│   └── tabs/
├── backend/               # Server-side files
│   ├── server.js         # Express server
│   ├── package.json
│   ├── .env.example      # Environment template
│   └── .env              # (NOT COMMITTED - create from .env.example)
├── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 14+ installed
- npm or yarn

### Backend Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Create `.env` file:**
   ```bash
   # Copy the template
   copy .env.example .env
   ```

3. **Edit `.env` with your settings:**
   ```
   PORT=3000
   NODE_ENV=development
   ADMIN_PASSWORD=your-super-secret-password
   SESSION_SECRET=generate-a-random-string-here
   ```

4. **Start the server:**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

   Server will run on `http://localhost:3000`

### Frontend Setup

The frontend files are in the `frontend/` folder. They are automatically served by the backend server.

## Features

- ✅ Character leveling calculator
- ✅ Weapon upgrade calculator
- ✅ Skill cost calculator
- ✅ Admin dashboard (password protected)
- ✅ Dark/Light mode
- ✅ Session-based authentication

## API Endpoints

### Authentication
- `POST /api/login` - Login with password
- `GET /api/check-auth` - Check if authenticated
- `POST /api/logout` - Logout

### Health
- `GET /api/health` - Server health check

## Development

### Running Locally
```bash
cd backend
npm run dev
```

Then visit `http://localhost:3000`

### Production Deployment

1. Set environment variables on your hosting platform
2. Set `NODE_ENV=production`
3. Use `npm start` to run

### Deployment Options
- **Heroku** - `git push heroku main`
- **Railway.app** - Connect GitHub repo
- **Render** - Deploy from GitHub
- **DigitalOcean App Platform** - Connect GitHub repo

## Security Notes

⚠️ **Important:**
- Never commit `.env` file (it's in .gitignore)
- Always use HTTPS in production
- Change `SESSION_SECRET` to a strong random string
- Change `ADMIN_PASSWORD` to a secure password
- Keep dependencies updated: `npm update`

## Troubleshooting

**Port already in use:**
```bash
# Change PORT in .env to 3001, 3002, etc.
```

**Can't connect to backend:**
- Ensure server is running on port specified in .env
- Check CORS settings if frontend is on different port
- Check browser console for errors

## License

MIT
