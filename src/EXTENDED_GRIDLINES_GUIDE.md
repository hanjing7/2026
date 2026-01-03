# Extended Gridlines Guide

## What are Extended Gridlines?

Extended gridlines create visual separation between cards while making them appear connected rather than fully containerized. This is achieved by:

1. **Negative margins** (`-ml-px -mt-px`) to collapse borders between adjacent cards
2. **Border removal on inner edges** to create a seamless grid
3. **Vertical lines** that extend through the entire section

## How to Implement Extended Gridlines

### Option 1: Using Negative Margins (Current Implementation)

The Footer component currently uses this approach:

```tsx
<div className="mb-20 grid md:grid-cols-3">
  <CardSpotlight className="-ml-px -mt-px p-0">
    {/* Card content */}
  </CardSpotlight>
  
  <CardSpotlight className="-ml-px -mt-px p-0">
    {/* Card content */}
  </CardSpotlight>
  
  <CardSpotlight className="-ml-px -mt-px p-0">
    {/* Card content */}
  </CardSpotlight>
</div>
```

**How it works:**
- `-ml-px` (margin-left: -1px) overlaps the left border with the previous card
- `-mt-px` (margin-top: -1px) overlaps the top border with cards above
- This creates a shared border effect, making cards look connected

### Option 2: Adding Vertical Separator Lines

To create stronger visual separation with extending lines:

```tsx
<div className="relative mb-20 grid md:grid-cols-3">
  {/* Vertical gridlines that extend to edges */}
  <div className="pointer-events-none absolute inset-0 z-10">
    <div className="h-full border-r border-gray-300" style={{ marginLeft: '33.333%' }}></div>
    <div className="h-full border-r border-gray-300" style={{ marginLeft: '66.666%' }}></div>
  </div>
  
  <CardSpotlight className="-ml-px -mt-px p-0">
    {/* Card content */}
  </CardSpotlight>
  
  {/* More cards... */}
</div>
```

### Option 3: Full-Width Container with Internal Borders

For a completely connected look:

```tsx
<div className="mb-20 border border-gray-300 bg-white">
  <div className="grid md:grid-cols-3 divide-x divide-gray-300">
    <div className="relative p-0">
      {/* Plus signs */}
      <div className="absolute -left-[6px] -top-[6px] h-3 w-3 z-20">
        <div className="absolute left-0 top-[5px] h-[2px] w-full bg-gray-700" />
        <div className="absolute left-[5px] top-0 h-full w-[2px] bg-gray-700" />
      </div>
      
      {/* Card content with spotlight effect */}
      <div className="bg-gray-50 px-8 py-6 border-b border-gray-300">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5" />
          <h3 className="font-medium">Email</h3>
        </div>
      </div>
      
      <div className="px-8 py-6">
        {/* Card body */}
      </div>
    </div>
    
    {/* Repeat for other cards */}
  </div>
</div>
```

## Current Implementation Benefits

The current negative margin approach (`-ml-px -mt-px`) provides:

✅ **Collapsed borders** - Cards share borders creating a unified grid
✅ **Maintains CardSpotlight** - All hover effects and plus signs work perfectly
✅ **Responsive** - Grid automatically adjusts on mobile
✅ **Clean code** - Minimal changes to existing component structure

## Styling Details

### Card Header Background
Each card header has a light grey background:
```tsx
<div className="-mx-px -mb-px -mt-px bg-gray-50 px-8 py-6">
  {/* Icon + Title */}
</div>
```

The negative margins (`-mx-px -mb-px -mt-px`) ensure the grey background extends to the card edges.

### Grid Spacing
- Grid has no gap between cards (`grid md:grid-cols-3` without gap)
- Each card uses `-ml-px -mt-px` to overlap borders
- Creates seamless, connected appearance

## Tips

1. **Always use `-ml-px -mt-px`** on cards in a grid to collapse borders
2. **Use `p-0`** on CardSpotlight, then apply padding to inner divs
3. **Add `-mx-px`** to internal sections to extend backgrounds to edges
4. **Position: relative** on grid container if adding absolute positioned gridlines
5. **Z-index management** - Plus signs should be above gridlines (z-20 vs z-10)
