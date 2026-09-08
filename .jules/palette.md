## 2024-08-27 - Navigation Active States
**Learning:** Adding active states to navigation links requires careful attention to both accessibility and visual stability. Using `aria-current="page"` correctly communicates the active state to screen readers. For visual styling, relying on `textDecoration` properties (like `underline`, `textDecorationColor`, `textDecorationThickness`, and `textUnderlineOffset`) instead of border or padding changes prevents unwanted layout shifts and jank when navigating between pages.
**Action:** When implementing active states on text links, always pair `aria-current="page"` with layout-safe CSS properties like `textDecoration` to ensure accessible and visually stable navigation without custom class overhead.
## 2024-11-20 - Dashboard Table Empty States
**Learning:** Generic text rows for empty table states ("No items found") lack visual weight and leave users at a dead end, especially when filters are applied.
**Action:** Always wrap empty table states in a structured visual box (e.g., dashed border with sufficient padding) and provide context-aware alternative CTAs (like a clear button to remove active filters) rather than plain text.
