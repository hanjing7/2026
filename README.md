# jh_portfolio26

This repository contains the source code for my portfolio and UI components.
The project is built with **Vite + React + TypeScript** and deployed via **GitHub Pages**.

Design source (Figma):
https://www.figma.com/design/rdA7AnMtOc3zoAs1kUsgFP/Add-Display-Cards-Component

---

## Project Structure

- `src/` – React / TypeScript source code
- `index.html` – Vite entry file
- `vite.config.ts` – Vite configuration (includes GitHub Pages base path)
- `build/` – Production build output (generated, not committed)
- `gh-pages` branch – Deployment branch (auto-generated)

- 项目 condig 源头: https://github.com/hanjing7/portfolio26

---

## Local Development (Run on localhost)

### Install dependencies

```bash
npm install
```

If you encounter dependency issues:

```bash
rm -rf node_modules package-lock.json
npm cache verify
npm install

```

Start development server

```bash
npm run dev
```

Open in browser:
http://localhost:3000

### Update Code (Normal Workflow)

```bash
git add .
git commit -m "update content or layout"
git push origin main
```

## Deploy (Publish to GitHub Pages)

Build and deploy

```bash
npm run deploy
```

Live Site
https://hanjing7.github.io/jh_portfolio26/
Or
https://hanjing7.github.io/2026/
