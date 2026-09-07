import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { formatINR } from '../../utils/formatters';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  Users,
  UtensilsCrossed,
  ShoppingBag,
  TrendingUp,
  Flame,
  ShieldCheck,
  Award,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import { DAILY_REVENUE_DATA, CATEGORY_SALES_DATA } from '../../data/dummyData';

export const AdminDashboard: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { orders, menuItems } = useAuth();
  const { isDarkMode, colors } = useTheme();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'CANCELLED' ? o.total : 0), 0);
  const activeOrdersCount = orders.filter((o) => o.status !== 'DELIVERED' && o.status !== 'CANCELLED').length;
  const topDishes = menuItems.slice(0, 4);

  const pieColors = ['#FF6B35', '#00D9FF', '#22C55E', '#F59E0B', '#8B5CF6'];

  return (
    <div className="space-y-8 pb-16">
      {/* Admin Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-red-500/15 text-red-400 border border-red-500/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Operational Administration Level 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Restaurant Management Dashboard</h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Comprehensive control of menus, active orders, personnel, and Indian financial analytics in ₹.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/menu')}
            className="px-4 py-2.5 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-xl shadow cursor-pointer transition-all flex items-center gap-2"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Manage Menu CRUD</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Total System Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400">{formatINR(totalRevenue + 184500, true)}</p>
          <p className="text-[11px] text-gray-400">+14.8% vs last week (INR)</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Active Live Tickets</span>
            <ShoppingBag className="w-4 h-4 text-[#FF6B35]" />
          </div>
          <p className="text-2xl font-black text-[#FF6B35]">{activeOrdersCount}</p>
          <p className="text-[11px] text-gray-400">In KDS pipeline</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Catalogued Dishes</span>
            <UtensilsCrossed className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-black text-cyan-400">{menuItems.length} SKUs</p>
          <p className="text-[11px] text-gray-400">100% Macro calibrated</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Registered Patrons</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-black text-purple-400">3,480 Diners</p>
          <p className="text-[11px] text-gray-400">Bangalore branch</p>
        </GlassCard>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Area Chart */}
        <GlassCard className="lg:col-span-2 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base">Weekly Revenue Velocity (₹)</h3>
              <p className="text-xs text-gray-400">Total gross intake across Dine-in & Online delivery</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#FF6B35] bg-[#FF6B35]/15 px-2.5 py-1 rounded-lg">
              INR (₹) Standard
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DAILY_REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FF6B35" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#333' : '#e5e7eb'} vertical={false} />
                <XAxis dataKey="day" stroke={isDarkMode ? '#888' : '#666'} fontSize={12} tickLine={false} />
                <YAxis
                  stroke={isDarkMode ? '#888' : '#666'}
                  fontSize={11}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(val: number) => [formatINR(val), 'Revenue']}
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1A1A1A' : '#ffffff',
                    borderColor: isDarkMode ? '#333' : '#e5e7eb',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#FF6B35" strokeWidth={3} fillOpacity={1} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Category Share Donut */}
        <GlassCard className="p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base">Category Revenue Split</h3>
            <p className="text-xs text-gray-400">Share of revenue by menu category</p>
          </div>

          <div className="h-56 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_SALES_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="sales"
                >
                  {CATEGORY_SALES_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => [`${val}%`, 'Share']}
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1A1A1A' : '#ffffff',
                    borderColor: isDarkMode ? '#333' : '#e5e7eb',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-inherit">
            {CATEGORY_SALES_DATA.map((cat, i) => (
              <div key={cat.category} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pieColors[i] }} />
                <span className="truncate">{cat.category} ({cat.sales}%)</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Top Velocity Dishes & Quick Order Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Velocity Dishes */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base">Top Performing Dishes</h3>
            <button
              onClick={() => navigate('/admin/menu')}
              className="text-xs font-bold text-[#FF6B35] hover:underline"
            >
              Full Menu List
            </button>
          </div>

          <div className="space-y-3">
            {topDishes.map((dish) => (
              <div
                key={dish.id}
                className={`p-3 rounded-xl border flex items-center justify-between ${
                  isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img src={dish.image} alt={dish.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-bold text-xs">{dish.name}</h4>
                    <p className="text-[11px] text-gray-400">{dish.category} • Rating: {dish.rating} ★</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-xs text-[#FF6B35]">{formatINR(dish.price)}</span>
                  <p className="text-[10px] text-emerald-400">Score {dish.healthScore}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Quick Admin Actions */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="font-bold text-base">Administrative Fast Actions</h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <button
              onClick={() => navigate('/admin/menu')}
              className="p-4 rounded-xl border text-left bg-black/5 dark:bg-white/5 border-inherit hover:border-[#FF6B35] transition-colors"
            >
              <UtensilsCrossed className="w-5 h-5 text-[#FF6B35] mb-2" />
              <span className="font-bold block">Add New Dish SKU</span>
              <span className="text-[11px] opacity-70">Define macros & pricing in ₹</span>
            </button>

            <button
              onClick={() => navigate('/admin/orders')}
              className="p-4 rounded-xl border text-left bg-black/5 dark:bg-white/5 border-inherit hover:border-cyan-500 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-cyan-400 mb-2" />
              <span className="font-bold block">Audit Order Logs</span>
              <span className="text-[11px] opacity-70">Status overrides & invoices</span>
            </button>

            <button
              onClick={() => navigate('/admin/users')}
              className="p-4 rounded-xl border text-left bg-black/5 dark:bg-white/5 border-inherit hover:border-purple-500 transition-colors"
            >
              <Users className="w-5 h-5 text-purple-400 mb-2" />
              <span className="font-bold block">Manage Staff Roles</span>
              <span className="text-[11px] opacity-70">Assign RBAC permissions</span>
            </button>

            <button
              onClick={() => navigate('/staff/inventory')}
              className="p-4 rounded-xl border text-left bg-black/5 dark:bg-white/5 border-inherit hover:border-amber-500 transition-colors"
            >
              <Award className="w-5 h-5 text-amber-400 mb-2" />
              <span className="font-bold block">Raw Stock Purchase</span>
              <span className="text-[11px] opacity-70">Order spices & millets</span>
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
