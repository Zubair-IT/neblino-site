# Neblino Labs - Software Company Website

A modern, static Next.js website for Neblino Labs software company.

## Features

- ✨ Modern, responsive design with Tailwind CSS
- 🚀 Static site generation for optimal performance
- 📱 Mobile-friendly and fully responsive
- 🎨 Beautiful gradient UI with smooth animations
- ⚡ Fast loading times
- 🔧 Easy to deploy on Hostinger or any static hosting

## Tech Stack

- **Next.js 14** - React framework with static export
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first CSS framework
- **React 18** - Latest React features

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build for Production

Generate static files:

```bash
npm run build
```

This will create an `out` directory with all static files ready for deployment.

## Deployment to Hostinger

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload the `out` folder contents** to your Hostinger public_html directory

3. **Or use GitHub integration:**
   - Push this repository to GitHub
   - Connect your Hostinger account to GitHub
   - Select this repository for deployment
   - Hostinger will automatically build and deploy

## Project Structure

```
neblino-site/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
├── public/             # Static assets
├── next.config.js      # Next.js configuration (static export enabled)
├── tailwind.config.ts  # Tailwind CSS configuration
└── package.json        # Dependencies
```

## Customization

- Edit `app/page.tsx` to modify the homepage content
- Update colors in `tailwind.config.ts`
- Modify global styles in `app/globals.css`
- Change metadata in `app/layout.tsx`

## License

© 2026 Neblino Labs. All rights reserved.
