import { projectsFallback } from "./projects-fallback";

/**
 * 🔧 调试开关
 */
const DEBUG_VERBOSE = false; // 设为 true 查看详细调试信息

/**
 * 📦 Project 数据接口
 */
export interface ProjectTag {
  name: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: ProjectTag[];
  imageUrl?: string;
  gammaUrl?: string;
  featuredTag?: string;
}

/**
 * 🌐 远端数据源配置
 * 
 * 修改此 URL 以指向你的远端 JSON 文件
 * 例如: https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/projects.json
 */
const REMOTE_PROJECTS_URL =
  "https://raw.githubusercontent.com/hanjing7/portfolio26/main/projects.json";

/**
 * ⏱️ 缓存配置
 */
const CACHE_KEY = "projects_cache";
const CACHE_TIMESTAMP_KEY = "projects_cache_timestamp";
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

/**
 * 📊 运行时状态跟踪
 */
let isFetching = false; // 防止重复请求
let fetchPromise: Promise<Project[]> | null = null; // 复用进行中的请求

/**
 * 🔄 标准化数据格式 - 支持多种 JSON 结构
 */
function normalizeToArray(data: unknown): Project[] {
  // 如果直接就是数组
  if (Array.isArray(data)) {
    return data as Project[];
  }

  // 如果是对象，尝试提取数组
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;

    // 支持 { projects: [...] } 格式
    if (Array.isArray(obj.projects)) {
      return obj.projects as Project[];
    }

    // 支持 { default: [...] } 格式
    if (Array.isArray(obj.default)) {
      return obj.default as Project[];
    }
  }

  // 无法解析，返回空数组
  if (DEBUG_VERBOSE) {
    console.warn("[projects] Unable to normalize data structure:", data);
  }
  return [];
}

/**
 * ✅ 验证 Project 数据是否有效
 */
function isValidProjectsArray(arr: unknown[]): arr is Project[] {
  if (!Array.isArray(arr) || arr.length === 0) {
    if (DEBUG_VERBOSE) {
      console.warn("[projects] Validation failed: not an array or empty");
    }
    return false;
  }

  // 检查每一项是否符合 Project 接口
  const results = arr.map((item, index) => {
    if (!item || typeof item !== "object") {
      if (DEBUG_VERBOSE) {
        console.warn(`[projects] Item ${index} is not an object:`, item);
      }
      return false;
    }

    const project = item as Record<string, unknown>;

    // 验证必填字段
    const hasRequiredFields =
      typeof project.id === "string" &&
      typeof project.title === "string" &&
      typeof project.description === "string" &&
      Array.isArray(project.tags);

    if (!hasRequiredFields) {
      console.warn(`[projects] Item ${index} missing required fields:`, {
        id: typeof project.id,
        title: typeof project.title,
        description: typeof project.description,
        tags: Array.isArray(project.tags),
      });
      return false;
    }

    // 验证 tags 数组
    if (!project.tags.every((tag: unknown) => {
      return tag && typeof tag === "object" && typeof (tag as Record<string, unknown>).name === "string";
    })) {
      console.warn(`[projects] Item ${index} tags array contains invalid items`);
      return false;
    }

    // 验证可选字段类型
    if (project.imageUrl !== undefined && typeof project.imageUrl !== "string") {
      console.warn(`[projects] Item ${index} imageUrl is not a string`);
      return false;
    }
    if (project.gammaUrl !== undefined && typeof project.gammaUrl !== "string") {
      console.warn(`[projects] Item ${index} gammaUrl is not a string`);
      return false;
    }
    if (project.featuredTag !== undefined && typeof project.featuredTag !== "string") {
      console.warn(`[projects] Item ${index} featuredTag is not a string`);
      return false;
    }

    return true;
  });

  const allValid = results.every((r) => r);
  if (!allValid && DEBUG_VERBOSE) {
    console.warn(
      `[projects] Validation failed for ${results.filter((r) => !r).length} items`,
    );
  }
  return allValid;
}

/**
 * 💾 缓存管理
 */
function getCachedProjects(): Project[] | null {
  if (typeof window === "undefined") return null;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

    if (!cached || !timestamp) return null;

    const age = Date.now() - parseInt(timestamp, 10);
    if (age > CACHE_DURATION) {
      if (DEBUG_VERBOSE) {
        console.log(`[projects] Cache expired (${Math.round(age / 1000)}s old)`);
      }
      return null;
    }

    const parsed = JSON.parse(cached);
    const normalized = normalizeToArray(parsed);

    if (isValidProjectsArray(normalized)) {
      if (DEBUG_VERBOSE) {
        console.log(`[projects] Using cached data (${normalized.length} items)`);
      }
      return normalized;
    }

    return null;
  } catch (error) {
    if (DEBUG_VERBOSE) {
      console.warn("[projects] Cache read error:", error);
    }
    return null;
  }
}

function setCachedProjects(projects: Project[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(projects));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    if (DEBUG_VERBOSE) {
      console.log(`[projects] Cached ${projects.length} projects`);
    }
  } catch (error) {
    console.warn("[projects] Failed to cache projects:", error);
  }
}

/**
 * 🌐 从远端 URL 获取数据
 */
async function fetchProjectsFromRemote(): Promise<Project[]> {
  if (DEBUG_VERBOSE) {
    console.log(`[projects] Fetching from: ${REMOTE_PROJECTS_URL}`);
  }

  try {
    const response = await fetch(REMOTE_PROJECTS_URL, {
      cache: "no-cache",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const normalized = normalizeToArray(data);

    if (!isValidProjectsArray(normalized)) {
      throw new Error("Invalid project data structure");
    }

    console.log(`✅ [projects] Loaded ${normalized.length} projects from remote URL`);
    setCachedProjects(normalized);
    return normalized;
  } catch (error) {
    if (DEBUG_VERBOSE) {
      console.error(
        "[projects] Fetch error:",
        error instanceof Error ? error.message : error,
      );
    }
    throw error;
  }
}

/**
 * 🔄 统一的项目数据获取函数
 */
export async function fetchProjects(): Promise<Project[]> {
  // 如果已有进行中的请求，复用它
  if (isFetching && fetchPromise) {
    if (DEBUG_VERBOSE) {
      console.log("[projects] Reusing existing fetch promise");
    }
    return fetchPromise;
  }

  isFetching = true;

  fetchPromise = (async () => {
    try {
      // 1. 尝试使用缓存
      const cached = getCachedProjects();
      if (cached) {
        return cached;
      }

      // 2. 尝试从远端获取
      try {
        const remote = await fetchProjectsFromRemote();
        return remote;
      } catch (remoteError) {
        if (DEBUG_VERBOSE) {
          console.warn("[projects] Remote fetch failed, using fallback data");
          console.warn("[projects] Error details:", remoteError);
        }
      }

      // 3. 使用本地备用数据
      console.log(
        `⚠️ [projects] Using local fallback data (${projectsFallback.length} projects)`,
      );
      return projectsFallback;
    } finally {
      isFetching = false;
      fetchPromise = null;
    }
  })();

  return fetchPromise;
}

/**
 * 📤 导出默认数据（用于初始渲染）
 * 实际数据会在 App.tsx 中通过 fetchProjects() 异步加载
 */
export const projects: Project[] = projectsFallback;

/**
 * 🔄 手动刷新数据的辅助函数
 */
export function clearProjectsCache(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
    console.log("[projects] Cache cleared");
  } catch (error) {
    console.warn("[projects] Failed to clear cache:", error);
  }
}