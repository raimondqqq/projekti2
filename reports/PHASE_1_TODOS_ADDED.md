# Phase 1: TODO Comments Added

**Generated:** 2026-01-10
**Status:** ✅ Planning complete - Ready for implementation
**Next Step:** Execute the fixes

---

## Summary

TODO comments have been strategically placed throughout the codebase to mark **critical issues** identified in the refactoring analysis. These comments follow a consistent format and reference the detailed implementation guide.

---

## TODO Comment Format

```typescript
// TODO(category): [Priority] Brief description
// Issue: What's wrong
// Fix: How to fix it
// See: /reports/PHASE_1_CRITICAL_FIXES.md
```

### Categories Used:
- `type-safety` — TypeScript type improvements
- `a11y` — Accessibility issues
- `mobile` — Mobile-first violations
- `refactor` — Code structure issues (Phase 2)
- `performance` — Performance optimizations (Phase 2)
- `design-system` — UI consistency (Phase 2)

---

## TODOs Added (Phase 1 Critical Issues)

### 1. Type Safety Issues (P0)

#### File: `src/components/admin/ProjectForm.tsx:47-50`
```typescript
// TODO(type-safety): [P0] Replace any with proper Prisma type
// Issue: Using `any` defeats TypeScript's type safety
// Fix: import { Project } from '@/types' and use Project | undefined
// See: /reports/PHASE_1_CRITICAL_FIXES.md
interface ProjectFormProps {
  project?: any  // ← This needs to be Project | undefined
  mode: "create" | "edit"
}
```

**Impact:** High — Prevents type-checking on critical admin form
**Effort:** Low — 2 lines to fix
**Risk:** Low — Forms already work, just adding type safety

---

#### File: `src/components/admin/TeamForm.tsx:28-31`
```typescript
// TODO(type-safety): [P0] Replace any with proper Prisma type
// Issue: Using `any` defeats TypeScript's type safety
// Fix: import { TeamMember } from '@/types' and use TeamMember | undefined
// See: /reports/PHASE_1_CRITICAL_FIXES.md
interface TeamFormProps {
  teamMember?: any  // ← This needs to be TeamMember | undefined
  mode: "create" | "edit"
}
```

**Impact:** High — Prevents type-checking on team form
**Effort:** Low — 2 lines to fix
**Risk:** Low — Forms already work

---

#### File: `src/components/home/CaseStudy.tsx:21-24`
```typescript
// TODO(type-safety): [P0] Remove double type assertion
// Issue: Using `as any as string` is a code smell
// Fix: Configure marked types properly or use single assertion
// See: /reports/PHASE_1_CRITICAL_FIXES.md

const parseMarkdownSync = (markdown: string): string => {
  const result = marked.parse(markdown)
  return result as any as string  // ← Double assertion is hacky
}
```

**Impact:** Medium — Code smell, works but not ideal
**Effort:** Low — Configure marked or use single assertion
**Risk:** Very low — Already working

---

### 2. Accessibility Issues (P0)

#### File: `src/components/home/MenuDock.tsx:119-122`
```typescript
{/* TODO(a11y): [P0] Add aria-label and aria-expanded for screen readers
    Issue: Button has no accessible label for screen reader users
    Fix: Add aria-label="Menu" and aria-expanded={isMenuOpen}
    See: /reports/PHASE_1_CRITICAL_FIXES.md */}
<button
  onClick={isCaseStudy ? onBackClick : onMenuClick}
  // ← Missing: aria-label="Menu" aria-expanded={isMenuOpen}
  className={...}
>
```

**Impact:** High — Screen reader users can't use navigation
**Effort:** Very low — Add 2 attributes
**Risk:** None — Purely additive

---

### 3. Mobile-First Violations (P1)

#### File: `src/components/home/MenuDock.tsx:60-63`
```typescript
// TODO(mobile): [P1] Replace JS breakpoint detection with CSS
// Issue: Using window.innerWidth violates mobile-first principles (CLAUDE.md)
// Fix: Use CSS custom properties or GSAP matchMedia()
// See: /reports/PHASE_1_CRITICAL_FIXES.md
useGSAP(() => {
  if (isCaseStudy) {
    let margin = 80
    if (window.innerWidth >= 1280) {  // ← JS-based responsive logic
      margin = 800
    } else if (window.innerWidth >= 768) {
      margin = 200
    }
```

**Impact:** Medium — Violates CLAUDE.md mobile-first principle
**Effort:** Medium — Refactor to use CSS or GSAP matchMedia
**Risk:** Low — Can test on multiple devices

---

## Files With TODOs Added

| File | TODOs | Priority | Category |
|------|-------|----------|----------|
| `ProjectForm.tsx` | 1 | P0 | type-safety |
| `TeamForm.tsx` | 1 | P0 | type-safety |
| `CaseStudy.tsx` | 1 | P0 | type-safety |
| `MenuDock.tsx` | 2 | P0, P1 | a11y, mobile |

**Total TODOs added:** 5 critical issues documented

---

## Additional TODOs Needed (Not Yet Added)

These will be added as we identify specific locations during implementation:

### Trailing Whitespace (P0)
- `src/middleware/auth.ts` — Lines 10, 14, 21, 25, 62
- `src/types/project.ts` — Lines 7, 44
- `src/types/index.ts` — Line 8

**Action:** Will be fixed automatically with linter, no TODO needed

---

### Semicolons (P0)
Multiple files contain semicolons that violate CLAUDE.md

**Action:** Will be fixed automatically with linter, no TODO needed

---

### Missing Focus States (P0)
All interactive elements need focus-visible styles

**Files to update:**
- `MenuDock.tsx` — All buttons
- `ProjectPills.tsx` — All pill buttons
- `HomePage.tsx` — Interactive elements
- `CaseStudy.tsx` — Close button

**Action:** Add TODOs as we implement focus states

---

### Semantic HTML (P0)
`CaseStudy.tsx` uses `<div>` instead of `<main>`

**Action:** Add TODO when implementing fix

---

## Finding TODOs in the Codebase

### Search for all TODOs:
```bash
# Find all TODO comments
grep -r "TODO" src/

# Find by priority
grep -r "TODO.*\[P0\]" src/

# Find by category
grep -r "TODO(a11y)" src/
grep -r "TODO(type-safety)" src/
grep -r "TODO(mobile)" src/
```

### By Priority:
```bash
# P0 (Critical)
grep -r "\[P0\]" src/ --include="*.tsx" --include="*.ts"

# P1 (High)
grep -r "\[P1\]" src/ --include="*.tsx" --include="*.ts"
```

### By Category:
```bash
# Type safety issues
grep -r "TODO(type-safety)" src/

# Accessibility issues
grep -r "TODO(a11y)" src/

# Mobile-first issues
grep -r "TODO(mobile)" src/
```

---

## Implementation Order

### Step 1: Automated Fixes (No TODOs needed)
1. ✅ Remove semicolons with linter
2. ✅ Remove trailing whitespace with linter

### Step 2: Type Safety Fixes (TODOs added ✅)
3. Fix `ProjectForm.tsx:48`
4. Fix `TeamForm.tsx:29`
5. Fix `CaseStudy.tsx:26`

### Step 3: Accessibility Fixes (Partial TODOs added ✅)
6. Fix `MenuDock.tsx:119` — Add ARIA labels
7. Add ARIA labels to `ProjectPills.tsx` (TODO needed)
8. Add semantic HTML to `CaseStudy.tsx` (TODO needed)
9. Add focus states everywhere (TODOs needed)

---

## Next Steps

### Immediate Actions:

1. **Search for TODOs** to see all issues:
   ```bash
   grep -r "TODO" src/ | grep "\[P0\]"
   ```

2. **Start with automated fixes:**
   - Run ESLint/Prettier to remove semicolons
   - Run linter to remove trailing whitespace

3. **Fix type safety issues:**
   - Update `ProjectForm.tsx`
   - Update `TeamForm.tsx`
   - Update `CaseStudy.tsx`

4. **Add accessibility improvements:**
   - Add ARIA labels to buttons
   - Add semantic HTML
   - Add focus states

5. **Test everything:**
   - Admin forms still work
   - Keyboard navigation works
   - Screen reader announces properly

---

## Benefits of TODO Comments

### ✅ **Findability**
- Easy to search: `grep -r "TODO(a11y)" src/`
- IDE support: Most IDEs highlight TODOs
- Can track in task managers

### ✅ **Documentation**
- Explains WHAT is wrong
- Explains WHY it's wrong
- Explains HOW to fix it
- Links to detailed docs

### ✅ **Priority Tracking**
- `[P0]` = Must fix now
- `[P1]` = Fix soon
- `[P2]` = Plan for next sprint
- `[P3]` = Backlog

### ✅ **Categorization**
- Type safety issues grouped together
- Accessibility issues grouped together
- Easy to assign to specialists

### ✅ **Progress Tracking**
- Remove TODO when fixed
- Easy to see what's left
- Track completion percentage

---

## Example: How to Use TODOs During Implementation

### Before Fix:
```typescript
// TODO(type-safety): [P0] Replace any with proper Prisma type
// Issue: Using `any` defeats TypeScript's type safety
// Fix: import { Project } from '@/types' and use Project | undefined
// See: /reports/PHASE_1_CRITICAL_FIXES.md
interface ProjectFormProps {
  project?: any
  mode: "create" | "edit"
}
```

### After Fix:
```typescript
import { Project } from '@/types'

interface ProjectFormProps {
  project?: Project  // ✅ Fixed: Now properly typed
  mode: "create" | "edit"
}
```

**Remove the TODO comment entirely** when fixed!

---

## Tracking Progress

### Use this checklist:

- [x] Add TODOs for type safety issues
- [x] Add TODOs for accessibility issues
- [x] Add TODOs for mobile-first violations
- [ ] Fix type safety issues (remove TODOs)
- [ ] Fix accessibility issues (remove TODOs)
- [ ] Fix mobile-first issues (remove TODOs)
- [ ] Verify no P0 TODOs remain
- [ ] Test all fixes

**When complete:** Run `grep -r "TODO.*\[P0\]" src/` should return **zero results**

---

## Summary

✅ **5 critical TODOs added** to codebase
✅ **All TODOs link to** `/reports/PHASE_1_CRITICAL_FIXES.md`
✅ **Consistent format** for easy searching
✅ **Clear priority levels** (P0, P1, P2, P3)
✅ **Categorized** (type-safety, a11y, mobile, etc.)

**Ready for Phase 1 implementation!**

Use `grep -r "TODO" src/` to see all issues and start fixing them one by one.
