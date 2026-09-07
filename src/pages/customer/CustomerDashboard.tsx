import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { formatINR } from '../../utils/formatters';
import {
  Sparkles,
  UtensilsCrossed,
  HeartPulse,
  Target,
  Smile,
  CalendarDays,
  ShoppingBag,
  ArrowRight,
  TrendingUp,
  Flame,
  Award,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export const CustomerDashboard: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { user, orders, reservations, menuItems, addToCart } = useAuth();
  const { isDarkMode } = useTheme();

  const activeOrders = orders.filter((o) => o.status !== 'DELIVERED' && o.status !== 'CANCELLED');
  const recommendedDishes = menuItems.filter((m) => m.healthScore >= 90).slice(0, 3);
  const upcomingReservations = reservations.filter((r) => r.status === 'CONFIRMED' || r.status === 'SEATED');

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#FF6B35]/20 via-[#FFA366]/15 to-cyan-500/10 border border-[#FF6B35]/30 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#FF6B35]/20 text-[#FF6B35] border border-[#FF6B35]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Metabolic Profile: Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Namaste, {user?.name.split(' ')[0] || 'Gourmet Patron'}!
          </h1>
          <p className={`text-xs sm:text-sm max-w-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Your SmartBite AI engine has calibrated today's culinary recommendations based on your Low Glycemic & Cardiac wellness targets.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate('/customer/menu')}
            className="px-5 py-2.5 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#FF6B35]/30 flex items-center gap-2 transition-all cursor-pointer"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Order Food (₹)</span>
          </button>
          <button
            onClick={() => navigate('/customer/reservations')}
            className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              isDarkMode ? 'border-white/15 bg-white/5 hover:bg-white/10 text-white' : 'border-black/10 bg-white hover:bg-gray-50 text-black'
            }`}
          >
            <span>Book Table</span>
          </button>
        </div>
      </div>

      {/* Wellness & Metabolic Snapshot */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Metabolic Health Index</span>
            <HeartPulse className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-500">94 / 100</p>
          <p className="text-[11px] text-gray-400">Optimal balance</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Calorie Budget</span>
            <Flame className="w-4 h-4 text-[#FF6B35]" />
          </div>
          <p className="text-2xl font-black text-[#FF6B35]">1,420 / 2,100</p>
          <p className="text-[11px] text-gray-400">680 kcal remaining</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Protein Target</span>
            <Target className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-black text-cyan-400">64g / 90g</p>
          <p className="text-[11px] text-gray-400">71% accomplished</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loyalty Savings</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-amber-400">{formatINR(340)}</p>
          <p className="text-[11px] text-gray-400">Wallet cashbacks in ₹</p>
        </GlassCard>
      </div>

      {/* AI Wellness Quick Portals */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>AI Health & Wellness Suite</span>
          </h2>
          <span className="text-xs text-gray-400">Adaptive Clinical Recommendation Engines</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard
            clickable
            glowOnHover
            onClick={() => navigate('/customer/ai-disease')}
            className="p-5 space-y-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">AI Disease Matcher</h3>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Filter foods safe for Diabetes, PCOS, & Hypertension.
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#FF6B35] flex items-center gap-1">
              Verify Foods <ArrowRight className="w-3 h-3" />
            </span>
          </GlassCard>

          <GlassCard
            clickable
            glowOnHover
            onClick={() => navigate('/customer/ai-meal-planner')}
            className="p-5 space-y-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Goal Meal Planner</h3>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Macro-aligned meal plans in ₹ for Weight Loss & Lean Muscle.
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#FF6B35] flex items-center gap-1">
              Build Plan <ArrowRight className="w-3 h-3" />
            </span>
          </GlassCard>

          <GlassCard
            clickable
            glowOnHover
            onClick={() => navigate('/customer/ai-mood')}
            className="p-5 space-y-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Smile className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">AI Mood Dining</h3>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Neuro-nutritional pairings matching your emotional state.
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#FF6B35] flex items-center gap-1">
              Explore Moods <ArrowRight className="w-3 h-3" />
            </span>
          </GlassCard>

          <GlassCard
            clickable
            glowOnHover
            onClick={() => navigate('/customer/ai-ingredients')}
            className="p-5 space-y-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Ingredient Intelligence</h3>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Interactive chat explaining glycemic load & allergens.
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#FF6B35] flex items-center gap-1">
              Ask AI <ArrowRight className="w-3 h-3" />
            </span>
          </GlassCard>
        </div>
      </div>

      {/* Active Orders Tracker & Reservations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Orders */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/15 text-[#FF6B35] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base">Active Orders</h3>
            </div>
            <button
              onClick={() => navigate('/customer/orders')}
              className="text-xs font-bold text-[#FF6B35] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {activeOrders.length === 0 ? (
            <div className="p-6 text-center text-xs text-gray-400">
              No active orders right now. Ready for fresh gourmet dining?
            </div>
          ) : (
            <div className="space-y-3">
              {activeOrders.slice(0, 2).map((order) => (
                <div
                  key={order.id}
                  className={`p-4 rounded-xl border flex items-center justify-between ${
                    isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/5'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs">{order.orderNumber}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FF6B35]/15 text-[#FF6B35] font-bold uppercase">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs opacity-70">
                      {order.items.map((it) => `${it.quantity}x ${it.foodItem.name}`).join(', ')}
                    </p>
                    <p className="text-[11px] text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> ETA: {order.estimatedTime}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-[#FF6B35]">{formatINR(order.total)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>

        {/* Reservations Widget */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                <CalendarDays className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base">Table Reservations</h3>
            </div>
            <button
              onClick={() => navigate('/customer/reservations')}
              className="text-xs font-bold text-[#FF6B35] hover:underline flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {upcomingReservations.length === 0 ? (
            <div className="p-6 text-center text-xs text-gray-400">
              No upcoming table bookings.
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingReservations.map((res) => (
                <div
                  key={res.id}
                  className={`p-4 rounded-xl border flex items-center justify-between ${
                    isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/5'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs">{res.tableNumber}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 font-bold uppercase">
                        {res.status}
                      </span>
                    </div>
                    <p className="text-xs opacity-70">
                      {res.date} at {res.timeSlot} • {res.partySize} Guests
                    </p>
                    <p className="text-[11px] text-gray-400">Ref: {res.bookingRef}</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>

      {/* Recommended for Your Health Profile */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-[#FF6B35]" />
            <span>AI Recommended Dishes for Low Glycemic Index</span>
          </h2>
          <button
            onClick={() => navigate('/customer/menu')}
            className="text-xs font-bold text-[#FF6B35] hover:underline"
          >
            Browse Full Menu (₹)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedDishes.map((dish) => (
            <GlassCard key={dish.id} className="p-0 overflow-hidden group flex flex-col justify-between">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-[#22C55E] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  Health Score: {dish.healthScore}/100
                </div>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded">
                  {dish.macros.calories} kcal
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h4 className="font-bold text-sm line-clamp-1">{dish.name}</h4>
                <div className="flex flex-wrap gap-1 text-[10px]">
                  {dish.suitableForConditions.slice(0, 2).map((c, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      ✓ {c}
                    </span>
                  ))}
                </div>
                <div className="pt-2 border-t border-inherit flex items-center justify-between">
                  <span className="font-black text-sm text-[#FF6B35]">{formatINR(dish.price)}</span>
                  <button
                    onClick={() => addToCart(dish, 1)}
                    className="px-3 py-1.5 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-lg shadow transition-all cursor-pointer"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};
