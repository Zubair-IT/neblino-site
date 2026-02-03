# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Visit http://localhost:3000 to see your site!

### 3. Build for Production
```bash
npm run build
```
Static files will be in the `out` folder.

---

## 📤 Deploy to Hostinger via GitHub

### Quick Deploy Steps:

1. **Create GitHub Repository**
   ```bash
   # Create a new repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/neblino-site.git
   git push -u origin main
   ```

2. **Connect to Hostinger**
   - Login to Hostinger
   - Go to Website → GitHub Integration
   - Select your repository
   - Set build command: `npm run build`
   - Set output directory: `out`
   - Click Deploy!

3. **Done!** 🎉
   Your site is now live and will auto-deploy on every push to main branch.

---

## 📁 Project Structure

```
neblino-site/
├── app/
│   ├── page.tsx        ← Edit homepage here
│   ├── layout.tsx      ← Edit site metadata
│   └── globals.css     ← Global styles
├── out/                ← Static build output (deploy this)
├── public/             ← Static assets (images, etc.)
└── next.config.js      ← Next.js config (static export enabled)
```

---

## 🎨 Customize Your Site

- **Homepage Content**: Edit `app/page.tsx`
- **Site Title**: Edit `app/layout.tsx`
- **Colors**: Edit `tailwind.config.ts`
- **Styles**: Edit `app/globals.css`

---

## 📚 Need More Help?

- Full documentation: See `README.md`
- Deployment guide: See `DEPLOYMENT.md`
- Next.js docs: https://nextjs.org/docs

---

**Happy coding! 💻**
