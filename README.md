# PixCut S1 — Sticker Machine Guide
### A GitHub Pages site for college students

---

## 📁 Files in this project

```
pixcut-guide/
├── index.html   ← Main webpage (all content lives here)
├── style.css    ← All visual styling
├── script.js    ← Interactivity: accordion, progress bar, animations
└── README.md    ← This file
```

---

## 🚀 How to publish on GitHub Pages (step by step)

### 1. Create a GitHub account
Go to [github.com](https://github.com) and sign up (free).

### 2. Create a new repository
- Click the **+** button → **New repository**
- Name it something like: `sticker-machine-guide`
- Make sure it's set to **Public**
- Click **Create repository**

### 3. Upload the files
- Inside your new repository, click **Add file → Upload files**
- Drag and drop **all three files** (`index.html`, `style.css`, `script.js`)
- Click **Commit changes**

### 4. Enable GitHub Pages
- Go to your repository **Settings** tab
- Scroll down to **Pages** (in the left sidebar)
- Under **Source**, select **Deploy from a branch**
- Set branch to **main** and folder to **/ (root)**
- Click **Save**

### 5. Get your URL
- After 1–2 minutes, GitHub will give you a URL like:
  ```
  https://yourusername.github.io/sticker-machine-guide/
  ```
- That's your live site! 🎉

### 6. Generate a QR code
- Go to [qr.io](https://qr.io) or [qrcode-monkey.com](https://www.qrcode-monkey.com)
- Paste your GitHub Pages URL
- Download the QR code as a PNG
- Print it and attach it to your cardboard display

---

## ✏️ How to edit content later

All text content is inside **index.html**. Open it in any text editor (Notepad, TextEdit, VS Code) and:

- Edit step instructions inside `<div class="step__body">` sections
- Edit FAQ answers inside `<div class="faq-item__a">` sections
- To add a new step, copy an existing `<article class="step">` block and change the `data-step` number

After editing, re-upload the file to GitHub and changes go live within a minute.

---

## 🖼 Suggested cardboard display layout

```
┌──────────────────────────────────┐
│   LIENE PIXCUT S1 STICKER MAKER  │
│   ──────────────────────────────  │
│                                  │
│   Scan for the full guide:       │
│                                  │
│         ┌──────────┐             │
│         │  QR CODE │             │
│         └──────────┘             │
│                                  │
│   Need help? Ask a Tech Tutor!  │
└──────────────────────────────────┘
```
