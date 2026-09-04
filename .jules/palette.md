## 2024-08-27 - Navigation Active States
**Learning:** Adding active states to navigation links requires careful attention to both accessibility and visual stability. Using `aria-current="page"` correctly communicates the active state to screen readers. For visual styling, relying on `textDecoration` properties (like `underline`, `textDecorationColor`, `textDecorationThickness`, and `textUnderlineOffset`) instead of border or padding changes prevents unwanted layout shifts and jank when navigating between pages.
**Action:** When implementing active states on text links, always pair `aria-current="page"` with layout-safe CSS properties like `textDecoration` to ensure accessible and visually stable navigation without custom class overhead.

## 2024-09-04 - Booking Slots Loading and Empty States
**Learning:** The `book-a-call` flow fetches available slots from an API. Previously, it flashed an unstyled "No slots available" message during the initial fetch.
**Action:** Always wrap async component mounting with clear, accessible loading indicators (`aria-live="polite"`, `aria-busy="true"`). Replace unstyled, generic empty text states with visually prominent blocks and alternative CTAs (e.g., `Request a proposal instead`) to maintain user momentum.
