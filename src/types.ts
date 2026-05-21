export type UserRole = 'customer' | 'vendor' | 'admin';
export type VerificationStatus = 'pending' | 'verified' | 'rejected';
export type ProductCondition = 'New' | 'Fairly Used';
export type ProductStatus = 'active' | 'pending_approval' | 'rejected' | 'sold_out';
export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'full' | 'installment';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: UserRole;
  phoneNumber?: string;
  createdAt: number;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface VendorProfile {
  userId: string;
  businessName: string;
  location: string;
  verificationStatus: VerificationStatus;
  nin?: string;
  bankAccount?: BankAccount;
  idDocumentUrl?: string;
  salesCount: number;
  rating: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  condition: ProductCondition;
  sizes: string[];
  colors: string[];
  price: number;
  deliveryFee: number;
  images: string[];
  vendorId: string;
  vendorLocation: string;
  description: string;
  status: ProductStatus;
  isInstallmentEligible: boolean;
  createdAt: number;
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  phoneNumber: string;
}

export interface Order {
  id: string;
  customerId: string;
  productId: string;
  productName: string;
  productImage: string;
  vendorId: string;
  totalPrice: number;
  productPrice: number;
  deliveryFee: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  deliveryAddress: ShippingAddress;
  createdAt: number;
  installmentDetails?: {
    firstPayment: number;
    secondPayment: number;
    deadlineDays: number;
    isCompleted: boolean;
  };
}

export interface Payment {
  id: string;
  userId: string;
  orderId: string;
  amount: number;
  paymentType: PaymentMethod;
  paystackReference: string;
  status: 'success' | 'failed' | 'pending';
  paymentChannel: string;
  createdAt: number;
}

export interface WalletRecord {
  id: string;
  userId: string;
  orderId?: string;
  paymentId?: string;
  transactionType: string; // e.g., 'Full Payment', 'Installment', 'Refund'
  amount: number;
  description: string;
  status: 'Successful' | 'Pending' | 'Failed';
  balanceType: 'payment' | 'refund' | 'installment';
  createdAt: number;
}

export interface InstallmentPlan {
  id: string;
  userId: string;
  orderId: string;
  productName: string;
  totalAmount: number;
  amountPaid: number;
  balanceRemaining: number;
  nextDueDate: number;
  status: 'active' | 'completed' | 'overdue';
}

export interface VendorPayout {
  id: string;
  vendorId: string;
  orderId: string;
  totalOrderAmount: number;
  platformCommission: number;
  deliveryFee: number;
  vendorAmount: number;
  payoutStatus: 'pending' | 'paid' | 'cancelled';
  payoutDate?: number;
}
