## 2024-09-10 - Fix Non-Existent Radius Token
**Learning:** Found `var(--radius-sm)` used for border-radius in `app/(public)/services/conversion-websites/page.tsx` and `app/(public)/about/page.tsx`, but memory specifically states 'var(--radius-sm) does not exist and should not be used'. Standard radius is hardcoded `2px` or `4px`.
**Action:** Always check `globals.css` before using a token variable. Replaced all instances of `var(--radius-sm)` with the standard `2px` to maintain visual consistency and fix the broken border radius.
