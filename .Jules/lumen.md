## 2024-05-24 - Radius Variables Don't Exist
**Learning:** Found usage of `--radius-sm` for `borderRadius` but this CSS variable does not exist in `app/globals.css`. The system standard is to use hardcoded values of `2px` or `4px` rather than CSS variables for border radius.
**Action:** Replace `var(--radius-sm)` with `2px` to align with system standards.
