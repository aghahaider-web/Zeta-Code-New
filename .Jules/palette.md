## 2024-08-13 - Internal Dashboard Tables Need Polish
**Learning:** Found a pattern where internal dashboard utility views (like `/dashboard/leads`) are often built functionally but missing basic UX/accessibility touches like `aria-label`s on filter inputs, styled buttons, and helpful empty states. It's easy to overlook internal tool UX.
**Action:** Always check internal dashboard tables and forms for missing labels and empty states. Don't assume internal users don't need a polished experience.

## 2024-08-13 - Add aria-busy to async forms
**Learning:** Found that while loading indicators visually tell the user that a form is processing, screen readers might not immediately pick this up if the state isn't communicated to assistive technology.
**Action:** Always add `aria-busy={true}` to form submit buttons (or forms) when handling an async action (like submission) to give screen readers an immediate indication that processing is occurring.

## 2024-08-21 - Added Skip-to-Content Link
**Learning:** Skip-to-content links are vital for keyboard accessibility to bypass repetitive navigation. However, the existing `globals.css` rule `outline: none` should only be used when an alternative visual feedback exists or during sliding animations to prevent interfering with the user's focus indicator expectations.
**Action:** When adding skip-to-content functionality in a strict "no custom CSS" constraint environment, always extract the inline-styled component into its own Client Component and use React `onFocus`/`onBlur` handlers for the hidden/visible toggle instead of modifying global stylesheets.
