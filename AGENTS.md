# AGENTS.md

这个仓库是 `blog.1874.cool` 的 Astro 静态博客。默认用中文沟通；改动前先看现有实现，保持改动小而清楚。

## 环境

- Node 使用 `.nvmrc`：`24`。
- 包管理器使用 `package.json` 中声明的 `pnpm@10.32.1`。
- 本地命令优先使用 `corepack pnpm ...`，避免全局 pnpm 版本影响 lockfile。

## 验证

普通代码或依赖改动，至少跑：

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm lint
corepack pnpm check
corepack pnpm build
```

涉及部署、依赖、pnpm、Vercel 或 CI 的改动，推送前再跑一次 Vercel production build：

```bash
corepack pnpm dlx vercel@latest build --prod
```

如果本地 Vercel 配置或环境变量过期，先拉取：

```bash
corepack pnpm dlx vercel@latest pull --yes --environment=production
```

不要把 `vercel` 加到 `devDependencies`；临时使用 `corepack pnpm dlx vercel@latest` 即可。

## 项目边界

- Astro 当前是 7.x，内容集合配置在 `src/content.config.ts`。
- Markdown 管线显式使用 `@astrojs/markdown-remark` 的 `unified()` processor。不要随手切回默认 Markdown 处理器，除非同时验证 reading time、math/KaTeX、外链属性、unwrap images 和旧文章 HTML 输出。
- `rehype-unwrap-images` 是有意替代旧的 `remark-unwrap-images`。
- Tailwind 保留在 3.x。不要顺手迁移 Tailwind 4；这需要单独处理 CSS/PostCSS 入口和视觉回归。
- `@elog/cli` 和 `@elog/plugin-img-r2` 在 `devDependencies`；`elog-sync` workflow 使用完整安装来保证 `pnpm sync` 可用。

## CI

GitHub Actions 里如果启用 `setup-node` 的 `cache: pnpm`，必须先运行 `pnpm/action-setup`，否则 cache 初始化时可能找不到 `pnpm`。

依赖安装使用：

```bash
pnpm install --frozen-lockfile
```
