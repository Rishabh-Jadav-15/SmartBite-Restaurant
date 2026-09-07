export type UserRole = 'CUSTOMER' | 'STAFF' | 'ADMIN' | 'OWNER';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  healthProfile?: {
    allergies: string[];
    dietaryPreference: 'Veg' | 'Non-Veg' | 'Vegan' | 'Jain' | 'Eggetarian';
    healthGoals: string[];
    medicalConditions: string[];
    conditions?: string[];
    dailyCalorieTarget?: number;
  };
}

export interface MacroNutrients {
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fat: number;     // in grams
  fiber: number;   // in grams
  sugar?: number;  // in grams
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'Appetizers' | 'Main Course' | 'Breads & Rice' | 'Healthy Bowls' | 'Desserts' | 'Beverages';
  cuisine: string;
  price: number; // in INR (₹)
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isChefSpecial: boolean;
  isAvailable: boolean;
  prepTimeMinutes: number;
  healthScore: number; // 0 - 100
  glycemicIndex: 'Low' | 'Medium' | 'High';
  macros: MacroNutrients;
  ingredients: string[];
  allergens?: string[];
  allergies?: string[];
  suitableForConditions: string[]; // e.g. ['Diabetes', 'Hypertension', 'Weight Loss']
  avoidForConditions: string[];
  moodTags?: ('Comfort' | 'Energy' | 'Relax' | 'Celebration' | 'Brain Fuel' | 'Light & Fresh')[];
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
  selectedVariant?: string;
  specialInstructions?: string;
}

export type OrderStatus = 'PENDING' | 'PREPARING' | 'READY' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: CartItem[];
  subtotal: number;
  tax: number; // GST in ₹
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  orderType: 'Dine-In' | 'Takeaway' | 'Delivery';
  tableNumber?: string;
  deliveryAddress?: string;
  paymentMethod: 'UPI (GPay/PhonePe)' | 'Credit/Debit Card' | 'NetBanking' | 'Cash on Delivery';
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  createdAt: string; // ISO / formatted
  estimatedTime: string;
}

export interface Reservation {
  id: string;
  bookingRef: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  partySize: number;
  date: string;
  timeSlot: string;
  tableNumber: string;
  status: 'CONFIRMED' | 'SEATED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  specialRequests?: string;
  dietaryRequirements?: string[];
  isVIP?: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minThreshold: number;
  unit: string;
  unitCost: number;
  status: 'IN_STOCK' | 'LOW' | 'CRITICAL';
}

export interface AIInsight {
  id: string;
  category: 'REVENUE' | 'CUSTOMER' | 'MENU' | 'OPERATIONS' | 'HEALTH';
  title: string;
  description: string;
  metricImpact: string;
  trend: 'UP' | 'DOWN' | 'NEUTRAL';
  confidenceScore: number;
  recommendedAction: string;
  chartData?: { label: string; value: number }[];
}

export interface DishPerformance {
  id: string;
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
  costPerUnit: number;
  sellingPrice: number;
  grossProfit: number;
  marginPercent: number;
  reorderRate: number;
  classification: 'STAR' | 'WORKHORSE' | 'PUZZLE' | 'DOG';
  status: 'BEST_SELLER' | 'STEADY' | 'LOW_PERFORMING' | 'TRENDING_UP';
  growth: number;
}

export interface CategoryPerformanceData {
  category: string;
  revenue: number;
  unitsSold: number;
  revenueShare: number;
  growthYoY: number;
  avgMargin: number;
  topItem: string;
}

export interface CustomerInsightSegment {
  id: string;
  segmentName: string;
  tag: string;
  customerCount: number;
  percentOfTotal: number;
  avgOrderValue: number;
  ordersPerMonth: number;
  favoriteCategory: string;
  clvEstimated: number;
  churnRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  retentionRate: number;
  aiPersonaSummary: string;
}

export interface BusinessAlert {
  id: string;
  severity: 'CRITICAL' | 'WARNING' | 'OPPORTUNITY' | 'INFO';
  type: 'SALES_DROP' | 'DEMAND_SURGE' | 'LOW_PERFORMER' | 'INVENTORY_STOCKOUT' | 'MARGIN_COMPRESSION';
  title: string;
  description: string;
  metricDelta: string;
  timestamp: string;
  status: 'ACTIVE' | 'RESOLVED' | 'DISMISSED';
  actionLabel?: string;
  actionPath?: string;
}

export interface DemandForecastDish {
  dishId: string;
  dishName: string;
  category: string;
  currentAvgDailyDemand: number;
  predictedDemandNextWeek: number;
  predictedDemandNextMonth: number;
  peakDayPredicted: string;
  recommendedPrepUnits: number;
  confidenceScore: number;
  stockShortageRisk: 'NONE' | 'LOW' | 'HIGH';
}

export interface ComboInsight {
  id: string;
  name: string;
  items: string[];
  pairingAffinity: number; // 0-100%
  historicalOrdersTogether: number;
  currentComboPrice: number;
  recommendedBundlePrice: number;
  marginPercentage: number;
  monthlyRevenueUplift: number;
  healthSynergyReason: string;
}

export interface PeakTimeSlotData {
  hour: string;
  orderCount: number;
  revenue: number;
  tableOccupancy: number; // %
  kitchenStressIndex: number; // 0-100
  dineInShare: number;
  deliveryShare: number;
}

export interface BusinessReport {
  id: string;
  title: string;
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY' | 'CUSTOM';
  dateRange: string;
  generatedAt: string;
  totalRevenue: number;
  netProfit: number;
  ebitdaMargin: number;
  orderCount: number;
  avgOrderValue: number;
  totalCustomers: number;
  newCustomers: number;
  returningCustomerRate: number;
  tableUtilization: number;
  topSellingDish: string;
  topCategory: string;
  lowPerformingDish: string;
  executiveSummary: string;
  keyActionItems: string[];
}

export interface SalesForecastPoint {
  period: string;
  actualSales?: number;
  forecastSales: number;
  upperConfidence: number;
  lowerConfidence: number;
  ordersPredicted: number;
  peakHour: string;
}

export interface ThemeColors {
  background: string;
  surface: string;
  elevated: string;
  primary: string;
  secondary: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  borderDark: string;
  borderLight: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}
