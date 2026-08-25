## 2024-08-13 - Internal Dashboard Tables Need Polish
**Learning:** Found a pattern where internal dashboard utility views (like `/dashboard/leads`) are often built functionally but missing basic UX/accessibility touches like `aria-label`s on filter inputs, styled buttons, and helpful empty states. It's easy to overlook internal tool UX.
**Action:** Always check internal dashboard tables and forms for missing labels and empty states. Don't assume internal users don't need a polished experience.

## 2024-08-13 - Add aria-busy to async forms
**Learning:** Found that while loading indicators visually tell the user that a form is processing, screen readers might not immediately pick this up if the state isn't communicated to assistive technology.
**Action:** Always add `aria-busy={true}` to form submit buttons (or forms) when handling an async action (like submission) to give screen readers an immediate indication that processing is occurring.

## 2024-08-25 - Accessible and Janky-Free Navigation Active States
**Learning:** Using `aria-current="page"` paired with `textDecoration: 'underline'` (along with `textDecorationColor`, `textDecorationThickness`, and `textUnderlineOffset`) provides an excellent, accessible way to indicate active navigation states without causing layout shifts, unlike using bold fonts or adding margins/padding.
**Action:** Always prefer `textDecoration` properties for active inline navigation states over margin/padding to prevent layout shifts while ensuring `aria-current="page"` is used for screen reader users.
