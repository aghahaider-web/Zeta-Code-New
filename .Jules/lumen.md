## 2024-08-13 - Avoid Inline Display Typography Line-Height Overrides
**Learning:** Found a pattern where specific `<h2 />` elements used inline styles (`lineHeight: 'var(--leading-snug)'`) to override the global display typography line-height (`var(--leading-tight)`) defined in `globals.css`. This practice fragments the typography scale and disrupts vertical rhythm across the site.
**Action:** Do not override global display typography line-heights with inline styles. Use the cohesive scale defined by the design tokens to ensure consistency.
