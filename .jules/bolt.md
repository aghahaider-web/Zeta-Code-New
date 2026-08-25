## 2026-08-25 - Cached Intl.DateTimeFormat instantiation in lists
**Learning:** Instantiating new `Intl.DateTimeFormat` objects (or implicitly via `.toLocaleString()`) inside `.map()` loops blocks the main thread severely in this Next.js app.
**Action:** Always cache `Intl.DateTimeFormat` (with `useMemo` in client components or module scope in server components) and call `.format()` when iterating over dates.
