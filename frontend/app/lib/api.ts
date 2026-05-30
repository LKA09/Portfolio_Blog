import { PaginatedResponse, Post, PostFilters, PostSummary, Category } from "./types";
import { CATEGORIES, POST_SUMMARIES, POSTS } from "./mock-data";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

// ---------- Posts ----------

export async function getPosts(filters: PostFilters = {}): Promise<PaginatedResponse<PostSummary>> {
  if (USE_MOCK) {
    const { page = 0, size = 6, category, search, sort = "latest" } = filters;

    let results = [...POST_SUMMARIES];

    if (category) results = results.filter((p) => p.category.slug === category);
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      );
    }
    if (sort === "popular") results.sort((a, b) => b.viewCount - a.viewCount);
    else if (sort === "oldest") results.sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
    else results.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

    const total = results.length;
    const slice = results.slice(page * size, (page + 1) * size);
    return {
      content: slice,
      totalElements: total,
      totalPages: Math.ceil(total / size),
      page,
      size,
      hasNext: (page + 1) * size < total,
      hasPrevious: page > 0,
    };
  }

  const params = new URLSearchParams();
  if (filters.page !== undefined) params.set("page", String(filters.page));
  if (filters.size !== undefined) params.set("size", String(filters.size));
  if (filters.category) params.set("category", filters.category);
  if (filters.search) params.set("search", filters.search);
  if (filters.sort) params.set("sort", filters.sort);

  return apiFetch<PaginatedResponse<PostSummary>>(`/api/posts?${params}`);
}

export async function getPost(slug: string): Promise<Post | null> {
  if (USE_MOCK) {
    return POSTS.find((p) => p.slug === slug) ?? null;
  }
  try {
    return await apiFetch<Post>(`/api/posts/${slug}`);
  } catch {
    return null;
  }
}

export async function getFeaturedPosts(): Promise<PostSummary[]> {
  if (USE_MOCK) {
    return POST_SUMMARIES.filter((p) => p.featured);
  }
  return apiFetch<PostSummary[]>("/api/posts/featured");
}

// ---------- Categories ----------

export async function getCategories(): Promise<Category[]> {
  if (USE_MOCK) return CATEGORIES;
  return apiFetch<Category[]>("/api/categories");
}

export async function getCategory(slug: string): Promise<Category | null> {
  if (USE_MOCK) return CATEGORIES.find((c) => c.slug === slug) ?? null;
  try {
    return await apiFetch<Category>(`/api/categories/${slug}`);
  } catch {
    return null;
  }
}

// ---------- Utils ----------

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

export function formatDateShort(iso: string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}