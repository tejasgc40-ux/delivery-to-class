import { Shop, Product, CampusBuilding, Order, Review, PartnerProfile, College } from '../types';

export const INITIAL_CAMPUS_BUILDINGS: CampusBuilding[] = [
  {
    id: 'b-tech-park',
    name: 'Tech Park (Engineering Block)',
    code: 'TP',
    lat: 12.9725,
    lng: 77.5950,
    floors: ['Ground Floor', '1st Floor (CS Labs)', '2nd Floor (EC Labs)', '3rd Floor (Classrooms 301-315)', '4th Floor (Classrooms 401-415)']
  },
  {
    id: 'b-science-hub',
    name: 'Science & Humanities Auditorium',
    code: 'SH',
    lat: 12.9710,
    lng: 77.5935,
    floors: ['Ground Floor (Seminar Hall)', '1st Floor (Physics/Chem)', '2nd Floor (Math Dept)']
  },
  {
    id: 'b-library',
    name: 'Central Library & Media Center',
    code: 'LIB',
    lat: 12.9730,
    lng: 77.5940,
    floors: ['Ground Floor (Reading Room)', '1st Floor (Digital Library)', '2nd Floor (Discussion Rooms)']
  },
  {
    id: 'b-mba-block',
    name: 'MBA & Business School',
    code: 'BS',
    lat: 12.9705,
    lng: 77.5960,
    floors: ['Ground Floor', '1st Floor (Executive Classrooms)', '2nd Floor (Case Study Rooms)']
  },
  {
    id: 'b-hostels',
    name: 'Student Hostel Complex (Girls & Boys)',
    code: 'HST',
    lat: 12.9740,
    lng: 77.5965,
    floors: ['Block A (Boys)', 'Block B (Girls)', 'Hostel Mess Lounge']
  }
];

export const INITIAL_COLLEGES: College[] = [
  {
    id: 'college-srm',
    name: 'SRM Institute of Science & Technology',
    code: 'SRM-IST',
    locationName: 'Kattankulathur, Chennai',
    lat: 12.9725,
    lng: 77.5950,
    radiusKm: 3.5,
    buildings: INITIAL_CAMPUS_BUILDINGS
  },
  {
    id: 'college-iitm',
    name: 'IIT Madras Campus',
    code: 'IIT-M',
    locationName: 'Adyar, Chennai',
    lat: 12.9915,
    lng: 80.2337,
    radiusKm: 4.0,
    buildings: INITIAL_CAMPUS_BUILDINGS
  },
  {
    id: 'college-vit',
    name: 'VIT Vellore University',
    code: 'VIT-VLR',
    locationName: 'Vellore, Tamil Nadu',
    lat: 12.9692,
    lng: 79.1559,
    radiusKm: 3.5,
    buildings: INITIAL_CAMPUS_BUILDINGS
  },
  {
    id: 'college-anna',
    name: 'Anna University Campus',
    code: 'AU-GND',
    locationName: 'Guindy, Chennai',
    lat: 13.0102,
    lng: 80.2357,
    radiusKm: 2.5,
    buildings: INITIAL_CAMPUS_BUILDINGS
  }
];

export const INITIAL_SHOPS: Shop[] = [
  {
    id: 'shop-1',
    name: 'Campus Canteen & Bites',
    ownerId: 'owner-1',
    collegeId: 'college-srm',
    category: 'Restaurants',
    rating: 4.8,
    totalReviews: 142,
    isOpen: true,
    address: 'Near Tech Park Courtyard, Gate 2',
    campusBuilding: 'Tech Park',
    lat: 12.9722,
    lng: 77.5948,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    phone: '+91 98765 43210',
    deliveryBreakSlots: ['10:15 AM Morning Break', '1:00 PM Lunch Break', '3:30 PM Evening Break']
  },
  {
    id: 'shop-2',
    name: 'Bean & Brew Campus Cafe',
    ownerId: 'owner-2',
    collegeId: 'college-srm',
    category: 'Cafe',
    rating: 4.9,
    totalReviews: 210,
    isOpen: true,
    address: 'Central Library Plaza',
    campusBuilding: 'Central Library',
    lat: 12.9729,
    lng: 77.5942,
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    phone: '+91 98765 43211',
    deliveryBreakSlots: ['10:15 AM Morning Break', '1:00 PM Lunch Break', '3:30 PM Evening Break', '5:00 PM After-Class']
  },
  {
    id: 'shop-3',
    name: 'Fresho Juice & Smoothie Corner',
    ownerId: 'owner-3',
    collegeId: 'college-srm',
    category: 'Juice Shop',
    rating: 4.7,
    totalReviews: 98,
    isOpen: true,
    address: 'Sports Complex Plaza',
    campusBuilding: 'Science Auditorium',
    lat: 12.9712,
    lng: 77.5938,
    imageUrl: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b7?auto=format&fit=crop&w=800&q=80',
    phone: '+91 98765 43212',
    deliveryBreakSlots: ['10:15 AM Morning Break', '1:00 PM Lunch Break', '3:30 PM Evening Break']
  },
  {
    id: 'shop-4',
    name: 'Campus Bakery & Hot Puffs',
    ownerId: 'owner-4',
    collegeId: 'college-srm',
    category: 'Bakery',
    rating: 4.6,
    totalReviews: 87,
    isOpen: true,
    address: 'Student Activity Center',
    campusBuilding: 'Tech Park',
    lat: 12.9720,
    lng: 77.5952,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    phone: '+91 98765 43213',
    deliveryBreakSlots: ['10:15 AM Morning Break', '1:00 PM Lunch Break', '3:30 PM Evening Break']
  },
  {
    id: 'shop-5',
    name: 'Speedy Xerox & Print Hub',
    ownerId: 'owner-5',
    collegeId: 'college-srm',
    category: 'Xerox',
    rating: 4.9,
    totalReviews: 312,
    isOpen: true,
    address: 'Tech Park Basement, Shop #4',
    campusBuilding: 'Tech Park',
    lat: 12.9726,
    lng: 77.5951,
    imageUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80',
    phone: '+91 98765 43214',
    deliveryBreakSlots: ['10:15 AM Morning Break', '1:00 PM Lunch Break', '3:30 PM Evening Break']
  },
  {
    id: 'shop-6',
    name: 'Scholar Stationery & Lab Manuals',
    ownerId: 'owner-6',
    category: 'Stationery',
    rating: 4.7,
    totalReviews: 76,
    isOpen: true,
    address: 'Opposite MBA Block',
    campusBuilding: 'MBA Block',
    lat: 12.9708,
    lng: 77.5958,
    imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
    phone: '+91 98765 43215',
    deliveryBreakSlots: ['10:15 AM Morning Break', '1:00 PM Lunch Break', '3:30 PM Evening Break']
  },
  {
    id: 'shop-7',
    name: 'Campus Care Pharmacy & First Aid',
    ownerId: 'owner-7',
    category: 'Medical',
    rating: 4.9,
    totalReviews: 64,
    isOpen: true,
    address: 'Health Center Arcade',
    campusBuilding: 'Science Auditorium',
    lat: 12.9714,
    lng: 77.5932,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    phone: '+91 98765 43216',
    deliveryBreakSlots: ['10:15 AM Morning Break', '1:00 PM Lunch Break', '3:30 PM Evening Break']
  },
  {
    id: 'shop-8',
    name: 'Dorm Essentials Grocery',
    ownerId: 'owner-8',
    category: 'Grocery',
    rating: 4.5,
    totalReviews: 120,
    isOpen: true,
    address: 'Hostel Main Gate',
    campusBuilding: 'Hostels',
    lat: 12.9738,
    lng: 77.5962,
    imageUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    phone: '+91 98765 43217',
    deliveryBreakSlots: ['10:15 AM Morning Break', '1:00 PM Lunch Break', '3:30 PM Evening Break']
  },
  {
    id: 'shop-9',
    name: 'Late Night Munchies & Snacks',
    ownerId: 'owner-9',
    category: 'Snacks',
    rating: 4.8,
    totalReviews: 189,
    isOpen: true,
    address: 'Amphitheatre Alley',
    campusBuilding: 'Central Library',
    lat: 12.9732,
    lng: 77.5944,
    imageUrl: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80',
    phone: '+91 98765 43218',
    deliveryBreakSlots: ['10:15 AM Morning Break', '1:00 PM Lunch Break', '3:30 PM Evening Break']
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // Canteen Products
  {
    id: 'p-1',
    shopId: 'shop-1',
    name: 'Paneer Butter Masala Roll',
    description: 'Hot toasted kathi roll stuffed with spiced paneer, onions and mint chutney.',
    price: 90,
    category: 'Food',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    preparationTimeMinutes: 10
  },
  {
    id: 'p-2',
    shopId: 'shop-1',
    name: 'Crispy Veg Burger + Fries Combo',
    description: 'Crispy potato patty burger served with seasoned hot french fries.',
    price: 110,
    category: 'Food',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    preparationTimeMinutes: 12
  },
  {
    id: 'p-3',
    shopId: 'shop-1',
    name: 'Special Masala Dosa',
    description: 'Golden crispy rice crepe served with spiced potato masala, sambar & 2 chutneys.',
    price: 70,
    category: 'Food',
    imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    preparationTimeMinutes: 8
  },
  // Cafe Products
  {
    id: 'p-4',
    shopId: 'shop-2',
    name: 'Iced Hazelnut Cold Coffee',
    description: 'Double espresso blended with cold milk, hazelnut syrup & dark chocolate drizzle.',
    price: 85,
    category: 'Beverages',
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    preparationTimeMinutes: 5
  },
  {
    id: 'p-5',
    shopId: 'shop-2',
    name: 'Chocolate Chip Muffin',
    description: 'Freshly baked dark chocolate chip muffin.',
    price: 50,
    category: 'Snacks',
    imageUrl: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    preparationTimeMinutes: 2
  },
  // Juice Corner
  {
    id: 'p-6',
    shopId: 'shop-3',
    name: 'Fresh Mint Lime Cooler',
    description: 'Chilled freshly squeezed lime juice with crushed mint leaves.',
    price: 40,
    category: 'Beverages',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    preparationTimeMinutes: 4
  },
  {
    id: 'p-7',
    shopId: 'shop-3',
    name: 'Avocado & Banana Protein Smoothie',
    description: 'Rich creamy smoothie with real honey and chia seeds.',
    price: 95,
    category: 'Beverages',
    imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    preparationTimeMinutes: 6
  },
  // Bakery
  {
    id: 'p-8',
    shopId: 'shop-4',
    name: 'Hot Paneer Puff (2 Pcs)',
    description: 'Flaky golden pastry filled with spicy cottage cheese filling.',
    price: 45,
    category: 'Snacks',
    imageUrl: 'https://images.unsplash.com/photo-1621236378699-8597fee6a142?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    preparationTimeMinutes: 3
  },
  // Xerox
  {
    id: 'p-9',
    shopId: 'shop-5',
    name: 'Color Printout (A4 Single/Double)',
    description: 'High quality laser color printouts for lab reports & assignment submissions.',
    price: 10,
    category: 'Services',
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    preparationTimeMinutes: 5
  },
  {
    id: 'p-10',
    shopId: 'shop-5',
    name: 'Spiral Project Binding + Cover',
    description: 'Sturdy spiral binding with transparent front cover & blue card stock back.',
    price: 35,
    category: 'Services',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    preparationTimeMinutes: 10
  },
  // Stationery
  {
    id: 'p-11',
    shopId: 'shop-6',
    name: 'Classmate Octane Gel Pen Pack (5 Pens)',
    description: 'Smooth waterproof gel ink pens in Blue & Black.',
    price: 60,
    category: 'Stationery',
    imageUrl: 'https://images.unsplash.com/photo-1585336261026-6757c54e3ed7?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    preparationTimeMinutes: 2
  },
  {
    id: 'p-12',
    shopId: 'shop-6',
    name: 'A4 Unruled Practical Record Notebook',
    description: '192 pages spiral notebook for engineering & science lab records.',
    price: 80,
    category: 'Stationery',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    preparationTimeMinutes: 2
  }
];

export const INITIAL_PARTNERS: PartnerProfile[] = [
  {
    userId: 'partner-1',
    name: 'Rahul Sharma (Student Courier)',
    studentIdCardUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    studentRollNo: '21CS104',
    department: 'Computer Science - 3rd Year',
    vehicleType: 'WALKING',
    isAvailable: true,
    isApproved: true,
    totalDeliveries: 48,
    rating: 4.9,
    earningsToday: 320,
    upiId: 'rahul.student@okicici'
  },
  {
    userId: 'partner-2',
    name: 'Ananya Verma (Student Courier)',
    studentIdCardUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    studentRollNo: '22EC056',
    department: 'Electronics - 2nd Year',
    vehicleType: 'BICYCLE',
    isAvailable: true,
    isApproved: true,
    totalDeliveries: 34,
    rating: 4.8,
    earningsToday: 240,
    upiId: 'ananya.v@paytm'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'D2C-8891',
    customerId: 'cust-1',
    customerName: 'Priya Sundaram',
    shopId: 'shop-1',
    shopName: 'Campus Canteen & Bites',
    shopLat: 12.9722,
    shopLng: 77.5948,
    partnerId: 'partner-1',
    partnerName: 'Rahul Sharma',
    partnerPhone: '+91 91234 56789',
    partnerLat: 12.9724,
    partnerLng: 77.5949,
    items: [
      { product: INITIAL_PRODUCTS[0], quantity: 2, unitPrice: 90 },
      { product: INITIAL_PRODUCTS[3], quantity: 1, unitPrice: 85 }
    ],
    totalAmount: 265,
    deliveryFee: 20,
    tip: 10,
    status: 'PICKED_UP',
    deliveryAddress: {
      blockName: 'ISE Block',
      floorNumber: '2',
      classroomNumber: 'ISE-204',
      landmark: 'Near Seminar Hall',
      deliveryInstructions: 'Please deliver near front desk during break.',
      contactPhone: '+91 99887 76655'
    },
    deliverySlot: '10:15 AM Morning Break',
    paymentMethod: 'UPI',
    paymentStatus: 'PENDING',
    upiId: 'rahul.student@okicici',
    createdAt: '2026-07-30T10:00:00.000Z',
    updatedAt: '2026-07-30T10:13:00.000Z'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    shopId: 'shop-1',
    customerId: 'cust-2',
    customerName: 'Karthik Raja',
    rating: 5,
    comment: 'Super fast delivery during 10:15 AM break! Paneer roll was piping hot right at classroom desk.',
    createdAt: '2026-07-28'
  },
  {
    id: 'rev-2',
    shopId: 'shop-2',
    customerId: 'cust-3',
    customerName: 'Sneha Patel',
    rating: 5,
    comment: 'Cold coffee saved my 8 AM lecture! Delivery partner was super polite.',
    createdAt: '2026-07-29'
  }
];
