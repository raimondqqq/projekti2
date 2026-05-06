# CSS & Tailwind Agent

> **Activation:** "Use css agent" or "css mode"  
> **Purpose:** Tailwind patterns, responsive design, layout systems

---

## Philosophy

- **Mobile-first always** — Start small, add complexity
- **Utility-first** — Tailwind for speed, custom CSS for complex stuff
- **Constraint-based** — Stick to the scale, avoid arbitrary values
- **Readable** — Group utilities logically, use @apply sparingly

---

## Fluid Typography & Spacing (Preferred)

Use CSS `clamp()` for smooth scaling instead of breakpoint jumps. This is the premium agency approach.

### Why Fluid > Breakpoints
```jsx
// ❌ Jumpy — awkward sizes between breakpoints
<h1 className="text-2xl md:text-4xl lg:text-5xl">

// ✅ Fluid — scales smoothly with viewport
<h1 className="text-[clamp(2rem,5vw,4rem)]">
```

### Syntax: `clamp(MIN, PREFERRED, MAX)`
| Part | Example | Meaning |
|------|---------|---------|
| MIN | `2rem` | Never smaller than this |
| PREFERRED | `5vw` | Scale with viewport width |
| MAX | `4rem` | Never larger than this |


### Fluid Spacing
Pair fluid type with fluid spacing — everything breathes together:
```jsx
// Section padding
<section className="py-[clamp(4rem,10vw,8rem)]">

// Container padding
<div className="px-[clamp(1rem,5vw,4rem)]">

// Gap between elements
<div className="gap-[clamp(1.5rem,4vw,3rem)]">
```

### Full Example
```jsx
<section className="py-[clamp(4rem,10vw,8rem)] px-[clamp(1rem,5vw,4rem)]">
  <h1 className="text-[clamp(2rem,5vw,4rem)] leading-tight">
    Headline scales smoothly
  </h1>
  <p className="mt-[clamp(1rem,3vw,2rem)] text-[clamp(1rem,1.5vw,1.25rem)]">
    Body text and spacing scale proportionally.
  </p>
</section>
```

### When to Use Breakpoints Instead
- Layout-dependent sizing (text must match a layout shift)
- Distinctly different mobile vs desktop hierarchy
- Very long headings that wrap unpredictably mid-scale


---

## Responsive Breakpoints

```javascript
// Tailwind defaults (mobile-first)
'sm': '640px',   // Large phones, small tablets
'md': '768px',   // Tablets
'lg': '1024px',  // Small laptops
'xl': '1280px',  // Desktops
'2xl': '1536px', // Large screens
```

### Pattern
```jsx
// ✅ Mobile-first approach
<div className="
  px-4           // Mobile: 16px padding
  md:px-8        // Tablet+: 32px padding
  lg:px-16       // Desktop+: 64px padding
">

// ❌ Desktop-first (anti-pattern)
<div className="
  px-16          // Default large
  md:px-8        // Override for tablet
  sm:px-4        // Override for mobile
">
```

---

## Layout Patterns

### Container with Max Width
```jsx
// Standard container
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

// Narrow content container
<div className="mx-auto max-w-3xl px-4">

// Full-bleed with constrained content
<section className="w-full bg-gray-100">
  <div className="mx-auto max-w-7xl px-4 py-16">
    {/* content */}
  </div>
</section>
```

### Flexbox Patterns
```jsx
// Horizontal center
<div className="flex justify-center">

// Vertical center
<div className="flex items-center">

// Both centered
<div className="flex items-center justify-center">

// Space between with wrap
<div className="flex flex-wrap items-center justify-between gap-4">

// Stack on mobile, row on desktop
<div className="flex flex-col md:flex-row gap-4">
```

### Grid Patterns
```jsx
// Auto-fit responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

// Sidebar layout
<div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">

// Asymmetric grid
<div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">

// Dense auto-fill (masonry-ish)
<div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
```

---

## Spacing System

### Standard Scale
```
0    = 0px
0.5  = 2px
1    = 4px
1.5  = 6px
2    = 8px
2.5  = 10px
3    = 12px
4    = 16px
5    = 20px
6    = 24px
8    = 32px
10   = 40px
12   = 48px
16   = 64px
20   = 80px
24   = 96px
32   = 128px
```

### Section Spacing
```jsx
// Standard section padding
<section className="py-16 md:py-24 lg:py-32">

// Tight section
<section className="py-8 md:py-12">

// Hero section (more generous)
<section className="py-24 md:py-32 lg:py-40">
```

### Component Spacing
```jsx
// Card padding
<div className="p-4 md:p-6">

// Button padding
<button className="px-4 py-2 md:px-6 md:py-3">

// Input padding
<input className="px-3 py-2">
```

---

## Typography

### Heading Scale
```jsx
// Display (hero headlines)
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">

// Page title
<h1 className="text-3xl md:text-4xl font-bold">

// Section heading
<h2 className="text-2xl md:text-3xl font-semibold">

// Subsection
<h3 className="text-xl md:text-2xl font-semibold">

// Card title
<h4 className="text-lg font-medium">
```

### Body Text
```jsx
// Large body (intros, leads)
<p className="text-lg md:text-xl text-gray-600 leading-relaxed">

// Standard body
<p className="text-base text-gray-600 leading-relaxed">

// Small text (captions, labels)
<span className="text-sm text-gray-500">

// Tiny text (legal, footnotes)
<small className="text-xs text-gray-400">
```

### Line Height & Tracking
```jsx
// Headlines: tighter
<h1 className="leading-tight tracking-tight">

// Body: relaxed for readability
<p className="leading-relaxed">

// All caps labels
<span className="text-xs uppercase tracking-wider">
```

---

## Animation Classes

### For GSAP Targeting
```jsx
// Elements that will be animated
<div className="animate-fade-up">       // GSAP will animate these
<p className="animate-text-reveal">
<div className="animate-scale-in">

// Initial hidden state (optional, GSAP can handle)
<div className="opacity-0 translate-y-8">
```

### CSS Transitions (for hover states, not GSAP territory)
```jsx
// Standard transition
<button className="transition-colors duration-200">

// Transform transition
<div className="transition-transform duration-300 hover:scale-105">

// All properties
<div className="transition-all duration-300">
```

---

## Utilities to Know

### Aspect Ratios
```jsx
<div className="aspect-video">     // 16:9
<div className="aspect-square">    // 1:1
<div className="aspect-[4/3]">     // Custom
```

### Object Fit
```jsx
<img className="object-cover">     // Fill & crop
<img className="object-contain">   // Fit within
<img className="object-center">    // Position
```

### Overflow
```jsx
<div className="overflow-hidden">  // Clip content
<div className="overflow-auto">    // Scrollable if needed
<div className="overflow-x-auto">  // Horizontal scroll only
```

### Position Utilities
```jsx
<div className="relative">
<div className="absolute inset-0">           // Full overlay
<div className="absolute top-0 right-0">     // Top right corner
<div className="sticky top-0">               // Sticky header
```

### Sizing
```jsx
<div className="h-screen">         // Full viewport height
<div className="min-h-screen">     // At least full height
<div className="w-full max-w-md">  // Full width with max
```

---

## Anti-Patterns

### Avoid
```jsx
// ❌ Arbitrary values when scale works
<div className="p-[13px]">
// ✅ Use the scale
<div className="p-3">  // 12px

// ❌ Over-specifying
<div className="flex flex-row flex-nowrap items-stretch justify-start">
// ✅ Defaults are fine
<div className="flex">

// ❌ @apply for everything
.card {
  @apply rounded-lg border border-gray-200 bg-white p-6;
}
// ✅ Use @apply only for repeated complex patterns

// ❌ Inline styles
<div style={{ marginTop: '20px' }}>
// ✅ Tailwind utilities
<div className="mt-5">
```

---

## Custom CSS (When Tailwind Isn't Enough)

### In globals.css
```css
/* Text gradient */
.text-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

/* Line clamp (multi-line truncate) */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```