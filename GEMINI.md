# Blood Circle Project Instructions

This project is a Next.js application designed to connect blood donors with those in need. It features a high-fidelity, custom-designed UI with a focus on elegant typography and smooth interactions.

## Architecture & Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Vanilla CSS (Modular/Directory-specific)
- **UI Components:** Custom components in `src/components`, layouts in `src/app`.

## Design System & Styling
- **Palette:**
  - Crimson: `#8C1F28` (Primary brand color)
  - Cream: `#F7F3EC` (Primary background color)
  - Gold: `#B8922A` (Accent color)
  - Ink: `#1C1C1C` (Primary text color)
- **Typography:**
  - Headings/Serif: 'Cormorant Garamond', serif
  - UI/Sans: 'DM Sans', sans-serif
- **Conventions:**
  - Avoid TailwindCSS; prefer Vanilla CSS for maximum flexibility and control over the unique aesthetic.
  - Maintain the "frosted glass" and "soft shadow" effects where appropriate, but ensure they don't cause performance issues (e.g., avoid `backdrop-filter` on complex sticky elements if it bleeds).
  - Preserve the custom cursor and page loader experiences.

## Coding Standards
- **Components:** Use functional components with TypeScript interfaces for props.
- **State Management:** Prefer React state and hooks.
- **Modularity:** Keep CSS scoped to its respective page or component directory.
- **Icons:** Use inline SVGs or a consistent icon library if introduced.

## Workflow Mandates
- **Surgical Updates:** When fixing bugs or adding features, maintain the existing visual polish.
- **Validation:** Always verify changes against the established design system.
