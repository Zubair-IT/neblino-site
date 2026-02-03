# GitHub Repository Setup Guide

## Step-by-Step Instructions to Create and Push to GitHub

### Prerequisites
- GitHub account (you have the username)
- GitHub CLI installed OR use GitHub web interface

---

## Option 1: Using GitHub CLI (Recommended - Fastest)

### Install GitHub CLI (if not installed)
```bash
brew install gh
```

### Login to GitHub
```bash
gh auth login
```
Follow the prompts to authenticate.

### Create Repository and Push
```bash
# Create a new public repository on GitHub
gh repo create neblino-site --public --source=. --remote=origin --push

# That's it! Your code is now on GitHub! 🎉
```

---

## Option 2: Using Git Commands (Manual Method)

### Step 1: Create Repository on GitHub Website
1. Go to: https://github.com/new
2. Repository name: `neblino-site`
3. Description: "Neblino Labs - Modern Software Company Website"
4. Choose: **Public**
5. **DO NOT** check "Initialize with README" (we already have one)
6. Click "Create repository"

### Step 2: Connect Your Local Repository to GitHub
Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR_USERNAME/neblino-site.git

# Verify the remote was added
git remote -v

# Push your code to GitHub
git push -u origin main
```

### Step 3: Enter Credentials
When prompted:
- **Username**: Your GitHub username
- **Password**: Use a Personal Access Token (NOT your GitHub password)

#### How to Create Personal Access Token:
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "Neblino Site Deployment"
4. Select scopes: Check `repo` (full control of private repositories)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)
7. Use this token as your password when pushing

---

## Option 3: Using SSH (Most Secure)

### Step 1: Generate SSH Key (if you don't have one)
```bash
# Generate new SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Press Enter to accept default location
# Press Enter twice for no passphrase (or set one if you prefer)

# Start SSH agent
eval "$(ssh-agent -s)"

# Add SSH key to agent
ssh-add ~/.ssh/id_ed25519

# Copy SSH key to clipboard
pbcopy < ~/.ssh/id_ed25519.pub
```

### Step 2: Add SSH Key to GitHub
1. Go to: https://github.com/settings/keys
2. Click "New SSH key"
3. Title: "Mac - Neblino Site"
4. Paste the key (already in clipboard)
5. Click "Add SSH key"

### Step 3: Create Repository and Push
1. Create repository on GitHub (see Option 2, Step 1)
2. Use SSH URL instead:

```bash
# Add GitHub as remote origin (SSH)
git remote add origin git@github.com:YOUR_USERNAME/neblino-site.git

# Push your code
git push -u origin main
```

---

## Quick Command Reference

### Check Current Status
```bash
git status
git remote -v
git log --oneline
```

### Make Changes and Push
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### View Your Repository
After pushing, visit:
```
https://github.com/YOUR_USERNAME/neblino-site
```

---

## What Happens After Pushing?

✅ Your code is now on GitHub
✅ You can share the repository URL
✅ Ready to connect to Hostinger for deployment
✅ GitHub Actions workflow will be available

---

## Next: Deploy to Hostinger

Once your code is on GitHub, follow the `DEPLOYMENT.md` guide to connect it to Hostinger!

---

**Need Help?** 
- GitHub Docs: https://docs.github.com
- Contact: GitHub Support or check the README.md
