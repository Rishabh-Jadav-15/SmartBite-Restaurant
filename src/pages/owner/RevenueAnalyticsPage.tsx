import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { formatINR } from '../../utils/formatters';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  CreditCard,
  Smartphone,
  QrCode,
  DollarSign,
  Download,
  Calendar,
} from 'lucide-react';
import { DAILY_REVENUE_DATA } from '../../data/dummyData';

export const RevenueAnalyticsPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [selectedTimeline, setSelectedTimeline] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');

  const paymentBreakdown = [
    { method: 'UPI (GPay / PhonePe / Paytm)', share: '68%', revenue: 2543200, count: 5210, icon: Smartphone, color: 'text-[#FF6B35]' },
    { method: 'Credit & Debit Cards', share: '22%', revenue: 822800, count: 1140, icon: CreditCard, color: 'text-cyan-400' },
    { method: 'NetBanking (Corporate / Bulk)', share: '6%', revenue: 224400, count: 210, icon: QrCode, color: 'text-purple-400' },
    { method: 'Cash / Direct POS', share: '4%', revenue: 149600, count: 320, icon: DollarSign, color: 'text-green-400' },
  ];

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Revenue Stream & Channel Analytics</h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Detailed breakdown of payment rails, settlement logs, and transaction volume in INR (₹).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-black/10 dark:bg-white/10 p-1 rounded-xl text-xs font-bold">
            {(['7D', '30D', '90D', '1Y'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTimeline(t)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedTimeline === t ? 'bg-[#FF6B35] text-white shadow' : 'text-gray-400'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={() => alert('Exporting complete P&L CSV statement (₹ INR).')}
            className="p-2.5 rounded-xl border bg-black/5 dark:bg-white/5 hover:bg-black/10 transition-colors"
            title="Download Financial CSV"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Payment Gateway Distribution Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {paymentBreakdown.map((item, idx) => {
          const Icon = item.icon;
          return (
            <GlassCard key={idx} className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl bg-black/5 dark:bg-white/5 ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold">{item.share}</span>
              </div>
              <div>
                <p className="text-xl font-black">{formatINR(item.revenue, true)}</p>
                <h4 className="text-xs font-bold text-gray-400 mt-1">{item.method}</h4>
                <p className="text-[10px] text-gray-500 mt-0.5">{item.count.toLocaleString()} transactions</p>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Detailed Revenue Time-Series Chart */}
      <GlassCard className="p-6 space-y-4">
        <h3 className="font-bold text-base">Daily Settlement & Net Revenue Velocity (₹)</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DAILY_REVENUE_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="settleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D9FF" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00D9FF" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#333' : '#e5e7eb'} vertical={false} />
              <XAxis dataKey="day" stroke={isDarkMode ? '#888' : '#666'} fontSize={12} />
              <YAxis
                stroke={isDarkMode ? '#888' : '#666'}
                fontSize={11}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(val: number) => [formatINR(val), 'Net Settled']}
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1A1A1A' : '#ffffff',
                  borderColor: isDarkMode ? '#333' : '#e5e7eb',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#00D9FF" strokeWidth={3} fill="url(#settleGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};
