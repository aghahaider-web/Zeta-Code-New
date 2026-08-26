## 2024-08-13 - Internal Dashboard Tables Need Polish
**Learning:** Found a pattern where internal dashboard utility views (like `/dashboard/leads`) are often built functionally but missing basic UX/accessibility touches like `aria-label`s on filter inputs, styled buttons, and helpful empty states. It's easy to overlook internal tool UX.
**Action:** Always check internal dashboard tables and forms for missing labels and empty states. Don't assume internal users don't need a polished experience.

## 2024-08-13 - Add aria-busy to async forms
**Learning:** Found that while loading indicators visually tell the user that a form is processing, screen readers might not immediately pick this up if the state isn't communicated to assistive technology.
**Action:** Always add `aria-busy={true}` to form submit buttons (or forms) when handling an async action (like submission) to give screen readers an immediate indication that processing is occurring.

## 2024-08-26 - Navigation Active States Without Layout Shift
**Learning:** Found that applying active states via margin/padding or font-weight changes often causes layout shifts. In combination, missing semantic `aria-current="page"` degrades screen reader experience for determining current page.
**Action:** Always combine semantic `aria-current="page"` with visual active states that do not affect layout, such as `textDecoration: 'underline'` and `textDecorationColor: 'var(--color-lime)'` (along with `textDecorationThickness` and `textUnderlineOffset`), for both desktop and mobile navigation links.
