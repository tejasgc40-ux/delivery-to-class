# Delivery to Class - Comprehensive Development & Migration Plan

## Executive Overview
**Delivery to Class** is a hyperlocal campus delivery web platform enabling students to order food, drinks, snacks, stationery, and xerox printouts delivered directly to their classroom desk during short break hours.

This plan details a phased architecture upgrade to introduce **Strict Pre-Auth Gating**, **Multi-Campus Management**, **Global Super Admin Controls**, **GPS Location Detection & Radius Filtering**, **ID Upload Verifications**, **Browser Notification Subscriptions**, and **Firebase Backend Persistence**, while maintaining 100% of existing functional features and UI components.

---

## 🏛️ System Architecture & Data Models

### 1. Multi-Campus & Location Model (`College`)
- `id`: string
- `name`: string (e.g., "SRM Institute of Science & Technology", "IIT Madras", "VIT Vellore")
- `code`: string
- `lat`: number
- `lng`: number
- `radiusKm`: number (e.g., 2.5 km)
- `buildings`: string[] (e.g., ["Tech Park", "Science Block", "Library", "Hostel 3"])

### 2. User & Authentication Model (`User`)
- `id`: string
- `email`: string
- `name`: string
- `role`: `'STUDENT' | 'DELIVERY_PARTNER' | 'SHOP_OWNER' | 'ADMIN'`
- `collegeId`: string
- `campusBuilding`: string
- `classroom`: string
- `phone`: string
- `status`: `'ACTIVE' | 'PENDING_APPROVAL' | 'BLOCKED'`
- `studentIdUrl`?: string
- `governmentIdUrl`?: string

### 3. Shop & Product Model (`Shop` / `Product`)
- `id`: string
- `collegeId`: string (Campus association)
- `name`: string
- `category`: string
- `lat`: number
- `lng`: number
- `status`: `'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'SUSPENDED'`
- `isAvailable`: boolean

---

## 📅 Phased Implementation Plan

### Phase 1: Authentication Gating & Login / Welcome Screen
- **Objective**: Ensure the **FIRST screen** of the app is the Welcome / Login entry point before entering any dashboard.
- **Key Deliverables**:
  1. Update root routing / guard to present the Welcome & Login interface for unauthenticated visitors.
  2. Implement 4 prominent, dedicated Role Login entry buttons:
     - 🎓 **Student Login**
     - 🚴 **Delivery Partner Login**
     - 🏪 **Shop Owner Login**
     - 👑 **Super Admin Login**
  3. Include Instant Demo Role Switcher on login page for quick evaluation.
  4. Trigger initial **Location Permission** & **Notification Permission** prompts upon role login.

### Phase 2: GPS Location Detection & Multi-Campus Radius Filtering
- **Objective**: Auto-detect user's GPS coordinates and filter shops within campus radius.
- **Key Deliverables**:
  1. Geolocation integration using `navigator.geolocation.getCurrentPosition`.
  2. Haversine distance calculator to identify the nearest college campus automatically.
  3. Campus selector dropdown on header/hero for manual override.
  4. Filter all shop listings, map markers, and search query results by selected college campus radius.

### Phase 3: Global Super Admin Dashboard (Multi-College Control)
- **Objective**: Enable single Global Super Admin to manage ALL colleges, shops, delivery partners, and orders across the platform.
- **Key Deliverables**:
  1. **College Management**: Add new colleges (name, lat/lng, radius, buildings) & remove colleges.
  2. **Shop Approval Queue**: Approve or reject newly registered canteen & xerox shops.
  3. **Delivery Partner Approvals**: Inspect student IDs and government IDs; approve or reject couriers.
  4. **User Management**: Block/Unblock malicious users or fake accounts.
  5. **Global Analytics**: Cross-campus order volume, total GMV, active couriers, and commission breakdown.

### Phase 4: Delivery Partner Verification & Earnings Workflow
- **Objective**: Enhanced courier registration, document upload, availability toggle, and live map navigation.
- **Key Deliverables**:
  1. Document Upload UI (Student ID Card photo + Government ID document).
  2. Verification status badge (`Pending Approval`, `Verified Active`).
  3. Order state transition handlers (`Accept Order` -> `Navigate to Shop` -> `Mark Picked Up` -> `Navigate to Classroom` -> `Mark Delivered`).
  4. Daily/Weekly earnings tracker and payout history.

### Phase 5: Shop Owner Management & Real-time Order Actions
- **Objective**: Empower shop owners to register their shop under a specific college, manage inventory, and process orders.
- **Key Deliverables**:
  1. Shop registration under selected college campus.
  2. Product CRUD (Create, Edit price/category, Toggle In-Stock / Out-of-Stock).
  3. Order fulfillment pipeline: `Incoming Request` -> `Accept/Reject` -> `Preparing` -> `Mark Ready for Partner Pick Up`.
  4. Daily revenue metrics and popular items report.

### Phase 6: Push Notifications & Live Order Tracking
- **Objective**: Complete real-time status updates and browser notification alerts.
- **Key Deliverables**:
  1. Browser Notification API request banner and triggers for order events:
     - Order Accepted by Shop
     - Order Ready for Pickup
     - Delivery Partner Assigned & En Route
     - Courier Arrived at Classroom
     - Order Delivered
  2. Toast notifications for in-app updates.
  3. Live Leaflet map tracker showing courier movement toward the student's classroom.

---

## 🔒 Feature Preservation Commitment
- All existing UI components (`Header`, `HeroSection`, `CategoryGrid`, `ProductCard`, `ShopCard`, `CampusMap`, `CartPage`, `RoleSwitcher`) will be preserved and enhanced.
- Existing mock data and initial states will be seamlessly expanded to support multiple colleges.
