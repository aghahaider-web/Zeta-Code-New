## 2023-10-27 - Caching Intl.DateTimeFormat
**Learning:** Calling Date.prototype.toLocaleString() repeatedly (e.g. mapping over arrays in components) can cause severe main thread blocking and drop performance.
**Action:** When formatting multiple dates, cache Intl.DateTimeFormat instances (using useMemo where appropriate) and use .format() instead.
