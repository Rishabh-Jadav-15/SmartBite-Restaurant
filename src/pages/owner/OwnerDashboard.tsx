import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { formatINR } from '../../utils/formatters';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import {
  TrendingUp,
  Crown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  DollarSign,
  PieChart as PieIcon,
  Percent,
  Activity,
  Users,
  CalendarDays,
  UtensilsCrossed,
  FileText,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Zap,
  Layers,
  ChevronRight,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import {
  MONTHLY_PROFIT_DATA,
  PREDICTIVE_SALES_FORECAST,
  BUSINESS_ALERTS_DATA,
  DISH_PERFORMANCE_DATA,
  CATEGORY_PERFORMANCE_DATA,
} from '../../data/dummyData';

export const OwnerDashboard: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { isDarkMode } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'quarter' | 'year'>('month');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  const activeAlerts = BUSINESS_ALERTS_DATA.filter((a) => !dismissedAlerts.includes(a.id));

  return (
    <div className="space-y-8 pb-16">
      {/* Executive Command Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500/20 to-[#FF6B35]/20 text-amber-300 border border-amber-500/30 mb-2">
            <Crown className="w-3.5 h-3.5" />
            <span>Executive Business Intelligence • Master 20-Point Suite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Executive Business Command Hub</h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Holistic oversight of revenue, orders, reservations, profit margins, AI diagnostics, and full administrative operations.
          </p>
        </div>

        {/* Global Filter Bar (Feature #19) */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Branch selector */}
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className={`px-3 py-2 text-xs font-bold rounded-xl border outline-none cursor-pointer ${
              isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-white border-black/10 text-gray-800'
            }`}
          >
            <option value="all">All Outlets (Bengaluru & Mumbai)</option>
            <option value="indiranagar">Indiranagar Flagship</option>
            <option value="koramangala">Koramangala Kitchen</option>
            <option value="bandra">Bandra West Hub</option>
          </select>

          {/* Timeframe selector */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/20 border border-white/10">
            {(['today', 'week', 'month', 'quarter', 'year'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                  selectedPeriod === p
                    ? 'bg-[#FF6B35] text-white shadow'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate('/owner/reports')}
            className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate PDF Audit</span>
          </button>
        </div>
      </div>

      {/* Feature #20: Active Business Alerts Strip */}
      {activeAlerts.length > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-red-500/15 via-amber-500/10 to-transparent border border-red-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-500/20 text-red-400 flex-shrink-0 animate-pulse">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  Active Priority Alert ({activeAlerts[0].severity})
                </span>
                <span className="text-[10px] text-gray-400 font-mono">{activeAlerts[0].timestamp}</span>
              </div>
              <p className="text-xs font-bold text-white mt-0.5">{activeAlerts[0].title}</p>
              <p className="text-[11px] text-gray-300 max-w-2xl">{activeAlerts[0].description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => navigate(activeAlerts[0].actionPath)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#FF6B35] hover:bg-[#FFA366] text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>{activeAlerts[0].actionLabel}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('/owner/reports')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border border-white/10 hover:bg-white/10 text-gray-300 transition-colors cursor-pointer"
            >
              View All ({activeAlerts.length})
            </button>
          </div>
        </div>
      )}

      {/* Feature #1: Overall Business Overview KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Revenue */}
        <GlassCard
          className="p-5 space-y-1 cursor-pointer hover:border-cyan-500/50 transition-all"
          onClick={() => navigate('/owner/sales-analytics')}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Total Monthly Revenue</span>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-cyan-400">{formatINR(3740000)}</p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+22.4% YoY • ₹37.40 Lakhs</span>
          </div>
        </GlassCard>

        {/* Net Profit & EBITDA */}
        <GlassCard
          className="p-5 space-y-1 cursor-pointer hover:border-emerald-500/50 transition-all"
          onClick={() => navigate('/owner/sales-analytics')}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Net Operating Profit</span>
            <Percent className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400">{formatINR(1220000)}</p>
          <p className="text-[11px] text-gray-400">EBITDA Margin: <span className="text-white font-bold">32.6%</span> (+4.6%)</p>
        </GlassCard>

        {/* Orders & AOV */}
        <GlassCard
          className="p-5 space-y-1 cursor-pointer hover:border-purple-500/50 transition-all"
          onClick={() => navigate('/owner/real-time')}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Monthly Orders</span>
            <Layers className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-purple-400">5,000</p>
          <p className="text-[11px] text-gray-400">Avg Order Value: <span className="text-white font-bold">{formatINR(748)}</span></p>
        </GlassCard>

        {/* Patrons & Reservations */}
        <GlassCard
          className="p-5 space-y-1 cursor-pointer hover:border-[#FF6B35]/50 transition-all"
          onClick={() => navigate('/owner/customers-reservations')}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Active Patrons & Tables</span>
            <Users className="w-4 h-4 text-[#FF6B35]" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-[#FF6B35]">3,760</p>
          <p className="text-[11px] text-gray-400">Table Occupancy: <span className="text-white font-bold">86.4%</span></p>
        </GlassCard>
      </div>

      {/* Feature #2 & #17 Quick Action Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Real-Time Live Sales Quick Strip */}
        <GlassCard
          className="p-5 flex items-center justify-between cursor-pointer hover:border-[#FF6B35]/50 transition-all"
          onClick={() => navigate('/owner/real-time')}
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-[#FF6B35]/20 text-[#FF6B35] relative">
              <Activity className="w-6 h-6 animate-pulse" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF6B35] animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">Feature #2: Real-Time Sales Feed</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-400">
                  LIVE STREAM
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Live ticker: <strong className="text-white">₹1,42,850 today</strong> • 14 active orders
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </GlassCard>

        {/* AI Predictive Growth Strip */}
        <GlassCard
          className="p-5 flex items-center justify-between cursor-pointer hover:border-purple-500/50 transition-all"
          onClick={() => navigate('/owner/predictive-bi')}
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">Feature #9, #10, #11: AI Insights & Forecasting</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-500/20 text-purple-300">
                  97.8% CONFIDENCE
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Next quarter projected intake: <strong className="text-white">₹47.8 Lakhs</strong>
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </GlassCard>
      </div>

      {/* Feature #4 & #3: Monthly Financial Breakdown */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-base">Monthly Financial Breakdown: Revenue vs. Net Profit (₹)</h3>
            <p className="text-xs text-gray-400">Historical performance in Indian Rupees with 32.6% operating margin</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-cyan-500" /> Revenue (₹)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#FF6B35]" /> Expenses (₹)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Net Profit (₹)</span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MONTHLY_PROFIT_DATA} margin={{ top: 15, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#333' : '#e5e7eb'} vertical={false} />
              <XAxis dataKey="month" stroke={isDarkMode ? '#888' : '#666'} fontSize={12} tickLine={false} />
              <YAxis
                stroke={isDarkMode ? '#888' : '#666'}
                fontSize={11}
                tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`}
                tickLine={false}
              />
              <Tooltip
                formatter={(val: number) => [formatINR(val, true), '']}
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1A1A1A' : '#ffffff',
                  borderColor: isDarkMode ? '#333' : '#e5e7eb',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="revenue" fill="#00D9FF" radius={[6, 6, 0, 0]} name="Gross Revenue" />
              <Bar dataKey="expenses" fill="#FF6B35" radius={[6, 6, 0, 0]} name="Operating Costs" />
              <Bar dataKey="profit" fill="#22C55E" radius={[6, 6, 0, 0]} name="Net Profit" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Feature #5 & #6: Quick Menu & Category Champions Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Dishes */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-[#FF6B35]" />
              <span>Top Best-Selling & Margin Champions</span>
            </h3>
            <button
              onClick={() => navigate('/owner/dishes')}
              className="text-xs font-bold text-[#FF6B35] hover:underline"
            >
              Full Menu Matrix →
            </button>
          </div>

          <div className="space-y-2.5">
            {DISH_PERFORMANCE_DATA.slice(0, 4).map((d) => (
              <div
                key={d.id}
                className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                  isDarkMode ? 'bg-[#242424] border-white/5' : 'bg-gray-50 border-black/5'
                }`}
              >
                <div>
                  <p className="font-bold text-white truncate max-w-[200px]">{d.name}</p>
                  <p className="text-[10px] text-gray-400">{d.category} • {d.unitsSold} units sold</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-cyan-400">{formatINR(d.revenue)}</span>
                  <span className="block text-[10px] text-emerald-400 font-bold">{d.marginPercent}% margin</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Category Share */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-cyan-400" />
              <span>Category Revenue & Growth Split</span>
            </h3>
            <button
              onClick={() => navigate('/owner/dishes')}
              className="text-xs font-bold text-cyan-400 hover:underline"
            >
              Category Details →
            </button>
          </div>

          <div className="space-y-2.5">
            {CATEGORY_PERFORMANCE_DATA.map((c) => (
              <div
                key={c.category}
                className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                  isDarkMode ? 'bg-[#242424] border-white/5' : 'bg-gray-50 border-black/5'
                }`}
              >
                <div>
                  <p className="font-bold text-white">{c.category}</p>
                  <p className="text-[10px] text-gray-400">Top Dish: {c.topItem}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-white">{formatINR(c.revenue)}</span>
                  <span className="block text-[10px] text-emerald-400 font-bold">+{c.growthYoY}% YoY</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Complete Owner Access to Admin Features Section */}
      <GlassCard className="p-6 space-y-4 border-amber-500/20">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Unrestricted Master Access</span>
            </div>
            <h3 className="text-lg font-bold">Admin Management & Operational Controls</h3>
            <p className="text-xs text-gray-400">
              As the Owner, you possess unrestricted administrative rights across menu creation, order dispatching, user directories, and inventory.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <button
            onClick={() => navigate('/admin/menu')}
            className={`p-4 rounded-xl border text-left transition-all hover:scale-105 cursor-pointer ${
              isDarkMode ? 'bg-[#242424] border-white/10 hover:border-[#FF6B35]' : 'bg-gray-50 border-black/10'
            }`}
          >
            <UtensilsCrossed className="w-5 h-5 text-[#FF6B35] mb-2" />
            <h4 className="font-bold text-xs text-white">Menu Master</h4>
            <p className="text-[11px] text-gray-400 mt-1">Add, edit, price dishes & recipes</p>
          </button>

          <button
            onClick={() => navigate('/admin/orders')}
            className={`p-4 rounded-xl border text-left transition-all hover:scale-105 cursor-pointer ${
              isDarkMode ? 'bg-[#242424] border-white/10 hover:border-cyan-400' : 'bg-gray-50 border-black/10'
            }`}
          >
            <Layers className="w-5 h-5 text-cyan-400 mb-2" />
            <h4 className="font-bold text-xs text-white">Order Dispatch</h4>
            <p className="text-[11px] text-gray-400 mt-1">Live POS orders & statuses</p>
          </button>

          <button
            onClick={() => navigate('/admin/users')}
            className={`p-4 rounded-xl border text-left transition-all hover:scale-105 cursor-pointer ${
              isDarkMode ? 'bg-[#242424] border-white/10 hover:border-purple-400' : 'bg-gray-50 border-black/10'
            }`}
          >
            <Users className="w-5 h-5 text-purple-400 mb-2" />
            <h4 className="font-bold text-xs text-white">User Directory</h4>
            <p className="text-[11px] text-gray-400 mt-1">Staff RBAC & patron profiles</p>
          </button>

          <button
            onClick={() => navigate('/staff/inventory')}
            className={`p-4 rounded-xl border text-left transition-all hover:scale-105 cursor-pointer ${
              isDarkMode ? 'bg-[#242424] border-white/10 hover:border-emerald-400' : 'bg-gray-50 border-black/10'
            }`}
          >
            <Building2 className="w-5 h-5 text-emerald-400 mb-2" />
            <h4 className="font-bold text-xs text-white">Stock & Inventory</h4>
            <p className="text-[11px] text-gray-400 mt-1">Raw grains, spices & reorders</p>
          </button>
        </div>
      </GlassCard>
    </div>
  );
};
