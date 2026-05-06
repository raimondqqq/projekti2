# Motion Design System

> Reference guide for implementing animations with GSAP in React/Next.js projects.

---

## Core Philosophy

Motion should serve purpose, not decoration. Every animation answers one of:
- **Feedback** → "Your action registered"
- **Orientation** → "This came from there"
- **Attention** → "Look here, this matters"
- **Continuity** → "These things are related"

If an animation doesn't serve one of these, cut it.

---

## The Golden Rules

### 1. Easing Selection by Visibility State

```
Is the element VISIBLE before animation starts?
│
├─ NO (entering from off-screen, opacity:0, scale:0)
│  └─ Use: back.out(1.7) or power3.out
│     Reason: Anticipation phase is invisible anyway, skip it
│
├─ YES (transforming in place, already visible)
│  └─ Use: back.inOut(1.4)
│     Reason: User sees full wind-up → move → settle
│
└─ LEAVING (element exiting)
   └─ Use: power2.in or power3.in
      Reason: Accelerate out, no settle needed—it's gone
```

### 2. Duration by Element Type

| Element | Duration | Examples |
|---------|----------|----------|
| Micro | 80-150ms | Hovers, toggles, tooltips |
| Light | 150-250ms | Buttons, small cards, dropdowns |
| Medium | 250-400ms | Modals, expanding panels |
| Heavy | 400-600ms | Page transitions, hero reveals |
| Dramatic | 600-1000ms | Onboarding, celebrations |

### 3. Performance Priority

**Always animate (GPU-accelerated):**
- `transform` (translate, scale, rotate)
- `opacity`

**Avoid animating (triggers reflow):**
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- `border-width`

---

## Pattern Reference

### Entering Elements

Use when: Elements appearing on screen for the first time.

```javascript
// Fade + slide up (most common)
gsap.from(".element", {
  y: 60,
  opacity: 0,
  ease: "back.out(1.7)",
  duration: 0.5
});

// Fade + scale
gsap.from(".element", {
  scale: 0.8,
  opacity: 0,
  ease: "back.out(1.7)",
  duration: 0.5
});

// Slide from side
gsap.from(".element", {
  x: -100,
  opacity: 0,
  ease: "power3.out",
  duration: 0.5
});

// Pop in (playful)
gsap.from(".element", {
  scale: 0,
  ease: "elastic.out(1, 0.5)",
  duration: 0.8
});
```

**Key point:** Use `back.out` not `back.inOut`—the anticipation phase is invisible.

---

### Exiting Elements

Use when: Elements leaving the screen or being dismissed.

```javascript
// Fade + slide down
gsap.to(".element", {
  y: 60,
  opacity: 0,
  ease: "power2.in",
  duration: 0.3
});

// Fly away with anticipation (for dramatic dismissals)
gsap.timeline()
  .to(".element", { x: -20, duration: 0.1, ease: "power2.in" })
  .to(".element", { x: 300, opacity: 0, duration: 0.3, ease: "power3.in" });

// Scale out
gsap.to(".element", {
  scale: 0.8,
  opacity: 0,
  ease: "power2.in",
  duration: 0.25
});
```

**Key point:** Use `power2.in` or `power3.in`—accelerate out, don't linger.

---

### Transform in Place

Use when: Element is already visible and changes state.

```javascript
// Expand (e.g., accordion, dock menu)
gsap.to(".element", {
  scale: 1.3,
  ease: "back.inOut(1.4)",
  duration: 0.5
});

// Width expand (dock-style)
gsap.to(".element", {
  scaleX: 1.5,
  ease: "back.inOut(1.4)",
  duration: 0.5
});

// Rotate
gsap.to(".element", {
  rotation: 180,
  ease: "back.inOut(1.7)",
  duration: 0.6
});
```

**Key point:** Use `back.inOut`—user sees full anticipation + settle.

---

### Hover States

```javascript
// Subtle (professional/corporate)
gsap.to(".element", {
  scale: 1.02,
  ease: "power2.out",
  duration: 0.2
});

// Playful (consumer/fun brands)
gsap.to(".element", {
  scale: 1.08,
  ease: "back.out(3)",
  duration: 0.3
});

// Lift with shadow
gsap.to(".element", {
  y: -8,
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  ease: "power2.out",
  duration: 0.25
});
```

---

### Feedback & Errors

```javascript
// Error shake
gsap.to(".element", {
  x: 15,
  ease: "elastic.out(1, 0.3)",
  duration: 0.5,
  yoyo: true,
  repeat: 3
});

// Attention pulse
gsap.to(".element", {
  scale: 1.1,
  ease: "power2.inOut",
  duration: 0.3,
  yoyo: true,
  repeat: 1
});

// Success bounce
gsap.timeline()
  .to(".element", { scale: 1.3, ease: "back.out(4)", duration: 0.2 })
  .to(".element", { scale: 1, ease: "elastic.out(1, 0.4)", duration: 0.6 });
```

---

### Stagger (Multiple Elements)

```javascript
// Cascade down (most common)
gsap.from(".items", {
  y: 40,
  opacity: 0,
  ease: "back.out(1.7)",
  duration: 0.5,
  stagger: 0.08  // 80ms between each
});

// Scale stagger
gsap.from(".items", {
  scale: 0,
  opacity: 0,
  ease: "back.out(1.7)",
  duration: 0.4,
  stagger: 0.1
});

// From center outward
gsap.from(".items", {
  y: 30,
  opacity: 0,
  ease: "back.out(1.7)",
  duration: 0.5,
  stagger: {
    each: 0.08,
    from: "center"
  }
});

// Wave effect
gsap.to(".items", {
  y: -20,
  ease: "sine.inOut",
  duration: 0.6,
  stagger: {
    each: 0.1,
    yoyo: true,
    repeat: 1
  }
});
```

**Stagger timing guide:**
- 60-80ms: Fast, energetic
- 80-120ms: Balanced, readable
- 120-200ms: Deliberate, dramatic

---

### Continuous / Looping

```javascript
// Floating
gsap.to(".element", {
  y: -15,
  ease: "sine.inOut",
  duration: 2,
  yoyo: true,
  repeat: -1
});

// Breathing pulse
gsap.to(".element", {
  scale: 1.05,
  opacity: 0.8,
  ease: "sine.inOut",
  duration: 1.5,
  yoyo: true,
  repeat: -1
});

// Slow rotate
gsap.to(".element", {
  rotation: 360,
  ease: "none",  // Linear for continuous rotation
  duration: 4,
  repeat: -1
});
```

**Key point:** Always use `sine.inOut` for organic loops—smoothest at direction changes.

---

### 3D Transforms

```javascript
// Card flip
gsap.to(".element", {
  rotateY: 180,
  ease: "power2.inOut",
  duration: 0.6,
  transformPerspective: 1000
});

// Fold down (from top)
gsap.from(".element", {
  rotateX: -90,
  ease: "power3.out",
  duration: 0.5,
  transformOrigin: "top center",
  transformPerspective: 800
});

// Tilt on hover
gsap.to(".element", {
  rotateX: 10,
  rotateY: -10,
  ease: "power2.out",
  duration: 0.4,
  transformPerspective: 1000
});
```

---

### Modals & Overlays

```javascript
// Modal open (with staging)
const openModal = () => {
  gsap.timeline()
    .to(".overlay", { 
      opacity: 1, 
      ease: "power2.out", 
      duration: 0.3 
    })
    .fromTo(".modal", 
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, ease: "back.out(1.4)", duration: 0.4 },
      "-=0.15"  // Overlap for smoothness
    );
};

// Modal close
const closeModal = () => {
  gsap.timeline()
    .to(".modal", { 
      scale: 0.9, 
      opacity: 0, 
      ease: "power2.in", 
      duration: 0.25 
    })
    .to(".overlay", { 
      opacity: 0, 
      ease: "power2.in", 
      duration: 0.2 
    }, "-=0.1");
};
```

---

## React Integration Patterns

### useGSAP Hook (Recommended)

```javascript
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Component() {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    gsap.from(".animate-item", {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      ease: "back.out(1.7)"
    });
  }, { scope: containerRef }); // Scopes all selectors to container
  
  return <div ref={containerRef}>...</div>;
}
```

### Refs for Single Elements

```javascript
function Component() {
  const boxRef = useRef(null);
  
  useGSAP(() => {
    gsap.from(boxRef.current, {
      scale: 0.8,
      opacity: 0,
      ease: "back.out(1.7)",
      duration: 0.5
    });
  });
  
  return <div ref={boxRef}>...</div>;
}
```

### Event-Triggered Animations

```javascript
function Component() {
  const boxRef = useRef(null);
  
  const handleHover = () => {
    gsap.to(boxRef.current, {
      scale: 1.05,
      ease: "power2.out",
      duration: 0.2
    });
  };
  
  const handleHoverOut = () => {
    gsap.to(boxRef.current, {
      scale: 1,
      ease: "power2.out",
      duration: 0.2
    });
  };
  
  return (
    <div 
      ref={boxRef}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverOut}
    >
      ...
    </div>
  );
}
```

### ScrollTrigger Setup

```javascript
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Component() {
  const sectionRef = useRef(null);
  
  useGSAP(() => {
    gsap.from(".reveal-item", {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      ease: "back.out(1.7)",
      duration: 0.6,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",  // When top of element hits 80% down viewport
        toggleActions: "play none none none"
      }
    });
  }, { scope: sectionRef });
  
  return <section ref={sectionRef}>...</section>;
}
```

---

## Quick Reference Card

| Scenario | Easing | Duration |
|----------|--------|----------|
| **Entering** | `back.out(1.7)` | 400-500ms |
| **Exiting** | `power2.in` | 250-350ms |
| **Transform in place** | `back.inOut(1.4)` | 400-600ms |
| **Hover (subtle)** | `power2.out` | 150-200ms |
| **Hover (playful)** | `back.out(2)` | 250-300ms |
| **Error shake** | `elastic.out(1, 0.3)` | 400-500ms |
| **Success** | `elastic.out(1, 0.4)` | 500-700ms |
| **Continuous loop** | `sine.inOut` | 1500-3000ms |
| **Stagger delay** | — | 60-120ms |
| **3D transforms** | `power2.inOut` | 500-700ms |

---

## Disney's 12 Principles → UI Translation

1. **Squash & Stretch** → Elastic deformation on button press, bouncy landings
2. **Anticipation** → Wind-up before major actions (visible transforms only)
3. **Staging** → Dim backgrounds, direct focus, animate important things first
4. **Straight Ahead / Pose to Pose** → Use timeline labels, plan keyframes
5. **Follow Through / Overlap** → Stagger children, secondary elements settle after primary
6. **Slow In / Out** → This IS easing—never use linear
7. **Arcs** → Use motionPath for natural curved movement
8. **Secondary Action** → Icon bounces while container slides
9. **Timing** → Duration = weight and mood
10. **Exaggeration** → Push for clarity, match brand personality
11. **Solid Drawing** → Respect 3D space, use perspective properly
12. **Appeal** → If it doesn't feel satisfying, iterate

---

## Common Mistakes to Avoid

1. **Using `back.inOut` for entering elements** → Anticipation is invisible, use `back.out`
2. **Animating layout properties** → Stick to transform and opacity
3. **Same easing for everything** → Match easing to action type
4. **Too long durations** → UI should feel snappy, not sluggish
5. **Stagger too fast or slow** → 60-120ms is the sweet spot
6. **Forgetting `ease` parameter** → GSAP defaults to `power1.out`, be explicit
7. **Not killing tweens on unmount** → Memory leaks, use `useGSAP` or `context.revert()`
8. **Overusing animation** → Motion fatigue is real, be selective

---

## Dependencies

```bash
npm install gsap @gsap/react
```

```javascript
// Required imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Optional plugins (register before use)
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
```

---

## File Structure Recommendation

```
/lib
  /animations
    index.ts        # Shared animation functions
    easings.ts      # Custom easing presets
    
/hooks
  useRevealAnimation.ts
  useHoverAnimation.ts
  useParallax.ts
```

---

*Last updated: January 2025*