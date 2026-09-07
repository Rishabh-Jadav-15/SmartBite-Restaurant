import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { formatINR } from '../../utils/formatters';
import {
  Sparkles,
  TrendingUp,
  Brain,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Clock,
  Flame,
  ShieldCheck,
  RefreshCw,
  Package,
  Calendar,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  PREDICTIVE_SALES_FORECAST,
  DEMAND_FORECAST_DISHES,
} from '../../data/dummyData';
import { DemandForecastDish } from '../../types';

export const AIPredictiveBI: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { isDarkMode } = useTheme();
  const [selectedHorizon, setSelectedHorizon] = useState<'7d' | '30d' | '90d'>('30d');
  const [isGeneratingGeminiInsight, setIsGeneratingGeminiInsight] = useState<boolean>(false);
  const [aiDiagnosticExpanded, setAiDiagnosticExpanded] = useState<boolean>(true);
  const [prepBatchConfirmed, setPrepBatchConfirmed] = useState<string[]>([]);

  // Simulation data based on horizon
  const forecastData =
    selectedHorizon === '7d'
      ? [
          { period: 'Day 1 (Mon)', actual: 145000, predicted: 148000, lowerBound: 140000, upperBound: 156000 },
          { period: 'Day 2 (Tue)', actual: 168000, predicted: 172000, lowerBound: 162000, upperBound: 182000 },
          { period: 'Day 3 (Wed)', actual: null, predicted: 195000, lowerBound: 184000, upperBound: 206000 },
          { period: 'Day 4 (Thu)', actual: null, predicted: 190000, lowerBound: 178000, upperBound: 202000 },
          { period: 'Day 5 (Fri)', actual: null, predicted: 285000, lowerBound: 268000, upperBound: 302000 },
          { period: 'Day 6 (Sat)', actual: null, predicted: 360000, lowerBound: 338000, upperBound: 382000 },
          { period: 'Day 7 (Sun)', actual: null, predicted: 420000, lowerBound: 395000, upperBound: 445000 },
        ]
      : selectedHorizon === '30d'
      ? [
          { period: 'Week 1', actual: 840000, predicted: 860000, lowerBound: 820000, upperBound: 900000 },
          { period: 'Week 2', actual: 890000, predicted: 910000, lowerBound: 870000, upperBound: 950000 },
          { period: 'Week 3', actual: null, predicted: 980000, lowerBound: 930000, upperBound: 1030000 },
          { period: 'Week 4', actual: null, predicted: 1080000, lowerBound: 1020000, upperBound: 1140000 },
        ]
      : [
          { period: 'Month 1 (Sep)', actual: null, predicted: 3950000, lowerBound: 3750000, upperBound: 4150000 },
          { period: 'Month 2 (Oct)', actual: null, predicted: 4400000, lowerBound: 4180000, upperBound: 4620000 },
          { period: 'Month 3 (Nov)', actual: null, predicted: 4900000, lowerBound: 4650000, upperBound: 5150000 },
        ];

  const handleConfirmPrep = (id: string) => {
    if (!prepBatchConfirmed.includes(id)) {
      setPrepBatchConfirmed([...prepBatchConfirmed, id]);
    }
  };

  const handleGenerateFreshAIInsight = () => {
    setIsGeneratingGeminiInsight(true);
    setTimeout(() => {
      setIsGeneratingGeminiInsight(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Feature #9, #10 & #11 • Gemini ML Forecasting & Diagnostic Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">AI Business Insights & Predictive Demand</h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Auto-generate root-cause business summaries, revenue forecasting with confidence intervals, and item-level kitchen prep targets.
          </p>
        </div>

        <button
          onClick={handleGenerateFreshAIInsight}
          disabled={isGeneratingGeminiInsight}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${isGeneratingGeminiInsight ? 'animate-spin' : ''}`} />
          <span>{isGeneratingGeminiInsight ? 'Analyzing Neural Patterns...' : 'Rerun AI Diagnostic'}</span>
        </button>
      </div>

      {/* Feature #9: AI Business Insights Narrative Card */}
      <GlassCard className="p-6 relative overflow-hidden border-purple-500/30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base">Gemini Neural Business Diagnostic (Feature #9)</h2>
              <p className="text-xs text-gray-400">Autonomous synthesis across POS, table reservations, and raw COGS indices.</p>
            </div>
          </div>

          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
            Model Confidence: 97.8%
          </span>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Executive Performance Narrative</span>
            </h3>
            <p className="text-xs text-gray-200 leading-relaxed">
              SmartBite AI is experiencing a sustained <strong className="text-emerald-400">+22.4% MoM acceleration</strong>, driven primarily by strong weekday lunch adoption among Whitefield tech professionals. The Ayurvedic Healthy Bowls category accounts for 38% of all revenue with high gross margins (77.2%).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <ArrowUpRight className="w-4 h-4" />
                <span>Primary Growth Vector</span>
              </div>
              <p className="text-xs text-gray-300">
                Kokum Refresher volume surged +42% as an add-on pairing. Expanding combo offerings will lift AOV past ₹800.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                <span>Underperforming Risk</span>
              </div>
              <p className="text-xs text-gray-300">
                Vegan Brown Rice Biryani sales dipped -14.2% MoM due to longer prep latency (24 min). Recommend menu revamp.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                <Clock className="w-4 h-4" />
                <span>Capacity Recommendation</span>
              </div>
              <p className="text-xs text-gray-300">
                Friday & Saturday 8-10 PM dinner slots are operating at 98% table capacity. Open rooftop seating to prevent table turn rejections.
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Feature #10: ML Sales & Revenue Forecasting */}
      <GlassCard className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Predictive Revenue Projections (Feature #10)</span>
            </div>
            <h2 className="text-lg font-bold">Sales Forecasting & Scenario Modeling</h2>
            <p className="text-xs text-gray-400">
              Machine learning models trained on 24 months of seasonality, footfall velocity, and local holiday calendars.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/20 border border-white/10 self-start sm:self-auto">
            {(['7d', '30d', '90d'] as const).map((h) => (
              <button
                key={h}
                onClick={() => setSelectedHorizon(h)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                  selectedHorizon === h
                    ? 'bg-[#FF6B35] text-white shadow'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {h === '7d' ? '7-Day Sprint' : h === '30d' ? '30-Day Monthly' : '90-Day Quarter'}
              </button>
            ))}
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="foreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D9FF" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00D9FF" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#333' : '#e5e7eb'} vertical={false} />
              <XAxis dataKey="period" stroke={isDarkMode ? '#888' : '#666'} fontSize={11} tickLine={false} />
              <YAxis
                stroke={isDarkMode ? '#888' : '#666'}
                fontSize={11}
                tickFormatter={(val) => `₹${val >= 100000 ? (val / 100000).toFixed(1) + 'L' : val / 1000 + 'k'}`}
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
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Area type="monotone" dataKey="upperBound" stroke="transparent" fill="#00D9FF" fillOpacity={0.1} name="Upper Confidence Band" />
              <Area type="monotone" dataKey="lowerBound" stroke="transparent" fill="transparent" name="Lower Band" />
              <Line type="monotone" dataKey="predicted" stroke="#00D9FF" strokeWidth={3} dot={{ r: 4 }} name="Predicted Forecast (₹)" />
              <Line type="monotone" dataKey="actual" stroke="#FF6B35" strokeWidth={2} dot={{ r: 4 }} name="Actual Realized Sales (₹)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Feature #11: Dish-Level Demand Forecasting & Kitchen Prep Units */}
      <GlassCard className="p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B35] mb-1">
              <Package className="w-3.5 h-3.5" />
              <span>Dish-Level Prep Intelligence (Feature #11)</span>
            </div>
            <h2 className="text-lg font-bold">Individual Dish Demand Forecasting & Recommended Prep</h2>
            <p className="text-xs text-gray-400">
              Anticipate daily dish orders, identify stockout hazards, and issue verified batch quantities directly to kitchen staff.
            </p>
          </div>

          <span className="text-xs px-3 py-1.5 rounded-xl bg-[#FF6B35]/20 text-[#FF6B35] font-bold border border-[#FF6B35]/30 self-start sm:self-auto">
            Zero Waste Kitchen AI
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEMAND_FORECAST_DISHES.map((dish) => {
            const isConfirmed = prepBatchConfirmed.includes(dish.dishId);
            return (
              <div
                key={dish.dishId}
                className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition-all ${
                  isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/10'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">
                      {dish.category}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">
                      {dish.confidenceScore}% Confidence
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-white">{dish.dishName}</h3>

                  <div className="p-3 rounded-xl bg-black/20 border border-white/5 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current Daily Avg:</span>
                      <span className="font-bold text-white font-mono">{dish.currentAvgDailyDemand} units/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Predicted Next Week:</span>
                      <span className="font-bold text-cyan-400 font-mono">{dish.predictedDemandNextWeek} units/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Projected Peak Surge:</span>
                      <span className="font-bold text-[#FF6B35]">{dish.peakDayPredicted}</span>
                    </div>
                  </div>

                  {dish.stockShortageRisk === 'HIGH' && (
                    <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-400">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      <span>Stock shortage alert: Reorder raw ingredients ASAP.</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-inherit space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Recommended Daily Prep:</span>
                    <span className="text-base font-black text-emerald-400 font-mono">
                      {dish.recommendedPrepUnits} Portions
                    </span>
                  </div>

                  <button
                    onClick={() => handleConfirmPrep(dish.dishId)}
                    className={`w-full py-2 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isConfirmed
                        ? 'bg-emerald-500 text-white'
                        : 'bg-[#FF6B35] hover:bg-[#FFA366] text-white shadow-lg'
                    }`}
                  >
                    {isConfirmed ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Prep Batch Dispatched to Kitchen</span>
                      </>
                    ) : (
                      <>
                        <Package className="w-3.5 h-3.5" />
                        <span>Confirm & Dispatch Prep Target</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};
