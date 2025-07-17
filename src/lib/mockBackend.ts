// Simple mock backend using localStorage - no APIs required!

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  items: Array<{
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  orderType: 'pickup' | 'delivery';
  pickupTime?: string;
  status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
}

// Generate simple ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Local storage keys
const USERS_KEY = 'demo_smoke_users';
const CURRENT_USER_KEY = 'demo_smoke_current_user';
const ORDERS_KEY = 'demo_smoke_orders';

// Helper functions
const getUsers = (): User[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getOrders = (): Order[] => {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  } catch {
    return [];
  }
};

const saveOrders = (orders: Order[]) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

// Auth functions
export const authService = {
  async signUp(email: string, password: string, userData: { firstName: string; lastName: string; phone?: string }) {
    const users = getUsers();
    
    // Check if user already exists
    if (users.find(user => user.email === email)) {
      return { error: 'User already exists with this email' };
    }

    const user: User = {
      id: generateId(),
      email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      createdAt: new Date().toISOString(),
    };

    users.push(user);
    saveUsers(users);
    
    // Auto sign in
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    
    return { user, error: null };
  },

  async signIn(email: string, password: string) {
    const users = getUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return { error: 'User not found' };
    }

    // For demo purposes, any password works
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    
    return { user, error: null };
  },

  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem(CURRENT_USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  signOut() {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  updateProfile(updates: Partial<User>) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return { error: 'Not signed in' };

    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) return { error: 'User not found' };

    const updatedUser = { ...users[userIndex], ...updates };
    users[userIndex] = updatedUser;
    saveUsers(users);
    
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    
    return { user: updatedUser, error: null };
  }
};

// Order functions
export const orderService = {
  async createOrder(
    items: Array<{ product: any; quantity: number }>,
    customerInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    },
    orderDetails: {
      orderType: 'pickup' | 'delivery';
      pickupTime?: string;
    }
  ) {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      return { error: 'Must be signed in to place order' };
    }

    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    const order: Order = {
      id: generateId(),
      userId: currentUser.id,
      customerInfo,
      items: items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.image,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total,
      orderType: orderDetails.orderType,
      pickupTime: orderDetails.pickupTime,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const orders = getOrders();
    orders.push(order);
    saveOrders(orders);

    return { order, error: null };
  },

  getUserOrders(userId: string): Order[] {
    const orders = getOrders();
    return orders.filter(order => order.userId === userId);
  },

  updateOrderStatus(orderId: string, status: Order['status']) {
    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) return { error: 'Order not found' };

    orders[orderIndex].status = status;
    saveOrders(orders);
    
    return { error: null };
  }
};

// Initialize with demo user for testing
if (typeof window !== 'undefined') {
  const users = getUsers();
  if (users.length === 0) {
    // Create demo user
    const demoUser: User = {
      id: 'demo-user-1',
      email: 'demo@example.com',
      firstName: 'Demo',
      lastName: 'User',
      phone: '(555) 123-4567',
      createdAt: new Date().toISOString(),
    };
    saveUsers([demoUser]);
  }
} 