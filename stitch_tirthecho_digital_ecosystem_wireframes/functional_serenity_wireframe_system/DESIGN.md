---
name: Functional Serenity Wireframe System
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#43474a'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0ef'
  outline: '#73787b'
  outline-variant: '#c3c7cb'
  surface-tint: '#526069'
  primary: '#526069'
  on-primary: '#ffffff'
  primary-container: '#e3f2fd'
  on-primary-container: '#606f78'
  inverse-primary: '#bac9d3'
  secondary: '#5e5e5f'
  on-secondary: '#ffffff'
  secondary-container: '#e0dfdf'
  on-secondary-container: '#626363'
  tertiary: '#5d5f5f'
  on-tertiary: '#ffffff'
  tertiary-container: '#f0f0f0'
  on-tertiary-container: '#6c6d6d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e5ef'
  primary-fixed-dim: '#bac9d3'
  on-primary-fixed: '#0f1d25'
  on-primary-fixed-variant: '#3b4951'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e5e2e1'
typography:
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: '0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  grid_columns: '12'
  gutter: 16px
  margin: 24px
---

## Brand & Style
This design system is engineered for a Jain digital ecosystem, emphasizing clarity, non-attachment to visual fluff, and structural integrity. The brand personality is serene yet highly organized, reflecting the systematic nature of digital community management. 

The style adopts a **Minimalist Wireframe** approach. It avoids distracting colors and high-fidelity textures to focus the user’s attention on information architecture and flow. By using a monochromatic base with a single ethereal blue accent, the design system creates a calm, focused environment suitable for spiritual and community utility.

## Colors
The palette is strictly limited to ensure low-to-mid fidelity focus. 
- **Backgrounds (#F5F5F5):** Used for the primary canvas to reduce eye strain compared to pure white.
- **Borders (#E0E0E0):** Defines structural boundaries, card edges, and divider lines.
- **Secondary Text (#9E9E9E):** Reserved for metadata, captions, and placeholder text.
- **Headings (#212121):** Provides high-contrast legibility for titles and primary labels.
- **Accent (#E3F2FD):** A subtle light blue used exclusively for primary interactive states, selected buttons, and active status indicators.

## Typography
This design system utilizes **Inter** for its neutral, systematic character and exceptional legibility at small sizes. The hierarchy is established through weight and scale rather than color. 

Headings are set in #212121 with tighter letter spacing for a grounded feel. Body text defaults to #212121 for readability, while secondary information shifts to #9E9E9E. All typographic elements follow a strict vertical rhythm based on the 8px grid.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** 12-column grid. On desktop, the container is centered with 24px outer margins and 16px gutters between columns. 

All component dimensions, padding, and margins must be multiples of the **8px base unit**. This ensures a consistent visual cadence and simplifies the handoff between wireframe and development. Card-based layouts are the primary vessel for content, typically spanning 3, 4, 6, or 12 columns depending on content density.

## Elevation & Depth
In keeping with the wireframe aesthetic, this design system avoids heavy drop shadows. Depth is communicated through **Low-contrast outlines** and **Tonal layering**.

- **Level 0 (Base):** #F5F5F5 background.
- **Level 1 (Cards/Tiles):** White (#FFFFFF) fill with a 1px border of #E0E0E0.
- **Level 2 (Hover/Active):** A subtle fill of #E3F2FD or a slight darkening of the border to #9E9E9E.
- **Level 3 (Modals/Popovers):** White (#FFFFFF) fill with a 1px border of #9E9E9E and a soft 16px blur, 10% opacity black shadow to suggest a physical lift.

## Shapes
The shape language is **Soft**. A default radius of 4px (`0.25rem`) is applied to all standard components like buttons, input fields, and category tiles. 

Larger containers, such as primary content cards, use a 8px (`rounded-lg`) radius. This subtle rounding maintains the professional "corporate" feel of the platform while softening the overall UI to evoke the peaceful nature of the Jain ecosystem. Status badges and map markers may utilize pill-shapes for distinct visual categorization.