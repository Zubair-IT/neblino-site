# Deployment Guide for Hostinger

This guide will help you deploy your Neblino Labs static Next.js site to Hostinger via GitHub.

## Prerequisites

- GitHub account
- Hostinger hosting account
- Git installed on your local machine

## Step 1: Push to GitHub

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name it `neblino-site` (or any name you prefer)
   - Don't initialize with README (we already have one)
   - Click "Create repository"

2. **Push your local code to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/neblino-site.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Hostinger

### Option A: Manual Deployment (Upload Files)

1. **Build the project locally:**
   ```bash
   npm run build
   ```

2. **Upload the `out` folder:**
   - Connect to your Hostinger via FTP or File Manager
   - Navigate to `public_html` directory
   - Upload all contents from the `out` folder
   - Your site will be live at your domain!

### Option B: GitHub Integration (Recommended)

1. **Login to Hostinger:**
   - Go to your Hostinger control panel
   - Navigate to "Website" section

2. **Connect GitHub:**
   - Look for "Git" or "GitHub" deployment option
   - Connect your GitHub account
   - Select the `neblino-site` repository
   - Choose the `main` branch

3. **Configure Build Settings:**
   - Build command: `npm run build`
   - Output directory: `out`
   - Node version: 18 or higher

4. **Deploy:**
   - Click "Deploy" or "Build & Deploy"
   - Hostinger will automatically build and deploy your site
   - Future pushes to `main` branch will auto-deploy

## Step 3: Custom Domain (Optional)

1. In Hostinger, go to Domain settings
2. Point your domain to the deployment
3. Enable SSL certificate for HTTPS

## Updating Your Site

### For Manual Deployment:
```bash
# Make your changes
npm run build
# Upload the new 'out' folder contents via FTP
```

### For GitHub Integration:
```bash
# Make your changes
git add .
git commit -m "Update site content"
git push origin main
# Hostinger will automatically rebuild and deploy
```

## Troubleshooting

### Build Fails
- Ensure Node.js version 18+ is selected in Hostinger
- Check that all dependencies are in `package.json`
- Review build logs for specific errors

### Site Not Loading
- Verify the `out` folder contents are in the correct directory
- Check that `index.html` exists in the root
- Clear browser cache

### Styling Issues
- Ensure all CSS files from `_next` folder are uploaded
- Check that file paths are correct
- Verify Tailwind CSS is properly configured

## Support

For Hostinger-specific issues, contact Hostinger support.
For code issues, check the README.md file.

---

**Your static site is now ready for deployment! 🚀**
