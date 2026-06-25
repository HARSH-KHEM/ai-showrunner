---
name: AI Showrunner Noir
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e9bcb6'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#af8782'
  outline-variant: '#5e3f3b'
  surface-tint: '#ffb4aa'
  primary: '#ffb4aa'
  on-primary: '#690003'
  primary-container: '#e50914'
  on-primary-container: '#fff7f6'
  inverse-primary: '#c0000c'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#a06500'
  on-tertiary-container: '#fff7f1'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4aa'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930007'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-xl:
    fontFamily: Bebas Neue
    fontSize: 96px
    fontWeight: '400'
    lineHeight: 90px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Bebas Neue
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Bebas Neue
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0.05em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  terminal-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is a fusion of **Cinematic Noir** and **High-Tech Control Center** aesthetics. It is designed for an elite "AI Showrunner" experience—positioning the user as a director in a digital film studio. 

The visual style leverages **Glassmorphism** with a dark, heavy lean. Interfaces should feel like layered light on smoked glass. Subtle film grain and scanline textures are applied to high-level containers to evoke an analog-to-digital transition. The emotional response is one of power, precision, and immersive storytelling. 

Key stylistic pillars include:
- **Atmospheric Depth:** Use of "light leaks" (radial gradients) in crimson and violet that appear to bleed from behind panels.
- **Precision Engineering:** 1px glowing borders and monospaced data readouts.
- **Cinematic Drama:** High-contrast typography and extreme verticality in headings.

## Colors

The palette is anchored in a pure cinematic black to ensure maximum OLED contrast.

- **Backgrounds:** The base layer is `#080808`. Surface layers use semi-transparent overlays to maintain depth.
- **Accents:** The primary brand expression is a gradient transition from **Deep Crimson** (#e50914) to **Electric Violet** (#8b5cf6). This gradient should be used for primary actions and active state highlights.
- **Utility:** **Warm Gold** (#f59e0b) is reserved for critical status indicators, premium features, or "Golden Hour" highlights in the UI.
- **Text:** Primary information is always `#ffffff`. Secondary metadata and inactive states use `#a3a3a3`.

## Typography

Typography follows a strict hierarchy of "The Poster" vs "The Script."

- **Headlines (Bebas Neue):** These are the "Title Cards." They should be used for screen titles and major section headers. The tall, condensed nature of the font allows for high-impact messaging without occupying excessive horizontal space.
- **Body (Inter):** Used for all descriptive content and UI labels. It provides a neutral, highly legible counterbalance to the aggressive headings.
- **Data & Terminal (JetBrains Mono):** Reserved for AI logic, timestamps, scene coordinates, and system logs. This reinforces the "Showrunner" control room metaphor.

## Layout & Spacing

This design system utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

- **The Wide Angle:** Desktop layouts should feel expansive with generous outer margins (48px) to frame the content like a cinema screen.
- **The Stack:** Elements are grouped using a base-4 vertical rhythm. 
- **Content Framing:** Information is often contained within "Letterbox" containers—wide, short horizontal modules that mimic the 21:9 aspect ratio.

## Elevation & Depth

Depth is achieved through **Luminous Layering** rather than traditional shadows.

1. **Base:** Pure black (#080808) with a 2% film grain overlay.
2. **Plates:** Containers use a 40% opacity black fill with a `20px` background blur (Backdrop Filter).
3. **Internal Glow:** Active or focused elements utilize a `1px` inner stroke of the Crimson-to-Violet gradient.
4. **Light Leaks:** Floating elements (modals, tooltips) feature a soft, diffuse radial glow behind them, tinted in Violet at 10% opacity, creating a "halo" effect on the background.

## Shapes

The shape language is architectural and precise. While the design leans toward a "hard" look, a subtle `0.5rem` (8px) radius is applied to standard components to keep the UI from feeling hostile. 

- **Standard Elements:** 8px radius (buttons, input fields).
- **Large Containers:** 16px radius (cards, modals).
- **Decorative Accents:** 0px (sharp) corners are used for terminal windows or decorative "crop marks" in the corners of the screen to emphasize the camera-viewfinder aesthetic.

## Components

- **Action Buttons:** Primary buttons use the Crimson-to-Violet gradient background with white text. Hover states trigger a slight glow (box-shadow) of the primary color.
- **Glass Cards:** Cards must have a 1px border at 20% opacity white. The background is a dark blur.
- **Input Fields:** Bottom-border only or fully enclosed with a 1px dark gray border. On focus, the border animates into a Crimson glow.
- **Scanline Overlays:** A repeating 2px linear gradient pattern can be applied to "Terminal" components to simulate old CRT monitors.
- **Scene Chips:** Small, rounded-sm tags with Gold text and a Gold 1px border for "Premium" or "High-Priority" AI suggestions.
- **Control Sliders:** Thin, 2px tracks with a Gold thumb, reminiscent of audio mixing boards in a studio.