# GSAP Animation Agent

> **Activation:** "Use gsap agent" or "gsap mode"
> **Stack:** Next.js (App Router), React, TypeScript
> **Philosophy:** Subtle, refined motion. Mobile-first. Performance obsessed.

---

## Core Principles

### Animation Philosophy
- **Subtlety over flash** — Animations should feel inevitable, not attention-seeking
- **Mobile-first always** — Design for touch, enhance for desktop
- **60fps or die** — Never sacrifice performance for flair
- **Purpose-driven motion** — Every animation should communicate something

### Preferred Easings
Avoid harsh easings. Use soft, natural curves:

```javascript
// ✅ PREFERRED - Soft & subtle
"power1.out"      // Default, gentle deceleration
"power1.inOut"    // Smooth state changes
"power2.out"      // Slightly more pronounced
"sine.out"        // Very smooth, organic feel
"sine.inOut"      // Buttery smooth transitions
"circ.out"        // Quick start, gentle landing
"expo.out"        // Fast start, very soft end (use sparingly)

// ❌ AVOID - Too aggressive
"power3.out"      // Feels harsh
"power4.out"      // Way too snappy
"elastic"         // Rarely appropriate
"bounce"          // Almost never use
```


### Duration Guidelines
```javascript
// Micro-interactions
0.2 - 0.3s    // Hover states, button feedback

// UI transitions  
0.4 - 0.6s    // Navigation, modals, state changes

// Scroll animations
0.6 - 1.0s    // Content reveals, parallax

// Hero/Impact animations
1.0 - 1.5s    // Page load, major transitions

// Text animations
0.8 - 1.2s    // SplitText reveals (with stagger)
```

---

## Next.js Setup

### Installation
```bash
npm install gsap @gsap/react
```

### Plugin Registration (create once, import everywhere)
```typescript
// lib/gsap.ts
"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";

// Register all plugins
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Flip);

// Set global defaults
gsap.defaults({
  ease: "power1.out",
  duration: 0.6,
});

// Export everything
export { gsap, useGSAP, ScrollTrigger, SplitText, Flip };
```

### Component Pattern
```typescript
"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

export function AnimatedSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // All GSAP code here is automatically cleaned up
    gsap.from(".animate-item", {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });
  }, { scope: containerRef }); // Scope selectors to this container

  return (
    <section ref={containerRef}>
      <div className="animate-item">...</div>
    </section>
  );
}
```

---

## ScrollTrigger Patterns

### Basic Scroll-Triggered Animation
```typescript
useGSAP(() => {
  gsap.from(".fade-up", {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.15,
    scrollTrigger: {
      trigger: ".section",
      start: "top 80%",    // When top of trigger hits 80% from viewport top
      end: "bottom 20%",   // Optional: when bottom hits 20%
      // markers: true,    // Debug mode
    },
  });
}, { scope: containerRef });
```

### Scrubbed Animation (tied to scroll position)
```typescript
useGSAP(() => {
  gsap.to(".parallax-element", {
    y: -100,
    ease: "none", // IMPORTANT: Always use "none" for scrub
    scrollTrigger: {
      trigger: ".parallax-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1, // Smooth 1-second catch-up
    },
  });
}, { scope: containerRef });
```

### Pinned Section with Timeline
```typescript
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".pin-section",
      start: "top top",
      end: "+=200%", // Pin for 2x viewport heights
      pin: true,
      scrub: 1,
      anticipatePin: 1, // Smooth pin on fast scroll
    },
  });

  tl.from(".step-1", { opacity: 0, y: 50 })
    .from(".step-2", { opacity: 0, y: 50 })
    .from(".step-3", { opacity: 0, y: 50 });
}, { scope: containerRef });
```

### Horizontal Scroll Section
```typescript
useGSAP(() => {
  const container = containerRef.current;
  const sections = gsap.utils.toArray<HTMLElement>(".horizontal-panel");
  
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none", // MUST be "none" for horizontal scroll
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      snap: 1 / (sections.length - 1), // Snap to each panel
      end: () => "+=" + container!.offsetWidth,
    },
  });
}, { scope: containerRef });
```

### Batch Animations (multiple elements entering viewport)
```typescript
useGSAP(() => {
  ScrollTrigger.batch(".grid-item", {
    onEnter: (elements) => {
      gsap.from(elements, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
      });
    },
    start: "top 85%",
  });
}, { scope: containerRef });
```

### ScrollTrigger with containerAnimation (nested horizontal)
```typescript
useGSAP(() => {
  // First, create the horizontal scroll
  const horizontalScroll = gsap.to(".panels", {
    xPercent: -100,
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-container",
      pin: true,
      scrub: 1,
      end: "+=3000",
    },
  });

  // Then trigger animations within the horizontal scroll
  gsap.from(".nested-element", {
    scale: 0.5,
    opacity: 0,
    scrollTrigger: {
      trigger: ".nested-element",
      containerAnimation: horizontalScroll, // KEY!
      start: "left center",
      end: "right center",
      scrub: true,
    },
  });
}, { scope: containerRef });
```

---

## SplitText Patterns

### Basic Text Reveal
```typescript
useGSAP(() => {
  const split = SplitText.create(".headline", {
    type: "words, chars",
    charsClass: "char",
  });

  gsap.from(split.chars, {
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.02,
    ease: "power2.out",
  });

  // Cleanup
  return () => split.revert();
}, { scope: containerRef });
```

### Line-by-Line Reveal with Mask
```typescript
useGSAP(() => {
  SplitText.create(".paragraph", {
    type: "lines",
    mask: "lines", // Creates clip mask for reveal effect
    linesClass: "line",
    autoSplit: true, // Re-splits on resize
    onSplit(self) {
      return gsap.from(self.lines, {
        yPercent: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: self.elements[0],
          start: "top 80%",
        },
      });
    },
  });
}, { scope: containerRef });
```

### Staggered Word Reveal
```typescript
useGSAP(() => {
  const split = SplitText.create(".tagline", {
    type: "words",
    wordsClass: "word",
  });

  gsap.from(split.words, {
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: {
      each: 0.08,
      from: "start", // or "end", "center", "edges", "random"
    },
    ease: "power1.out",
  });
}, { scope: containerRef });
```

### Character Wave Animation
```typescript
useGSAP(() => {
  const split = SplitText.create(".wave-text", {
    type: "chars",
  });

  gsap.from(split.chars, {
    y: 30,
    opacity: 0,
    duration: 0.4,
    stagger: {
      each: 0.03,
      from: "start",
    },
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".wave-text",
      start: "top 75%",
    },
  });
}, { scope: containerRef });
```

### Responsive Text Splitting
```typescript
useGSAP(() => {
  // autoSplit handles font loading and resize
  SplitText.create(".responsive-headline", {
    type: "lines, words",
    mask: "lines",
    autoSplit: true,
    onSplit(self) {
      // This runs on initial split AND every re-split
      return gsap.from(self.words, {
        yPercent: 100,
        duration: 0.7,
        stagger: 0.02,
        ease: "power2.out",
      });
    },
  });
}, { scope: containerRef });
```

---

## Flip Plugin Patterns

### Basic State Change
```typescript
const handleStateChange = () => {
  // 1. Capture current state
  const state = Flip.getState(".card");

  // 2. Make DOM changes
  setLayout(layout === "grid" ? "list" : "grid");

  // 3. Animate from old state to new
  Flip.from(state, {
    duration: 0.6,
    ease: "power1.inOut",
    stagger: 0.05,
    absolute: true, // Prevents layout issues during animation
  });
};
```

### Flip with ScrollTrigger
```typescript
useGSAP(() => {
  // Capture initial state
  const state = Flip.getState(".flip-item");

  // Move items to new container on scroll
  ScrollTrigger.create({
    trigger: ".flip-section",
    start: "top center",
    onEnter: () => {
      // Move items to new parent
      document.querySelector(".target-container")
        ?.append(...document.querySelectorAll(".flip-item"));

      Flip.from(state, {
        duration: 0.8,
        ease: "power2.inOut",
        absolute: true,
        stagger: 0.1,
      });
    },
  });
}, { scope: containerRef });
```

### Flip Between Different Elements
```html
<!-- Both elements have same data-flip-id -->
<div data-flip-id="card-1" className="card-small">...</div>
<div data-flip-id="card-1" className="card-large" style="display: none">...</div>
```

```typescript
const expandCard = () => {
  const state = Flip.getState("[data-flip-id='card-1']");
  
  // Toggle visibility
  smallCard.style.display = "none";
  largeCard.style.display = "block";

  Flip.from(state, {
    duration: 0.5,
    ease: "power2.inOut",
    fade: true, // Cross-fade between elements
    absolute: true,
  });
};
```

### Flip with Enter/Leave Callbacks
```typescript
const updateItems = (newItems: Item[]) => {
  const state = Flip.getState(".item");
  
  // Update DOM
  setItems(newItems);

  Flip.from(state, {
    duration: 0.6,
    ease: "power1.inOut",
    absolute: true,
    onEnter: (elements) => {
      // Animate new items in
      return gsap.from(elements, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
      });
    },
    onLeave: (elements) => {
      // Animate removed items out
      return gsap.to(elements, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
      });
    },
  });
};
```

### Flip.fit() - Match Element Positions
```typescript
// Make element1 look like it's in element2's position
Flip.fit(".element1", ".element2", {
  scale: true, // Use scale instead of width/height
  duration: 0.5,
  ease: "power2.inOut",
});
```

---

## Timeline Patterns

### Sequenced Animation
```typescript
useGSAP(() => {
  const tl = gsap.timeline({
    defaults: { ease: "power2.out", duration: 0.6 },
  });

  tl.from(".hero-title", { y: 60, opacity: 0 })
    .from(".hero-subtitle", { y: 40, opacity: 0 }, "-=0.3") // Overlap
    .from(".hero-cta", { y: 30, opacity: 0 }, "-=0.2")
    .from(".hero-image", { scale: 0.95, opacity: 0 }, "-=0.4");
}, { scope: containerRef });
```

### Timeline with Labels
```typescript
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".sequence-section",
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 1,
      snap: {
        snapTo: "labels",
        duration: { min: 0.2, max: 0.5 },
        ease: "power1.inOut",
      },
    },
  });

  tl.addLabel("intro")
    .from(".intro-content", { opacity: 0, y: 50 })
    .addLabel("features")
    .from(".feature-1", { opacity: 0, x: -50 })
    .from(".feature-2", { opacity: 0, x: 50 })
    .addLabel("conclusion")
    .from(".conclusion", { opacity: 0, scale: 0.9 });
}, { scope: containerRef });
```

### Controlled Timeline (play/reverse)
```typescript
const [isOpen, setIsOpen] = useState(false);
const tlRef = useRef<gsap.core.Timeline | null>(null);

useGSAP(() => {
  tlRef.current = gsap.timeline({ paused: true })
    .to(".menu", { x: 0, duration: 0.4 })
    .from(".menu-item", { 
      x: -20, 
      opacity: 0, 
      stagger: 0.05,
    }, "-=0.2");
}, { scope: containerRef });

const toggleMenu = () => {
  if (isOpen) {
    tlRef.current?.reverse();
  } else {
    tlRef.current?.play();
  }
  setIsOpen(!isOpen);
};
```

---

## Stagger Patterns

### Basic Stagger
```typescript
gsap.from(".items", {
  y: 30,
  opacity: 0,
  stagger: 0.1, // 0.1s between each
});
```

### Advanced Stagger Object
```typescript
gsap.from(".grid-items", {
  y: 40,
  opacity: 0,
  duration: 0.6,
  stagger: {
    each: 0.08,           // Time between each
    from: "start",        // "start" | "end" | "center" | "edges" | "random" | index
    grid: [4, 3],         // For grid layouts [cols, rows]
    axis: "x",            // "x" | "y" for grid
    ease: "power1.in",    // Ease the stagger timing itself
  },
});
```

### Stagger from Center (ripple effect)
```typescript
gsap.from(".radial-items", {
  scale: 0,
  opacity: 0,
  stagger: {
    each: 0.05,
    from: "center",
    grid: "auto",
  },
});
```

---

## Performance Best Practices

### Use Transform Properties
```typescript
// ✅ GOOD - GPU accelerated
gsap.to(".element", { x: 100, y: 50, scale: 1.1, rotation: 45 });

// ❌ BAD - Triggers layout
gsap.to(".element", { left: 100, top: 50, width: "110%", marginLeft: 20 });
```

### Will-Change for Heavy Animations
```css
.heavy-animation {
  will-change: transform, opacity;
}
```

### Batch DOM Reads/Writes
```typescript
// ✅ GOOD - Read all, then write all
const elements = gsap.utils.toArray(".items");
const positions = elements.map(el => el.getBoundingClientRect()); // Read

positions.forEach((pos, i) => {
  gsap.set(elements[i], { x: pos.width }); // Write
});

// ❌ BAD - Interleaved reads/writes cause layout thrashing
elements.forEach(el => {
  const rect = el.getBoundingClientRect(); // Read
  gsap.set(el, { x: rect.width }); // Write
});
```

### Kill Animations on Unmount
```typescript
useGSAP(() => {
  // Automatic cleanup with useGSAP
  const tl = gsap.timeline();
  // ...
}, { scope: containerRef });

// For manual cleanup:
useEffect(() => {
  return () => {
    ScrollTrigger.getAll().forEach(st => st.kill());
  };
}, []);
```

### Responsive ScrollTriggers
```typescript
useGSAP(() => {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    // Desktop animations
    gsap.from(".desktop-only", { x: 100 });
  });

  mm.add("(max-width: 767px)", () => {
    // Mobile animations (simpler)
    gsap.from(".mobile-only", { y: 30 });
  });

  return () => mm.revert();
}, { scope: containerRef });
```

---

## Common Mistakes to Avoid

### 1. Not Using `ease: "none"` for Scrubbed Animations
```typescript
// ❌ WRONG
scrollTrigger: { scrub: 1 },
ease: "power2.out", // This will fight with scrub!

// ✅ CORRECT
scrollTrigger: { scrub: 1 },
ease: "none",
```

### 2. Animating Pinned Elements Directly
```typescript
// ❌ WRONG - Don't animate the pinned element itself
gsap.to(".pinned-section", {
  x: 100,
  scrollTrigger: { pin: ".pinned-section" }
});

// ✅ CORRECT - Animate children of pinned element
gsap.to(".pinned-section .content", {
  x: 100,
  scrollTrigger: { trigger: ".pinned-section", pin: true }
});
```

### 3. Not Scoping Selectors in React
```typescript
// ❌ WRONG - Selects ALL .box elements on page
useGSAP(() => {
  gsap.from(".box", { y: 50 });
});

// ✅ CORRECT - Scoped to component
useGSAP(() => {
  gsap.from(".box", { y: 50 });
}, { scope: containerRef });
```

### 4. Forgetting ScrollTrigger.refresh()
```typescript
// After dynamic content loads
useEffect(() => {
  if (dataLoaded) {
    ScrollTrigger.refresh();
  }
}, [dataLoaded]);
```

### 5. SplitText Without Font Loading
```typescript
// ❌ WRONG - May split before fonts load
SplitText.create(".headline", { type: "lines" });

// ✅ CORRECT - Use autoSplit
SplitText.create(".headline", {
  type: "lines",
  autoSplit: true,
  onSplit(self) {
    return gsap.from(self.lines, { y: 50 });
  }
});
```

---

## Quick Reference

### Transform Shortcuts
| GSAP | CSS Equivalent |
|------|----------------|
| `x: 100` | `translateX(100px)` |
| `y: 100` | `translateY(100px)` |
| `xPercent: 50` | `translateX(50%)` |
| `yPercent: 50` | `translateY(50%)` |
| `scale: 1.2` | `scale(1.2)` |
| `rotation: 45` | `rotate(45deg)` |
| `skewX: 10` | `skewX(10deg)` |

### ScrollTrigger Start/End Values
```javascript
start: "top top"       // trigger top hits viewport top
start: "top center"    // trigger top hits viewport center
start: "top 80%"       // trigger top hits 80% from viewport top
start: "top bottom"    // trigger top hits viewport bottom
start: "center center" // trigger center hits viewport center
start: "top+=100 center" // 100px below trigger top hits center
```

### Special Values
```javascript
autoAlpha: 0    // opacity: 0 + visibility: hidden
autoAlpha: 1    // opacity: 1 + visibility: visible (inherit)
immediateRender: false  // Don't apply start values immediately
overwrite: "auto"       // Smartly handle conflicting tweens
```

---


## GSAP + React Hover/Reveal Patterns

### Timeline Management
- Store in refs, not state
- Expose via useImperativeHandle
- Always .kill() on unmount

### Animation Setup
- Use .fromTo() for reversible animations
- Create timeline once (useGSAP or useEffect with empty deps)
- paused: true by default

### State Timing
- Reverse animation BEFORE clearing state
- Use onReverseComplete or setTimeout(duration)
- Track switching vs first interaction separately

### Switching Items
- First hover: immediate
- Switching: small delay (100-200ms)
- Reset "first hover" flag on mouse leave

---

## Inspiration Sites Analysis

Sites like **vucko.co**, **weareflow.uk**, and **factory.ai** share these patterns:
- Subtle entrance animations (y: 30-60px, opacity fade)
- Scroll-triggered reveals with generous start positions (top 75-85%)
- Smooth pinned sections for storytelling
- Staggered text reveals (not too fast, not too slow)
- Clean, purposeful motion that enhances content

Apply these principles. Keep it classy.