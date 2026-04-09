# 🚀 Quick Deployment Guide

## Fastest Path to Live Website (5 minutes)

### Step 1: Get an Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to Settings → API Keys
4. Click "Create Key"
5. Copy the key (starts with `sk-ant-...`)
6. **Keep this secure** - never share it publicly

### Step 2: Deploy to Vercel (Free)

#### Option A: Using Vercel Dashboard (No Terminal)

1. **Sign up at [vercel.com](https://vercel.com)** with GitHub
2. **Click "Add New Project"**
3. **Import this repository**
   - If not on GitHub yet, push this folder to GitHub first:
     ```bash
     # Create a new repo on github.com, then:
     git remote add origin https://github.com/YOUR-USERNAME/clinicians-who-code.git
     git push -u origin main
     ```
4. **Configure the project:**
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
5. **Add Environment Variable:**
   - Key: `ANTHROPIC_API_KEY`
   - Value: (paste your API key)
6. **Click "Deploy"**
7. **Done!** Your site will be live at `https://your-project.vercel.app`

#### Option B: Using Vercel CLI (Terminal)

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy from project directory
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name? clinicians-who-code
# - Directory? ./
# - Override settings? No

# 4. Add environment variable
vercel env add ANTHROPIC_API_KEY

# Paste your API key when prompted
# Select: Production, Preview, Development (all)

# 5. Deploy to production
vercel --prod
```

### Step 3: Test Your Site

1. Visit your deployed URL
2. Click "Demo" in the navigation
3. Select a task type (e.g., "SOAP note from clinical scenario")
4. Enter a de-identified clinical scenario
5. Click "Run with Claude"
6. You should see a response!

---

## Alternative: Deploy to Netlify

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Initialize
netlify init

# 4. Add environment variable in dashboard
# Go to: Site settings → Environment variables
# Add: ANTHROPIC_API_KEY = your-key

# 5. Deploy
netlify deploy --prod
```

---

## Troubleshooting

### Demo returns "API key not configured"
- Make sure you added `ANTHROPIC_API_KEY` as an environment variable
- Redeploy after adding environment variables
- Check that the key starts with `sk-ant-`

### Demo returns "Connection error"
- Check your Anthropic account has credits
- Verify API key is valid (regenerate if needed)
- Check browser console for specific errors

### Site loads but demo doesn't work
- This might be GitHub Pages - use Vercel or Netlify instead
- Serverless functions need a platform that supports them

### Build fails
- Make sure all files are committed: `git status`
- Check that `package.json` exists
- Try deploying again with `vercel --prod`

---

## Cost Breakdown

| Service | Cost | What You Get |
|---------|------|--------------|
| Vercel | **Free** | Unlimited deployments, 100GB bandwidth/month |
| Netlify | **Free** | 100GB bandwidth/month, 300 build minutes/month |
| Anthropic API | **Pay-as-you-go** | ~$0.003 per demo request (Claude Sonnet) |

**Estimated costs:**
- 100 demo requests/month = ~$0.30
- 1000 demo requests/month = ~$3.00

---

## Next Steps After Deployment

1. **Custom domain** (optional)
   - In Vercel: Settings → Domains → Add
   - Point your domain's DNS to Vercel

2. **Analytics** (optional)
   - Enable Vercel Analytics in your dashboard
   - Or add Google Analytics to `index.html`

3. **Share your work**
   - Post on LinkedIn with #CliniciansWhoCode
   - Share with your cohort
   - Contribute back to the project

---

## Quick Commands Reference

```bash
# Local development
npm run dev              # Start dev server at localhost:3000

# Vercel deployment
vercel                   # Deploy to preview
vercel --prod           # Deploy to production
vercel env ls           # List environment variables
vercel logs             # View function logs

# Git workflow
git status              # Check what changed
git add .               # Stage all changes
git commit -m "message" # Commit changes
git push                # Push to GitHub

# Update dependencies
npm install             # Install packages from package.json
```

---

**Need help?** Open an issue on GitHub or check the main README.md for detailed instructions.
