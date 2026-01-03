# 🔧 Gamma Embedding Troubleshooting

## Issue: Gamma Presentation Not Showing

### ✅ What's Working
- The case study page loads
- Navigation works
- All UI elements show up
- Rainbow button appears on hover

### ❌ What's Not Working
The Gamma iframe doesn't load or shows a blank white box.

---

## 🎯 Solution: Use the Correct Embed URL

### Current URL Format (❌ WRONG):
```
https://gamma.app/docs/Revolutionizing-Sales-Process-with-100dzcfkfdcq576?mode=present#card-wze7gykfc0sjzb6
```

**Why it doesn't work:**
- This is a **viewing/sharing URL**, not an **embed URL**
- Gamma blocks `/docs/` URLs from being embedded in iframes for security reasons
- The `?mode=present#card-xxx` parameters are for direct viewing, not embedding

### Required URL Format (✅ CORRECT):
```
https://gamma.app/embed/100dzcfkfdcq576
```

**Why this works:**
- This is the **official embed URL** from Gamma
- Specifically designed for iframe embedding
- Has proper CORS headers and permissions

---

## 📋 Step-by-Step Fix

### 1. Open Your Gamma Presentation
Go to: https://gamma.app/

### 2. Click the "Share" Button
- Located in the top-right corner of your presentation
- Opens the sharing dialog

### 3. Click the "Embed" Tab
- **NOT** the "Link" tab
- The Embed tab shows an `<iframe>` code snippet

### 4. Copy the URL from the Iframe Code
You'll see something like:
```html
<iframe src="https://gamma.app/embed/YOUR-ID-HERE" ...></iframe>
```

Copy just the URL part: `https://gamma.app/embed/YOUR-ID-HERE`

### 5. Update Your Data File

**For Projects:**
Edit `/data/projects.ts` and replace the `gammaUrl` value

**For Work Items:**
Edit `/data/work.ts` and replace the `gammaUrl` value

---

## 🎨 Example Fix

### Before (Not Working):
```typescript
{
  id: "sales-proposal-automation",
  title: "Sales Proposal Automation",
  gammaUrl: "https://gamma.app/docs/Revolutionizing-Sales-Process-with-100dzcfkfdcq576?mode=present#card-wze7gykfc0sjzb6",
  // ❌ This won't work in iframe
}
```

### After (Working):
```typescript
{
  id: "sales-proposal-automation",
  title: "Sales Proposal Automation",
  gammaUrl: "https://gamma.app/embed/100dzcfkfdcq576",
  // ✅ This will work in iframe
}
```

---

## 🔍 How to Check If It's Working

### 1. Open Browser Console
- Press `F12` or right-click → "Inspect"
- Go to the "Console" tab

### 2. Click on a Project/Work Card
Navigate to the case study page

### 3. Look for Debug Info
You should see:
```
Case Study Debug: {
  id: "sales-proposal-automation",
  gammaUrl: "https://gamma.app/embed/100dzcfkfdcq576",
  embedUrl: "https://gamma.app/embed/100dzcfkfdcq576",
  hasEmbedUrl: true
}
```

✅ **If `hasEmbedUrl: true`** → The URL format is correct
❌ **If `hasEmbedUrl: false`** → The URL format is wrong

### 4. Check for Iframe Errors
Look for any red error messages in the console related to:
- `X-Frame-Options`
- `Content-Security-Policy`
- `Refused to display`

---

## 🚨 Common Issues

### Issue 1: "Still seeing placeholder message"
**Cause:** URL is still set to `"YOUR_GAMMA_URL_HERE"`
**Fix:** Replace with actual Gamma embed URL

### Issue 2: "White box / blank iframe"
**Cause:** Using `/docs/` URL instead of `/embed/` URL
**Fix:** Get the embed URL from Share → Embed tab

### Issue 3: "Iframe blocked by browser"
**Cause:** Gamma presentation is not set to public/shareable
**Fix:** 
1. Go to your Gamma presentation
2. Click Share
3. Set permissions to "Anyone with the link can view"
4. Make sure embedding is enabled in Gamma settings

### Issue 4: "Can see loading indicator but nothing loads"
**Cause:** Gamma server might be blocking the request
**Fix:** 
1. Check browser console for CORS errors
2. Verify the presentation URL works when opened directly
3. Try generating a new share link in Gamma

---

## 💡 Auto-Conversion Feature

The code **automatically tries** to convert `/docs/` URLs to `/embed/` URLs:

```typescript
// If you provide this:
"https://gamma.app/docs/Title-abc123xyz"

// It will try to convert to:
"https://gamma.app/embed/abc123xyz"
```

**However**, it's best to use the official embed URL from Gamma's Embed dialog to ensure it works correctly.

---

## 📞 Still Not Working?

### Debug Checklist:
- [ ] Using `/embed/` URL (not `/docs/`)
- [ ] Gamma presentation is public/shareable
- [ ] No browser console errors
- [ ] Tried in a different browser
- [ ] Tried generating a new share/embed link in Gamma

### Test the URL Directly:
1. Copy your `gammaUrl` value
2. Open a new browser tab
3. Paste the URL in the address bar
4. If it doesn't load directly, it won't work in an iframe

---

## ✅ Final Check

Your URL should look **exactly** like this:
```
https://gamma.app/embed/[YOUR-PRESENTATION-ID]
```

**NOT** like any of these:
- ❌ `https://gamma.app/docs/...`
- ❌ `...?mode=present`
- ❌ `...#card-xxx`
- ❌ `https://gamma.app/public/...`

---

## 🎉 Success Indicators

When working correctly, you should see:
1. ✅ Rainbow button appears on card hover
2. ✅ Case study page loads with header info
3. ✅ Gamma presentation loads in the iframe
4. ✅ You can interact with the presentation (scroll, click, etc.)
5. ✅ No error messages in browser console
6. ✅ "Loading: https://gamma.app/embed/..." indicator appears briefly

---

**Need more help?** Share the exact URL you're using and any console errors you see!
