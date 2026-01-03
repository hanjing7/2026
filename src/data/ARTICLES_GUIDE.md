# Articles Database Guide

## 📝 How to Add New Articles

Simply edit `/data/articles.ts` and add new entries to the `articles` array.

## 📋 Article Template

Copy and paste this template for each new article:

```typescript
{
  title: "Your Article Title Here",
  link: "https://medium.com/@hanjing/your-article-slug",
  excerpt: "A brief 1-2 sentence description of your article that will appear on the card...",
  date: "Dec 9, 2025",
  readTime: "5 min read",
  categories: ["category1", "category2", "category3"],
  imageUrl: "https://your-image-url.com/image.jpg"
}
```

**Important:** Add a comma after the previous article entry before adding a new one!

## 🏷️ Category Guidelines

**Current Categories:**
- `ux` - User Experience design
- `design-management` - Design leadership and management
- `rapid-prototyping` - Fast design iterations
- `generative-ai-tools` - AI-powered design tools
- `figma-sites` - Figma Sites specific
- `figmadesign` - General Figma design
- `product-lifecycle` - Product development process

**Adding New Categories:**
- Use lowercase with hyphens (e.g., `user-research`)
- Be consistent with naming
- Categories automatically appear as filter buttons

## 🖼️ Image URLs

You can use:
1. **Your actual Medium article image** - Right-click on the image in your Medium article → "Copy Image Address"
2. **Unsplash placeholder** - `https://images.unsplash.com/photo-[ID]?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080`
3. **Custom hosted images** - Any publicly accessible image URL

## 📅 Date Format

Use: `"Month Day, Year"` format
- Examples: `"Dec 9, 2025"`, `"Jan 15, 2024"`, `"Aug 7, 2025"`

## ⏱️ Read Time Format

Use: `"X min read"` format
- Examples: `"5 min read"`, `"10 min read"`, `"15 min read"`

## ✅ Example Addition

To add a new article, open `/data/articles.ts` and add a comma after the last article, then add:

```typescript
    {
      title: "Designing for Accessibility",
      link: "https://medium.com/@hanjing/designing-for-accessibility",
      excerpt: "Exploring inclusive design practices that make digital products accessible to everyone, regardless of their abilities or circumstances...",
      date: "Dec 15, 2025",
      readTime: "8 min read",
      categories: ["ux", "accessibility", "design-management"],
      imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    }
```

## 🔧 Pro Tips

1. **Always validate JSON** - Use a JSON validator if you're unsure about formatting
2. **Don't forget commas** - Each article entry needs a comma after it (except the last one)
3. **Categories are case-sensitive** - Use lowercase consistently
4. **Test locally** - Add one article at a time to ensure it displays correctly
5. **Keep excerpts concise** - Aim for 120-200 characters for best visual layout

## 📊 Current Status

Total Articles: 4
Categories: 7 unique categories