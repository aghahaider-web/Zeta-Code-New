## 2024-03-05 - Inconsistent border-radius tokens
**Learning:** The project design system specifies hardcoded values of `2px` or `4px` for border-radius. However, `var(--radius-sm)` is used in `app/(public)/services/conversion-websites/page.tsx` and `app/(public)/about/page.tsx`, but this variable is never defined in `app/globals.css`. This leads to silent fallbacks.
**Action:** Replaced all instances of `var(--radius-sm)` with `2px` to align with the core design token convention.
