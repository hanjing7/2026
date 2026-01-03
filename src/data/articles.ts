import { FALLBACK_ARTICLES } from "./articles-fallback";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface Article {
  title: string;
  link: string;
  excerpt: string;
  date: string;
  readTime: string;
  categories: string[];
  imageUrl: string;
  childArticles?: ChildArticle[];
}

export interface ChildArticle {
  title: string;
  link: string;
  readTime?: string;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

// 远端 GitHub JSON URL
// 你也可以使用环境变量 VITE_ARTICLES_URL 来覆盖这个默认值
// 注意：不能用"https://github.com/hanjing7/portfolio26/blob/main/articles.json"，
// 因为返回的不是纯数据，会有网页，导致无法解析
const REMOTE_URL =
  (typeof import.meta !== "undefined" &&
    (import.meta as any).env?.VITE_ARTICLES_URL) ||
  "https://raw.githubusercontent.com/hanjing7/portfolio26/main/articles.json";

const FETCH_TIMEOUT_MS = 5000; // 5秒超时

const DEBUG_LOCAL_LOAD = false; // true: 测试本地fallback loading
// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * 标准化数据格式 - 支持多种 JSON 结构
 */
function normalizeToArray(data: unknown): Article[] {
  // 如果直接就是数组
  if (Array.isArray(data)) {
    return data as Article[];
  }

  // 如果是对象，尝试提取数组
  if (data && typeof data === "object") {
    const obj = data as any;

    // 支持 { articles: [...] } 格式
    if (Array.isArray(obj.articles)) {
      return obj.articles as Article[];
    }

    // 支持 { default: [...] } 格式 (某些打包工具会用这个)
    if (Array.isArray(obj.default)) {
      return obj.default as Article[];
    }
  }

  // 无法解析，返回空数组
  console.warn(
    "[articles] Unable to normalize data structure:",
    data,
  );
  return [];
}

/**
 * 验证文章数组的数据结构是否有效
 */
function isValidArticlesArray(
  arr: unknown[],
): arr is Article[] {
  if (!Array.isArray(arr) || arr.length === 0) {
    return false;
  }

  // 检查每一项是否符合 Article 接口
  return arr.every((item) => {
    if (!item || typeof item !== "object") return false;

    const article = item as any;

    // 验证必填字段
    const hasRequiredFields =
      typeof article.title === "string" &&
      typeof article.link === "string" &&
      typeof article.excerpt === "string" &&
      typeof article.date === "string" &&
      typeof article.readTime === "string" &&
      Array.isArray(article.categories) &&
      typeof article.imageUrl === "string";

    if (!hasRequiredFields) return false;

    // 验证可选的 childArticles
    if (article.childArticles !== undefined) {
      if (!Array.isArray(article.childArticles)) return false;

      return article.childArticles.every(
        (child: any) =>
          child &&
          typeof child === "object" &&
          typeof child.title === "string" &&
          typeof child.link === "string",
      );
    }

    return true;
  });
}

/**
 * 从远端 URL 获取数据
 */
async function fetchRemoteArticles(): Promise<
  Article[] | null
> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      FETCH_TIMEOUT_MS,
    );

    const response = await fetch(
      `${REMOTE_URL}?t=${Date.now()}`,
      {
        signal: controller.signal,
        cache: "no-store",
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(
        `[articles] Remote fetch failed: HTTP ${response.status}`,
      );
      return null;
    }

    const data = await response.json();
    const articles = normalizeToArray(data);

    if (isValidArticlesArray(articles)) {
      console.log(
        `✅ [articles] Loaded ${articles.length} articles from remote URL`,
      );
      return articles;
    } else {
      console.warn("[articles] Remote data validation failed");
      return null;
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.warn(
        `[articles] Fetch timeout after ${FETCH_TIMEOUT_MS}ms`,
      );
    } else {
      console.warn("[articles] Fetch error:", error);
    }
    return null;
  }
}

// ============================================================================
// PUBLIC API
// ============================================================================

/**
 * 获取文章列表
 *
 * 策略：
 * 1. 尝试从远端 GitHub 获取
 * 2. 失败则使用本地 FALLBACK_ARTICLES
 * 3. 保证永远返回有效数据
 *
 * @returns Promise<Article[]> - 文章列表（永远不会为空）
 */
export async function fetchArticles(): Promise<Article[]> {
  // 1️⃣ 尝试远端
  const remoteArticles = await fetchRemoteArticles();
  if (remoteArticles && !DEBUG_LOCAL_LOAD) {
    return remoteArticles;
  }

  // 2️⃣ 使用 fallback
  console.log(
    `⚠️ [articles] Using local fallback (${FALLBACK_ARTICLES.length} articles)`,
  );
  return FALLBACK_ARTICLES;
}

/**
 * 直接导出 fallback 数据（用于调试或同步场景）
 */
export const fallbackArticles: Article[] = FALLBACK_ARTICLES;