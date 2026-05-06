# Phase 2.5: Refactoring Example

**File:** CaseStudyKindbody.tsx
**Before:** 708 lines
**After:** ~300 lines (estimated)
**Savings:** ~400 lines (-57%)

---

## Before: Repetitive GSAP Code

### Example 1: Fade In Animation (Repeated 15+ times)

```typescript
// Company fade in
if (companyRef.current) {
  gsap.fromTo(companyRef.current,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power1.out",
      scrollTrigger: {
        scroller: scroller,
        trigger: companyRef.current,
        start: "top 75%",
      }
    }
  )
}

// Challenge fade in (DUPLICATE CODE)
if (challengeRef.current) {
  gsap.fromTo(challengeRef.current,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power1.out",
      scrollTrigger: {
        scroller: scroller,
        trigger: challengeRef.current,
        start: "top 75%",
      }
    }
  )
}

// Takeaway fade in (DUPLICATE CODE AGAIN)
if (takeawayRef.current) {
  gsap.fromTo(takeawayRef.current,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power1.out",
      scrollTrigger: {
        scroller: scroller,
        trigger: takeawayRef.current,
        start: "top 75%",
      }
    }
  )
}

// ... This pattern repeats 12+ more times! ...
```

**Lines:** ~25 lines × 15 instances = **~375 lines of duplicated code**

---

## After: Using Animation Hooks

```typescript
import { useFadeIn, useParallax, useSplitTextReveal } from '@/hooks/useCaseStudyAnimations'
import { ANIMATION } from '@/lib/animations'

// One line per animation!
useFadeIn(companyRef, scrollerRef, { y: 40, duration: ANIMATION.duration.medium })
useFadeIn(challengeRef, scrollerRef, { y: 40, duration: ANIMATION.duration.medium })
useFadeIn(takeawayRef, scrollerRef, { y: 40, duration: ANIMATION.duration.medium })
```

**Lines:** ~3 lines instead of 375 lines = **-372 lines saved**

---

## More Examples

### Before: Parallax (Repeated 5+ times)

```typescript
if (heroImageRef.current) {
  gsap.to(heroImageRef.current, {
    y: () => {
      const element = heroImageRef.current
      if (!element) return 0
      const height = element.offsetHeight
      return height * 0.3
    },
    ease: "none",
    scrollTrigger: {
      scroller: scroller,
      trigger: heroImageRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    }
  })
}

// Same code repeated for challengeImageRef, roleImageRef, labImageRef...
```

**Lines:** ~20 lines × 5 instances = **~100 lines**

### After: Using Parallax Hook

```typescript
useParallax(heroImageRef, scrollerRef, { speed: 0.3 })
useParallax(challengeImageRef, scrollerRef, { speed: 0.3 })
useParallax(roleImageRef, scrollerRef, { speed: 0.3 })
useParallax(labImageRef, scrollerRef, { speed: 0.3 })
```

**Lines:** ~4 lines instead of 100 lines = **-96 lines saved**

---

## Summary of Savings

| Pattern | Before | After | Savings |
|---------|--------|-------|---------|
| Fade In (×15) | 375 lines | 15 lines | -360 lines |
| Parallax (×5) | 100 lines | 5 lines | -95 lines |
| Split Text (×3) | 75 lines | 3 lines | -72 lines |
| Stagger (×4) | 80 lines | 4 lines | -76 lines |
| Other | 78 lines | 30 lines | -48 lines |
| **Total** | **708 lines** | **~300 lines** | **-408 lines (-57%)** |

---

## Benefits

### 1. **Readability**
**Before:** Scroll through 700 lines to understand animations
**After:** See all animations at a glance in ~50 lines

### 2. **Maintainability**
**Before:** Change animation timing → update 15+ places
**After:** Change timing → update 1 constant

### 3. **Consistency**
**Before:** Easy to have slight variations in duplicated code
**After:** All animations use same hooks = perfect consistency

### 4. **Reduced Motion**
**Before:** Must check `prefers-reduced-motion` in every animation
**After:** Hooks handle it automatically

### 5. **Reusability**
**Before:** Copy-paste 700 lines for new case study
**After:** Use hooks → ~300 lines for new case study

---

## Next Steps

This same pattern applies to:
- **CaseStudySematext.tsx** (705 lines → ~300 lines)
- Future case studies (start at 300 lines instead of 700+)

**Total potential savings:** ~800 lines across both files
