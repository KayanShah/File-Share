<div align="center">

# FileShare

**Fast, free, no-friction file sharing — built for everyone, not just enterprises.**

[![Live Site](https://img.shields.io/badge/Live%20Site-file--sharing--psi--seven.vercel.app-4f8ef7?style=for-the-badge&logo=vercel&logoColor=white)](https://fileshare.kayanshah.com/)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2014-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

Built by [Kayan Shah](https://github.com/kayanshah)

</div>

---

## ✦ Why FileShare?

Most file sharing services either cost money, throttle download speeds, force recipients to sign up, or show them a wall of ads before they can access a file.

**FileShare solves all of that.**

Upload a file. Get a link. Anyone clicks it and downloads instantly — no account, no paywall, no waiting. The entire platform costs £0 to run on Vercel's free tier.

---

## ✦ Features

| | Feature |
|---|---|
| 🔗 | **Direct share links** — every file gets a clean `/file/filename` URL you can send to anyone |
| 👁️ | **In-browser previews** — PDF, image, video, audio, and Office files preview before downloading |
| 📱 | **Mobile downloads** — server-side `Content-Disposition` headers ensure downloads work on iOS and Android |
| 🔒 | **Protected admin panel** — only authorised users can manage files; recipients need no account |
| ⚡ | **Vercel CDN** — files served from Vercel's global edge network for fast downloads worldwide |
| 🗂️ | **File metadata** — filename, size, and upload date visible at a glance in the dashboard |
| 💀 | **Deletion handling** — deleted files show a clean error page rather than a broken link |
| 🖥️ | **Terminal aesthetic** — minimal, distraction-free UI built entirely in pure CSS |

---

## ✦ Supported preview formats

| Format | Preview method |
|---|---|
| PDF | Native browser PDF viewer (embedded) |
| PNG, JPG, JPEG, GIF, WebP | `<img>` tag |
| MP4, MOV, WebM | `<video>` player with controls |
| MP3, WAV, AAC, M4A | `<audio>` player with controls |
| DOCX, PPTX, XLSX | Google Docs Viewer (embedded iframe) |
| Everything else | Download button only |

---

## ✦ How it works

```
1. Admin commits a file to public/uploads/ in GitHub
2. Vercel auto-deploys in ~30 seconds
3. File is live at /uploads/filename (static CDN asset)
4. Admin copies the share link from the dashboard: /file/filename
5. Recipient opens the link → previews the file → clicks Download
6. No sign-up. No ads. No friction.
```

---

## ✦ Tech stack

```
Framework   →  Next.js 14 (Pages Router, API Routes, getServerSideProps)
Upload      →  Formidable — multipart file handling
Styling     →  Pure CSS — no Tailwind, no component libraries
Font        →  JetBrains Mono
Hosting     →  Vercel — zero-config deploy, global CDN
Storage     →  public/uploads/ — committed to GitHub, served as static assets
```

---

## ✦ Project structure

```
fileshare/
├── pages/
│   ├── index.js                  ← Homepage
│   ├── admin.js                  ← File manager dashboard (login-gated)
│   ├── login.js                  ← Admin login
│   ├── about.js                  ← About page
│   ├── contact.js                ← Contact page
│   ├── file/
│   │   └── [filename].js         ← File preview + download page
│   └── api/
│       ├── upload.js             ← File upload handler
│       ├── files.js              ← File list API
│       └── download/
│           └── [filename].js     ← Forced download (mobile-safe)
├── components/
│   └── Layout.js                 ← Sidebar, nav, footer
├── public/
│   └── uploads/                  ← Files served as static assets
└── styles/
    └── globals.css               ← All styles
```

---

## ✦ Local development

```bash
# Clone the repo
git clone https://github.com/KayanShah/File-Sharing.git
cd File-Sharing

# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000
```

---

## ✦ Deploying your own instance

1. Fork this repo
2. Import it into [Vercel](https://vercel.com) — auto-detects Next.js, zero config needed
3. Every `git push` to `main` triggers a redeploy automatically

**Cost: £0.** Vercel's free tier covers everything for personal and small-team use.

---

## ✦ Uploading files

Files are committed directly to `public/uploads/` in GitHub:

1. Go to your GitHub repo → `public/uploads/`
2. Click **Add file → Upload files**
3. Drop your files in and commit
4. Vercel auto-deploys in ~30 seconds
5. File is live — copy the share link from the admin dashboard

> GitHub's web UI supports files up to **25 MB**. For larger files, commit via terminal or use Git LFS.

---

## ✦ Credentials

| Field    | Value          |
|----------|----------------|
| Username | `KayanShah`    |
| Password | `FileSharing`  |

Change these in `pages/login.js`.

---

## ✦ Access

Only admins can upload files. If you'd like upload access, [contact us](https://file-sharing-psi-seven.vercel.app/contact).

Recipients never need an account — just a link.

---

## ✦ About

FileShare was built out of frustration with existing file sharing tools. Services like WeTransfer limit file sizes unless you pay. Google Drive forces recipients to log in. Dropbox shows ads. SendSpace throttles speeds.

The goal was simple: a platform where sharing a file is as frictionless as sending a text message — free, fast, and permanent.

---

<div align="center">

<br/>

Made by **[Kayan Shah](https://github.com/kayanshah)**

<br/>

</div>
