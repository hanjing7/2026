/**
 * ============================================================================
 * WORK ITEMS FALLBACK DATA
 * ============================================================================
 * 
 * 💾 这是本地兜底数据，当远端 GitHub JSON 加载失败时使用
 * 
 * 📝 如何更新这个文件:
 * 1. 直接编辑下面的 FALLBACK_WORK_ITEMS 数组
 * 2. 保存文件
 * 3. Figma Make 会自动重新构建
 * 4. 新数据生效 ✅
 * 
 * 💡 最佳实践:
 * - 保持这个文件和 GitHub 的 work.json 内容同步
 * - 这样即使远端挂了，用户也能看到最新内容
 * 
 * ============================================================================
 */

import type { WorkItem } from './work';

export const FALLBACK_WORK_ITEMS: WorkItem[] = [
  {
    id: "sales-proposal-automation",
    title: "Sales Proposal Automation",
    description: `A global sales-enablement platform that automates the transition from complex internal data to standardized, high-impact proposals, resulting in a 9% increase in win rates and 3% accelerated deal velocity.`,
    images: [
      "https://cdn.gamma.app/07p9lb66qfoscak/37558e68600e474e93832223f0efad9f/original/image.png"
    ],
    category: "Development, SaaS",
    categories: ["Development", "SaaS", "Enterprise"],
    year: "2 years",
    gammaUrl: "https://gamma.app/embed/100dzcfkfdcq576",
    featuredTag: "Patent: P6515US01",
  },
  {
    id: "cpq-central-quote",
    title: "CPQ (Central Quote)",
    description: `Designed a guided selling system within Salesforce, integrated with CRM and ERP platforms to scale up deal volume.`,
    images: [
      "https://cdn.gamma.app/07p9lb66qfoscak/4a7c19e4704f4e99a3dedba52081db5d/original/image.png",
    ],
    category: "Development, AI/ML",
    categories: ["Development", "AI/ML", "Salesforce"],
    year: "1 year on-going",
    gammaUrl: "https://gamma.app/embed/luhvaiholalzeot",
    featuredTag: "UX Design Award Nominated",
  }
];
