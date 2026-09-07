import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { formatINR } from '../../utils/formatters';
import {
  Users,
  CalendarDays,
  UserCheck,
  UserPlus,
  Heart,
  TrendingUp,
  Clock,
  Sparkles,
  ShieldAlert,
  Smile,
  Brain,
  CheckCircle2,
  PhoneCall,
  Calendar,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  CUSTOMER_INSIGHT_SEGMENTS,
  INITIAL_RESERVATIONS,
} from '../../data/dummyData';
import { CustomerInsightSegment } from '../../types';

export const CustomerReservationAnalyticsPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { isDarkMode } = useTheme();
  const [selectedCohort, setSelectedCohort] = useState<string>('all');

  const customerRetentionData = [
    { name: 'Returning Loyalists (>3 orders)', value: 76.3, count: 2870, color: '#10B981' },
    { name: 'First-Time New Diners', value: 23.7, count: 890, color: '#00D9FF' },
  ];

  const reservationTimelineData = [
    { slot: '12:00 PM', bookings: 12, covers: 34, occupancy: 42 },
    { slot: '01:00 PM', bookings: 28, covers: 86, occupancy: 96 },
    { slot: '02:00 PM', bookings: 18, covers: 52, occupancy: 70 },
    { slot: '07:00 PM', bookings: 24, covers: 74, occupancy: 88 },
    { slot: '08:00 PM', bookings: 32, covers: 98, occupancy: 100 },
    { slot: '09:00 PM', bookings: 26, covers: 78, occupancy: 92 },
    { slot: '10:00 PM', bookings: 8, covers: 22, occupancy: 32 },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30 mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Feature #7, #8 & #12 • Patron Behavioral & Booking Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Customer Analytics, AI Insights & Reservations</h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Cohort analysis, CLV models, AI behavioral persona clusters, table utilization % and reservation peak demand.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/admin/users')}
            className="px-3.5 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>User Directory</span>
          </button>
          <button
            onClick={() => navigate('/staff/reservations')}
            className="px-3.5 py-2 rounded-xl bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Live Table Master</span>
          </button>
        </div>
      </div>

      {/* High-Level Patron KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Total Active Patrons</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-cyan-400">3,760</p>
          <p className="text-[11px] text-emerald-400">+890 New Diners this month</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Customer Retention Rate</span>
            <UserCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400">76.3%</p>
          <p className="text-[11px] text-gray-400">Industry benchmark: 62%</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Avg Customer Lifetime Value</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-purple-400">{formatINR(34200)}</p>
          <p className="text-[11px] text-gray-400">Across 12-Month Rolling Window</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Table Utilization Rate</span>
            <CalendarDays className="w-4 h-4 text-[#FF6B35]" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-[#FF6B35]">86.4%</p>
          <p className="text-[11px] text-gray-400">No-show rate suppressed to 2.1%</p>
        </GlassCard>
      </div>

      {/* Feature #7 & #12 Dual Visualizer: Retention Split & Reservation Volume */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Retention Split */}
        <GlassCard className="lg:col-span-5 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base">New vs Returning Patrons (Feature #7)</h3>
            <span className="text-xs text-emerald-400 font-bold">76.3% Repeat</span>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerRetentionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {customerRetentionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number, name: string) => [
                    `${val}% (${customerRetentionData.find((c) => c.name === name)?.count} diners)`,
                    name,
                  ]}
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
            {customerRetentionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="truncate">{item.name}</span>
                </div>
                <div className="font-bold">
                  <span>{item.count}</span>
                  <span className="text-gray-400 ml-1">({item.value}%)</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Reservation Analytics (Feature #12) */}
        <GlassCard className="lg:col-span-7 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-base flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-[#FF6B35]" />
                <span>Reservation Peak Periods & Table Occupancy (Feature #12)</span>
              </h3>
              <p className="text-xs text-gray-400">
                Hourly covers, bookings, and table occupancy rate across dinner and lunch slots.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 font-bold border border-red-500/30">
              Peak: 8:00 PM (100% Full)
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reservationTimelineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#333' : '#e5e7eb'} vertical={false} />
                <XAxis dataKey="slot" stroke={isDarkMode ? '#888' : '#666'} fontSize={11} tickLine={false} />
                <YAxis
                  stroke={isDarkMode ? '#888' : '#666'}
                  fontSize={11}
                  tickFormatter={(val) => `${val}`}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(val: number, name: string) => [
                    name === 'occupancy' ? `${val}%` : val,
                    name === 'occupancy' ? 'Table Occupancy %' : name === 'covers' ? 'Total Guests (Covers)' : 'Bookings',
                  ]}
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1A1A1A' : '#ffffff',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="covers" fill="#FF6B35" radius={[6, 6, 0, 0]} name="Guest Covers" />
                <Bar dataKey="occupancy" fill="#00D9FF" radius={[6, 6, 0, 0]} name="Table Occupancy %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Feature #8: AI Customer Insights & Behavioral Persona Clustering */}
      <GlassCard className="p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 mb-1">
              <Brain className="w-3.5 h-3.5" />
              <span>AI Behavioral Persona Clustering (Feature #8)</span>
            </div>
            <h2 className="text-lg font-bold">Customer Behavioral Profiles & Spending Patterns</h2>
            <p className="text-xs text-gray-400">
              Unsupervised clustering of 3,760 diners based on dietary habits, order timings, ticket sizes, and re-order frequencies.
            </p>
          </div>

          <span className="text-xs px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 self-start sm:self-auto">
            AI Persona Accuracy: 94.2%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CUSTOMER_INSIGHT_SEGMENTS.map((seg) => (
            <div
              key={seg.id}
              className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition-all ${
                isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/10'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      seg.tag === 'High CLV'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : seg.tag === 'Weekend Spenders'
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : seg.tag === 'Protein Focused'
                        ? 'bg-[#FF6B35]/20 text-[#FF6B35] border border-[#FF6B35]/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {seg.tag}
                  </span>
                  <span className="text-xs font-bold text-gray-400">{seg.percentOfTotal}% of Diners</span>
                </div>

                <h3 className="font-bold text-sm text-white">{seg.segmentName}</h3>
                <p className="text-xs text-gray-400">{seg.customerCount.toLocaleString()} Diners</p>

                <p className="text-[11px] text-gray-300 bg-black/20 p-2.5 rounded-xl border border-white/5 leading-relaxed">
                  {seg.aiPersonaSummary}
                </p>
              </div>

              <div className="pt-3 border-t border-inherit space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Order Value:</span>
                  <span className="font-bold text-white font-mono">{formatINR(seg.avgOrderValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Order Frequency:</span>
                  <span className="font-bold text-white font-mono">{seg.ordersPerMonth}x / mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Est. Lifetime Value (CLV):</span>
                  <span className="font-bold text-cyan-400 font-mono">{formatINR(seg.clvEstimated)}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-gray-400">Retention Score:</span>
                  <span className="font-bold text-emerald-400">{seg.retentionRate}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
