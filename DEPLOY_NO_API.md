# Deploy Without API Key (GitHub Pages)

## Fastest Free Deployment - No API Key Needed

### Step 1: Create GitHub Repository

```bash
# Make sure you're in the project directory
cd /Users/carolinenatwick/clinicians-who-code

# Create a new repository on github.com first, then:
git remote add origin https://github.com/YOUR-USERNAME/clinicians-who-code.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source":
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**

### Step 3: Wait 1-2 Minutes

Your site will be live at:
```
https://YOUR-USERNAME.github.io/clinicians-who-code/
```

## ⚠️ Demo Page Note

The demo page will show an error message since there's no API key. You have two options:

### Option A: Leave Demo As-Is
- Users will see an error when they try to use it
- Clear message: "API key not configured"

### Option B: Hide the Demo Page

Edit `index.html` and remove/hide the Demo navigation button:

```html
<!-- Find this line around line 18 and remove or comment it out: -->
<button class="nav-btn" onclick="go('demo',this)">Demo</button>
```

Then commit and push:
```bash
git add index.html
git commit -m "Remove demo page"
git push
```

### Option C: Replace Demo with Coming Soon

Keep the nav button but show a "coming soon" message instead of the broken demo.

## 💰 Cost: $0

GitHub Pages is completely free for public repositories.

## 🔄 Updates

To update your site:
```bash
# Make changes to your files
git add .
git commit -m "Update content"
git push
```

Changes appear in 1-2 minutes.

## ✨ When to Add API Key Later

If you want to enable the demo feature later:
1. Get an Anthropic API key
2. Deploy to Vercel or Netlify instead (they support serverless functions)
3. Follow the instructions in DEPLOY.md

---

**Bottom line:** Your website works great without an API key. Only the live demo needs it.
