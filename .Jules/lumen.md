## 2023-11-01 - Hardcoded radius values in code vs missing tokens
**Learning:** Found inline styles using `var(--radius-sm)` which is not defined in `app/globals.css`. The system standardizes on hardcoded 2px or 4px values.
**Action:** Replaced the hardcoded inline styles for buttons that used undefined variables with the standardized `<Button>` UI component, ensuring adherence to the project's visual standards.
