## 2024-08-22 - [Format Date Caching]
**Learning:** Calling Date.prototype.toLocaleString() implicitly instantiates Intl formatters repeatedly, which can block the main thread during large list rendering.
**Action:** Always cache Intl.DateTimeFormat instances using useMemo for client components or by instantiating them outside of loops for server components, and invoke their `.format()` methods instead.
