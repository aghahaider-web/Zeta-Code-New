## 2024-05-19 - Mousemove Animations with GSAP
**Learning:** Calling `gsap.to()` inside a high-frequency event listener like `mousemove` creates a new tween instance per frame, which causes high garbage collection overhead and potential UI jank.
**Action:** Use `gsap.quickTo()` for properties updated continuously by pointer/mouse events to reuse the same tween instance. Note that `quickTo` doesn't support changing easing dynamically, so fallback to `gsap.to()` for the `mouseleave` or snap-back animations if they require a different ease.
