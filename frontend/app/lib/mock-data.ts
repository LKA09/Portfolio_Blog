import { Author, Category, Post, PostSummary, Tag } from "./types";

export const AUTHOR: Author = {
  id: 1,
  name: "김가빈",
  bio: "풀스택 개발자 & 문제 해결을 좋아하는 개발자. Java, Spring Boot, React, Next.js를 주로 사용합니다.",
  avatar: "/avatar.png",
  github: "https://github.com/Lka09",
  email: "gbin8498@gmail.com",
};

export const CATEGORIES: Category[] = [
  { id: 1, name: "개발", slug: "dev", description: "개발 관련 글", postCount: 5, color: "blue" },
  { id: 2, name: "알고리즘", slug: "algorithm", description: "알고리즘 문제 풀이", postCount: 3, color: "green" },
  { id: 3, name: "프로젝트", slug: "project", description: "개인 프로젝트 기록", postCount: 3, color: "purple" },
  { id: 4, name: "일상", slug: "daily", description: "일상 이야기", postCount: 2, color: "orange" },
  { id: 5, name: "독서", slug: "book", description: "읽은 책 이야기", postCount: 1, color: "red" },
];

export const TAGS: Tag[] = [
  { id: 1, name: "Next.js", slug: "nextjs" },
  { id: 2, name: "Spring Boot", slug: "spring-boot" },
  { id: 3, name: "React", slug: "react" },
  { id: 4, name: "TypeScript", slug: "typescript" },
  { id: 5, name: "Java", slug: "java" },
  { id: 6, name: "BFS", slug: "bfs" },
  { id: 7, name: "DFS", slug: "dfs" },
  { id: 8, name: "포트폴리오", slug: "portfolio" },
  { id: 9, name: "Tailwind CSS", slug: "tailwind" },
  { id: 10, name: "MySQL", slug: "mysql" },
];

export const POSTS: Post[] = [
  {
    id: 1,
    title: "Next.js 16과 React 19로 블로그 만들기",
    slug: "nextjs-16-react-19-blog",
    excerpt: "Next.js 16과 React 19의 새로운 기능을 활용해서 개인 블로그를 제작한 경험을 공유합니다. App Router, Server Components, 그리고 Tailwind CSS v4를 적극 활용했습니다.",
    content: `# Next.js 16과 React 19로 블로그 만들기

Next.js 16과 React 19가 릴리즈되면서 많은 새로운 기능이 추가되었습니다. 이번 포스팅에서는 이 기술들을 활용해서 개인 블로그를 만든 경험을 공유하겠습니다.

## 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **라이브러리**: React 19
- **스타일링**: Tailwind CSS v4
- **언어**: TypeScript
- **백엔드**: Spring Boot 3

## App Router의 장점

Next.js의 App Router를 사용하면 서버 컴포넌트와 클라이언트 컴포넌트를 명확히 구분할 수 있습니다.

\`\`\`tsx
// Server Component (기본값)
export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);
  return <PostDetail post={post} />;
}
\`\`\`

## React 19의 새로운 기능

React 19에서는 여러 가지 개선사항이 도입되었습니다:

1. **use() 훅**: Promise와 Context를 더 쉽게 사용할 수 있습니다
2. **Server Actions**: 서버 사이드 로직을 함수로 정의
3. **개선된 Suspense**: 더 나은 로딩 상태 처리

## Tailwind CSS v4

Tailwind CSS v4는 CSS-first 설정 방식을 도입했습니다:

\`\`\`css
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
}
\`\`\`

## 마치며

새로운 기술 스택으로 블로그를 만드는 과정이 매우 즐거웠습니다. 특히 Server Components를 활용한 데이터 페칭이 코드를 훨씬 깔끔하게 만들어 주었습니다.`,
    category: CATEGORIES[0],
    tags: [TAGS[0], TAGS[2], TAGS[3], TAGS[8]],
    author: AUTHOR,
    publishedAt: "2026-05-28T09:00:00Z",
    updatedAt: "2026-05-28T09:00:00Z",
    readingTime: 5,
    viewCount: 142,
    featured: true,
  },
  {
    id: 2,
    title: "Spring Boot와 Next.js API 연동하기",
    slug: "spring-boot-nextjs-api-integration",
    excerpt: "Spring Boot REST API와 Next.js 프론트엔드를 연동하는 방법을 단계별로 알아봅니다. CORS 설정부터 API 클라이언트 구현까지 실전 경험을 담았습니다.",
    content: `# Spring Boot와 Next.js API 연동하기

풀스택 개발을 할 때 백엔드와 프론트엔드를 연동하는 것은 필수적인 과정입니다.

## Spring Boot CORS 설정

\`\`\`java
@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        // ...
        return new CorsFilter(source);
    }
}
\`\`\`

## Next.js API 클라이언트

\`\`\`typescript
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function fetchPosts(params: PostFilters) {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set('page', String(params.page));

  const response = await fetch(\`\${BASE_URL}/api/posts?\${searchParams}\`);
  return response.json();
}
\`\`\`

## 환경 변수 설정

\`.env.local\` 파일에 API URL을 설정합니다:

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:8080
\`\`\`

연동 과정에서 CORS, 인증 토큰 처리 등 여러 이슈를 겪었는데, 하나씩 해결해가는 과정이 많은 도움이 되었습니다.`,
    category: CATEGORIES[0],
    tags: [TAGS[1], TAGS[0], TAGS[4]],
    author: AUTHOR,
    publishedAt: "2026-05-20T10:00:00Z",
    updatedAt: "2026-05-20T10:00:00Z",
    readingTime: 7,
    viewCount: 98,
    featured: false,
  },
  {
    id: 3,
    title: "BFS/DFS 알고리즘 완벽 정리",
    slug: "bfs-dfs-algorithm-guide",
    excerpt: "그래프 탐색의 핵심인 BFS와 DFS 알고리즘을 Java로 구현하고, 실전 백준 문제에 적용하는 방법을 정리했습니다.",
    content: `# BFS/DFS 알고리즘 완벽 정리

그래프 탐색 알고리즘은 코딩 테스트에서 빠지지 않는 주제입니다.

## BFS (너비 우선 탐색)

BFS는 큐(Queue)를 사용해서 가까운 노드부터 탐색합니다.

\`\`\`java
public void bfs(int start) {
    Queue<Integer> queue = new LinkedList<>();
    boolean[] visited = new boolean[n + 1];

    queue.offer(start);
    visited[start] = true;

    while (!queue.isEmpty()) {
        int node = queue.poll();
        System.out.print(node + " ");

        for (int next : graph.get(node)) {
            if (!visited[next]) {
                visited[next] = true;
                queue.offer(next);
            }
        }
    }
}
\`\`\`

## DFS (깊이 우선 탐색)

DFS는 재귀 또는 스택으로 구현합니다.

\`\`\`java
public void dfs(int node, boolean[] visited) {
    visited[node] = true;
    System.out.print(node + " ");

    for (int next : graph.get(node)) {
        if (!visited[next]) {
            dfs(next, visited);
        }
    }
}
\`\`\`

## 언제 BFS vs DFS?

| 상황 | 추천 알고리즘 |
|------|--------------|
| 최단 거리 | BFS |
| 경로 존재 여부 | DFS |
| 연결 요소 개수 | 둘 다 가능 |
| 사이클 탐지 | DFS |

실전에서 많이 사용되는 패턴이니 꼭 손으로 구현해보시길 권장합니다!`,
    category: CATEGORIES[1],
    tags: [TAGS[5], TAGS[6], TAGS[4]],
    author: AUTHOR,
    publishedAt: "2026-05-15T08:00:00Z",
    updatedAt: "2026-05-15T08:00:00Z",
    readingTime: 10,
    viewCount: 203,
    featured: true,
  },
  {
    id: 4,
    title: "포트폴리오 블로그 제작기",
    slug: "portfolio-blog-devlog",
    excerpt: "개인 포트폴리오 블로그를 제작하면서 겪었던 기술적 고민들과 설계 결정들을 기록합니다. Next.js와 Spring Boot를 선택한 이유부터 배포 전략까지.",
    content: `# 포트폴리오 블로그 제작기

개인 블로그를 만들기로 결심했을 때 가장 먼저 한 일은 기술 스택을 선정하는 것이었습니다.

## 왜 직접 만들었나?

기존의 블로그 플랫폼(Velog, Tistory 등)도 좋지만, 직접 만들면서 배우는 것이 더 값지다고 생각했습니다. 또한 포트폴리오로도 활용할 수 있다는 장점이 있습니다.

## 기술 스택 선정 과정

### 프론트엔드
- Next.js: SEO 최적화, SSR/SSG 지원
- React: 컴포넌트 기반 UI 개발
- TypeScript: 타입 안전성
- Tailwind CSS: 빠른 스타일링

### 백엔드
- Spring Boot: Java 기반의 안정적인 프레임워크
- JPA: 데이터베이스 ORM
- MySQL: 관계형 데이터베이스

## 설계 결정들

1. **모노레포 구조**: 프론트엔드와 백엔드를 하나의 저장소에서 관리
2. **REST API**: 단순하고 명확한 API 설계
3. **마크다운 지원**: 블로그 글을 마크다운으로 작성

제작 과정에서 많은 것을 배웠고, 앞으로도 계속 개선해 나갈 예정입니다!`,
    category: CATEGORIES[2],
    tags: [TAGS[7], TAGS[0], TAGS[1]],
    author: AUTHOR,
    publishedAt: "2026-05-10T11:00:00Z",
    updatedAt: "2026-05-10T11:00:00Z",
    readingTime: 6,
    viewCount: 87,
    featured: false,
  },
  {
    id: 5,
    title: "TypeScript 제네릭 완전 정복",
    slug: "typescript-generics-guide",
    excerpt: "TypeScript 제네릭의 개념부터 고급 활용법까지 실전 예제와 함께 알아봅니다. infer, conditional types, mapped types 등 심화 내용도 다룹니다.",
    content: `# TypeScript 제네릭 완전 정복

TypeScript를 사용하면서 제네릭을 잘 활용하면 재사용 가능하고 타입 안전한 코드를 작성할 수 있습니다.

## 기본 제네릭

\`\`\`typescript
function identity<T>(value: T): T {
  return value;
}

const str = identity<string>("hello"); // string
const num = identity<number>(42);      // number
\`\`\`

## 제약 조건 (Constraints)

\`\`\`typescript
interface HasLength {
  length: number;
}

function getLength<T extends HasLength>(item: T): number {
  return item.length;
}
\`\`\`

## 유틸리티 타입

TypeScript에는 내장 유틸리티 타입들이 있습니다:

\`\`\`typescript
type PartialPost = Partial<Post>;    // 모든 필드가 optional
type RequiredPost = Required<Post>; // 모든 필드가 required
type PostTitle = Pick<Post, 'title' | 'slug'>; // 선택된 필드만
\`\`\`

## infer 키워드

\`\`\`typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
\`\`\`

제네릭을 잘 이해하면 타입 레벨에서 강력한 추상화를 만들 수 있습니다.`,
    category: CATEGORIES[0],
    tags: [TAGS[3], TAGS[2]],
    author: AUTHOR,
    publishedAt: "2026-05-05T09:00:00Z",
    updatedAt: "2026-05-05T09:00:00Z",
    readingTime: 8,
    viewCount: 156,
    featured: false,
  },
  {
    id: 6,
    title: "개발자로 성장하기 - 1년 회고",
    slug: "developer-growth-1year",
    excerpt: "개발을 시작한 지 1년이 지났습니다. 지난 1년간 배운 것들, 실패했던 것들, 그리고 앞으로의 방향에 대해 솔직하게 이야기합니다.",
    content: `# 개발자로 성장하기 - 1년 회고

1년이라는 시간이 어떻게 지나갔는지 모를 만큼 정신없이 달려온 것 같습니다.

## 배운 것들

### 기술적으로
- Java와 Spring Boot로 백엔드 API 개발
- React와 Next.js로 프론트엔드 개발
- 데이터베이스 설계와 최적화
- Git을 활용한 버전 관리

### 소프트 스킬
- 문서화의 중요성
- 코드 리뷰 문화
- 점진적 개선의 가치

## 실패했던 것들

처음에는 완벽한 코드를 한 번에 작성하려다가 오히려 진도가 느렸습니다. 완벽보다는 동작하는 코드를 먼저 작성하고 점진적으로 개선하는 방식이 더 효과적이라는 것을 배웠습니다.

## 앞으로의 방향

- 오픈소스 기여
- 알고리즘 실력 향상
- 클라우드 기술 학습 (AWS, Docker)
- 꾸준한 블로그 작성

성장의 과정은 느리게 느껴지지만, 돌아보면 많이 왔다는 것을 느낍니다. 앞으로도 꾸준히 성장하겠습니다!`,
    category: CATEGORIES[3],
    tags: [TAGS[7]],
    author: AUTHOR,
    publishedAt: "2026-04-30T12:00:00Z",
    updatedAt: "2026-04-30T12:00:00Z",
    readingTime: 4,
    viewCount: 321,
    featured: false,
  },
  {
    id: 7,
    title: "MySQL 인덱스 최적화 전략",
    slug: "mysql-index-optimization",
    excerpt: "MySQL 인덱스의 동작 원리를 이해하고, EXPLAIN을 활용한 쿼리 분석과 실제 성능 최적화 사례를 공유합니다.",
    content: `# MySQL 인덱스 최적화 전략

데이터베이스 성능 최적화에서 인덱스는 가장 중요한 요소 중 하나입니다.

## 인덱스란?

인덱스는 책의 목차와 같습니다. 전체 데이터를 스캔하지 않고도 원하는 데이터를 빠르게 찾을 수 있게 해줍니다.

## 인덱스 유형

### B-Tree 인덱스 (기본)
\`\`\`sql
CREATE INDEX idx_title ON posts(title);
\`\`\`

### 복합 인덱스
\`\`\`sql
CREATE INDEX idx_category_date ON posts(category_id, published_at);
\`\`\`

## EXPLAIN으로 쿼리 분석

\`\`\`sql
EXPLAIN SELECT * FROM posts
WHERE category_id = 1
ORDER BY published_at DESC;
\`\`\`

| id | select_type | table | type | key | rows |
|----|-------------|-------|------|-----|------|
| 1 | SIMPLE | posts | ref | idx_category_date | 50 |

## 주의사항

- 인덱스는 읽기를 빠르게 하지만 쓰기를 느리게 합니다
- 불필요한 인덱스는 오히려 성능을 저하시킬 수 있습니다
- 카디널리티가 낮은 컬럼(성별, 상태 등)에는 인덱스 효과가 미미합니다`,
    category: CATEGORIES[0],
    tags: [TAGS[9], TAGS[4]],
    author: AUTHOR,
    publishedAt: "2026-04-20T10:00:00Z",
    updatedAt: "2026-04-20T10:00:00Z",
    readingTime: 9,
    viewCount: 178,
    featured: false,
  },
  {
    id: 8,
    title: "동적 프로그래밍(DP) 핵심 패턴 모음",
    slug: "dynamic-programming-patterns",
    excerpt: "코딩 테스트에 자주 나오는 DP 패턴들을 유형별로 정리했습니다. 1차원 DP, 2차원 DP, 배낭 문제, LCS까지 실제 코드와 함께 설명합니다.",
    content: `# 동적 프로그래밍(DP) 핵심 패턴 모음

DP는 코딩 테스트에서 가장 중요한 알고리즘 중 하나입니다.

## DP의 핵심 개념

1. **최적 부분 구조**: 전체 문제의 최적해가 부분 문제의 최적해로 구성됨
2. **중복 부분 문제**: 같은 부분 문제가 여러 번 반복됨

## 패턴 1: 1차원 DP - 피보나치

\`\`\`java
int[] dp = new int[n + 1];
dp[0] = 0;
dp[1] = 1;
for (int i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
}
\`\`\`

## 패턴 2: 배낭 문제 (Knapsack)

\`\`\`java
int[][] dp = new int[n + 1][W + 1];
for (int i = 1; i <= n; i++) {
    for (int w = 0; w <= W; w++) {
        if (weight[i] <= w) {
            dp[i][w] = Math.max(dp[i-1][w], dp[i-1][w - weight[i]] + value[i]);
        } else {
            dp[i][w] = dp[i-1][w];
        }
    }
}
\`\`\`

## 패턴 3: LCS (최장 공통 부분수열)

\`\`\`java
for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
        if (s1.charAt(i-1) == s2.charAt(j-1)) {
            dp[i][j] = dp[i-1][j-1] + 1;
        } else {
            dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
        }
    }
}
\`\`\`

DP는 많은 연습이 필요하지만, 패턴을 익히면 응용하기 쉬워집니다!`,
    category: CATEGORIES[1],
    tags: [TAGS[4]],
    author: AUTHOR,
    publishedAt: "2026-04-15T08:00:00Z",
    updatedAt: "2026-04-15T08:00:00Z",
    readingTime: 12,
    viewCount: 267,
    featured: false,
  },
];

export function toPostSummary(post: Post): PostSummary {
  const { content: _content, ...summary } = post;
  return summary as PostSummary;
}

export const POST_SUMMARIES = POSTS.map(toPostSummary);