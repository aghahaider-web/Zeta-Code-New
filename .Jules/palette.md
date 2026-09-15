## 2024-08-13 - Internal Dashboard Tables Need Polish
**Learning:** Found a pattern where internal dashboard utility views (like `/dashboard/leads`) are often built functionally but missing basic UX/accessibility touches like `aria-label`s on filter inputs, styled buttons, and helpful empty states. It's easy to overlook internal tool UX.
**Action:** Always check internal dashboard tables and forms for missing labels and empty states. Don't assume internal users don't need a polished experience.

## 2024-08-13 - Add aria-busy to async forms
**Learning:** Found that while loading indicators visually tell the user that a form is processing, screen readers might not immediately pick this up if the state isn't communicated to assistive technology.
**Action:** Always add `aria-busy={true}` to form submit buttons (or forms) when handling an async action (like submission) to give screen readers an immediate indication that processing is occurring.
## 2026-09-15 - Structuring Empty States
**Learning:** Next.js Server Components with missing or invalid Supabase env variables will return 500s or 404s when attempting to load them locally via
> zetacode@0.1.0 start /app
> next start

 ELIFECYCLE  Command failed with exit code 1. for Playwright tests, making it difficult to test UI states like 'empty leads'.
**Action:** When testing pure UI changes (like an empty state layout) where the DB logic cannot be easily bypassed, use Playwright's `page.set_content()` injecting the rendered HTML and necessary CSS variables (e.g., `var(--color-ink)`) to visually verify the frontend changes in isolation without fighting the backend integration.
