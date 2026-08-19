## 2024-08-19 - Caching getBoundingClientRect in Mouse Events
**Learning:** Calling `getBoundingClientRect()` inside a high-frequency event like `mousemove` forces the browser to recalculate layout on every frame, causing unnecessary layout thrashing and CPU load.
**Action:** Always cache the results of DOM measurement functions like `getBoundingClientRect()` on `mouseenter` (when interaction starts) and clear them on `mouseleave`. Use the cached values inside the `mousemove` handler.
