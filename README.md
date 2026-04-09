# Clinicians Who Code

A platform bridging clinical training and AI literacy for pre-health students and working clinicians.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- An Anthropic API key ([get one here](https://console.anthropic.com/settings/keys))

### Local Development

1. **Clone or navigate to the project**
   ```bash
   cd clinicians-who-code
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deploy to Production

### Option 1: Deploy to Vercel (Recommended)

Vercel provides free hosting for static sites with serverless functions.

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add your API key as an environment variable**
   - Go to your project dashboard on [vercel.com](https://vercel.com)
   - Navigate to Settings → Environment Variables
   - Add: `ANTHROPIC_API_KEY` = `your-api-key-here`
   - Redeploy: `vercel --prod`

5. **Production deployment**
   ```bash
   npm run deploy
   ```

Your site will be live at `https://your-project-name.vercel.app`

### Option 2: Deploy to Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login and deploy**
   ```bash
   netlify login
   netlify init
   ```

3. **Configure serverless functions**
   - Move `api/` folder to `netlify/functions/`
   - Update paths in `netlify.toml`

4. **Add environment variable**
   - Go to Site settings → Environment variables
   - Add `ANTHROPIC_API_KEY`

5. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Option 3: Deploy to GitHub Pages (Static only)

**Note:** The demo feature won't work on GitHub Pages since it requires serverless functions. For full functionality, use Vercel or Netlify.

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/clinicians-who-code.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` → `/ (root)`
   - Save

3. **Access your site**
   - `https://yourusername.github.io/clinicians-who-code/`

## 📁 Project Structure

```
clinicians-who-code/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # Client-side JavaScript
├── api/
│   └── demo.js        # Serverless function for Claude API calls
├── package.json       # Node.js dependencies
├── vercel.json        # Vercel configuration
├── .env.example       # Environment variable template
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | Yes (for demo feature) |

### Customization

- **Branding**: Edit colors in `styles.css` under `:root` CSS variables
- **Content**: Modify sections in `index.html`
- **Prompt templates**: Update `PROMPTS` object in `api/demo.js`

## 🛡️ Security Notes

- **Never commit `.env`** to version control
- **API key is server-side only** - it's never exposed to the client
- **HIPAA compliance**: Ensure users never input real PHI
- **Rate limiting**: Consider adding rate limiting in production

## 🐛 Troubleshooting

### Demo not working locally
- Make sure you're using `npm run dev` (not just opening the HTML file)
- Check that `.env` file exists with valid `ANTHROPIC_API_KEY`
- Verify you have credits in your Anthropic account

### Deployment fails
- Ensure all files are committed to git
- Check that environment variables are set in your hosting platform
- Review build logs for specific error messages

### API errors
- Verify your API key is valid and has credits
- Check Anthropic API status page
- Look at browser console for specific error messages

## 📚 Features

- **8 Clinical Tracks**: Pre-med, PT, PA, Nursing, Therapy, Pharmacy, OT, Tech
- **Interactive Tutorials**: Step-by-step guides for common workflows
- **Live Demo**: Real-time Claude API integration
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Role-Specific Content**: Tailored learning paths for each clinical role

## 🤝 Contributing

Want to add content for your clinical specialty? Here's how:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/nursing-content`)
3. Add your content to `index.html`
4. Test locally with `npm run dev`
5. Commit changes (`git commit -m 'Add nursing track content'`)
6. Push to branch (`git push origin feature/nursing-content`)
7. Open a Pull Request

## 📄 License

MIT License - feel free to use this for your own projects!

## 🙋 Support

- **Issues**: Open an issue on GitHub
- **Questions**: Add to discussions tab
- **Updates**: Watch the repo for new features

---

Built by a pre-PT student who refused to wait for healthcare to catch up with AI.
