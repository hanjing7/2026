# 🎯 Gamma Case Study Setup Guide

## 📋 How to Get Your Gamma Embed URLs

### Step 1: Open Your Gamma Presentation
Go to your Gamma presentation that you want to embed.

### Step 2: Get the Embed Link
1. Click the **Share** button in the top right
2. Click the **Embed** tab
3. Copy the URL from the iframe code (it will look like this):
   ```
   https://gamma.app/embed/YOUR-PRESENTATION-ID
   ```

**⚠️ IMPORTANT:** 
- ✅ Use the `/embed/` URL format (from the Embed tab)
- ❌ Don't use the `/docs/` URL (regular sharing link won't work in iframes)

### Example of correct format:
```
✅ CORRECT: https://gamma.app/embed/abc123xyz
❌ WRONG:   https://gamma.app/docs/My-Presentation-abc123xyz?mode=present
```

The code will automatically try to convert `/docs/` URLs to `/embed/`, but it's best to use the proper embed URL from Gamma's Embed tab.

### Step 3: Add to Your Data Files

---

## 📝 For Projects (Featured Projects Section)

Edit `/data/projects.ts` and replace `"YOUR_GAMMA_URL_HERE"` with your actual Gamma embed URL.

### Example:
```typescript
{
  id: "new-product-introduction",
  title: "New Product Introduction",
  description: `...`,
  tags: [...],
  imageUrl: "...",
  gammaUrl: "https://gamma.app/embed/abc123xyz", // ← Replace this
  featuredTag: "Enterprise SaaS",
}
```

---

## 📝 For Work Items (My Work Section)

Edit `/data/work.ts` and replace `"YOUR_GAMMA_URL_HERE"` with your actual Gamma embed URL.

### Example:
```typescript
{
  id: "sales-proposal-automation",
  title: "Sales Proposal Automation",
  description: `...`,
  imageUrl: "...",
  category: "Development, SaaS",
  year: "2023",
  gammaUrl: "https://gamma.app/embed/def456uvw", // ← Replace this
  featuredTag: "10K+ Users",
}
```

---

## ✅ Current Items to Update

### Projects (6 items):
- [ ] **new-product-introduction** - New Product Introduction
- [ ] **pure-as-a-service** - Pure as a Service
- [ ] **partner-portal** - Partner Portal
- [ ] **flasharray-redesign** - FlashArray Redesign
- [ ] **use-ai-sell-best-price** - Use AI to Sell at the Best Price
- [ ] **injecting-enterprise-ai-lms** - Injecting Enterprise AI in LMS

### Work Items (2 items):
- [ ] **sales-proposal-automation** - Sales Proposal Automation
- [ ] **cpq-central-quote** - CPQ (Central Quote)

---

## 🎨 Featured Tags

I've added the following **featured tags** to your items. You can customize these:

### Projects:
- "Enterprise SaaS" - New Product Introduction
- "B2B Platform" - Pure as a Service
- "Award Winner" - Partner Portal
- "UI/UX Redesign" - FlashArray Redesign
- "AI/ML" - Use AI to Sell at the Best Price
- "Enterprise AI" - Injecting Enterprise AI in LMS

### Work Items:
- "10K+ Users" - Sales Proposal Automation
- "AI-Powered" - CPQ (Central Quote)

**To change a tag**, just edit the `featuredTag` field:
```typescript
featuredTag: "Your Custom Tag Here"
```

**To remove a tag**, delete the line or set it to `undefined`:
```typescript
featuredTag: undefined,
```

---

## 🔧 Troubleshooting

### Gamma presentation not showing?
1. Make sure you're using the **embed** URL, not the regular sharing URL
2. Check that your Gamma presentation is set to **Public** or **Anyone with the link**
3. The URL should start with `https://gamma.app/`

### Placeholder still showing?
If you see "Gamma presentation will be embedded here", it means the URL hasn't been updated from `"YOUR_GAMMA_URL_HERE"`.

---

## 🚀 How It Works

### User Experience:
1. User hovers over a project/work card → Sees "View Case Study" button
2. User clicks card → Navigates to dedicated case study page
3. **Floating navigation always visible** at top with Back and Home buttons
4. Gamma presentation embedded in full-screen iframe
5. User can interact with Gamma presentation (scroll, click, etc.)
6. User clicks Back → Returns to main site

### What Shows on Case Study Page:
- ✅ Floating navigation (always on top)
- ✅ Project/Work title
- ✅ Featured tag badge (orange)
- ✅ Category and year (for work items)
- ✅ Description
- ✅ Full embedded Gamma presentation

---

## 📊 Need Help?

Just provide me with your Gamma URLs in this format:

```
Project: "New Product Introduction"
Gamma URL: https://gamma.app/embed/YOUR-URL-HERE
```

And I'll update the files for you! 🎉