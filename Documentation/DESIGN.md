# Design System Documentation

## Overview

This document defines the complete design system for Personal Portfolio CMS, ensuring visual consistency across all pages and components.

## Color Palette

### Primary Colors

```mermaid
graph TD
    subgraph Primary["Primary Colors"]
        P1["Primary 50<br/>#F0F9FF<br/>rgb(240,249,255)"]
        P2["Primary 100<br/>#E0F2FE<br/>rgb(224,242,254)"]
        P3["Primary 200<br/>#BAE6FD<br/>rgb(186,230,253)"]
        P4["Primary 300<br/>#7DD3FC<br/>rgb(125,211,252)"]
        P5["Primary 400<br/>#38BDF8<br/>rgb(56,189,248)"]
        P6["Primary 500<br/>#0EA5E9<br/>rgb(14,165,233)"]
        P7["Primary 600<br/>#0284C7<br/>rgb(2,132,199)"]
        P8["Primary 700<br/>#0369A1<br/>rgb(3,105,161)"]
        P9["Primary 800<br/>#075985<br/>rgb(7,89,133)"]
        P10["Primary 900<br/>#0C4A6E<br/>rgb(12,74,110)"]
        P11["Primary 950<br/>#082F49<br/>rgb(8,47,73)"]
    end

    style Primary fill:#0EA5E9,color:#fff
```

### Neutral Colors

```mermaid
graph TD
    subgraph Neutral["Neutral Colors"]
        N0["Neutral 0<br/>#FFFFFF"]
        N50["Neutral 50<br/>#F8FAFC"]
        N100["Neutral 100<br/>#F1F5F9"]
        N200["Neutral 200<br/>#E2E8F0"]
        N300["Neutral 300<br/>#CBD5E1"]
        N400["Neutral 400<br/>#94A3B8"]
        N500["Neutral 500<br/>#64748B"]
        N600["Neutral 600<br/>#475569"]
        N700["Neutral 700<br/>#334155"]
        N800["Neutral 800<br/>#1E293B"]
        N900["Neutral 900<br/>#0F172A"]
        N950["Neutral 950<br/>#020617"]
    end

    style Neutral fill:#64748B,color:#fff
```

### Semantic Colors

```mermaid
graph TD
    subgraph Semantic["Semantic Colors"]
        S1["Success 500<br/>#22C55E<br/>Green"]
        S2["Warning 500<br/>#F59E0B<br/>Amber"]
        S3["Error 500<br/>#EF4444<br/>Red"]
        S4["Info 500<br/>#3B82F6<br/>Blue"]
    end

    subgraph Dark["Dark Mode Variants"]
        D1["Success 400<br/>#4ADE80"]
        D2["Warning 400<br/>#FBBF24"]
        D3["Error 400<br/>#F87171"]
        D4["Info 400<br/>#60A5FA"]
    end

    style Semantic fill:#22C55E,color:#fff
    style Dark fill:#4ADE80,color:#000
```

## Color Usage

### Light Mode

```css
:root {
  /* Background */
  --background: #FFFFFF;
  --background-secondary: #F8FAFC;
  --background-tertiary: #F1F5F9;

  /* Foreground */
  --foreground: #0F172A;
  --foreground-muted: #64748B;

  /* Primary */
  --primary: #0EA5E9;
  --primary-foreground: #FFFFFF;

  /* Secondary */
  --secondary: #F1F5F9;
  --secondary-foreground: #0F172A;

  /* Accent */
  --accent: #F0F9FF;
  --accent-foreground: #0EA5E9;

  /* Border */
  --border: #E2E8F0;
  --border-hover: #CBD5E1;

  /* Status */
  --success: #22C55E;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
}
```

### Dark Mode

```css
.dark {
  /* Background */
  --background: #020617;
  --background-secondary: #0F172A;
  --background-tertiary: #1E293B;

  /* Foreground */
  --foreground: #F8FAFC;
  --foreground-muted: #94A3B8;

  /* Primary */
  --primary: #38BDF8;
  --primary-foreground: #0C4A6E;

  /* Secondary */
  --secondary: #1E293B;
  --secondary-foreground: #F8FAFC;

  /* Accent */
  --accent: #0C4A6E;
  --accent-foreground: #7DD3FC;

  /* Border */
  --border: #334155;
  --border-hover: #475569;

  /* Status */
  --success: #4ADE80;
  --warning: #FBBF24;
  --error: #F87171;
  --info: #60A5FA;
}
```

## Typography

### Font Family

```mermaid
graph TD
    subgraph Fonts["Font Stack"]
        F1["Inter<br/>Primary Font<br/>Headings, UI"]
        F2["System UI<br/>Fallback<br/>Body Text"]
        F3["Monospace<br/>Code<br/>Code Blocks"]
    end

    style F1 fill:#0EA5E9,color:#fff
    style F2 fill:#64748B,color:#fff
    style F3 fill:#22C55E,color:#fff
```

### Type Scale

| Name | Size | Weight | Line Height | Use Case |
|------|------|--------|-------------|----------|
| `text-xs` | 12px / 0.75rem | 400 | 16px / 1rem | Captions, labels |
| `text-sm` | 14px / 0.875rem | 400 | 20px / 1.25rem | Secondary text |
| `text-base` | 16px / 1rem | 400 | 24px / 1.5rem | Body text |
| `text-lg` | 18px / 1.125rem | 500 | 28px / 1.75rem | Lead text |
| `text-xl` | 20px / 1.25rem | 600 | 28px / 1.75rem | H5 |
| `text-2xl` | 24px / 1.5rem | 600 | 32px / 2rem | H4 |
| `text-3xl` | 30px / 1.875rem | 700 | 36px / 2.25rem | H3 |
| `text-4xl` | 36px / 2.25rem | 700 | 40px / 2.5rem | H2 |
| `text-5xl` | 48px / 3rem | 800 | 48px / 3rem | H1 |
| `text-6xl` | 60px / 3.75rem | 800 | 60px / 3.75rem | Hero |

### Responsive Typography

```mermaid
graph LR
    subgraph Mobile["Mobile (<640px)"]
        M1["H1: 2rem / 32px"]
        M2["H2: 1.75rem / 28px"]
        M3["H3: 1.5rem / 24px"]
        M4["Body: 1rem / 16px"]
    end

    subgraph Tablet["Tablet (640-1024px)"]
        T1["H1: 2.5rem / 40px"]
        T2["H2: 2rem / 32px"]
        T3["H3: 1.75rem / 28px"]
        T4["Body: 1rem / 16px"]
    end

    subgraph Desktop["Desktop (>1024px)"]
        D1["H1: 3rem / 48px"]
        D2["H2: 2.25rem / 36px"]
        D3["H3: 1.875rem / 30px"]
        D4["Body: 1rem / 16px"]
    end
```

## Spacing System

### Base Grid

```mermaid
graph TD
    subgraph Spacing["Spacing Scale"]
        S0["0 - 0px"]
        S1["1 - 4px"]
        S2["2 - 8px"]
        S3["3 - 12px"]
        S4["4 - 16px"]
        S5["5 - 20px"]
        S6["6 - 24px"]
        S8["8 - 32px"]
        S10["10 - 40px"]
        S12["12 - 48px"]
        S16["16 - 64px"]
        S20["20 - 80px"]
        S24["24 - 96px"]
    end

    style Spacing fill:#0EA5E9,color:#fff
```

### Spacing Usage

| Token | Value | Use Case |
|-------|-------|----------|
| `space-0` | 0px | Reset, gaps |
| `space-1` | 4px | Tight gaps |
| `space-2` | 8px | Icon padding |
| `space-3` | 12px | Small padding |
| `space-4` | 16px | Default padding |
| `space-6` | 24px | Section padding |
| `space-8` | 32px | Component gap |
| `space-12` | 48px | Section gap |
| `space-16` | 64px | Large gap |
| `space-24` | 96px | Page section |

## Layout System

### Container Width

```mermaid
graph TD
    subgraph Containers["Container Sizes"]
        C1["Container SM<br/>max-width: 640px<br/>Padding: 16px"]
        C2["Container MD<br/>max-width: 768px<br/>Padding: 24px"]
        C3["Container LG<br/>max-width: 1024px<br/>Padding: 32px"]
        C4["Container XL<br/>max-width: 1280px<br/>Padding: 32px"]
        C5["Container 2XL<br/>max-width: 1536px<br/>Padding: 32px"]
    end

    style Containers fill:#22C55E,color:#fff
```

### Responsive Breakpoints

```mermaid
flowchart LR
    subgraph Breakpoints["Breakpoints"]
        SM["sm<br/>640px"]
        MD["md<br/>768px"]
        LG["lg<br/>1024px"]
        XL["xl<br/>1280px"]
        2XL["2xl<br/>1536px"]
    end

    subgraph Usage["Usage"]
        U1["Mobile First"]
        U2["Small Tablets"]
        U3["Tablets"]
        U4["Laptops"]
        U5["Desktops"]
    end

    SM --> U1
    MD --> U2
    LG --> U3
    XL --> U4
    2XL --> U5
```

## Border Radius

```mermaid
graph TD
    subgraph Radius["Border Radius Scale"]
        R1["none - 0px<br/>Sharp edges"]
        R2["sm - 4px<br/>Subtle rounding"]
        R3["md - 6px<br/>Default rounding"]
        R4["lg - 8px<br/>Medium rounding"]
        R5["xl - 12px<br/>Large rounding"]
        R6["2xl - 16px<br/>Card rounding"]
        R7["3xl - 24px<br/>Large cards"]
        R8["full - 9999px<br/>Pills, avatars"]
    end

    style Radius fill:#F59E0B,color:#fff
```

## Shadow System

### Shadow Scale

```mermaid
graph TD
    subgraph Shadows["Shadow Scale"]
        SH1["shadow-none<br/>No shadow"]
        SH2["shadow-sm<br/>Cards, inputs"]
        SH3["shadow-md<br/>Dropdown menus"]
        SH4["shadow-lg<br/>Modals, popovers"]
        SH5["shadow-xl<br/>Large modals"]
        SH6["shadow-2xl<br/>Floating elements"]
    end

    subgraph CSS["CSS Values"]
        CSS1["0 1px 2px rgba(0,0,0,0.05)"]
        CSS2["0 1px 3px rgba(0,0,0,0.1)"]
        CSS3["0 4px 6px rgba(0,0,0,0.1)"]
        CSS4["0 10px 15px rgba(0,0,0,0.1)"]
        CSS5["0 20px 25px rgba(0,0,0,0.1)"]
        CSS6["0 25px 50px rgba(0,0,0,0.25)"]
    end

    Shadows --> CSS

    style Shadows fill:#64748B,color:#fff
```

## Components

### Button System

```mermaid
flowchart TB
    subgraph Variants["Button Variants"]
        V1["Primary<br/>bg-primary-500<br/>text-white<br/>hover:bg-primary-600"]
        V2["Secondary<br/>bg-secondary<br/>text-foreground<br/>hover:bg-neutral-200"]
        V3["Outline<br/>border<br/>text-foreground<br/>hover:bg-neutral-100"]
        V4["Ghost<br/>transparent<br/>text-foreground<br/>hover:bg-neutral-100"]
        V5["Destructive<br/>bg-error-500<br/>text-white<br/>hover:bg-error-600"]
    end

    subgraph Sizes["Button Sizes"]
        SZ1["sm - h:32px px:12px text:14px"]
        SZ2["md - h:40px px:16px text:16px"]
        SZ3["lg - h:48px px:24px text:18px"]
    end
```

### Button States

| State | Primary | Secondary | Outline | Ghost | Destructive |
|-------|---------|-----------|---------|-------|-------------|
| Default | bg-primary-500 | bg-secondary | border | transparent | bg-error-500 |
| Hover | bg-primary-600 | bg-neutral-200 | bg-neutral-100 | bg-neutral-100 | bg-error-600 |
| Active | bg-primary-700 | bg-neutral-300 | bg-neutral-200 | bg-neutral-200 | bg-error-700 |
| Disabled | opacity-50 | opacity-50 | opacity-50 | opacity-50 | opacity-50 |
| Loading | spinner + opacity-50 | spinner + opacity-50 | spinner + opacity-50 | spinner + opacity-50 | spinner + opacity-50 |

### Input System

```mermaid
flowchart TB
    subgraph InputStates["Input States"]
        I1["Default<br/>border-neutral-300<br/>bg-white"]
        I2["Focus<br/>border-primary-500<br/>ring-2 ring-primary-500/20"]
        I3["Error<br/>border-error-500<br/>ring-2 ring-error-500/20"]
        I4["Disabled<br/>bg-neutral-100<br/>opacity-50"]
    end

    subgraph Sizes["Input Sizes"]
        S1["sm - h:32px text:14px"]
        S2["md - h:40px text:16px"]
        S3["lg - h:48px text:18px"]
    end
```

### Card Component

```mermaid
flowchart TB
    subgraph Card["Card Anatomy"]
        C1["Card Container<br/>bg-white<br/>border border-neutral-200<br/>rounded-xl shadow-sm"]
        C2["Card Header<br/>p-6 pb-4"]
        C3["Card Body<br/>p-6"]
        C4["Card Footer<br/>p-6 pt-4"]
    end

    subgraph Hover["Hover Effect"]
        H1["hover:shadow-md<br/>hover:border-neutral-300<br/>transition-all duration-200"]
    end
```

### Badge System

```mermaid
flowchart TB
    subgraph Badges["Badge Variants"]
        B1["Default<br/>bg-neutral-100<br/>text-neutral-700"]
        B2["Primary<br/>bg-primary-100<br/>text-primary-700"]
        B3["Success<br/>bg-green-100<br/>text-green-700"]
        B4["Warning<br/>bg-amber-100<br/>text-amber-700"]
        B5["Error<br/>bg-red-100<br/>text-red-700"]
        B6["Info<br/>bg-blue-100<br/>text-blue-700"]
    end

    subgraph Sizes["Badge Sizes"]
        S1["sm - text:12px px:6px py:1px"]
        S2["md - text:14px px:8px py:2px"]
        S3["lg - text:16px px:12px py:4px"]
    end
```

## Animation Guidelines

### Transition Timings

```mermaid
graph LR
    subgraph Timing["Transition Timing Functions"]
        T1["duration-150<br/>150ms<br/>Instant feedback"]
        T2["duration-200<br/>200ms<br/>Default transitions"]
        T3["duration-300<br/>300ms<br/>Smooth transitions"]
        T4["duration-500<br/>500ms<br/>Slow animations"]
    end

    subgraph Easing["Easing Functions"]
        E1["ease-in<br/>Fast start"]
        E2["ease-out<br/>Fast end"]
        E3["ease-in-out<br/>Smooth"]
    end
```

### Animation Usage

| Animation | Duration | Use Case |
|-----------|----------|----------|
| `transition-none` | 0ms | No animation |
| `transition-fast` | 150ms | Hover states, buttons |
| `transition-default` | 200ms | General transitions |
| `transition-slow` | 300ms | Modals, drawers |
| `transition-slower` | 500ms | Page transitions |

## Icon System

### Icon Sizing

```mermaid
graph TD
    subgraph Sizes["Icon Sizes"]
        I1["icon-xs - 12px<br/>Inline with small text"]
        I2["icon-sm - 16px<br/>Default inline icons"]
        I3["icon-md - 20px<br/>Buttons, cards"]
        I4["icon-lg - 24px<br/>Section icons"]
        I5["icon-xl - 32px<br/>Feature icons"]
        I6["icon-2xl - 48px<br/>Hero icons"]
    end

    style Sizes fill:#9C27B0,color:#fff
```

### Icon Usage

```typescript
// Icon component usage
import { Icon } from '@/components/ui/icon';

// Sizes
<Icon name="search" size="xs" />  // 12px
<Icon name="search" size="sm" />  // 16px
<Icon name="search" size="md" />  // 20px
<Icon name="search" size="lg" />  // 24px
<Icon name="search" size="xl" />  // 32px
<Icon name="search" size="2xl" /> // 48px
```

## Z-Index Scale

```mermaid
graph TD
    subgraph ZIndex["Z-Index Scale"]
        Z0["z-0 - 0<br/>Default stacking"]
        Z10["z-10 - 10<br/>Base elements"]
        Z20["z-20 - 20<br/>Dropdowns"]
        Z30["z-30 - 30<br/>Sticky elements"]
        Z40["z-40 - 40<br/>Fixed elements"]
        Z50["z-50 - 50<br/>Modals, drawers"]
        Z60["z-60 - 60<br/>Popovers"]
        Z70["z-70 - 70<br/>Tooltips"]
        Z80["z-80 - 80<br/>Toast notifications"]
    end

    style ZIndex fill:#64748B,color:#fff
```

## Responsive Patterns

### Navigation

```mermaid
flowchart TB
    subgraph Mobile["Mobile Navigation"]
        M1["Hamburger menu"]
        M2["Drawer from right"]
        M3["Full-screen overlay"]
    end

    subgraph Desktop["Desktop Navigation"]
        D1["Horizontal nav"]
        D2["Dropdown menus"]
        D3["Mega menu (optional)"]
    end
```

### Grid System

```mermaid
graph TB
    subgraph Grid["Responsive Grid"]
        G1["1 column<br/>Mobile"]
        G2["2 columns<br/>Tablet"]
        G3["3 columns<br/>Desktop"]
        G4["4 columns<br/>Large Desktop"]
    end

    subgraph Gutters["Gutter System"]
        GUT1["Mobile: 16px"]
        GUT2["Tablet: 24px"]
        GUT3["Desktop: 32px"]
    end
```

## Accessibility

### Focus States

```mermaid
graph TD
    subgraph Focus["Focus Ring Styles"]
        F1["Default<br/>ring-2 ring-primary-500<br/>ring-offset-2"]
        F2["Inset<br/>outline-none<br/>ring-2 ring-inset"]
        F3["Error<br/>ring-2 ring-error-500"]
    end

    style Focus fill:#3B82F6,color:#fff
```

### Color Contrast

| Element | Contrast Ratio | WCAG Level |
|---------|----------------|------------|
| Text on background | 4.5:1 minimum | AA |
| Large text on background | 3:1 minimum | AA |
| UI components on background | 3:1 minimum | AA |
| Primary text on primary bg | 4.5:1 minimum | AA |

## Dark Mode Implementation

```mermaid
flowchart TD
    subgraph Trigger["Theme Trigger"]
        T1["System preference"]
        T2["Manual toggle"]
        T3["User preference (persisted)"]
    end

    subgraph Implementation["Implementation"]
        I1["class='dark' on html"]
        I2["CSS variables swap"]
        I3["Tailwind dark: prefix"]
    end

    T1 --> I1
    T2 --> I1
    T3 --> I1

    I1 --> I2
    I2 --> I3

    style Trigger fill:#F59E0B,color:#000
    style Implementation fill:#0EA5E9,color:#fff
```

## Utility Classes Reference

### Tailwind Classes Mapping

```typescript
// Color utilities
bg-primary-500     // Primary background
text-primary-500   // Primary text
border-primary-500 // Primary border
ring-primary-500   // Primary ring
hover:bg-primary-600

// Spacing utilities
p-4  // Padding all
px-4 // Padding horizontal
py-4 // Padding vertical
m-4  // Margin all
mx-auto // Margin horizontal auto
my-4 // Margin vertical

// Typography utilities
text-sm   // 14px
font-medium // Medium weight
leading-tight // 1.25
tracking-tight // -0.025em

// Layout utilities
flex      // Display flex
grid      // Display grid
hidden    // Display none
block     // Display block
inline-flex

// Responsive utilities
md:flex   // Show on md and up
lg:hidden // Hide on lg and up
xl:grid-cols-4
```

## Design Token Export

```typescript
// tokens.ts
export const tokens = {
  colors: {
    primary: {
      50: '#F0F9FF',
      100: '#E0F2FE',
      200: '#BAE6FD',
      300: '#7DD3FC',
      400: '#38BDF8',
      500: '#0EA5E9',
      600: '#0284C7',
      700: '#0369A1',
      800: '#075985',
      900: '#0C4A6E',
      950: '#082F49',
    },
    neutral: {
      0: '#FFFFFF',
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
      950: '#020617',
    },
  },
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    6: '24px',
    8: '32px',
    12: '48px',
    16: '64px',
    24: '96px',
  },
  radius: {
    none: '0px',
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
    xl: '0 20px 25px rgba(0,0,0,0.1)',
    '2xl': '0 25px 50px rgba(0,0,0,0.25)',
  },
};
```
