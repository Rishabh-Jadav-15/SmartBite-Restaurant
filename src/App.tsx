import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useTheme } from './hooks/useTheme';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { CartDrawer } from './components/common/CartDrawer';
import { RoleGuard } from './components/common/RoleGuard';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { ForgotPasswordPage } from './pages/public/ForgotPasswordPage';

// Customer Pages
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { MenuPage } from './pages/customer/MenuPage';
import { CartPage } from './pages/customer/CartPage';
import { CheckoutPage } from './pages/customer/CheckoutPage';
import { OrdersPage } from './pages/customer/OrdersPage';
import { ReservationsPage } from './pages/customer/ReservationsPage';
import { ProfilePage } from './pages/customer/ProfilePage';
import { AIDiseaseRecommendation } from './pages/customer/ai/AIDiseaseRecommendation';
import { AIGoalMealPlanner } from './pages/customer/ai/AIGoalMealPlanner';
import { AIMoodRecommendation } from './pages/customer/ai/AIMoodRecommendation';
import { AIIngredientIntelligence } from './pages/customer/ai/AIIngredientIntelligence';
import { AIComboGenerator } from './pages/customer/ai/AIComboGenerator';

// Staff Pages
import { StaffDashboard } from './pages/staff/StaffDashboard';
import { KitchenQueuePage } from './pages/staff/KitchenQueuePage';
import { StaffReservationsPage } from './pages/staff/StaffReservationsPage';
import { StaffInventoryPage } from './pages/staff/StaffInventoryPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { MenuManagementPage } from './pages/admin/MenuManagementPage';
import { OrderManagementPage } from './pages/admin/OrderManagementPage';
import { UserManagementPage } from './pages/admin/UserManagementPage';

// Owner Pages
import { OwnerDashboard } from './pages/owner/OwnerDashboard';
import { RealTimeSalesPage } from './pages/owner/RealTimeSalesPage';
import { SalesRevenuePage } from './pages/owner/SalesRevenuePage';
import { DishesCategoryAnalyticsPage } from './pages/owner/DishesCategoryAnalyticsPage';
import { CustomerReservationAnalyticsPage } from './pages/owner/CustomerReservationAnalyticsPage';
import { AIPredictiveBI } from './pages/owner/AIPredictiveBI';
import { ReportsAndAlertsPage } from './pages/owner/ReportsAndAlertsPage';

const AppContent: React.FC = () => {
  const { isDarkMode, colors } = useTheme();
  const { currentRole, user } = useAuth();

  // Simple stateful router synchronized with window.location.hash
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || '/';
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentPath(hash || '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isPublicPage = ['/', '/about', '/contact', '/login', '/register', '/forgot-password'].includes(currentPath);

  // Render Page Content based on currentPath
  const renderCurrentPage = () => {
    switch (currentPath) {
      // Public Routes
      case '/':
        return <HomePage navigate={navigate} />;
      case '/about':
        return <AboutPage navigate={navigate} />;
      case '/contact':
        return <ContactPage />;
      case '/login':
        return <LoginPage navigate={navigate} />;
      case '/register':
        return <RegisterPage navigate={navigate} />;
      case '/forgot-password':
        return <ForgotPasswordPage navigate={navigate} />;

      // Customer Routes
      case '/customer':
      case '/customer/dashboard':
        return (
          <RoleGuard allowedRoles={['CUSTOMER']} onUnauthorized={() => navigate('/login')}>
            <CustomerDashboard navigate={navigate} />
          </RoleGuard>
        );
      case '/customer/menu':
        return (
          <RoleGuard allowedRoles={['CUSTOMER']} onUnauthorized={() => navigate('/login')}>
            <MenuPage />
          </RoleGuard>
        );
      case '/customer/cart':
        return (
          <RoleGuard allowedRoles={['CUSTOMER']} onUnauthorized={() => navigate('/login')}>
            <CartPage navigate={navigate} />
          </RoleGuard>
        );
      case '/customer/checkout':
        return (
          <RoleGuard allowedRoles={['CUSTOMER']} onUnauthorized={() => navigate('/login')}>
            <CheckoutPage navigate={navigate} />
          </RoleGuard>
        );
      case '/customer/orders':
        return (
          <RoleGuard allowedRoles={['CUSTOMER']} onUnauthorized={() => navigate('/login')}>
            <OrdersPage navigate={navigate} />
          </RoleGuard>
        );
      case '/customer/reservations':
        return (
          <RoleGuard allowedRoles={['CUSTOMER']} onUnauthorized={() => navigate('/login')}>
            <ReservationsPage />
          </RoleGuard>
        );
      case '/customer/profile':
        return (
          <RoleGuard allowedRoles={['CUSTOMER']} onUnauthorized={() => navigate('/login')}>
            <ProfilePage />
          </RoleGuard>
        );
      case '/customer/ai-disease':
        return (
          <RoleGuard allowedRoles={['CUSTOMER']} onUnauthorized={() => navigate('/login')}>
            <AIDiseaseRecommendation />
          </RoleGuard>
        );
      case '/customer/ai-meal-planner':
        return (
          <RoleGuard allowedRoles={['CUSTOMER']} onUnauthorized={() => navigate('/login')}>
            <AIGoalMealPlanner />
          </RoleGuard>
        );
      case '/customer/ai-mood':
        return (
          <RoleGuard allowedRoles={['CUSTOMER']} onUnauthorized={() => navigate('/login')}>
            <AIMoodRecommendation />
          </RoleGuard>
        );
      case '/customer/ai-ingredients':
        return (
          <RoleGuard allowedRoles={['CUSTOMER']} onUnauthorized={() => navigate('/login')}>
            <AIIngredientIntelligence />
          </RoleGuard>
        );
      case '/customer/ai-combos':
        return (
          <RoleGuard allowedRoles={['CUSTOMER']} onUnauthorized={() => navigate('/login')}>
            <AIComboGenerator />
          </RoleGuard>
        );

      // Staff Routes
      case '/staff':
      case '/staff/dashboard':
        return (
          <RoleGuard allowedRoles={['STAFF']} onUnauthorized={() => navigate('/login')}>
            <StaffDashboard navigate={navigate} />
          </RoleGuard>
        );
      case '/staff/kitchen':
        return (
          <RoleGuard allowedRoles={['STAFF']} onUnauthorized={() => navigate('/login')}>
            <KitchenQueuePage />
          </RoleGuard>
        );
      case '/staff/reservations':
        return (
          <RoleGuard allowedRoles={['STAFF']} onUnauthorized={() => navigate('/login')}>
            <StaffReservationsPage />
          </RoleGuard>
        );
      case '/staff/inventory':
        return (
          <RoleGuard allowedRoles={['STAFF', 'ADMIN']} onUnauthorized={() => navigate('/login')}>
            <StaffInventoryPage />
          </RoleGuard>
        );

      // Admin Routes
      case '/admin':
      case '/admin/dashboard':
        return (
          <RoleGuard allowedRoles={['ADMIN']} onUnauthorized={() => navigate('/login')}>
            <AdminDashboard navigate={navigate} />
          </RoleGuard>
        );
      case '/admin/menu':
        return (
          <RoleGuard allowedRoles={['ADMIN']} onUnauthorized={() => navigate('/login')}>
            <MenuManagementPage />
          </RoleGuard>
        );
      case '/admin/orders':
        return (
          <RoleGuard allowedRoles={['ADMIN']} onUnauthorized={() => navigate('/login')}>
            <OrderManagementPage />
          </RoleGuard>
        );
      case '/admin/users':
        return (
          <RoleGuard allowedRoles={['ADMIN']} onUnauthorized={() => navigate('/login')}>
            <UserManagementPage />
          </RoleGuard>
        );

      // Owner Routes (20-Point Feature Suite)
      case '/owner':
      case '/owner/dashboard':
        return (
          <RoleGuard allowedRoles={['OWNER']} onUnauthorized={() => navigate('/login')}>
            <OwnerDashboard navigate={navigate} />
          </RoleGuard>
        );
      case '/owner/real-time':
        return (
          <RoleGuard allowedRoles={['OWNER']} onUnauthorized={() => navigate('/login')}>
            <RealTimeSalesPage navigate={navigate} />
          </RoleGuard>
        );
      case '/owner/revenue':
      case '/owner/sales-analytics':
        return (
          <RoleGuard allowedRoles={['OWNER']} onUnauthorized={() => navigate('/login')}>
            <SalesRevenuePage navigate={navigate} />
          </RoleGuard>
        );
      case '/owner/dishes':
      case '/owner/categories':
        return (
          <RoleGuard allowedRoles={['OWNER']} onUnauthorized={() => navigate('/login')}>
            <DishesCategoryAnalyticsPage navigate={navigate} />
          </RoleGuard>
        );
      case '/owner/customers':
      case '/owner/reservations':
      case '/owner/customers-reservations':
        return (
          <RoleGuard allowedRoles={['OWNER']} onUnauthorized={() => navigate('/login')}>
            <CustomerReservationAnalyticsPage navigate={navigate} />
          </RoleGuard>
        );
      case '/owner/predictive-bi':
      case '/owner/forecasting':
        return (
          <RoleGuard allowedRoles={['OWNER']} onUnauthorized={() => navigate('/login')}>
            <AIPredictiveBI navigate={navigate} />
          </RoleGuard>
        );
      case '/owner/reports':
      case '/owner/alerts':
        return (
          <RoleGuard allowedRoles={['OWNER']} onUnauthorized={() => navigate('/login')}>
            <ReportsAndAlertsPage navigate={navigate} />
          </RoleGuard>
        );

      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300 flex flex-col font-sans"
      style={{
        backgroundColor: colors.background,
        color: colors.textPrimary,
      }}
    >
      {/* Role-Aware App Header */}
      <Header
        currentPath={currentPath}
        navigate={navigate}
        onOpenCart={() => setIsCartOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Layout Body */}
      {isPublicPage ? (
        <div className="flex-1 flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <main className="w-full">
            {renderCurrentPage()}
          </main>
        </div>
      ) : (
        <div className="flex-1 flex w-full relative min-h-[calc(100vh-4rem)]">
          {/* Role-Specific Persistent Sidebar docked flush to the left of the screen */}
          <Sidebar
            currentPath={currentPath}
            navigate={navigate}
            isOpen={isSidebarOpen}
            isCollapsed={isSidebarCollapsed}
            onClose={() => setIsSidebarOpen(false)}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />

          {/* Content View Area */}
          <main className="flex-1 min-w-0 w-full p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {renderCurrentPage()}
          </main>
        </div>
      )}

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          navigate('/customer/checkout');
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
