## 2024-08-27 - Navigation Active States
**Learning:** Adding active states to navigation links requires careful attention to both accessibility and visual stability. Using `aria-current="page"` correctly communicates the active state to screen readers. For visual styling, relying on `textDecoration` properties (like `underline`, `textDecorationColor`, `textDecorationThickness`, and `textUnderlineOffset`) instead of border or padding changes prevents unwanted layout shifts and jank when navigating between pages.
**Action:** When implementing active states on text links, always pair `aria-current="page"` with layout-safe CSS properties like `textDecoration` to ensure accessible and visually stable navigation without custom class overhead.

## 2024-09-03 - Form Validation and Async Feedback
**Learning:** Forms require both visual and semantic cues for required fields (like aria-hidden asterisks and aria-required attributes). Async operations must provide clear feedback, such as transforming the submit button with a spinner and wait cursor, to prevent double submissions and reassure the user.
**Action:** Always add visual asterisks with aria-hidden alongside aria-required on mandatory inputs. For async submissions, completely transform the submit button state (change cursor to wait, drop opacity, and display a spinning SVG).
