## File 3 — `src/app/globals.css`
**Action: Append (do NOT replace)** the contents of `loader-styles-to-append.css`
to the bottom of your existing `globals.css`.
 
Also **remove** (or comment out) the old loader block inside `globals.css`:
```css
/* DELETE THIS OLD BLOCK ↓ */
#page-loader {
  position: fixed; inset: 0; z-index: 9999;
  background: var(--ink); display: flex; align-items: center; justify-content: center;
  transition: opacity 0.6s ease;
}
#page-loader.hidden { opacity: 0; pointer-events: none; }
.loader-content { text-align: center; }
.loader-logo { ... }
.loader-logo span { ... }
.loader-bar-wrap { ... }
.loader-bar { ... }
@keyframes load-bar { ... }
/* DELETE THIS OLD BLOCK ↑ */
```
 
---
 
## Timing overview
 
| Time     | What happens                              |
|----------|-------------------------------------------|
| 0ms      | Drop outline starts drawing, rings expand |
| 300ms    | EKG line starts drawing                   |
| 500ms    | Logo letters start popping in (staggered) |
| 1300ms   | Tagline fades in, EKG starts scrolling    |
| 1400ms   | Counter hits 100%, drop is fully filled   |
| 1700ms   | Exit animation begins (scale+fade)        |
| 2500ms   | Loader fully gone, page visible           |
 
---
 
## Customisation
 
| What to change          | Where                              |
|-------------------------|------------------------------------|
| Total duration          | `DURATION = 1400` in ClientShell   |
| Exit delay after 100%   | `setTimeout(exitLoader, 300)`      |
| Drop size               | `.ldr-drop-svg { width / height }` |
| Ring count / timing     | `.ldr-ring.r1/r2/r3` delays        |
| Letter spring bounce    | `cubic-bezier(0.34, 1.56, 0.64, 1)` in `ldr-char-in` |
| EKG color               | `stroke="#8C1F28"` on `<polyline>` |
 
---
