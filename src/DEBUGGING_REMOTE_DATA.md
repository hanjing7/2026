# Debugging Remote Data Loading

## 🔍 How to Debug

### Step 1: Check Browser Console
Open your browser's Developer Tools (F12) and look at the Console tab. You should see one of these:

#### ✅ **Success (Remote data loaded)**
```
[work] Attempting to fetch from: https://raw.githubusercontent.com/hanjing7/portfolio26/main/work.json
[work] Remote data received: [{...}, {...}]
[work] Normalized to 2 items
✅ [work] Loaded 2 work items from remote URL
```

#### ⚠️ **Fallback (Using local data)**
```
[work] Attempting to fetch from: https://raw.githubusercontent.com/hanjing7/portfolio26/main/work.json
[work] Remote fetch failed: HTTP 404
⚠️ [work] Using local fallback (2 work items)
```

#### ❌ **Validation Failed (Remote data has wrong format)**
```
[work] Attempting to fetch from: https://raw.githubusercontent.com/...
[work] Remote data received: [{...}]
[work] Normalized to 2 items
[work] Item 0 missing required fields: {...}
[work] Validation failed for 1 items
[work] Remote data validation failed
⚠️ [work] Using local fallback (2 work items)
```

---

## 📝 Common Issues

### Issue 1: HTTP 404 - File Doesn't Exist
**Symptom:**
```
[work] Remote fetch failed: HTTP 404
```

**Solution:**
1. Go to your GitHub repo: https://github.com/hanjing7/portfolio26
2. Check if `work.json` exists in the root
3. If not, create it with the correct format (see below)

---

### Issue 2: Validation Failed - Wrong Data Structure
**Symptom:**
```
[work] Item 0 missing required fields: {
  id: "string",
  title: "string", 
  description: "string",
  category: "undefined",  <-- ⚠️ This is the problem!
  year: "string"
}
```

**Solution:**
Make sure EVERY item in your `work.json` has all required fields:
- ✅ `id` (string)
- ✅ `title` (string)
- ✅ `description` (string)
- ✅ `category` (string) ← Often forgotten!
- ✅ `year` (string)

---

### Issue 3: Invalid JSON Syntax
**Symptom:**
```
[work] Fetch error: SyntaxError: Unexpected token...
```

**Solution:**
Validate your JSON at https://jsonlint.com/
Common mistakes:
- ❌ Trailing comma in last array item
- ❌ Missing quotes around strings
- ❌ Single quotes instead of double quotes
- ❌ Missing commas between items

---

## 📄 Correct work.json Format

```json
[
  {
    "id": "sales-proposal-automation",
    "title": "Sales Proposal Automation",
    "description": "A global sales-enablement platform...",
    "category": "Development, SaaS",
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
    "title": "Different Title Here",
    "description": "Different description...",
    "category": "Development, AI/ML",
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

---

## 🧪 Test Your Changes

### 1. Create/Update work.json on GitHub
```
1. Go to: https://github.com/hanjing7/portfolio26
2. Create or edit work.json
3. Paste the correct JSON format
4. Commit changes
```

### 2. Clear Cache & Reload
```
1. Open your site
2. Press Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. This forces a hard refresh, bypassing cache
```

### 3. Check Console
```
1. Press F12 to open DevTools
2. Go to Console tab
3. Look for [work] messages
4. Should see: "✅ [work] Loaded X work items from remote URL"
```

### 4. Verify Data Changed
Check if the title "CPQ (Central Quote)" shows the new value you set in work.json

---

## 🔧 Debugging Flags

### Force Local Fallback (for testing)
Edit `/data/work.ts`:
```typescript
const DEBUG_LOCAL_LOAD = true; // Force use local data
```

This is useful to test that your local fallback data is correct.

### Change Remote URL (for testing)
Edit `/data/work.ts`:
```typescript
const REMOTE_URL = "https://your-test-url.com/work.json";
```

---

## 📊 Data Flow

```
App.tsx loads
    ↓
useEffect() calls fetchWork()
    ↓
fetchWork() calls fetchRemoteWorkItems()
    ↓
Try fetch from GitHub
    ↓
    ├─ HTTP 200? → Parse JSON
    │               ↓
    │           Validate schema
    │               ↓
    │               ├─ Valid? → ✅ Return remote data
    │               └─ Invalid? → ⚠️ Use fallback
    │
    └─ HTTP 404? → ⚠️ Use fallback
```

---

## 🚨 Still Not Working?

1. **Check the exact URL being fetched:**
   - Look for: `[work] Attempting to fetch from: ...`
   - Copy that URL
   - Open it in a new browser tab
   - Should see raw JSON (not HTML page)

2. **Check CORS headers:**
   - GitHub raw.githubusercontent.com should allow CORS
   - If using a different host, check CORS settings

3. **Check GitHub CDN cache:**
   - GitHub caches for ~5 minutes
   - Wait a few minutes after editing work.json
   - Or add timestamp to URL: `work.json?t=123456`

4. **Verify JSON structure:**
   - Copy your work.json content
   - Paste into https://jsonlint.com/
   - Fix any syntax errors

---

## 📱 Quick Test Commands

### Test if remote URL is accessible:
Open this in browser:
```
https://raw.githubusercontent.com/hanjing7/portfolio26/main/work.json
```

Expected: You see JSON data
If 404: File doesn't exist yet

### Test if JSON is valid:
```bash
curl https://raw.githubusercontent.com/hanjing7/portfolio26/main/work.json | python -m json.tool
```

Expected: Pretty-printed JSON
If error: Invalid JSON syntax

---

## 📚 Related Files

- `/data/work.ts` - Main logic & configuration
- `/data/work-fallback.ts` - Local fallback data
- `/work.json.example` - Template for GitHub

---

**Last Updated:** January 2026