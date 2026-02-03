# GitHub CLI Setup - Complete Guide

## What's Happening Now

GitHub CLI (`gh`) is being installed via Homebrew. Once complete, you'll be able to create and manage GitHub repositories directly from your terminal!

---

## After Installation Completes

### Step 1: Authenticate with GitHub

Run this command:
```bash
gh auth login
```

You'll be asked a series of questions. Here are the answers:

1. **What account do you want to log into?**
   - Choose: `GitHub.com` (press Enter)

2. **What is your preferred protocol for Git operations?**
   - Choose: `HTTPS` (press Enter)

3. **Authenticate Git with your GitHub credentials?**
   - Choose: `Yes` (press Enter)

4. **How would you like to authenticate GitHub CLI?**
   - Choose: `Login with a web browser` (recommended)
   - OR choose: `Paste an authentication token`

5. **If you chose web browser:**
   - Copy the code shown (e.g., `XXXX-XXXX`)
   - Press Enter to open browser
   - Paste the code in the browser
   - Click "Authorize"
   - Done! ✅

---

### Step 2: Create Repository and Push (ONE COMMAND!)

After authentication, run this single command:

```bash
gh repo create neblino-site --public --source=. --remote=origin --push
```

**That's it!** This command will:
- ✅ Create a new public repository called `neblino-site` on GitHub
- ✅ Add it as your remote origin
- ✅ Push all your code to GitHub
- ✅ Everything done in one step!

---

### Step 3: View Your Repository

After the command completes, you can:

**Open in browser:**
```bash
gh repo view --web
```

**Or visit:**
```
https://github.com/zubair-it/neblino-site
```

---

## Quick Reference Commands

### Check if authenticated:
```bash
gh auth status
```

### Create repository (if not done yet):
```bash
gh repo create neblino-site --public --source=. --remote=origin --push
```

### View repository in browser:
```bash
gh repo view --web
```

### Check repository info:
```bash
gh repo view
```

---

## What Happens Next?

Once your code is on GitHub:
1. ✅ Repository is live at github.com/zubair-it/neblino-site
2. ✅ Ready to connect to Hostinger
3. ✅ GitHub Actions workflow is active
4. ✅ Can share with others

---

## Troubleshooting

### If `gh` command not found after install:
```bash
# Restart terminal or run:
source ~/.zshrc
```

### If authentication fails:
```bash
# Try again:
gh auth login
```

### If repository already exists:
```bash
# Just add remote and push:
git remote add origin https://github.com/zubair-it/neblino-site.git
git push -u origin main
```

---

**This is the easiest way to get your code on GitHub! 🚀**
