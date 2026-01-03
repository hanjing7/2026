# ✅ Remote Work Data Setup - Action Items

## 🎯 Current Status

✅ **Code refactoring complete**
- `/data/work.ts` now fetches from remote URL first
- Falls back to local data if remote fails
- Detailed validation and error logging added

✅ **Files created:**
- `/data/work-fallback.ts` - Local fallback data
- `/work.json.example` - Template for GitHub
- `/DEBUGGING_REMOTE_DATA.md` - Troubleshooting guide
- `/WORK_DATA_REFACTOR_SUMMARY.md` - Technical details

---

## 📋 Next Steps for You

### Step 1: Create work.json on GitHub ⚡️

1. Go to: https://github.com/hanjing7/portfolio26
2. Click "Add file" → "Create new file"
3. Name it: `work.json`
4. Copy this content (modify as needed):

```json
[
  {
    "id": "sales-proposal-automation",
    "title": "Sales Proposal Automation",
    "description": "A global sales-enablement platform that automates the transition from complex internal data to standardized, high-impact proposals, resulting in a 9% increase in win rates and 3% accelerated deal velocity.",
    "categories": ["Development", "SaaS", "Enterprise"],
    "year": "2 years",
    "images": [
      "https://cdn.gamma.app/07p9lb66qfoscak/37558e68600e474e93832223f0efad9f/original/image.png"
    ],
    "gammaUrl": "https://gamma.app/embed/100dzcfkfdcq576",
    "featuredTag": "Patent: P6515US01"
  },
  {
    "id": "cpq-central-quote",
    "title": "YOUR NEW TITLE HERE",
    "description": "YOUR NEW DESCRIPTION HERE",
    "categories": ["Development", "AI/ML", "Salesforce"],
    "year": "1 year on-going",
    "images": [
      "https://cdn.gamma.app/07p9lb66qfoscak/4a7c19e4704f4e99a3dedba52081db5d/original/image.png"
    ],
    "gammaUrl": "https://gamma.app/embed/luhvaiholalzeot",
    "featuredTag": "UX Design Award Nominated"
  }
]
```

5. Click "Commit new file"

---

### Step 2: Test It 🧪

1. Open your portfolio site
2. Press F12 (open DevTools)
3. Go to "Console" tab
4. Reload the page (Ctrl+Shift+R or Cmd+Shift+R)
5. Look for console messages:

**✅ Success (what you want to see):**
```
✅ [work] Loaded 2 work items from remote URL
```

**⚠️ Fallback (if remote not ready yet):**
```
[work] Remote fetch failed: HTTP 404
⚠️ [work] Using local fallback (2 work items)
```

**❌ Validation Error (if JSON format wrong):**
```
[work] Item X missing required fields: {...}
[work] Remote data validation failed
⚠️ [work] Using local fallback (2 work items)
```

---

### Step 3: Verify Data Changed 🔍

After successful load, check if "CPQ (Central Quote)" now shows your new title.

---

## 🐛 Troubleshooting

### Issue: Still seeing HTTP 404

**Cause:** work.json doesn't exist yet on GitHub

**Solution:** 
1. Double-check you created `work.json` at the root of your repo
2. URL should be accessible: https://raw.githubusercontent.com/hanjing7/portfolio26/main/work.json
3. Open that URL in browser - should show JSON, not 404

---

### Issue: Validation Failed

**Cause:** Missing required fields in JSON

**Solution:** 
Make sure EVERY item has:
- ✅ `"id": "string"`
- ✅ `"title": "string"`
- ✅ `"description": "string"`
- ✅ `"categories": ["string"]` ← Most commonly forgotten!
- ✅ `"year": "string"`

Check console for exact field that's missing:
```
[work] Item 0 missing required fields: {
  id: "string",
  title: "string",
  description: "string",
  categories: "undefined",  <-- Fix this!
  year: "string"
}
```

---

### Issue: Still shows old data after updating work.json

**Cause:** GitHub CDN cache (~5 minutes)

**Solutions:**
1. Wait 5 minutes
2. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Check if raw URL updated: https://raw.githubusercontent.com/hanjing7/portfolio26/main/work.json

---

### Issue: Want to test with verbose logging

**Enable detailed logs:**
1. Open `/data/work.ts`
2. Change: `const DEBUG_VERBOSE = true;`
3. Save and reload
4. You'll see detailed fetch/validation steps

**Disable after debugging:**
1. Change back: `const DEBUG_VERBOSE = false;`
2. Save

---

## 🔧 Quick Fixes

### Test if remote URL is accessible:
```
https://raw.githubusercontent.com/hanjing7/portfolio26/main/work.json
```
Open in browser → Should see JSON

### Test if JSON is valid:
Copy your JSON → Paste at https://jsonlint.com/ → Click "Validate"

### Force use local fallback (for testing):
Edit `/data/work.ts`:
```typescript
const DEBUG_LOCAL_LOAD = true; // Force local
```

---

## 📚 Documentation

- **Troubleshooting:** `/DEBUGGING_REMOTE_DATA.md`
- **Technical Details:** `/WORK_DATA_REFACTOR_SUMMARY.md`
- **JSON Template:** `/work.json.example`

---

## ✨ What You Get

Once working:
- ✅ Update content by editing GitHub JSON
- ✅ No redeployment needed
- ✅ Changes live in ~5 minutes
- ✅ Always has fallback if remote fails
- ✅ Validated data structure

---

## 📞 Current Console Output

When you reload your site now, you should see:

**If work.json doesn't exist yet (404):**
```
[work] Remote fetch failed: HTTP 404
⚠️ [work] Using local fallback (2 work items)
```

**After you create work.json:**
```
✅ [work] Loaded 2 work items from remote URL
```

The console will tell you exactly what's happening! 🎉

---

**Last Updated:** January 2026
**Status:** ✅ Code ready, waiting for GitHub work.json

### Required Fields (MUST be present):
- `id` - Unique identifier
- `title` - Display title
- `description` - Description text
- `year` - Duration/timeframe

### Optional Fields (can be omitted):
- `category` - Single category string (legacy field, rarely used)
- `categories` - Array of category tags (recommended)
- `images` - Array of image URLs
- `gammaUrl` - Link to external presentation
- `featuredTag` - Badge text (e.g., "Patent: P6515US01")