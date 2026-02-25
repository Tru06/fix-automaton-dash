# Repository URL Guide

## ❌ WRONG - GitHub Pages Website URLs

These are deployed websites, NOT repositories:
```
https://h04sh.github.io/portfolio/
https://username.github.io/project-name/
https://mysite.github.io/
```

## ✅ CORRECT - GitHub Repository URLs

These are the actual Git repositories:
```
https://github.com/h04sh/portfolio
https://github.com/username/project-name
https://github.com/facebook/react
https://github.com/vercel/next.js
```

## How to Find Your Repository URL

### Method 1: From GitHub Pages URL
If you have: `https://h04sh.github.io/portfolio/`

The repository URL is: `https://github.com/h04sh/portfolio`

**Pattern**: Replace `username.github.io/repo-name` with `github.com/username/repo-name`

### Method 2: From GitHub Website
1. Go to https://github.com/h04sh (your profile)
2. Click on the repository name (e.g., "portfolio")
3. Copy the URL from browser address bar
4. Should look like: `https://github.com/h04sh/portfolio`

### Method 3: From Repository Page
1. Go to your repository on GitHub
2. Click the green "Code" button
3. Copy the HTTPS URL
4. Remove `.git` at the end if present

## Examples for Your Portfolio

If your GitHub username is `h04sh` and repo is `portfolio`:

```
✅ Correct: https://github.com/h04sh/portfolio
❌ Wrong:   https://h04sh.github.io/portfolio/
```

## Test These Public Repositories

Try these to verify the system works:

```
https://github.com/facebook/react
https://github.com/vercel/next.js
https://github.com/microsoft/vscode
https://github.com/nodejs/node
```

## What Happens Now

When you enter a GitHub Pages URL (`.github.io`), the backend will:
1. Detect it's a website URL
2. Show you the error
3. Suggest the correct repository URL
4. Provide a hint on how to fix it

## Quick Fix

**Your URL**: `https://h04sh.github.io/portfolio/`

**Use This Instead**: `https://github.com/h04sh/portfolio`

Just replace:
- `h04sh.github.io/` → `github.com/h04sh/`
