import { FALLBACK_WORK_ITEMS } from "./work-fallback";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface WorkItem {
  id: string;
  title: string;
  description: string;
  images?: string[]; // Array of images for featured layout
  category?: string; // Optional - kept for backward compatibility with CaseStudyPage
  categories?: string[]; // Array of categories
  year: string;
  gammaUrl?: string;
  featuredTag?: string;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

// 远端 GitHub JSON URL
// 你也可以使用环境变量 VITE_WORK_URL 来覆盖这个默认值
// 注意：不能用"https://github.com/hanjing7/portfolio26/blob/main/work.json"，
// 因为返回的不是纯数据，会有网页，导致无法解析
const REMOTE_URL =
  (typeof import.meta !== "undefined" &&
    (import.meta as any).env?.VITE_WORK_URL) ||
  "https://raw.githubusercontent.com/hanjing7/portfolio26/main/work.json";

const FETCH_TIMEOUT_MS = 5000; // 5秒超时

const DEBUG_LOCAL_LOAD = false; // true: 测试本地fallback loading
const DEBUG_VERBOSE = false; // true: 显示详细的调试信息

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * 标准化数据格式 - 支持多种 JSON 结构
 */
function normalizeToArray(data: unknown): WorkItem[] {
  // 如果直接就是数组
  if (Array.isArray(data)) {
    return data as WorkItem[];
  }

  // 如果是对象，尝试提取数组
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;

    // 支持 { workItems: [...] } 格式
    if (Array.isArray(obj.workItems)) {
      return obj.workItems as WorkItem[];
    }

    // 支持 { work: [...] } 格式
    if (Array.isArray(obj.work)) {
      return obj.work as WorkItem[];
    }

    // 支持 { default: [...] } 格式 (某些打包工具会用这个)
    if (Array.isArray(obj.default)) {
      return obj.default as WorkItem[];
    }
  }

  // 无法解析，返回空数组
  if (DEBUG_VERBOSE) {
    console.warn(
      "[work] Unable to normalize data structure:",
      data,
    );
  }
  return [];
}

/**
 * 验证工作项数组的数据结构是否有效
 */
function isValidWorkItemsArray(
  arr: unknown[],
): arr is WorkItem[] {
  if (!Array.isArray(arr) || arr.length === 0) {
    if (DEBUG_VERBOSE) {
      console.warn("[work] Validation failed: not an array or empty");
    }
    return false;
  }

  // 检查每一项是否符合 WorkItem 接口
  const results = arr.map((item, index) => {
    if (!item || typeof item !== "object") {
      if (DEBUG_VERBOSE) {
        console.warn(`[work] Item ${index} is not an object:`, item);
      }
      return false;
    }

    const workItem = item as Record<string, unknown>;

    // 验证必填字段 (category is now optional)
    const hasRequiredFields =
      typeof workItem.id === "string" &&
      typeof workItem.title === "string" &&
      typeof workItem.description === "string" &&
      typeof workItem.year === "string";

    if (!hasRequiredFields) {
      console.warn(`[work] Item ${index} missing required fields:`, {
        id: typeof workItem.id,
        title: typeof workItem.title,
        description: typeof workItem.description,
        year: typeof workItem.year,
      });
      return false;
    }

    // 验证可选的 category 字段
    if (workItem.category !== undefined && typeof workItem.category !== "string") {
      console.warn(`[work] Item ${index} category must be a string`);
      return false;
    }

    // 验证可选的 images 数组
    if (workItem.images !== undefined) {
      if (!Array.isArray(workItem.images)) {
        console.warn(`[work] Item ${index} images is not an array`);
        return false;
      }
      if (!workItem.images.every((img: unknown) => typeof img === "string")) {
        console.warn(`[work] Item ${index} images contains non-string values`);
        return false;
      }
    }

    // 验证可选的 categories 数组
    if (workItem.categories !== undefined) {
      if (!Array.isArray(workItem.categories)) {
        console.warn(`[work] Item ${index} categories is not an array`);
        return false;
      }
      if (!workItem.categories.every((cat: unknown) => typeof cat === "string")) {
        console.warn(`[work] Item ${index} categories contains non-string values`);
        return false;
      }
    }

    // 验证可选字段类型
    if (workItem.gammaUrl !== undefined && typeof workItem.gammaUrl !== "string") {
      console.warn(`[work] Item ${index} gammaUrl is not a string`);
      return false;
    }
    if (workItem.featuredTag !== undefined && typeof workItem.featuredTag !== "string") {
      console.warn(`[work] Item ${index} featuredTag is not a string`);
      return false;
    }

    return true;
  });
  
  const allValid = results.every(r => r);
  if (!allValid && DEBUG_VERBOSE) {
    console.warn(`[work] Validation failed for ${results.filter(r => !r).length} items`);
  }
  return allValid;
}

/**
 * 从远端 URL 获取数据
 */
async function fetchRemoteWorkItems(): Promise<
  WorkItem[] | null
> {
  try {
    if (DEBUG_VERBOSE) {
      console.log(`[work] Attempting to fetch from: ${REMOTE_URL}`);
    }
    
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
        `[work] Remote fetch failed: HTTP ${response.status}`,
      );
      return null;
    }

    const data = await response.json();
    if (DEBUG_VERBOSE) {
      console.log(`[work] Remote data received:`, data);
    }
    const workItems = normalizeToArray(data);
    if (DEBUG_VERBOSE) {
      console.log(`[work] Normalized to ${workItems.length} items`);
    }

    if (isValidWorkItemsArray(workItems)) {
      console.log(
        `✅ [work] Loaded ${workItems.length} work items from remote URL`,
      );
      return workItems;
    } else {
      console.warn("[work] Remote data validation failed");
      if (DEBUG_VERBOSE && workItems[0]) {
        console.warn("[work] First item:", workItems[0]);
      }
      return null;
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.warn(
        `[work] Fetch timeout after ${FETCH_TIMEOUT_MS}ms`,
      );
    } else {
      console.warn("[work] Fetch error:", error);
    }
    return null;
  }
}

// ============================================================================
// PUBLIC API
// ============================================================================

/**
 * 获取工作项列表
 *
 * 策略：
 * 1. 尝试从远端 GitHub 获取
 * 2. 失败则使用本地 FALLBACK_WORK_ITEMS
 * 3. 保证永远返回有效数据
 *
 * @returns Promise<WorkItem[]> - 工作项列表（永远不会为空）
 */
export async function fetchWork(): Promise<WorkItem[]> {
  // 1️⃣ 尝试远端
  const remoteWorkItems = await fetchRemoteWorkItems();
  if (remoteWorkItems && !DEBUG_LOCAL_LOAD) {
    return remoteWorkItems;
  }

  // 2️⃣ 使用 fallback
  console.log(
    `⚠️ [work] Using local fallback (${FALLBACK_WORK_ITEMS.length} work items)`,
  );
  return FALLBACK_WORK_ITEMS;
}

/**
 * 直接导出 fallback 数据（用于调试或同步场景）
 */
export const fallbackWorkItems: WorkItem[] = FALLBACK_WORK_ITEMS;

/**
 * 同步导出 - 为了向后兼容
 * @deprecated 请使用 fetchWork() 以获得远端优先的加载策略
 */
export const workItems: WorkItem[] = FALLBACK_WORK_ITEMS;