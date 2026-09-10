## 2023-10-27 - Caching Intl.DateTimeFormat
**Learning:** Calling Date.prototype.toLocaleString() repeatedly (e.g. mapping over arrays in components) can cause severe main thread blocking and drop performance.
**Action:** When formatting multiple dates, cache Intl.DateTimeFormat instances (using useMemo where appropriate) and use .format() instead.
## 2025-02-14 - Caching Intl.DateTimeFormat in Server Components
**Learning:** Instantiating `Intl.DateTimeFormat` inside a mapping loop is extremely inefficient. `.toLocaleDateString()` implicitly creates a new instance on every call.
**Action:** Always hoist `Intl.DateTimeFormat` instantiations outside of mapping loops and use `.format()` to reuse the instance, particularly in Next.js Server Components.
