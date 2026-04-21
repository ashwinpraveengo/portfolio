# G O Ashwin Praveen — Portfolio

A professional Next.js portfolio with dark cyber-tech aesthetic.

## Tech Stack
- **Next.js 14** (static export)
- **Google Fonts** — Bebas Neue, Space Mono, DM Sans
- Pure CSS animations, no extra libraries

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Deploy to Vercel (Recommended — FREE)

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Click **Deploy** — done! ✅

Vercel auto-detects Next.js. Zero config needed.

## Deploy to Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → New site from Git
3. Build command: `npm run build`
4. Publish directory: `out`
5. Deploy!

## Deploy to GitHub Pages

```bash
npm run build   # generates /out folder
# Push /out folder contents to gh-pages branch
```

## Customization

All content is in one place — edit the `data` object at the top of `pages/index.js`:
- Update `links` with your real LinkedIn/GitHub/GitLab URLs
- Add your project links
- Update the `summary` text
- Add more projects to the `projects` array

## Adding Your Photo

Place `photo.jpg` in `/public/` folder and add this to the Hero section:
```jsx
<img src="/photo.jpg" alt="Ashwin" style={{ width: '200px', borderRadius: '50%' }} />
```
