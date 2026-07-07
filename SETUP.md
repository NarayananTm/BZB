# BZB Platform - Setup Guide

## Prerequisites

Before you start, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
  - Download from: https://nodejs.org/
  - Verify: `node --version`

- **npm**: v9.0.0 or higher (comes with Node.js)
  - Verify: `npm --version`

- **Git**: For version control
  - Download from: https://git-scm.com/

- **Code Editor**: VS Code recommended
  - Download from: https://code.visualstudio.com/

---

## Installation Steps

### 1. Navigate to Project Directory

```bash
cd bzb-platform
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages from `package.json`:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- ESLint & Prettier
- And more...

⏱️ **First time may take 2-5 minutes**

### 3. Verify Installation

```bash
npm run type-check
```

If successful, you should see no TypeScript errors.

---

## Starting Development

### Start Development Server

```bash
npm run dev
```

This will:
- Start the Next.js development server
- Open http://localhost:3000
- Enable hot module replacement (auto-refresh on changes)

### Build for Production

```bash
npm run build
npm start
```

---

## Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Check code for issues |
| `npm run lint:fix` | Auto-fix linting issues |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Check TypeScript types |
| `npm run test` | Run tests (Jest) |
| `npm run test:watch` | Run tests in watch mode |

---

## Environment Configuration

### Create .env.local

Create a file named `.env.local` in the project root:

```bash
# Application
NEXT_PUBLIC_SITE_NAME=BZB Platform
NEXT_PUBLIC_API_URL=https://api.bzb.com

# Optional: Analytics, CDN, etc.
# NEXT_PUBLIC_GA_ID=
```

⚠️ **Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

## Project Structure Overview

```
bzb-platform/
├── src/
│   ├── app/                    # Next.js app (routes, layouts)
│   ├── components/
│   │   ├── common/            # Reusable UI components
│   │   ├── sections/          # Page sections
│   │   └── index.ts           # Component exports
│   ├── layouts/               # Layout wrappers
│   ├── styles/                # CSS and global styles
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Helper functions & constants
├── public/
│   └── images/                # Static images
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── tailwind.config.js         # Tailwind CSS config
├── next.config.js             # Next.js config
├── .eslintrc.json             # ESLint config
├── .prettierrc                # Prettier config
├── .gitignore                 # Git ignore rules
├── README.md                  # Project overview
└── DEVELOPMENT.md             # Development guide
```

---

## VS Code Setup (Recommended)

### Recommended Extensions

1. **ES7+ React/Redux/React-Native snippets**
   - Extension ID: `dsznajder.es7-react-js-snippets`

2. **Prettier - Code formatter**
   - Extension ID: `esbenp.prettier-vscode`

3. **ESLint**
   - Extension ID: `dbaeumer.vscode-eslint`

4. **TypeScript Vue Plugin**
   - Extension ID: `Vue.vscode-typescript-vue-plugin`

5. **Tailwind CSS IntelliSense**
   - Extension ID: `bradlc.vscode-tailwindcss`

### VS Code Settings (.vscode/settings.json)

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

---

## Git Configuration

### Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit: BZB platform setup with Phases 1-3"
```

### Create Feature Branch

```bash
git checkout -b feature/feature-name
git add .
git commit -m "Add feature description"
git push origin feature/feature-name
```

---

## Troubleshooting

### Issue: Port 3000 Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Issue: Module Not Found

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Start fresh
npm run dev
```

### Issue: TypeScript Errors

```bash
# Run type check
npm run type-check

# Check specific file
npx tsc src/components/Button.tsx --noEmit
```

### Issue: Styling Not Applied

1. Check Tailwind CSS configuration
2. Verify class names are correct
3. Check if `globals.css` is imported in `layout.tsx`
4. Clear browser cache: `Ctrl + Shift + Delete`

---

## Development Workflow

### 1. Start with Component Development
- Create new component in `src/components/`
- Export from `src/components/index.ts`
- Test in pages

### 2. Build Pages
- Create page files in `src/app/`
- Use layout components
- Compose with reusable components

### 3. Style with Tailwind
- Use predefined color utilities
- Follow responsive design
- Use custom animation classes

### 4. Commit Changes
```bash
git add src/
git commit -m "feat: add new component or page"
git push origin feature-branch
```

---

## Performance Tips

1. **Use Next.js Image Component**
   ```tsx
   import Image from 'next/image';
   <Image src="/image.jpg" alt="desc" width={800} height={600} />
   ```

2. **Lazy Load Components**
   ```tsx
   import dynamic from 'next/dynamic';
   const Component = dynamic(() => import('@/components/Heavy'));
   ```

3. **Code Splitting**
   - Automatic with Next.js app router
   - Each page is a separate bundle

4. **Optimize Fonts**
   - Already optimized in `layout.tsx`
   - Use system fonts for better performance

---

## Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set up production environment
# Follow prompts to connect GitHub
```

### Deploy to Other Platforms

**Netlify:**
```bash
npm run build
# Deploy the `out` folder
```

**Docker:**
See `Dockerfile` in root directory

---

## Next Steps

1. ✅ **Phase 1-3 Complete** - Project setup done
2. 🔄 **Phase 4** - Start building pages
   - Home page
   - Referral program page
   - About page
   - Contact page
3. 🚀 **Deployment** - Host on Vercel or preferred platform
4. 📊 **Analytics** - Add Google Analytics
5. 🔐 **Security** - Implement authentication if needed

---

## Learning Resources

### Next.js
- https://nextjs.org/docs
- https://nextjs.org/learn

### React
- https://react.dev
- https://react.dev/learn

### Tailwind CSS
- https://tailwindcss.com/docs
- https://tailwindcss.com/docs/utility-first

### TypeScript
- https://www.typescriptlang.org/docs/

---

## Support & Help

### Common Commands Quick Reference

```bash
# Development
npm run dev          # Start dev server

# Linting & Formatting
npm run lint         # Check code
npm run lint:fix     # Fix issues
npm run format       # Format code

# Building
npm run build        # Build for production
npm start            # Start production server

# Type Checking
npm run type-check   # Check TypeScript
```

### Additional Help

- Check `DEVELOPMENT.md` for component usage
- Review `README.md` for project overview
- Look at existing components as examples
- Check ESLint/TypeScript error messages

---

**Ready to start developing? 🚀**

Run `npm run dev` and visit http://localhost:3000
