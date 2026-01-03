/**
 * ============================================================================
 * ARTICLES DATA MANAGEMENT
 * ============================================================================
 *
 * 📚 数据源策略:
 * 1️⃣ 优先从远端 GitHub JSON 获取 (支持无需重新部署的内容更新)
 * 2️⃣ 失败时使用本地 FALLBACK_ARTICLES (构建时打包，保证永远有数据)
 *
 * 🔄 如何更新内容:
 *
 * 更新远端 (无需重新部署) ⚡️ 推荐用于快速迭代
 * ├─ 1. 去 GitHub: https://github.com/hanjing7/portfolio26/blob/main/articles.json
 * ├─ 2. 点击 "Edit" 按钮 (铅笔图标)
 * ├─ 3. 修改 JSON 内容
 * ├─ 4. Commit changes
 * ├─ 5. 等待 ~5 分钟 (GitHub CDN 缓存)
 * └─ 6. 刷新网站 → 看到新内容 ✅
 *
 * 更新本地 Fallback (需要重新部署) 🔧 推荐用于兜底数据
 * ├─ 1. 编辑 /data/articles-fallback.ts 文件
 * ├─ 2. 保存文件
 * ├─ 3. Figma Make 自动重新构建
 * └─ 4. 新数据生效 ✅
 *
 * 💡 最佳实践: 保持远端 JSON 和本地 fallback 同步
 *
 * ============================================================================
 */

import type { Article } from "./articles";

export const FALLBACK_ARTICLES: Article[] = [
  {
    title: "Make Innovation Aligned with Business Objectives",
    link: "https://hanjing.medium.com/make-innovation-aligned-with-business-objectives-6b085212b4fe",
    excerpt:
      "Innovation is often seen as a double-edged sword. On one hand, we embrace it because it helps us work smarter, accelerate productivity, and build better products...",
    date: "Dec 17, 2025",
    readTime: "5 min read",
    categories: ["Design Management"],
    imageUrl:
      "https://i.pinimg.com/736x/37/45/31/374531b161867a1df074d3a8ace7b5cd.jpg",
  },
  {
    title: "AI Design Interaction Paradigms",
    link: "https://hanjing.medium.com/ai-interaction-paradigms-7caace4593ba",
    excerpt:
      "AI is reshaping digital products not through a single pattern, but across a spectrum of distinct interaction paradigms. Each paradigm carries different assumptions...",
    date: "Dec 10, 2025",
    readTime: "12 min read",
    categories: ["AI"],
    imageUrl:
      "https://i.pinimg.com/736x/04/11/c2/0411c23a397eb6962da17a9e535a3b95.jpg",
    childArticles: [
      {
        title: "Summary Google AI PD Guidelines",
        link: "https://medium.com/@hanjing/ai-product-design-guidelines-42c482e4fe70",
      },
    ],
  },
  {
    title: "Design Delivery Competency",
    link: "https://hanjing.medium.com/designing-empty-states-21fea0085697?postPublishedType=repub",
    excerpt:
      "Scaling UX with Strategic Impact. After stepping into the team manager role, I began exploring how to scale design as a strategic partner in delivery...",
    date: "Aug 7, 2025",
    readTime: "11 min read",
    categories: ["Design Management"],
    imageUrl:
      "https://cdn.gamma.app/07p9lb66qfoscak/ce1cac053fc44914803d361a5a8f06c9/original/image.png",
    childArticles: [
      {
        title: "Self-service Process Checker",
        link: "https://kitten-medium-32121782.figma.site/",
      },
      {
        title: "Processes to Ensure Successful Release",
        link: "https://medium.com/@hanjing/make-a-successful-release-aea33c859b9a",
      },
      {
        title: "RACI Model",
        link: "https://hanjing.medium.com/raci-matrix-for-roles-and-responsibilities-cc41aee4d8b7",
        readTime:
          "Define Roles and Responsibilities in Team Collaboration",
      },
    ],
  },
  {
    title: "Leveraging AI to Boosting Service Attach Rate",
    link: "https://i.pinimg.com/736x/e3/14/fe/e314feebdf1b50529a8a0300962316eb.jpg",
    excerpt:
      "In my recent collaboration with the customer success team, we pinpointed a recurring issue in quoting process: professional services were often overlooked...",
    date: "Nov 2, 2025",
    readTime: "8 min read",
    categories: ["AI", "Mini-Case"],
    imageUrl:
      "https://i.pinimg.com/1200x/6d/5e/8f/6d5e8f493f9583c0946ce7296989db30.jpg",
  },
  {
    title: "Evolving as a Design Leader",
    link: "https://medium.com/@hanjing/evolving-as-a-design-leader",
    excerpt:
      "As a new and emerging design leader, I've been deeply exploring what it truly means to lead—not just people, but purpose. The questions that keep s...",
    date: "Jun 13, 2025",
    readTime: "4 min read",
    categories: ["Design Management"],
    imageUrl:
      "https://i.pinimg.com/1200x/14/34/27/143427b4bdeefdda198ebbba02be74f2.jpg",
    childArticles: [
      {
        title: "Org Hack: Use Glean to build a Org Directory",
        link: "https://hanjing.medium.com/creative-org-people-directory-5095efbc55ce",
      },
    ],
  },
  {
    title: "Amazing Tricks behind our Design System",
    link: "https://hanjing.medium.com/journey-in-building-the-design-system-8e5279a460d1",
    excerpt:
      "Get components done right once allows for scalable growth and efficient design adaptation...",
    date: "Apr 9, 2025",
    readTime: "4 min read",
    categories: ["Design System", "Design Ops"],
    imageUrl:
      "https://i.pinimg.com/1200x/79/6a/a6/796aa667d2073fc40bf7d497e6309221.jpg",
    childArticles: [
      {
        title: "Constructing Design System in Figma Make",
        link: "...",
      },
      {
        title: "Build A Design System for Company",
        link: "https://hanjing.medium.com/build-a-design-system-for-company-1effa5a6652a",
      },
      {
        title: "Don't base on Material Design",
        link: "https://hanjing.medium.com/why-you-shouldnt-use-material-design-as-the-base-of-your-design-system-b0f31c1deb84",
      },
      {
        title: "Book Excerpt of <Storytelling with Data>",
        link: "https://medium.com/design-bootcamp/key-takeaways-with-the-book-storytelling-with-data-e22e54f5583a",
      },
      { title: "Data Viz Library Guidance", link: "..." },
    ],
  },
  {
    title: "Practical CSS Theming Strategies",
    link: "https://www.designsystemscollective.com/practical-css-theming-strategies-37c3700a0d83",
    excerpt:
      "Eliminating style proliferation within the CSS framework....",
    date: "Apr 23, 2025",
    readTime: "4 min read",
    categories: ["Design System"],
    imageUrl:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*qrwloLrlijL075Qp8ZPOpQ.png",
    childArticles: [
      {
        title: "Best Practices for Heading Sizes",
        link: "https://hanjing.medium.com/font-sizing-4259801c04c1",
      },
    ],
  },
  {
    title: "Figma Version Management",
    link: "https://hanjing.medium.com/a-practical-framework-for-figma-version-management-baab2aaa3bbc",
    excerpt:
      "Recently in my project, we ran into a complex design program with two tracks unfolding at once...",
    date: "Aug 23, 2025",
    readTime: "4 min read",
    categories: ["Design Ops", "Design System"],
    imageUrl:
      "https://i.pinimg.com/736x/b1/2c/dc/b12cdc13b705bbdfa184fc730494eb57.jpg",
    childArticles: [
      {
        title: "Figma Practical Tip Note",
        link: "https://hanjing.medium.com/figma-level-up-tip-796eb4bb0e5d",
      },
    ],
  },
  {
    title: "Design Self Check QA List",
    link: "https://hanjing.medium.com/discover-the-glitches-in-your-ux-workflow-eb5ab30cc218?postPublishedType=repub",
    excerpt:
      "UX is about crafting a seamless, trustworthy journey that supports users through every path...",
    date: "Apr 9, 2025",
    readTime: "4 min read",
    categories: ["Design Ops"],
    imageUrl:
      "https://cdn-images-1.medium.com/max/1600/0*1lGLO6pstwxDozUp.jpg",
    childArticles: [
      {
        title: "Capture Edge Cases",
        link: "https://hanjing.medium.com/design-for-the-extreme-91c10dcd2c4e",
      },
      {
        title: "UX issues beyond UI Design",
        link: "https://hanjing.medium.com/ux-issues-that-can-go-wrong-688ecdac23f7",
      },
      {
        title: "Product Metrics to Measure Success",
        link: "https://hanjing.medium.com/is-your-product-successful-ba60721c33f",
      },
    ],
  },
  {
    title: "Figma Make Vibe Coding",
    link: "https://hanjing.medium.com/figma-make-vibe-coding-33169f6b8b4b",
    excerpt:
      "Design Redefined by Vibe Coding. For years, the promise of AI in product design keep on bringing faster iterations...",
    date: "Sep 29, 2025",
    readTime: "10 min read",
    categories: ["AI", "Prototype"],
    imageUrl:
      "https://i.pinimg.com/736x/f1/34/65/f134658dda9ca6b44aabd83163063b10.jpg",
    childArticles: [
      {
        title:
          "Use Midjourney + SVGator to create animated graphical illustration",
        link: "https://hanjing.medium.com/use-midjourney-svgator-to-create-animated-graphical-illustration-58b9e01af83b",
      },
      {
        title: "Product Demo →",
        link: "https://www.youtube.com/shorts/QlnYinFFHqQ",
      },
      {
        title: "Designs",
        link: "https://dribbble.com/shots/25596891-Water-Loadup-customer-account-balance-management",
      },
    ],
  },
  {
    title: "Vibe Coding a Prepaid Account Management App",
    link: "https://hanjing.medium.com/building-an-ai-powered-app-lessons-from-the-trenches-3e1c72c86d70",
    excerpt:
      "Thousands of small business owners across the U.S. face inefficiencies in managing customer profiles...",
    date: "Apr 23, 2025",
    readTime: "4 min read",
    categories: ["AI", "Prototype", "Mini-Case"],
    imageUrl:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*twjzta1VI2pxnqtq8OaJog.png",
    childArticles: [
      {
        title: "Digital Account Solution Research",
        link: "https://medium.com/@hanjing/digitalizing-customer-account-management-5fe223b97c08",
      },
      {
        title: "Product Demo →",
        link: "https://www.youtube.com/shorts/QlnYinFFHqQ",
      },
      {
        title: "Designs →",
        link: "https://dribbble.com/shots/25596891-Water-Loadup-customer-account-balance-management",
      },
    ],
  },
  {
    title: "Write a site with Figma Design, Make, and Site",
    link: "https://hanjing.medium.com/working-seamlessly-across-figma-design-make-and-site-33d59a545cb3",
    excerpt:
      "Few explain how to use them together or even what breaks when you try...",
    date: "Sep 8, 2025",
    readTime: "9 min read",
    categories: ["Prototype"],
    imageUrl:
      "https://cdn-images-1.medium.com/max/1024/1*gUu5_6kivISSq3D1nhR91Q.png",
  },
  {
    title: "Designing Empty States",
    link: "https://medium.com/@hanjing/designing-empty-states-21fea0085697",
    excerpt:
      "Empty states represent powerful moments of opportunity : to guide, delight, inform, or reassure users...",
    date: "May 30, 2025",
    readTime: "4 min read",
    categories: ["Design Ops"],
    imageUrl:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*hxUyvCUYqnD3m_Zy2yq2uQ.png",
    childArticles: [
      {
        title: "Best Practice of the ⓘ Icon",
        link: "https://hanjing.medium.com/best-practice-of-i-icon-ab6713e3aac9",
      },
    ],
  },
  {
    title: "Build a Cost Calculator in Figma",
    link: "https://hanjing.medium.com/build-any-cost-calculator-c37b3375a5c9",
    excerpt:
      "Keep on updating your prototype with latest number? there is actually a smart way to do it!",
    date: "May 30, 2025",
    readTime: "4 min read",
    categories: ["Prototype"],
    imageUrl:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ipA0KDUC1hbJ7_10H0aYPw.png",
    childArticles: [
      { title: "Company's First TCO Product", link: "" },
    ],
  },
  {
    title: "Toastmaster Duty Roles Manager",
    link: "https://hanjing.medium.com/toastmaster-timer-grammarian-and-ah-counter-6fb81a9d54eb",
    excerpt:
      "All in one through a vibe coding tool. Serve in duty roles efficiently...",
    date: "Sep 21, 2025",
    readTime: "6 min read",
    categories: ["Mini-Case", "AI"],
    imageUrl:
      "https://cdn.gamma.app/07p9lb66qfoscak/40ea6dd688b64cc4a19d78c65922c817/original/image.png",
    childArticles: [
      {
        title: "Try it out →",
        link: "https://powder-inter-71780201.figma.site/",
      },
    ],
  },
];