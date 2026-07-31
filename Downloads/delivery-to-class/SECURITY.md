# Security Audit Report

## Executive Summary
This project is a campus delivery web application (**Delivery to Class**) built with Next.js (App Router), React, and Tailwind CSS. It connects students, campus shop owners, and student delivery partners. 

This document outlines the security architecture, threat model, potential risk areas, and remediation guidelines across critical security domains.

---

## 1. Authentication
- **Current Architecture**: Auth state is managed client-side via `AuthContext.tsx` with role switching (`CUSTOMER`, `SHOP_OWNER`, `DELIVERY_PARTNER`, `ADMIN`) for demo purposes. Firebase Auth configuration is present in `src/lib/firebase.ts` supporting Google OAuth and Firebase Email authentication.
- **Observations & Audit Recommendations**:
  - In a production environment, role switches must not be controlled purely client-side without server-side validation or Firebase Custom Claims.
  - Client state should be synchronized with Firebase Auth tokens (`getIdTokenResult()`) to ensure role claims are validated by the backend before accessing protected endpoints or database collections.

---

## 2. Authorization & Access Control
- **Current Architecture**: Role-based routing is evaluated in components and contexts (`AuthContext.tsx`, `OrderContext.tsx`).
- **Observations & Audit Recommendations**:
  - Implement Least Privilege Access across all routes.
  - Restrict sensitive actions (such as shop approval, partner verification, or global order management) to authenticated administrators with verified claims.
  - Shop owners must only be authorized to modify their own shop details and products.
  - Delivery partners should only be granted access to order details for orders assigned to them or unassigned delivery queue items.

---

## 3. Firestore Security Rules
- **Status**: Backend Firestore integration is configured. Below is the recommended production security rule template (`firestore.rules`) to enforce role-based access control and prevent unauthorized data access:

```graphql
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper Functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }
    
    function hasRole(role) {
      return isSignedIn() && request.auth.token.role == role;
    }

    // User Profiles
    match /users/{userId} {
      allow read: if isSignedIn();
      allow write: if isOwner(userId) || hasRole('ADMIN');
    }

    // Shops Collection
    match /shops/{shopId} {
      allow read: if true;
      allow create, update, delete: if hasRole('SHOP_OWNER') || hasRole('ADMIN');
    }

    // Products Collection
    match /products/{productId} {
      allow read: if true;
      allow write: if hasRole('SHOP_OWNER') || hasRole('ADMIN');
    }

    // Orders Collection
    match /orders/{orderId} {
      allow read: if isSignedIn() && (
        resource.data.customerId == request.auth.uid ||
        resource.data.partnerId == request.auth.uid ||
        hasRole('SHOP_OWNER') ||
        hasRole('ADMIN')
      );
      allow create: if isSignedIn();
      allow update: if isSignedIn() && (
        resource.data.customerId == request.auth.uid ||
        resource.data.partnerId == request.auth.uid ||
        hasRole('SHOP_OWNER') ||
        hasRole('ADMIN')
      );
    }
  }
}
```

---

## 4. Cross-Site Scripting (XSS) Prevention
- **Current Architecture**: Next.js and React automatically encode values bound in JSX (`{...}`), mitigating classic DOM-based XSS attacks.
- **Observations & Audit Recommendations**:
  - Avoid using `dangerouslySetInnerHTML` unless input is thoroughly sanitized using standard libraries like `DOMPurify`.
  - All user inputs (such as delivery instructions, classroom numbers, shop descriptions, and product reviews) are safely rendered as standard string text nodes.

---

## 5. Cross-Site Request Forgery (CSRF) & API Security
- **Current Architecture**: Client components communicate via client-side state / Next.js app routes.
- **Observations & Audit Recommendations**:
  - Enforce `SameSite=Strict` or `SameSite=Lax` on all session cookies.
  - Use `Authorization: Bearer <ID_TOKEN>` headers when making custom server API requests (`/api/*`), and verify tokens using Firebase Admin SDK server-side.

---

## 6. Input Validation & Data Sanitization
- **Current Architecture**: Form validations exist for mandatory fields (e.g., Block Name, Classroom Number, Contact Phone).
- **Observations & Audit Recommendations**:
  - Use schema validation libraries like `Zod` or `Yup` for structured client and server payload validation.
  - Ensure strict type constraints on monetary calculations (prices, delivery fees, tips) on the server side to prevent client-side price tampering.

---

## 7. Environment Variables & Secret Handling
- **Current Architecture**: Public Firebase configuration values are prefixed with `NEXT_PUBLIC_` in `.env.example` as required for client SDK initialization. Server secrets like `GEMINI_API_KEY` do not use `NEXT_PUBLIC_` and remain strictly on the server.
- **Observations & Audit Recommendations**:
  - Never commit real private keys or secrets to source control or `.env.example`.
  - Ensure API keys stored in client bundles are scoped with proper HTTP referrer restrictions in Google Cloud / Firebase Console.

---

## Conclusion
The application structure follows standard Next.js and React patterns with clean input binding and strict server/client environment variable separation. Following the recommended Firestore security rules and token verification patterns will ensure production-grade security.
