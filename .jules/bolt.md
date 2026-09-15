## 2023-10-27 - Caching Intl.DateTimeFormat
**Learning:** Calling Date.prototype.toLocaleString() repeatedly (e.g. mapping over arrays in components) can cause severe main thread blocking and drop performance.
**Action:** When formatting multiple dates, cache Intl.DateTimeFormat instances (using useMemo where appropriate) and use .format() instead.
## 2023-11-20 - Intl.DateTimeFormat caching without hardcoded locales
**Learning:** Hardcoding locales (like "en-US") when caching `Intl.DateTimeFormat` bypasses system defaults and can introduce subtle formatting regressions.
**Action:** When caching `Intl.DateTimeFormat` to replace `Date.prototype.toLocaleDateString()`, instantiate it with `undefined` (e.g., `new Intl.DateTimeFormat(undefined)`) rather than hardcoding a specific locale like "en-US".
