import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { formatINR } from '../../utils/formatters';
import {
  TrendingUp,
  DollarSign,
  Percent,
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  BarChart3,
  LineChart as LineIcon,
  Download,
  PieChart as PieIcon,
  Sparkles,
} from 'lucide-react';
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
  TIMEFRAME_SALES_DATA,
  MONTHLY_PROFIT_DATA,
  CATEGORY_SALES_DATA,
} from '../../data/dummyData';

export const SalesRevenuePage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { isDarkMode } = useTheme();
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month' | 'quarter' | 'year'>('month');
  const [activeMetric, setActiveMetric] = useState<'revenue' | 'profit' | 'orders'>('revenue');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const currentChartData = TIMEFRAME_SALES_DATA[timeframe];

  // Calculate totals and comparison deltas
  const totalRevenue = currentChartData.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalProfit = currentChartData.reduce((acc, curr) => acc + (curr.profit || 0), 0);
  const totalOrders = currentChartData.reduce((acc, curr) => acc + curr.orders, 0);
  const avgOrderValue = Math.round(totalRevenue / (totalOrders || 1));
  const netProfitMargin = ((totalProfit / (totalRevenue || 1)) * 100).toFixed(1);

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Feature #3, #4, #17 & #19 • Multi-Period Financial Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Sales, Revenue & Profit Analytics</h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Granular analysis by day, week, month, quarter & year with raw food COGS, EBITDA margins, and period-over-period variance.
          </p>
        </div>

        {/* Global Dashboard Filters (Feature #19) */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Timeframe selector (Feature #3) */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/20 border border-white/10">
            {(['day', 'week', 'month', 'quarter', 'year'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                  timeframe === tf
                    ? 'bg-[#FF6B35] text-white shadow'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate('/owner/reports')}
            className="px-3.5 py-1.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Statement</span>
          </button>
        </div>
      </div>

      {/* KPI Financial Snapshot Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Total Period Revenue</span>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-cyan-400">{formatINR(totalRevenue)}</p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+19.8% vs previous {timeframe}</span>
          </div>
        </GlassCard>

        <GlassCard className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Net EBITDA Profit</span>
            <Percent className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400">{formatINR(totalProfit)}</p>
          <p className="text-[11px] text-gray-400">Net Profit Margin: <span className="text-white font-bold">{netProfitMargin}%</span></p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Total Orders Fulfilled</span>
            <Layers className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-purple-400">{totalOrders.toLocaleString()}</p>
          <p className="text-[11px] text-gray-400">Avg Order Value: <span className="text-white font-bold">{formatINR(avgOrderValue)}</span></p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Raw Food COGS Ratio</span>
            <TrendingUp className="w-4 h-4 text-[#FF6B35]" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-[#FF6B35]">26.8%</p>
          <p className="text-[11px] text-gray-400">Target &lt; 30% • Farm Direct Grain</p>
        </GlassCard>
      </div>

      {/* Main Multi-Timeframe Chart */}
      <GlassCard className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold capitalize">
              {timeframe} Sales & Revenue Progression (Feature #3)
            </h2>
            <p className="text-xs text-gray-400">
              Tracking gross turnover, net profitability, and period-over-period comparative trajectory in INR (₹).
            </p>
          </div>

          <div className="flex items-center gap-2">
            {(['revenue', 'profit', 'orders'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setActiveMetric(m)}
                className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
                  activeMetric === m
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                    : isDarkMode
                    ? 'border-white/10 text-gray-400 hover:text-white'
                    : 'border-black/10 text-gray-600'
                }`}
              >
                {m === 'revenue' ? 'Revenue (₹)' : m === 'profit' ? 'Net Profit (₹)' : 'Order Volume'}
              </button>
            ))}
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#333' : '#e5e7eb'} vertical={false} />
              <XAxis dataKey="label" stroke={isDarkMode ? '#888' : '#666'} fontSize={11} tickLine={false} />
              <YAxis
                stroke={isDarkMode ? '#888' : '#666'}
                fontSize={11}
                tickFormatter={(val) => (activeMetric === 'orders' ? val : `₹${val >= 100000 ? (val / 100000).toFixed(1) + 'L' : val / 1000 + 'k'}`)}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                formatter={(val: number) => [
                  activeMetric === 'orders' ? val : formatINR(val),
                  activeMetric === 'revenue' ? 'Revenue' : activeMetric === 'profit' ? 'Net Profit' : 'Orders',
                ]}
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1A1A1A' : '#ffffff',
                  borderColor: isDarkMode ? '#333' : '#ddd',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              {activeMetric === 'revenue' && (
                <>
                  <Bar dataKey="revenue" fill="#00D9FF" radius={[6, 6, 0, 0]} name="Current Revenue" />
                  {'prevRevenue' in currentChartData[0] && (
                    <Bar dataKey="prevRevenue" fill="#6B7280" radius={[6, 6, 0, 0]} name="Previous Period" />
                  )}
                </>
              )}
              {activeMetric === 'profit' && (
                <Bar dataKey="profit" fill="#10B981" radius={[6, 6, 0, 0]} name="Net Operating Profit" />
              )}
              {activeMetric === 'orders' && (
                <Bar dataKey="orders" fill="#FF6B35" radius={[6, 6, 0, 0]} name="Order Count" />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Feature #17: Performance Comparison Matrix (Period-over-Period Variance Analysis) */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Period-over-Period Performance Comparison (Feature #17)</span>
            </h3>
            <p className="text-xs text-gray-400">
              Direct variance comparison between current operational cycle and historical benchmarks.
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
            Overall Growth Delta: +22.4%
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-white/10 text-gray-400' : 'border-black/10 text-gray-500'}`}>
                <th className="py-3 px-3 font-semibold">Operational Metric</th>
                <th className="py-3 px-3 font-semibold">Current Period</th>
                <th className="py-3 px-3 font-semibold">Previous Benchmark</th>
                <th className="py-3 px-3 font-semibold">Variance (Delta)</th>
                <th className="py-3 px-3 font-semibold">Growth Driver / Root Cause</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-inherit">
              <tr>
                <td className="py-3 px-3 font-bold">Gross Food Sales</td>
                <td className="py-3 px-3 font-mono font-bold text-cyan-400">{formatINR(3740000)}</td>
                <td className="py-3 px-3 font-mono text-gray-400">{formatINR(3050000)}</td>
                <td className="py-3 px-3 font-bold text-emerald-400 flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +22.6%
                </td>
                <td className="py-3 px-3 text-gray-400">AI Millet Khichdi + Kokum Refresher uptake</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold">Cost of Goods Sold (COGS)</td>
                <td className="py-3 px-3 font-mono text-[#FF6B35]">26.8% (₹10.02L)</td>
                <td className="py-3 px-3 font-mono text-gray-400">29.4% (₹8.96L)</td>
                <td className="py-3 px-3 font-bold text-emerald-400 flex items-center gap-1">
                  <ArrowDownRight className="w-3.5 h-3.5" /> -2.6% (Optimized)
                </td>
                <td className="py-3 px-3 text-gray-400">Direct organic millet farmer consortium pricing</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold">Average Order Value (AOV)</td>
                <td className="py-3 px-3 font-mono font-bold text-purple-400">{formatINR(748)}</td>
                <td className="py-3 px-3 font-mono text-gray-400">{formatINR(664)}</td>
                <td className="py-3 px-3 font-bold text-emerald-400 flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +12.6%
                </td>
                <td className="py-3 px-3 text-gray-400">Automated Smart AI Combo suggestions at cart</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold">Labor & Kitchen Overhead</td>
                <td className="py-3 px-3 font-mono text-gray-300">18.2% (₹6.80L)</td>
                <td className="py-3 px-3 font-mono text-gray-400">19.5% (₹5.94L)</td>
                <td className="py-3 px-3 font-bold text-emerald-400 flex items-center gap-1">
                  <ArrowDownRight className="w-3.5 h-3.5" /> -1.3% Efficiency
                </td>
                <td className="py-3 px-3 text-gray-400">Kitchen Live Kanban bottleneck reduction</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold">EBITDA Net Margin</td>
                <td className="py-3 px-3 font-mono font-bold text-emerald-400">32.6% (₹12.20L)</td>
                <td className="py-3 px-3 font-mono text-gray-400">28.0% (₹8.54L)</td>
                <td className="py-3 px-3 font-bold text-emerald-400 flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +4.6% Margin Expansion
                </td>
                <td className="py-3 px-3 text-gray-400">Higher high-margin beverage & appetizer mix</td>
              </tr>
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Feature #4: Cost Structure Breakdown (Expenses vs Margins) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6 space-y-4">
          <h3 className="font-bold text-base">Expense & Financial Cost Breakdown</h3>
          <p className="text-xs text-gray-400">Distribution of monthly operational expenses (₹25.20 Lakhs total).</p>
          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-300 font-semibold">Raw Food COGS (Millets, Dairy, Spices)</span>
                <span className="font-bold text-cyan-400">39.8% ({formatINR(1002000)})</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: '39.8%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-300 font-semibold">Kitchen Staff & Admin Payroll</span>
                <span className="font-bold text-purple-400">27.0% ({formatINR(680000)})</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="bg-purple-400 h-full rounded-full" style={{ width: '27%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-300 font-semibold">Indiranagar Prime Lease & Utilities</span>
                <span className="font-bold text-amber-400">19.8% ({formatINR(500000)})</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '19.8%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-300 font-semibold">Marketing, AI Cloud & Delivery Logistics</span>
                <span className="font-bold text-emerald-400">13.4% ({formatINR(338000)})</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '13.4%' }} />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* 5-Month Revenue vs Expense Trend Area Chart */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="font-bold text-base">5-Month EBITDA Trajectory</h3>
          <p className="text-xs text-gray-400">Steady revenue growth and expanding net profit margin.</p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_PROFIT_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#333' : '#e5e7eb'} vertical={false} />
                <XAxis dataKey="month" stroke={isDarkMode ? '#888' : '#666'} fontSize={11} tickLine={false} />
                <YAxis
                  stroke={isDarkMode ? '#888' : '#666'}
                  fontSize={11}
                  tickFormatter={(val) => `₹${val / 100000}L`}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(val: number) => [formatINR(val)]}
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1A1A1A' : '#ffffff',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} fill="url(#profitGrad)" name="Net Profit" />
                <Line type="monotone" dataKey="revenue" stroke="#00D9FF" strokeWidth={2} dot={{ r: 3 }} name="Gross Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
