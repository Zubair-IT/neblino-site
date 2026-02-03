# Push to GitHub - Step by Step Guide for zubair-it

## 🚀 Follow These Exact Steps

### Step 1: Create Repository on GitHub Website

1. **Open this link in your browser:**
   ```
   https://github.com/new
   ```

2. **Fill in the form:**
   - Repository name: `neblino-site`
   - Description: `Neblino Labs - Modern Software Company Website`
   - Choose: **Public** ✅
   - **IMPORTANT:** DO NOT check "Add a README file" ❌
   - **IMPORTANT:** DO NOT check "Add .gitignore" ❌
   - **IMPORTANT:** DO NOT choose a license ❌

3. **Click "Create repository"** button

---

### Step 2: Run These Commands in Your Terminal

After creating the repository, copy and paste these commands **one by one** in your terminal:

```bash
# 1. Add GitHub as remote
git remote add origin https://github.com/zubair-it/neblino-site.git

# 2. Verify it was added correctly
git remote -v

# 3. Push your code to GitHub
git push -u origin main
```

---

### Step 3: Authentication

When you run `git push`, you'll be asked for credentials:

**Username:** `zubair-it`

**Password:** You need a **Personal Access Token** (NOT your GitHub password)

#### How to Create Personal Access Token:

1. **Go to:** https://github.com/settings/tokens

2. **Click:** "Generate new token" → "Generate new token (classic)"

3. **Fill in:**
   - Note: `Neblino Site Deployment`
   - Expiration: Choose `90 days` or `No expiration`
   - Select scopes: ✅ Check **`repo`** (this gives full control)

4. **Click:** "Generate token" (green button at bottom)

5. **IMPORTANT:** Copy the token immediately (starts with `ghp_...`)
   - You won't be able to see it again!
   - Save it somewhere safe

6. **Use this token as your password** when pushing to GitHub

---

### Step 4: Verify Success

After pushing, you should see:
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
...
To https://github.com/zubair-it/neblino-site.git
 * [new branch]      main -> main
```

**View your repository:**
```
https://github.com/zubair-it/neblino-site
```

---

## 🎉 That's It!

Your code is now on GitHub and ready to deploy to Hostinger!

---

## Alternative: Use SSH (No Password Needed)

If you prefer not to use tokens, you can set up SSH:

### Quick SSH Setup:

```bash
# 1. Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter 3 times (accept defaults, no passphrase)

# 2. Start SSH agent
eval "$(ssh-agent -s)"

# 3. Add key to agent
ssh-add ~/.ssh/id_ed25519

# 4. Copy key to clipboard
pbcopy < ~/.ssh/id_ed25519.pub
```

Then:
1. Go to: https://github.com/settings/keys
2. Click "New SSH key"
3. Title: `Mac - Neblino Site`
4. Paste the key (Cmd+V)
5. Click "Add SSH key"

Now use SSH URL instead:
```bash
git remote add origin git@github.com:zubair-it/neblino-site.git
git push -u origin main
```

---

## Need Help?

If you get stuck, check `GITHUB_SETUP.md` for more detailed instructions!
