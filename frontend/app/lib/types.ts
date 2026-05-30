export interface Author {
  id: number;
  name: string;
  bio: string;
  avatar: string;
  github?: string;
  email?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
  color: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: Category;
  tags: Tag[];
  author: Author;
  publishedAt: string;
  updatedAt: string;
  coverImage?: string;
  readingTime: number;
  viewCount: number;
  featured?: boolean;
}

export interface PostSummary {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: Category;
  tags: Tag[];
  author: Author;
  publishedAt: string;
  coverImage?: string;
  readingTime: number;
  viewCount: number;
  featured?: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PostFilters {
  page?: number;
  size?: number;
  category?: string;
  tag?: string;
  search?: string;
  sort?: "latest" | "oldest" | "popular";
}