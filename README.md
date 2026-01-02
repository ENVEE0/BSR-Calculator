# BSR Calculator

Resource Calculator for Bleach Soul Resonance

## 🚀 Live Site

Deployed on Vercel: [Your Site URL]

## 📁 Project Structure

```
BSR-Calculator/
├── api/                    # Serverless functions (backend)
│   └── login.js           # Authentication endpoint
├── fonts/                  # Custom fonts
├── tabs/                   # Tab content HTML files
│   ├── character.html
│   ├── dashboard.html
│   ├── skills.html
│   └── weapon.html
├── index.html             # Main page
├── scripts.js             # Calculator logic
├── styles.css             # Styling
├── vercel.json            # Vercel configuration
├── .gitignore             # Git ignore rules
└── .env.example           # Environment variables template
```

## 🔐 Security

The dashboard is password-protected with server-side authentication:
- Password stored securely in Vercel environment variables
- Never exposed in client-side code
- Change password without code updates

## 🛠️ Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Set Environment Variable**
   - In Vercel Dashboard: Project Settings → Environment Variables
   - Add variable:
     - **Name:** `ADMIN_PASSWORD`
     - **Value:** `your-secure-password`
   - Redeploy the site

### Local Development

```bash
# Open index.html in browser
# For API testing, install Vercel CLI:
npm install -g vercel
vercel dev
```

## 📝 Features

- ✅ Character leveling calculator
- ✅ Weapon upgrade calculator
- ✅ Skill cost calculator
- ✅ Admin dashboard with secure authentication
- ✅ Dark/Light mode
- ✅ Real-time calculations

## 🔧 Changing Password

1. Go to Vercel Dashboard
2. Project Settings → Environment Variables
3. Edit `ADMIN_PASSWORD`
4. Redeploy (automatic on change)

**No code changes needed!**

## 📄 License

MIT

## ⚠️ Note

Work in progress - We don't have all the numbers and there can be errors.
