# Phase 2 — Design System Reference

## Typography Note (important)
Blueprint calls for Styrene + Tiempos, which are licensed Commercial Type
fonts also used by Anthropic — not Anthropic's proprietary IP, but ZetaCode
should not lean on "looks like Anthropic" as a design goal, and should not
imitate their specific letterforms/licensed assets (blueprint Section 2.3
explicitly rules this out).

**Working placeholder pairing** (real, independently licensable):
- Display/headlines: **Fraunces** — variable serif, strong optical-size
  contrast, editorial character comparable to Tiempos' role.
- Body/UI/nav/forms: **General Sans** — clean grotesk, generous x-height,
  comparable role to Styrene.

Both are available with straightforward commercial licensing (Fontshare /
foundry direct) distinct from Commercial Type's catalogue. Swap into
`tokens.css` (`--font-display`, `--font-body`) once Phase 1 font licensing
is finalized — no other file needs to change.

## Colour Usage Rules (enforced)
- Lime (#C8FF00) — CTAs, highlights, status/focus states only. Never body text.
- Ink (#1C1D18) — primary text on light backgrounds.
- Canvas (#F5F4ED) — primary light background, not stark white.
- Charcoal (#20211C) — dark statement sections, footer.
- On dark sections: ivory/white text only — never lime body/paragraph text.
- Status/validation must never rely on colour alone (icon or text label required).

## Type Scale Application
| Token | Use |
|---|---|
| --text-3xl | Hero headline only |
| --text-2xl | Page-level H1 (non-hero pages) |
| --text-xl | Section headings (H2) |
| --text-lg | Sub-headings (H3) |
| --text-md | Lead paragraphs / intros |
| --text-base | Body copy |
| --text-sm | Secondary UI, captions |
| --text-xs | Labels, meta, eyebrow text |

## Motion Rules (Section 2.6 — enforced, no exceptions)
- 2D only. No WebGL, no Three.js, no shader effects, no 3D scenes.
- Scroll-led reveals, masked headline entrances, hover states, page-transition
  accents — all permitted, all must respect `prefers-reduced-motion`.
- Content must be fully accessible with motion/JS disabled.
- No flashing or rapid high-contrast transitions.
