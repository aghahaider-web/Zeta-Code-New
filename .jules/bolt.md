## 2024-05-15 - Date Formatting Optimization
**Learning:** Calling `toLocaleString()` directly within loops or mappings for arrays blocks the main thread in React causing performance drops.
**Action:** Cache `Intl.DateTimeFormat` instances using `useMemo` when formatting multiple dates.
