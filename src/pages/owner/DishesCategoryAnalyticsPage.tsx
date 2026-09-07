import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { formatINR } from '../../utils/formatters';
import {
  UtensilsCrossed,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  AlertTriangle,
  Flame,
  PieChart as PieIcon,
  Tag,
  CheckCircle2,
  Plus,
  HelpCircle,
} from 'lucide-react';
import {
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
  DISH_PERFORMANCE_DATA,
  CATEGORY_PERFORMANCE_DATA,
  AI_COMBO_INSIGHTS,
} from '../../data/dummyData';
import { DishPerformance, ComboInsight } from '../../types';

export const DishesCategoryAnalyticsPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { isDarkMode } = useTheme();
  const [selectedClassification, setSelectedClassification] = useState<string>('ALL');
  const [combos, setCombos] = useState<ComboInsight[]>(AI_COMBO_INSIGHTS);
  const [deployedCombos, setDeployedCombos] = useState<string[]>([]);

  const filteredDishes = DISH_PERFORMANCE_DATA.filter((d) => {
    if (selectedClassification === 'ALL') return true;
    if (selectedClassification === 'BEST_SELLER') return d.status === 'BEST_SELLER' || d.classification === 'STAR';
    if (selectedClassification === 'LOW_PERFORMING') return d.status === 'LOW_PERFORMING' || d.classification === 'DOG';
    return d.classification === selectedClassification;
  });

  const categoryColors = ['#FF6B35', '#00D9FF', '#10B981', '#A855F7', '#EAB308'];

  const handleDeployCombo = (id: string) => {
    if (!deployedCombos.includes(id)) {
      setDeployedCombos([...deployedCombos, id]);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#FF6B35]/15 text-[#FF6B35] border border-[#FF6B35]/30 mb-2">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Feature #5, #6 & #14 • Menu Matrix & Category BI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Menu, Category & AI Combo Intelligence</h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Evaluate dish popularity vs profitability matrix (Boston Consulting Group model), category sales shares, and AI combo pairings.
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/menu')}
          className="px-4 py-2 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer"
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Open Menu Master CRUD</span>
        </button>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5 space-y-1">
          <span className="text-xs font-bold text-gray-400">Total Active Dishes</span>
          <p className="text-2xl font-black text-cyan-400">{DISH_PERFORMANCE_DATA.length} Items</p>
          <p className="text-[11px] text-gray-400">2 Stars • 2 Workhorses • 2 Puzzles • 1 Dog</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1">
          <span className="text-xs font-bold text-gray-400">Top Revenue Driver</span>
          <p className="text-xl font-black text-emerald-400 truncate">Foxtail Khichdi</p>
          <p className="text-[11px] text-gray-400">₹4.83L Revenue • 75.9% Margin</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1">
          <span className="text-xs font-bold text-gray-400">Leading Food Category</span>
          <p className="text-xl font-black text-[#FF6B35]">Healthy Bowls</p>
          <p className="text-[11px] text-gray-400">38% Revenue Share • +34.5% YoY</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1">
          <span className="text-xs font-bold text-gray-400">AI Combo Monthly Lift</span>
          <p className="text-2xl font-black text-purple-400">{formatINR(326000)}</p>
          <p className="text-[11px] text-gray-400">From 3 High-Affinity Bundles</p>
        </GlassCard>
      </div>

      {/* Feature #5: Top-Selling & Low-Performing Dishes Table */}
      <GlassCard className="p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400" />
              <span>Top-Selling & Low-Performing Dishes (Feature #5)</span>
            </h2>
            <p className="text-xs text-gray-400">
              Profitability vs popularity matrix with unit volumes, gross profits, reorder rates, and BCG classification.
            </p>
          </div>

          {/* Classification Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-black/20 border border-white/10">
            {[
              { id: 'ALL', label: 'All Dishes' },
              { id: 'BEST_SELLER', label: 'Top Best Sellers' },
              { id: 'LOW_PERFORMING', label: 'Low Performing' },
              { id: 'STAR', label: 'Stars (High Pop & Profit)' },
              { id: 'WORKHORSE', label: 'Workhorses (High Vol, Mod Margin)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedClassification(tab.id)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedClassification === tab.id
                    ? 'bg-[#FF6B35] text-white shadow'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-white/10 text-gray-400' : 'border-black/10 text-gray-500'}`}>
                <th className="py-3 px-3 font-semibold">Dish Name & Category</th>
                <th className="py-3 px-3 font-semibold">Units Sold</th>
                <th className="py-3 px-3 font-semibold">Price / Unit Cost</th>
                <th className="py-3 px-3 font-semibold">Gross Profit (₹)</th>
                <th className="py-3 px-3 font-semibold">Gross Margin</th>
                <th className="py-3 px-3 font-semibold">Reorder Rate</th>
                <th className="py-3 px-3 font-semibold">Classification</th>
                <th className="py-3 px-3 font-semibold">Growth YoY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-inherit">
              {filteredDishes.map((dish) => (
                <tr key={dish.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3">
                    <p className="font-bold text-white truncate max-w-xs">{dish.name}</p>
                    <span className="text-[10px] text-gray-400">{dish.category}</span>
                  </td>
                  <td className="py-3 px-3 font-bold font-mono text-cyan-400">
                    {dish.unitsSold.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-gray-300 font-mono">
                    ₹{dish.sellingPrice} <span className="text-gray-500 text-[10px]">(Cost ₹{dish.costPerUnit})</span>
                  </td>
                  <td className="py-3 px-3 font-bold font-mono text-emerald-400">
                    {formatINR(dish.grossProfit)}
                  </td>
                  <td className="py-3 px-3 font-bold">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        dish.marginPercent >= 75
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : dish.marginPercent >= 65
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {dish.marginPercent}%
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-gray-300">{dish.reorderRate}%</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        dish.classification === 'STAR'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : dish.classification === 'WORKHORSE'
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          : dish.classification === 'PUZZLE'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {dish.classification}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold">
                    <span
                      className={`flex items-center gap-0.5 ${
                        dish.growth > 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {dish.growth > 0 ? (
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5" />
                      )}
                      {dish.growth > 0 ? `+${dish.growth}%` : `${dish.growth}%`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Feature #6: Category Performance Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <GlassCard className="lg:col-span-5 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-cyan-400" />
              <span>Category Revenue Share (Feature #6)</span>
            </h3>
            <span className="text-xs text-gray-400">Total ₹3.74M</span>
          </div>

          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_PERFORMANCE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="revenue"
                >
                  {CATEGORY_PERFORMANCE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => [formatINR(val), 'Revenue']}
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
            {CATEGORY_PERFORMANCE_DATA.map((cat, idx) => (
              <div key={cat.category} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: categoryColors[idx % categoryColors.length] }}
                  />
                  <span className="font-semibold">{cat.category}</span>
                </div>
                <div className="font-mono">
                  <span className="font-bold text-white">{formatINR(cat.revenue)}</span>
                  <span className="text-gray-400 ml-1.5">({cat.revenueShare}%)</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-7 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base">Category Margins & Growth Comparison</h3>
            <span className="text-xs text-emerald-400 font-bold">Beverages +48.0% YoY</span>
          </div>
          <p className="text-xs text-gray-400">
            Average gross profit margin % alongside units sold by food category.
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_PERFORMANCE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#333' : '#e5e7eb'} vertical={false} />
                <XAxis dataKey="category" stroke={isDarkMode ? '#888' : '#666'} fontSize={10} tickLine={false} />
                <YAxis
                  stroke={isDarkMode ? '#888' : '#666'}
                  fontSize={11}
                  tickFormatter={(val) => `${val}%`}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(val: number, name: string) => [
                    name === 'avgMargin' ? `${val}%` : val,
                    name === 'avgMargin' ? 'Avg Gross Margin' : 'Units Sold',
                  ]}
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1A1A1A' : '#ffffff',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="avgMargin" fill="#10B981" radius={[6, 6, 0, 0]} name="Avg Gross Margin %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-inherit text-xs">
            {CATEGORY_PERFORMANCE_DATA.map((cat) => (
              <div key={cat.category} className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <p className="text-[11px] font-bold truncate text-white">{cat.category}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Top: {cat.topItem}</p>
                <p className="text-[10px] text-emerald-400 font-bold mt-1">Growth: +{cat.growthYoY}%</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Feature #14: AI Combo Insights (Market Basket Analysis & Bundle Recommendations) */}
      <GlassCard className="p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Machine Learning Market Basket Analysis (Feature #14)</span>
            </div>
            <h2 className="text-lg font-bold">Frequently Purchased AI Food Combinations</h2>
            <p className="text-xs text-gray-400">
              Co-occurrence patterns mined from 12,000+ customer orders with automated bundle discount proposals and projected monthly revenue uplift.
            </p>
          </div>

          <span className="text-xs px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30 self-start sm:self-auto">
            Avg Basket Lift: +₹84 / order
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {combos.map((combo) => {
            const isDeployed = deployedCombos.includes(combo.id);
            return (
              <div
                key={combo.id}
                className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition-all ${
                  isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/10'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {combo.pairingAffinity}% Affinity
                    </span>
                    <span className="text-[11px] text-gray-400 font-mono">
                      {combo.historicalOrdersTogether} orders
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-white">{combo.name}</h3>

                  <div className="space-y-1">
                    {combo.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-gray-300">
                        <Tag className="w-3 h-3 text-[#FF6B35] flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-[11px] text-gray-400 italic bg-black/20 p-2.5 rounded-xl border border-white/5">
                    "{combo.healthSynergyReason}"
                  </p>
                </div>

                <div className="pt-3 border-t border-inherit space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="text-gray-400 line-through text-[11px] block">₹{combo.currentComboPrice}</span>
                      <span className="text-base font-black text-emerald-400">₹{combo.recommendedBundlePrice}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block">Est. Monthly Uplift</span>
                      <span className="font-bold text-purple-300">{formatINR(combo.monthlyRevenueUplift)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeployCombo(combo.id)}
                    className={`w-full py-2 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isDeployed
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg'
                    }`}
                  >
                    {isDeployed ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Deployed to Kiosk & App Menu</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Deploy AI Bundle Promo</span>
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
