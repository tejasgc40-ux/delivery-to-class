# DEVELOPMENT NOTES & TECHNICAL ARCHITECTURE

## 1. Browser Extension & Form Hydration (fdprocessedid)

### Background & Root Cause
In Next.js React 18+ SSR/SSG hydration, the initial HTML generated on the server is compared against the DOM generated on client hydration. 

When users operate with third-party browser extensions (such as password managers: 1Password, Bitwarden, LastPass, Dashlane, or browser auto-fill managers), these extensions automatically inject proprietary attributes—such as `fdprocessedid`, `data-initial-value`, `data-lastpass-icon-root`, or `autofill` markers—directly into standard HTML `<form>`, `<input>`, and `<button>` elements immediately upon initial DOM mounting before React hydration completes.

### Verification in Clean Browser Profiles
- **Clean Profile Test (Incognito / InPrivate with extensions disabled)**: Zero hydration warnings or DOM attribute mismatches occur. Server HTML and Client HTML match 100%.
- **Extension-Enabled Test**: Browser extensions inject `fdprocessedid` onto form controls. React throws a non-fatal dev warning `Warning: Extra attributes from the server: fdprocessedid at button/input`.

### Mitigation Strategy
To prevent non-fatal console noise caused by password manager browser extensions without hiding actual application React state hydration bugs:
1. `suppressHydrationWarning` is applied **exclusively to the affected authentication form controls** (`<form>`, `<input>`, `<button>` elements in `WelcomeAuthScreen.tsx`).
2. It is **NOT** added globally, to layout elements, or to unrelated UI components, ensuring any real application state hydration mismatch remains fully detectable.

---

## 2. Phase 1 Verification Summary

- **Role-Based Guards**: `<RoleGuard>` protects `/partner`, `/shop-owner`, and `/admin` routes. Unauthenticated users are gated by `<AppAuthWrapper>`.
- **Location & Permissions Engine**: Campus location modal prompts user after login; falls back gracefully to default campus bounds with top-header manual college dropdown selection.
- **Form Controls & Security**: Auth forms support Student, Partner, Shop Owner, Admin demo logins, full registration, and password reset workflows.
