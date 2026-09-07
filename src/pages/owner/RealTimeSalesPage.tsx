import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { formatINR } from '../../utils/formatters';
import {
  Activity,
  Flame,
  Clock,
  ShoppingBag,
  TrendingUp,
  RefreshCw,
  Zap,
  Users,
  CheckCircle2,
  AlertCircle,
  Truck,
  Utensils,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from 'lucide-react';
import {
  AreaChart,
  Area,
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { PEAK_HOURS_DATA, INITIAL_ORDERS } from '../../data/dummyData';
import { Order } from '../../types';

export const RealTimeSalesPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { isDarkMode } = useTheme();
  const [liveRevenue, setLiveRevenue] = useState<number>(142850);
  const [activeOrdersCount, setActiveOrdersCount] = useState<number>(14);
  const [todayOrders, setTodayOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isLiveSimulating, setIsLiveSimulating] = useState<boolean>(true);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');
  const [selectedChannel, setSelectedChannel] = useState<'ALL' | 'DINE_IN' | 'DELIVERY' | 'TAKEAWAY'>('ALL');

  // Real-time live simulation ticker
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      const randomIncrement = Math.floor(Math.random() * 450) + 120;
      setLiveRevenue((prev) => prev + randomIncrement);
      setLastRefreshed('Few seconds ago');
    }, 4000);

    return () => clearInterval(interval);
  }, [isLiveSimulating]);

  const channelDistribution = [
    { name: 'Dine-In Tables', value: 58, revenue: 82800, color: '#FF6B35' },
    { name: 'App Delivery', value: 28, revenue: 39900, color: '#00D9FF' },
    { name: 'Express Takeaway', value: 14, revenue: 20150, color: '#10B981' },
  ];

  const filteredPeakData = PEAK_HOURS_DATA.map((item) => ({
    ...item,
    displayRevenue:
      selectedChannel === 'ALL'
        ? item.revenue
        : selectedChannel === 'DINE_IN'
        ? Math.round(item.revenue * (item.dineInShare / 100))
        : Math.round(item.revenue * (item.deliveryShare / 100)),
  }));

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Live Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#FF6B35]/15 text-[#FF6B35] border border-[#FF6B35]/30 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-ping" />
            <span>Feature #2, #13 & #18 • Live Operations Stream</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Real-Time Sales & Order Analytics</h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Live streaming revenue ticker, order completion velocity, channel distributions, and peak-time load analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLiveSimulating(!isLiveSimulating)}
            className={`px-4 py-2 text-xs font-bold rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
              isLiveSimulating
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                : isDarkMode
                ? 'bg-[#242424] border-white/10 text-gray-400'
                : 'bg-gray-100 border-black/10 text-gray-700'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${isLiveSimulating ? 'text-emerald-400 animate-pulse' : ''}`} />
            <span>{isLiveSimulating ? 'Live Feed Active' : 'Simulation Paused'}</span>
          </button>

          <button
            onClick={() => {
              setLiveRevenue((prev) => prev + 340);
              setLastRefreshed('Just now');
            }}
            className="p-2 rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
            title="Force refresh"
          >
            <RefreshCw className="w-4 h-4 text-[#FF6B35]" />
          </button>
        </div>
      </div>

      {/* Live Operational Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF6B35]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400">Today's Live Gross Sales</span>
            <Activity className="w-4 h-4 text-[#FF6B35] animate-pulse" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-[#FF6B35] tracking-tight">
            {formatINR(liveRevenue)}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% vs same hour last week</span>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400">Live Active Orders</span>
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-cyan-400">{activeOrdersCount}</p>
          <p className="text-[11px] text-gray-400 mt-2">8 in Kitchen • 4 Out for Delivery • 2 Seated</p>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400">Avg Order Value (Live)</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-purple-400">{formatINR(762)}</p>
          <div className="flex items-center gap-1 mt-2 text-[11px] text-emerald-400">
            <span>+₹94 above baseline target</span>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400">Kitchen Prep Velocity</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400">14.2 min</p>
          <p className="text-[11px] text-gray-400 mt-2">Target &lt; 18 min • 98.4% On-Time</p>
        </GlassCard>
      </div>

      {/* Hourly Sales Stream & Channel Filter Bar */}
      <GlassCard className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-inherit">
          <div>
            <h2 className="text-lg font-bold">Today's Hourly Revenue & Order Velocity</h2>
            <p className="text-xs text-gray-400">
              Live progression of gross sales throughout today's service window (11:00 AM - 10:00 PM).
            </p>
          </div>

          {/* Channel Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/20 border border-white/10 self-start sm:self-auto">
            {(['ALL', 'DINE_IN', 'DELIVERY'] as const).map((channel) => (
              <button
                key={channel}
                onClick={() => setSelectedChannel(channel)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedChannel === channel
                    ? 'bg-[#FF6B35] text-white shadow'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {channel === 'ALL' ? 'All Channels' : channel === 'DINE_IN' ? 'Dine-In Tables' : 'Online Delivery'}
              </button>
            ))}
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredPeakData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="liveRevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#FF6B35" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#333' : '#e5e7eb'} vertical={false} />
              <XAxis dataKey="hour" stroke={isDarkMode ? '#888' : '#666'} fontSize={11} tickLine={false} />
              <YAxis
                stroke={isDarkMode ? '#888' : '#666'}
                fontSize={11}
                tickFormatter={(val) => `₹${val / 1000}k`}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                formatter={(val: number) => [formatINR(val), 'Hourly Revenue']}
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1A1A1A' : '#ffffff',
                  borderColor: isDarkMode ? '#333' : '#ddd',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="displayRevenue"
                stroke="#FF6B35"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#liveRevGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Dual Section: Channel Breakdown & Peak-Time Kitchen Stress Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Channel Breakdown */}
        <GlassCard className="lg:col-span-5 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base">Channel Revenue Share</h3>
            <span className="text-xs text-gray-400">Today's Split</span>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {channelDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number, name: string) => [`${val}% (${formatINR(channelDistribution.find((c) => c.name === name)?.revenue || 0)})`, name]}
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1A1A1A' : '#ffffff',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-inherit">
            {channelDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <div className="font-bold">
                  <span>{formatINR(item.revenue)}</span>
                  <span className="text-gray-400 ml-1.5">({item.value}%)</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Peak-Time Analysis (Feature #18) */}
        <GlassCard className="lg:col-span-7 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#FF6B35]" />
                <span>Peak-Time Load & Stress Index (Feature #18)</span>
              </h3>
              <p className="text-xs text-gray-400">
                Identifies high-demand rush hours, table occupancy %, and kitchen stress score.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 font-bold border border-red-500/30">
              Peak: 8:00 PM - 9:00 PM
            </span>
          </div>

          <div className="space-y-2.5">
            {PEAK_HOURS_DATA.slice(0, 6).map((slot) => {
              const isPeak = slot.kitchenStressIndex > 80;
              return (
                <div
                  key={slot.hour}
                  className={`p-3 rounded-xl border transition-all ${
                    isPeak
                      ? isDarkMode
                        ? 'bg-red-500/10 border-red-500/30'
                        : 'bg-red-50 border-red-200'
                      : isDarkMode
                      ? 'bg-[#242424] border-white/5'
                      : 'bg-gray-50 border-black/5'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2 font-bold">
                      <span>{slot.hour}</span>
                      {isPeak && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-red-500 text-white uppercase">
                          Peak Surge
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-gray-400">
                      <span>{slot.orderCount} Orders</span>
                      <span className="font-bold text-white">{formatINR(slot.revenue)}</span>
                    </div>
                  </div>

                  {/* Progress Bar for Stress & Table Occupancy */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                        <span>Table Occupancy</span>
                        <span>{slot.tableOccupancy}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-cyan-400 h-full rounded-full"
                          style={{ width: `${slot.tableOccupancy}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                        <span>Kitchen Stress Index</span>
                        <span className={isPeak ? 'text-red-400 font-bold' : ''}>
                          {slot.kitchenStressIndex}/100
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            slot.kitchenStressIndex > 80
                              ? 'bg-red-500'
                              : slot.kitchenStressIndex > 50
                              ? 'bg-[#FF6B35]'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${slot.kitchenStressIndex}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* Live Incoming Orders Ticker Feed */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base">Live Incoming Orders Stream</h3>
            <p className="text-xs text-gray-400">
              Live orders being dispatched, prepared, or delivered across all stations.
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/orders')}
            className="text-xs font-bold text-[#FF6B35] hover:underline flex items-center gap-1"
          >
            <span>Open Order Dispatch Console</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {todayOrders.map((ord) => (
            <div
              key={ord.id}
              className={`p-4 rounded-xl border space-y-2.5 transition-all ${
                isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#FF6B35]">{ord.orderNumber}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    ord.status === 'PREPARING'
                      ? 'bg-amber-500/20 text-amber-400'
                      : ord.status === 'READY'
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : ord.status === 'OUT_FOR_DELIVERY'
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  {ord.status.replace('_', ' ')}
                </span>
              </div>

              <div>
                <p className="text-xs font-bold truncate">{ord.customerName}</p>
                <p className="text-[11px] text-gray-400">{ord.orderType} • {ord.items.length} items</p>
              </div>

              <div className="pt-2 border-t border-inherit flex items-center justify-between text-xs">
                <span className="text-gray-400 font-mono text-[11px]">{ord.paymentMethod.split(' ')[0]}</span>
                <span className="font-bold text-white">{formatINR(ord.total)}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
