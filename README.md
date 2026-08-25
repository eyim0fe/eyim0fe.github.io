# Eyimofe Pinnick — Portfolio Website

A clean, minimalist, high-performance portfolio website built with **HTML5, CSS3 (Vanilla), and JavaScript**. Designed specifically for a **Product Manager who codes for fun**, highlighting both product leadership and software engineering capabilities.

---

## ⚡ Quick Start

1. Open `index.html` directly in any web browser, or serve it locally with:
   ```bash
   # Using Python:
   python -m http.server 3000

   # Or using Node (npx):
   npx serve
   ```
2. Visit **`http://localhost:3000`** in your browser.

---

## 📁 File Structure

```
portfolio/
├── index.html          # Main portfolio page (Variant A2: Bold & Flagship Showcase)
├── css/
│   ├── common.css      # Plus Jakarta Sans font, Navy color variables, resets, case study drawer
│   └── variant-a.css   # Main layout, cards, role filter pills, responsive styles
├── js/
│   ├── data.js         # Centralized data file (Edit this to update your bio, projects & links!)
│   └── case-study.js   # Universal sliding drawer for deep-dive case studies
├── assets/
│   └── resume.pdf      # Place your resume PDF here
└── README.md           # Documentation & editing guide
```

---

## 🛠️ How to Customize Your Content

All your personal information, links, and projects are centralized in **`js/data.js`**. You don't need to touch complex HTML or CSS to change your content!

### 1. Update Profile & Contact Links
Open `js/data.js` and modify the `profile` object:
```javascript
profile: {
  name: "Eyimofe Pinnick",
  title: "Product Manager who codes for fun",
  location: "Lagos & Remote",
  shortBio: "I sit at the intersection of product strategy...",
  avatar: "assets/images/my-avatar.jpg", // or SVG / URL
  socials: [
    { name: "LinkedIn", url: "https://linkedin.com/in/your-profile" },
    { name: "GitHub", url: "https://github.com/your-username" },
    { name: "Email", url: "mailto:your-email@example.com" },
    { name: "Resume", url: "assets/resume.pdf", isResume: true }
  ]
}
```

### 2. Add or Edit Projects (Single or Multiple Images)
In `js/data.js`, edit the `projects` array. Each project can specify:
* `id`: Unique identifier (e.g. `"finflow"`)
* `title`: Project name
* `tagline`: 1-line summary
* `roleType`: `"pm"`, `"engineer"`, or `"both"`
* `roleLabel`: Badge label (e.g., `"Product Manager"`)
* `roleDescription`: Summary of your specific contribution
* `stack`: Array of tech tags (e.g., `["Figma", "React", "Python", "Tailwind"]`)
* `image`: Cover image for card thumbnail
* **Single Image vs Multiple Images**:
  ```javascript
  // Option A: Single Image Project
  image: "assets/images/project1.png"

  // Option B: Multiple Images with Slides & Captions
  image: "assets/images/project1-cover.png", // used on card
  images: [
    { src: "assets/images/screen1.png", caption: "Screen 1: Main Dashboard" },
    { src: "assets/images/screen2.png", caption: "Screen 2: Analytics & Cohorts" },
    { src: "assets/images/screen3.png", caption: "Screen 3: Mobile Checkout Flow" }
  ]
  ```
* `isMobile`: `true` or `false` *(Optimizes image scaling and framing for portrait / mobile app screenshots)*
* `inProgress`: `true` or `false` *(Adds an amber "In Progress" badge with a pulsing dot)*
* `hasCaseStudy`: `true` or `false`
* `hasLiveDemo`: `true` or `false`
* `liveUrl`: URL to live product / demo
* `githubUrl`: URL to GitHub repository
* `caseStudy`: Detailed object with `problem`, `solution`, and `myImpact` (bullet points).

---

## 🚀 Free Deployment Options

This portfolio has **zero dependencies** and works out of the box on all static hosting platforms:

### Option 1: GitHub Pages (Recommended)
1. Push your repository to GitHub.
2. Go to **Settings > Pages**.
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Your site is live at `https://<your-username>.github.io/<repo-name>/`.

### Option 2: Vercel / Netlify / Cloudflare Pages
* Simply connect your GitHub repository to [Vercel](https://vercel.com) or [Netlify](https://netlify.com). It will deploy automatically in seconds with zero build settings required!
