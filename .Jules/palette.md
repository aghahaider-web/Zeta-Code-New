## 2024-08-13 - Internal Dashboard Tables Need Polish
**Learning:** Found a pattern where internal dashboard utility views (like `/dashboard/leads`) are often built functionally but missing basic UX/accessibility touches like `aria-label`s on filter inputs, styled buttons, and helpful empty states. It's easy to overlook internal tool UX.
**Action:** Always check internal dashboard tables and forms for missing labels and empty states. Don't assume internal users don't need a polished experience.

## 2024-08-13 - Add aria-busy to async forms
**Learning:** Found that while loading indicators visually tell the user that a form is processing, screen readers might not immediately pick this up if the state isn't communicated to assistive technology.
**Action:** Always add `aria-busy={true}` to form submit buttons (or forms) when handling an async action (like submission) to give screen readers an immediate indication that processing is occurring.

## 2024-05-18 - Native disclosure widget improvements
**Learning:** The native `summary::-webkit-details-marker` is hidden for visual cleanliness, but it leaves the `<details>` accordion without an expand/collapse affordance. Simply applying a rotating `::after` chevron using existing design tokens restores clear UX intent while keeping the DOM clean.
**Action:** When hiding native browser UI markers, always provide a clear, animated, token-compliant visual replacement to avoid leaving users guessing about interactivity.
