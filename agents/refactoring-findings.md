# Refactoring Findings Agent

> **Activation:** "Use refactoring agent" or "refactoring mode"
> **Purpose:** Technical debt tracking, code quality issues, refactoring opportunities

---

## Critical Issues Identified (2026-01-10)

### CLAUDE.md Violations 🚨

#### 1. Semicolons in React Code (P0)
**Status:** Needs fixing
**CLAUDE.md Rule:** "DO NOT use semicolons in React"

**Files with violations:**
- `src/components/admin/ProjectForm.tsx`
- `src/app/layout.tsx`
- Multiple utility files

**Action:** Remove all semicolons from React/TypeScript files

---

#### 2. Trailing Whitespace (P0)
**Status:** Needs fixing
**CLAUDE.md Rule:** "Always check for trailing whitespace before submitting edits"

**Files affected:**
- `src/middleware/auth.ts` (lines 10, 14, 21, 25, 62)
- `src/types/project.ts` (lines 7, 44)
- `src/types/index.ts` (line 8)

**Action:** Run linter to remove all trailing whitespace

---

### Code Quality Issues

#### 3. TypeScript `any` Usage (P0)
**Impact:** Defeats type safety, high risk of runtime errors

**Locations:**
1. **ProjectForm.tsx:48** — `project?: any` should be `Project | undefined`
2. **TeamForm.tsx** — Similar pattern
3. **CaseStudy.tsx:26** — Double type assertion `as any as string`

**Solution:**
```typescript
import { Project } from '@/types'

interface ProjectFormProps {
  project?: Project
  mode: "create" | "edit"
}
```

---

#### 4. Animation Code Duplication (P0)
**Impact:** ~800 lines of duplicated code across case studies

**Pattern repeated 15+ times:**
```typescript
gsap.fromTo(elementRef.current,
  { y: 40, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.8, ease: "power1.out", scrollTrigger: {...} }
)
```

**Files:**
- `src/components/case-studies/CaseStudyKindbody.tsx` (708 lines)
- `src/components/case-studies/CaseStudySematext.tsx` (705 lines)

**Solution:** Create `src/hooks/useCaseStudyAnimations.ts` with:
- `useFadeIn()`
- `useParallax()`
- `useSplitTextReveal()`

---

#### 5. Monolithic Components (P1)
**Impact:** Hard to maintain, slow HMR, difficult to test

**Files over 300 lines:**
- `CaseStudyKindbody.tsx` — 708 lines → Split into 6 section components
- `CaseStudySematext.tsx` — 705 lines → Split into 6 section components
- `ProjectForm.tsx` — 368 lines → Extract shared form logic

---

### Accessibility Issues (P0-P1)

#### 6. Missing ARIA Labels
**Files:**
- `src/components/home/MenuDock.tsx:119-135` — Menu button needs aria-label and aria-expanded
- `src/components/home/ProjectPills.tsx` — Pills need accessible names
- Interactive elements throughout

**Fix pattern:**
```tsx
<button
  onClick={toggleMenu}
  aria-label="Menu"
  aria-expanded={isMenuOpen}
>
```

---

#### 7. Missing Semantic HTML
**File:** `src/components/home/CaseStudy.tsx:227-236`

**Issue:** Case studies use `<div>` instead of `<main>`, missing heading hierarchy

**Fix:**
```tsx
<main role="dialog" aria-label={project.title}>
  <h1 className="sr-only">{project.title} Case Study</h1>
  {/* Content */}
</main>
```

---

#### 8. Missing Focus States
**Impact:** Keyboard navigation impossible

**Action:** Add to all interactive elements:
```tsx
className="focus-visible:ring-2 focus-visible:ring-offset-2"
```

---

### Performance Issues (P1)

#### 9. Missing Lazy Loading
**Impact:** ~200KB unnecessary bundle size on initial load

**Solution:**
```typescript
// src/components/case-studies/index.ts
export const caseStudyComponents = {
  sematext: dynamic(() => import('./CaseStudySematext')),
  kindbody: dynamic(() => import('./CaseStudyKindbody')),
}
```

---

#### 10. No Animation Constants
**Impact:** Magic numbers scattered, inconsistent timing

**Solution:** Create `src/lib/animations.ts`:
```typescript
export const ANIMATION = {
  duration: { fast: 0.3, normal: 0.6, slow: 0.9 },
  ease: { out: "power1.out", inOut: "power2.inOut" },
  scroll: { start: "top 80%", end: "bottom 20%" },
} as const
```

---

### Mobile-First Violations (P1)

#### 11. JS-Based Responsive Logic
**CLAUDE.md Rule:** "Mobile-first — Always start with mobile styles"

**Files:**
- `src/components/home/MenuDock.tsx:65-73` — Window width checks
- `src/components/home/HomePage.tsx:82-93` — Hardcoded breakpoints

**Solution:** Use CSS custom properties or GSAP matchMedia

---

### Design System Issues (P2)

#### 12. Color Inconsistencies
**Issue:** Mix of semantic tokens and hardcoded colors

```css
/* ✅ Good */
bg-background text-foreground

/* ❌ Bad */
text-sky-400 bg-amber-300/10
```

**Solution:** Add accent colors to design tokens

---

#### 13. Typography Patterns
**Issue:** Mixed responsive typography approaches

**HomePage:** `text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl`
**Case studies:** `text-[clamp(2.5rem,8vw,6rem)]`

**Solution:** Standardize on clamp-based fluid typography (case study pattern is better)

---

#### 14. Form Pattern Duplication
**Files:** ProjectForm.tsx & TeamForm.tsx share 80% logic

**Solution:** Create `src/hooks/useAdminForm.ts` to extract:
- Form validation setup
- Image upload handling
- Error handling
- Submit logic

---

## Phase 1 Implementation Plan

### Task List (3 hours total)

1. **Remove semicolons** (30 min, automated)
2. **Remove trailing whitespace** (15 min, automated)
3. **Fix TypeScript any usage** (2 hours)
   - ProjectForm.tsx
   - TeamForm.tsx
   - CaseStudy.tsx
4. **Add ARIA labels** (30 min)
   - MenuDock buttons
   - Project pills
5. **Add semantic HTML** (30 min)
   - CaseStudy component
6. **Add focus states** (30 min)
   - All interactive elements

---

## TODO Comment Format

Use this format when adding TODOs to code:

```typescript
// TODO(refactor): [P0] Remove semicolons - CLAUDE.md violation
// TODO(type-safety): [P0] Replace any with proper Prisma type
// TODO(a11y): [P0] Add aria-label for screen readers
// TODO(performance): [P1] Add lazy loading with dynamic import
// TODO(mobile): [P1] Replace JS breakpoint with CSS custom property
// TODO(design-system): [P2] Use design token instead of hardcoded color
```

**Priority levels:**
- **P0:** Critical, blocks production quality
- **P1:** High impact, should do soon
- **P2:** Important, plan for next sprint
- **P3:** Nice to have, backlog

---

## Success Metrics

| Metric | Before | Target | Status |
|--------|--------|--------|--------|
| Semicolons | Present | 0 | ⏳ Pending |
| Trailing whitespace | Multiple files | 0 | ⏳ Pending |
| TypeScript any | 3 files | 0 | ⏳ Pending |
| ARIA labels | Missing | 100% | ⏳ Pending |
| Focus states | Partial | 100% | ⏳ Pending |

---

## Long-Term Roadmap

### Phase 2: Code Quality (Week 1)
- Extract animation hooks
- Create shared form logic
- Add lazy loading
- Animation constants

### Phase 3: Component Refactoring (Week 2)
- Split large case studies
- Create missing design system components
- Standardize patterns

### Phase 4: Polish (End of Week 2)
- Image optimization
- Testing setup
- Documentation

---

## Notes

- All findings align with CLAUDE.md philosophy: "Simplify Ruthlessly"
- Current codebase is 7.5/10 — strong foundations, needs refinement
- Estimated 69 hours total for complete refactoring
- Phase 1 is low-risk, high-impact
