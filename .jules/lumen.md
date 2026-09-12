## 2026-09-12 - Enforcing hardcoded border-radius values
**Learning:** The project's design system standardizes button and UI border radius to hardcoded values of `2px` or `4px` rather than using CSS variables for radius (e.g., `var(--radius-sm)` does not exist and should not be used).
**Action:** When styling buttons or UI elements, never invent or use non-existent variables like `var(--radius-sm)`; always stick to the design system's hardcoded `2px` or `4px` border radii.
