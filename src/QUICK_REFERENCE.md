# Quick Reference - Contact Section Implementation

## What Was Done

### ✅ 1. Roboto Font (Global)
**Location:** `/styles/globals.css`

Site now uses Roboto font family everywhere.

---

### ✅ 2. Grey Card Headers
**Location:** `/components/Footer.tsx`

Each contact card has:
- Light grey header (`bg-gray-50`)
- Icon + Title
- White body section

```tsx
<CardSpotlight className="-ml-px -mt-px p-0">
  <div className="-mx-px -mb-px -mt-px bg-gray-50 px-8 py-6">
    {/* Icon + Title */}
  </div>
  <div className="px-8 py-6">
    {/* Body content */}
  </div>
</CardSpotlight>
```

---

### ✅ 3. Connected Cards (-1px Spacing)
**Location:** `/components/Footer.tsx`

Cards overlap by 1px using negative margins:

```tsx
<div className="grid md:grid-cols-3">
  <CardSpotlight className="-ml-px -mt-px p-0">
```

**Result:** Borders are shared between cards

---

### ✅ 4. Extended Gridlines

**Current Method:** Negative margins create extended effect

**How to enhance further:**

```tsx
{/* Add inside grid container */}
<div className="pointer-events-none absolute inset-0">
  <div className="absolute left-1/3 top-0 bottom-0 w-px bg-gray-300" />
  <div className="absolute left-2/3 top-0 bottom-0 w-px bg-gray-300" />
</div>
```

This adds explicit vertical lines at column boundaries.

---

## How to Add Explicit Gridlines

If you want stronger visual gridlines that extend to section edges:

### Step 1: Make grid container relative
```tsx
<div className="relative mb-20 grid md:grid-cols-3">
```

### Step 2: Add gridline divs
```tsx
<div className="relative mb-20 grid md:grid-cols-3">
  {/* Gridlines - absolute positioned */}
  <div className="pointer-events-none absolute inset-y-0 left-1/3 w-px bg-gray-300 z-10" />
  <div className="pointer-events-none absolute inset-y-0 left-2/3 w-px bg-gray-300 z-10" />
  
  {/* Cards */}
  <CardSpotlight className="-ml-px -mt-px p-0">
    {/* Card 1 */}
  </CardSpotlight>
  
  <CardSpotlight className="-ml-px -mt-px p-0">
    {/* Card 2 */}
  </CardSpotlight>
  
  <CardSpotlight className="-ml-px -mt-px p-0">
    {/* Card 3 */}
  </CardSpotlight>
</div>
```

### Step 3: Ensure plus signs stay visible
Plus signs are already at `z-20` in CardSpotlight, so they'll appear above gridlines.

---

## Key Classes Reference

### Negative Margins (for border collapse):
- `-ml-px` - margin-left: -1px
- `-mt-px` - margin-top: -1px
- `-mx-px` - margin-left & right: -1px
- `-mb-px` - margin-bottom: -1px

### Positioning (for gridlines):
- `absolute` - position: absolute
- `inset-0` - top, right, bottom, left: 0
- `inset-y-0` - top & bottom: 0
- `left-1/3` - left: 33.333%
- `left-2/3` - left: 66.666%

### Z-index:
- `z-10` - gridlines (lower)
- `z-20` - plus signs (higher, default in CardSpotlight)

### Colors:
- `bg-gray-50` - light grey header background
- `bg-gray-300` - border color
- `bg-gray-700` - plus sign color
- `bg-white` - card body background

---

## Common Patterns

### Full-width section with padding:
```tsx
<div className="w-full px-4 py-20 md:px-8 lg:px-16">
  <div className="mx-auto max-w-7xl">
    {/* Content */}
  </div>
</div>
```

### Card with header and body:
```tsx
<CardSpotlight className="-ml-px -mt-px p-0">
  {/* Header */}
  <div className="-mx-px -mb-px -mt-px bg-gray-50 px-8 py-6">
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5" />
      <h3 className="font-medium">Title</h3>
    </div>
  </div>
  
  {/* Body */}
  <div className="px-8 py-6">
    <div className="mb-16">
      {/* Main content */}
    </div>
    <p className="text-sm text-muted-foreground">
      {/* Footer text */}
    </p>
  </div>
</CardSpotlight>
```

### Rainbow hover link:
```tsx
<RainbowHoverLink
  href="https://github.com/username"
  icon={GithubIcon}
  label="GitHub"
/>
```

---

## Files to Check

1. **Main Footer:** `/components/Footer.tsx`
2. **Global Styles:** `/styles/globals.css`
3. **Card Component:** `/components/ui/card-spotlight.tsx`
4. **Detailed Guide:** `/EXTENDED_GRIDLINES_GUIDE.md`
5. **Full Summary:** `/FOOTER_UPDATES_SUMMARY.md`

---

## Troubleshooting

**Cards not connecting?**
- Ensure `-ml-px -mt-px` is on each card
- Remove any `gap-` classes from grid
- Check grid has no padding between cards

**Grey background not extending?**
- Use `-mx-px -mb-px -mt-px` on header div
- Ensure CardSpotlight has `p-0`

**Plus signs not showing?**
- Already in CardSpotlight component
- Should be visible by default
- Check z-index if adding gridlines

**Gridlines not extending full height?**
- Use `inset-y-0` for top/bottom: 0
- Parent must be `relative` positioned
- Gridlines should be `absolute` positioned
