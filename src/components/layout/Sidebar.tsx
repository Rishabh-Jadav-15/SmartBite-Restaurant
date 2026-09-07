import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { RoleBadge } from '../common/RoleBadge';
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  CalendarDays,
  User,
  HeartPulse,
  Target,
  Smile,
  Brain,
  Sparkles,
  Layers,
  Users,
  ClipboardList,
  Flame,
  TrendingUp,
  LineChart,
  BarChart3,
  Lightbulb,
  FileSpreadsheet,
  Settings,
  ChevronRight,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

interface SidebarProps {
  currentPath: string;
  navigate: (path: string) => void;
  isOpen: boolean;
  onClose?: () => void;
  onCloseMobile?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  navigate,
  isOpen,
  onClose,
  onCloseMobile,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const { role, user } = useAuth();
  const { isDarkMode } = useTheme();

  const handleClose = () => {
    if (onClose) onClose();
    if (onCloseMobile) onCloseMobile();
  };

  interface NavItem {
    label: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    isAi?: boolean;
  }

  interface NavGroup {
    groupTitle?: string;
    items: NavItem[];
  }

  // Define role-specific navigation sections strictly
  const getNavGroups = (): NavGroup[] => {
    switch (role) {
      case 'CUSTOMER':
        return [
          {
            groupTitle: 'Dining & Orders',
            items: [
              { label: 'Overview', path: '/customer', icon: LayoutDashboard },
              { label: 'Food Menu', path: '/customer/menu', icon: UtensilsCrossed },
              { label: 'My Orders', path: '/customer/orders', icon: ShoppingBag },
              { label: 'Table Booking', path: '/customer/reservations', icon: CalendarDays },
              { label: 'My Profile', path: '/customer/profile', icon: User },
            ],
          },
          {
            groupTitle: 'AI Health Intelligence',
            items: [
              { label: 'AI Disease Matcher', path: '/customer/ai-disease', icon: HeartPulse, isAi: true },
              { label: 'AI Goal Planner', path: '/customer/ai-meal-planner', icon: Target, isAi: true },
              { label: 'AI Mood Dining', path: '/customer/ai-mood', icon: Smile, isAi: true },
              { label: 'Ingredient Chat', path: '/customer/ai-ingredients', icon: Brain, isAi: true },
              { label: 'AI Smart Combos', path: '/customer/ai-combos', icon: Sparkles, isAi: true },
            ],
          },
        ];

      case 'STAFF':
        return [
          {
            groupTitle: 'Kitchen & Floor Operations',
            items: [
              { label: 'Staff Dashboard', path: '/staff', icon: LayoutDashboard },
              { label: 'Kitchen Queue (Kanban)', path: '/staff/kitchen', icon: Layers, badge: 'Live' },
              { label: 'Reservation Check-in', path: '/staff/reservations', icon: CalendarDays },
              { label: 'Inventory Monitor', path: '/staff/inventory', icon: ClipboardList },
            ],
          },
        ];

      case 'ADMIN':
        return [
          {
            groupTitle: 'Operations & Management',
            items: [
              { label: 'Admin Dashboard', path: '/admin', icon: LayoutDashboard },
              { label: 'User Directory', path: '/admin/users', icon: Users },
              { label: 'Menu CRUD', path: '/admin/menu', icon: UtensilsCrossed },
              { label: 'Order Dispatch', path: '/admin/orders', icon: ClipboardList },
              { label: 'Stock & Inventory', path: '/staff/inventory', icon: FileSpreadsheet },
            ],
          },
        ];

      case 'OWNER':
        return [
          {
            groupTitle: 'Executive Intelligence',
            items: [
              { label: 'Executive Overview', path: '/owner', icon: LayoutDashboard },
              { label: 'Real-Time Sales Feed', path: '/owner/real-time', icon: Flame, badge: 'Live' },
              { label: 'Sales & Profit Analytics', path: '/owner/sales-analytics', icon: BarChart3 },
              { label: 'Menu & Category BI', path: '/owner/dishes', icon: UtensilsCrossed },
              { label: 'Customers & Bookings', path: '/owner/customers-reservations', icon: Users },
              { label: 'AI Forecasting & Demand', path: '/owner/predictive-bi', icon: Brain, isAi: true },
              { label: 'Reports & Business Alerts', path: '/owner/reports', icon: FileSpreadsheet, badge: 'PDF' },
            ],
          },
          {
            groupTitle: 'Admin Operations Control',
            items: [
              { label: 'Admin Dashboard', path: '/admin', icon: TrendingUp },
              { label: 'Menu Management', path: '/admin/menu', icon: UtensilsCrossed },
              { label: 'Order Dispatch Console', path: '/admin/orders', icon: ClipboardList },
              { label: 'User Directory & RBAC', path: '/admin/users', icon: Users },
              { label: 'Stock & Inventory Monitor', path: '/staff/inventory', icon: Layers },
              { label: 'Kitchen Kanban Queue', path: '/staff/kitchen', icon: Sparkles },
            ],
          },
        ];

      default:
        return [];
    }
  };

  const navGroups = getNavGroups();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="role-sidebar"
        className={`
          fixed lg:sticky top-0 lg:top-16 z-50 lg:z-30
          h-full lg:h-[calc(100vh-4rem)]
          ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
          w-72 max-w-[85vw]
          flex-shrink-0 flex flex-col border-r transition-all duration-300 ease-in-out
          ${isDarkMode ? 'bg-[#1A1A1A] border-white/10 text-white' : 'bg-white border-black/10 text-[#0F0F0F]'}
          ${isOpen ? 'translate-x-0 shadow-2xl lg:shadow-none' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Sidebar Header with Workspace Badge and Close Button for Mobile */}
        <div className="p-4 border-b border-inherit flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse flex-shrink-0" />
            <div className={`flex flex-col ${isCollapsed ? 'lg:hidden' : 'block'} truncate`}>
              <span className="text-[10px] uppercase tracking-wider font-semibold opacity-60">
                Workspace
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <RoleBadge role={role} size="sm" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Desktop Collapse Toggle */}
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className={`hidden lg:flex p-1.5 rounded-lg border transition-colors ${
                  isDarkMode
                    ? 'border-white/10 hover:bg-white/10 text-gray-300'
                    : 'border-black/10 hover:bg-black/5 text-gray-700'
                }`}
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed ? (
                  <PanelLeftOpen className="w-4 h-4 text-[#FF6B35]" />
                ) : (
                  <PanelLeftClose className="w-4 h-4" />
                )}
              </button>
            )}

            {/* Mobile Close Button */}
            <button
              onClick={handleClose}
              className={`lg:hidden p-1.5 rounded-lg border transition-colors ${
                isDarkMode
                  ? 'border-white/10 hover:bg-white/10 text-gray-300'
                  : 'border-black/10 hover:bg-black/5 text-gray-700'
              }`}
              title="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              {group.groupTitle && !isCollapsed && (
                <p className="px-3 text-[10px] uppercase font-bold tracking-wider opacity-50 mb-1.5 truncate">
                  {group.groupTitle}
                </p>
              )}
              {group.items.map((item) => {
                const isActive = currentPath === item.path;
                const Icon = item.icon;

                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      handleClose();
                    }}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center ${
                      isCollapsed ? 'lg:justify-center' : 'justify-between'
                    } px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                      isActive
                        ? 'bg-[#FF6B35] text-white shadow-md shadow-[#FF6B35]/25'
                        : isDarkMode
                        ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                        : 'text-gray-700 hover:bg-black/5 hover:text-black'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 flex-shrink-0 transition-colors ${
                          isActive
                            ? 'text-white'
                            : item.isAi
                            ? 'text-cyan-400'
                            : 'text-[#FF6B35] opacity-80 group-hover:opacity-100'
                        }`}
                      />
                      <span className={`truncate ${isCollapsed ? 'lg:hidden' : 'inline'}`}>
                        {item.label}
                      </span>
                    </div>

                    <div className={`flex items-center gap-1.5 ${isCollapsed ? 'lg:hidden' : 'flex'}`}>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {item.badge}
                        </span>
                      )}
                      {item.isAi && !isActive && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
                          AI
                        </span>
                      )}
                      <ChevronRight
                        className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${
                          isActive ? 'opacity-100 text-white' : ''
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Sidebar Footer: System Status */}
        <div
          className={`p-3.5 border-t border-inherit ${
            isDarkMode ? 'bg-[#151515]' : 'bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping flex-shrink-0" />
            <div className={`flex flex-col truncate ${isCollapsed ? 'lg:hidden' : 'block'}`}>
              <span className="text-[11px] font-bold truncate">SmartBite AI Cluster</span>
              <span className="text-[10px] opacity-60 truncate">Engine v4.2 • Active</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

