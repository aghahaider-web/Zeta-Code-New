## 2024-08-13 - Internal Dashboard Tables Need Polish
**Learning:** Found a pattern where internal dashboard utility views (like `/dashboard/leads`) are often built functionally but missing basic UX/accessibility touches like `aria-label`s on filter inputs, styled buttons, and helpful empty states. It's easy to overlook internal tool UX.
**Action:** Always check internal dashboard tables and forms for missing labels and empty states. Don't assume internal users don't need a polished experience.

## 2024-08-13 - Add aria-busy to async forms
**Learning:** Found that while loading indicators visually tell the user that a form is processing, screen readers might not immediately pick this up if the state isn't communicated to assistive technology.
**Action:** Always add `aria-busy={true}` to form submit buttons (or forms) when handling an async action (like submission) to give screen readers an immediate indication that processing is occurring.

## 2024-08-20 - Active State Indicators in Navigation
**Learning:** Found that the main navigation component lacked visual and semantic indication of the currently active page. This is a common accessibility and UX issue in SPAs where route transitions happen client-side.
**Action:** When working on navigation components, always verify that active states are represented both visually (e.g., using bold text or underlines) and semantically for screen readers using `aria-current="page"`. Utilize Next.js `usePathname` hook for checking active routes.
