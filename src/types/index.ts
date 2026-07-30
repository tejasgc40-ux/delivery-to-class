export type UserRole = 'CUSTOMER' | 'DELIVERY_PARTNER' | 'SHOP_OWNER' | 'ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  avatarUrl?: string;
  campusBuilding?: string;
  classroom?: string;
  isApproved?: boolean; // For partners and shop owners
  createdAt: string;
}

export type ShopCategory = 
  | 'Restaurants' 
  | 'Cafe' 
  | 'Juice Shop' 
  | 'Bakery' 
  | 'Stationery' 
  | 'Xerox' 
  | 'Medical' 
  | 'Grocery' 
  | 'Snacks';

export interface Product {
  id: string;
  shopId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isAvailable: boolean;
  preparationTimeMinutes: number;
}

export interface Shop {
  id: string;
  name: string;
  ownerId: string;
  category: ShopCategory;
  rating: number;
  totalReviews: number;
  isOpen: boolean;
  address: string;
  campusBuilding: string;
  lat: number;
  lng: number;
  imageUrl: string;
  phone: string;
  deliveryBreakSlots: string[];
}

export type OrderStatus = 
  | 'PLACED' 
  | 'ACCEPTED_BY_SHOP' 
  | 'PREPARING' 
  | 'READY_FOR_PICKUP' 
  | 'ACCEPTED_BY_PARTNER' 
  | 'PICKED_UP' 
  | 'DELIVERED' 
  | 'CANCELLED';

export interface OrderItem {
  product: Product;
  quantity: number;
  unitPrice: number;
}

export interface DeliveryAddress {
  blockName: string; // Required
  floorNumber?: string; // Optional
  classroomNumber: string; // Required
  landmark?: string; // Optional
  deliveryInstructions?: string; // Optional
  contactPhone: string;
}

export type PaymentMethod = 'CASH' | 'UPI';

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  shopId: string;
  shopName: string;
  shopLat: number;
  shopLng: number;
  partnerId?: string;
  partnerName?: string;
  partnerPhone?: string;
  partnerLat?: number;
  partnerLng?: number;
  items: OrderItem[];
  totalAmount: number;
  deliveryFee: number;
  tip: number;
  status: OrderStatus;
  deliveryAddress: DeliveryAddress;
  deliverySlot: string;
  paymentMethod: PaymentMethod;
  paymentStatus: 'PENDING' | 'PAID_TO_PARTNER';
  upiId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CampusBuilding {
  id: string;
  name: string;
  code: string;
  lat: number;
  lng: number;
  floors: string[];
}

export interface Review {
  id: string;
  shopId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface PartnerProfile {
  userId: string;
  name: string;
  studentIdCardUrl: string;
  studentRollNo: string;
  department: string;
  vehicleType: 'WALKING' | 'BICYCLE' | 'SCOOTER';
  isAvailable: boolean;
  isApproved: boolean;
  totalDeliveries: number;
  rating: number;
  earningsToday: number;
  upiId: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'ORDER_UPDATE' | 'PARTNER_BROADCAST' | 'APPROVAL' | 'SYSTEM';
  orderId?: string;
  read: boolean;
  createdAt: string;
}
