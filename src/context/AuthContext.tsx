import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, FoodItem, CartItem, Order, OrderStatus, Reservation, InventoryItem } from '../types';
import { INITIAL_USERS, INITIAL_MENU_ITEMS, INITIAL_ORDERS, INITIAL_RESERVATIONS, INITIAL_INVENTORY } from '../data/dummyData';

export interface AuthContextType {
  user: User | null;
  role: UserRole;
  currentRole: UserRole;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateUser: (userData: Partial<User>) => void;
  
  // Cart operations
  cart: CartItem[];
  addToCart: (foodItem: FoodItem, quantity?: number) => void;
  removeFromCart: (foodItemId: string) => void;
  updateQuantity: (foodItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // Orders operations
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  
  // Reservations operations
  reservations: Reservation[];
  createReservation: (resData: Omit<Reservation, 'id' | 'bookingRef'>) => Reservation;
  updateReservationStatus: (resId: string, status: Reservation['status']) => void;

  // Menu items state & operations
  menuItems: FoodItem[];
  addMenuItem: (item: FoodItem | Omit<FoodItem, 'id'>) => void;
  updateMenuItem: (itemIdOrItem: string | FoodItem, updates?: Partial<FoodItem>) => void;
  deleteMenuItem: (itemId: string) => void;

  // Inventory operations
  inventory: InventoryItem[];
  updateInventoryStock: (id: string, addQty: number) => void;

  // Users management
  usersList: User[];
  toggleUserStatus: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Customer or stored user
  const [role, setRole] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem('smartbite_role') as UserRole;
      return (saved && ['CUSTOMER', 'STAFF', 'ADMIN', 'OWNER'].includes(saved)) ? saved : 'CUSTOMER';
    } catch {
      return 'CUSTOMER';
    }
  });

  const [user, setUser] = useState<User | null>(() => {
    const found = INITIAL_USERS.find(u => u.role === role);
    return found || INITIAL_USERS[0];
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('smartbite_cart');
      return savedCart ? JSON.parse(savedCart) : [
        { foodItem: INITIAL_MENU_ITEMS[0], quantity: 1 },
        { foodItem: INITIAL_MENU_ITEMS[5], quantity: 2 },
      ];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  // Reservations
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  // Menu Items
  const [menuItems, setMenuItems] = useState<FoodItem[]>(INITIAL_MENU_ITEMS);
  // Inventory Items
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  // Users List
  const [usersList, setUsersList] = useState<User[]>(INITIAL_USERS);

  useEffect(() => {
    try {
      localStorage.setItem('smartbite_role', role);
      localStorage.setItem('smartbite_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to sync auth/cart state to localStorage', e);
    }
  }, [role, cart]);

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    const targetUser = INITIAL_USERS.find(u => u.role === newRole);
    setUser(targetUser || null);
    setIsAuthenticated(true);
  };

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
  };

  const login = (email: string, targetRole?: UserRole) => {
    const matched = usersList.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setUser(matched);
      setRole(matched.role);
    } else {
      const fallbackRole = targetRole || 'CUSTOMER';
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0].toUpperCase(),
        email,
        phone: '+91 98765 00000',
        role: fallbackRole,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        createdAt: new Date().toLocaleDateString('en-GB'),
        status: 'ACTIVE',
      };
      setUser(newUser);
      setRole(fallbackRole);
      setUsersList(prev => [...prev, newUser]);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const addToCart = (foodItem: FoodItem, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.foodItem.id === foodItem.id);
      if (existing) {
        return prev.map(item =>
          item.foodItem.id === foodItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { foodItem, quantity }];
    });
  };

  const removeFromCart = (foodItemId: string) => {
    setCart(prev => prev.filter(item => item.foodItem.id !== foodItemId));
  };

  const updateQuantity = (foodItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(foodItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.foodItem.id === foodItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + (item.foodItem.price * item.quantity), 0);

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `SB-${randomNum}`,
      createdAt: `${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  const createReservation = (resData: Omit<Reservation, 'id' | 'bookingRef'>): Reservation => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newRes: Reservation = {
      ...resData,
      id: `res-${Date.now()}`,
      bookingRef: `RES-IND-${randomNum}`,
    };
    setReservations(prev => [newRes, ...prev]);
    return newRes;
  };

  const updateReservationStatus = (resId: string, status: Reservation['status']) => {
    setReservations(prev =>
      prev.map(res => (res.id === resId ? { ...res, status } : res))
    );
  };

  const addMenuItem = (item: FoodItem | Omit<FoodItem, 'id'>) => {
    const fullItem: FoodItem = 'id' in item ? item : { ...item, id: `dish-${Date.now()}` };
    setMenuItems(prev => [fullItem, ...prev]);
  };

  const updateMenuItem = (itemIdOrItem: string | FoodItem, updates?: Partial<FoodItem>) => {
    if (typeof itemIdOrItem === 'string') {
      setMenuItems(prev => prev.map(m => (m.id === itemIdOrItem ? { ...m, ...updates } : m)));
    } else {
      setMenuItems(prev => prev.map(m => (m.id === itemIdOrItem.id ? itemIdOrItem : m)));
    }
  };

  const deleteMenuItem = (itemId: string) => {
    setMenuItems(prev => prev.filter(m => m.id !== itemId));
  };

  const updateInventoryStock = (id: string, addQty: number) => {
    setInventory(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newStock = item.currentStock + addQty;
          const status = newStock <= item.minThreshold / 2 ? 'CRITICAL' : newStock <= item.minThreshold ? 'LOW' : 'IN_STOCK';
          return { ...item, currentStock: newStock, status };
        }
        return item;
      })
    );
  };

  const toggleUserStatus = (userId: string) => {
    setUsersList(prev =>
      prev.map(u =>
        u.id === userId
          ? { ...u, status: u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }
          : u
      )
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        currentRole: role,
        isAuthenticated,
        login,
        logout,
        switchRole,
        updateUser,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        orders,
        createOrder,
        updateOrderStatus,
        reservations,
        createReservation,
        updateReservationStatus,
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        inventory,
        updateInventoryStock,
        usersList,
        toggleUserStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
