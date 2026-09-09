import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { RoleBadge } from '../../components/common/RoleBadge';
import { formatINR } from '../../utils/formatters';
import {
  Sparkles,
  ArrowRight,
  HeartPulse,
  Target,
  Brain,
  Layers,
  BarChart3,
  Flame,
  ShieldCheck,
  Zap,
  TrendingUp,
  Star,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { INITIAL_MENU_ITEMS } from '../../data/dummyData';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { switchRole, addToCart } = useAuth();
  const { isDarkMode } = useTheme();

  const featuredDishes = INITIAL_MENU_ITEMS.slice(0, 3);

  const capabilities = [
    {
      icon: HeartPulse,
      title: 'AI Disease Matcher',
      desc: 'Instant clinical cross-checking of glycemic load, sodium, and allergens against Diabetes, Hypertension, and PCOS.',
      badge: 'Health-Tech',
    },
    {
      icon: Target,
      title: 'Goal-Based Meal Planner',
      desc: 'Precision macro calculators aligning high-protein, keto, or caloric targets with gourmet Indian cuisines.',
      badge: 'Macros & Kcal',
    },
    {
      icon: Brain,
      title: 'Ingredient Intelligence',
      desc: 'Real-time conversational AI explaining bioavailability, antioxidant potency, and culinary heritage.',
      badge: 'LLM Powered',
    },
    {
      icon: Layers,
      title: 'Kitchen Kanban Engine',
      desc: 'Live ticket routing with sub-second turnaround timers for chefs, expeditors, and table stewards.',
      badge: 'Zero Latency',
    },
    {
      icon: TrendingUp,
      title: 'Predictive Sales BI',
      desc: 'Time-series ARIMA & neural forecasting projecting revenue, margin bottlenecks, and ingredient spoilage in ₹.',
      badge: 'Executive BI',
    },
  ];

  return (
    <div className="min-h-screen space-y-24 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glow ambient background circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF6B35]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto space-y-6 relative z-10">
          <motion.div
            // initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold shadow-sm bg-[#FF6B35]/10 border-[#FF6B35]/30 text-[#FF6B35]"
          >
            {/* <Sparkles className="w-3.5 h-3.5" /> */}
            {/* <span>Next-Generation Restaurant OS • 2026 Edition</span> */}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]"
          >
            Smarter Food.{' '}
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#FFA366] to-[#00D9FF] bg-clip-text text-transparent">
              Healthier Tomorrow.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            SmartBite AI fuses gourmet culinary craftsmanship with precision health intelligence, real-time kitchen Kanban, and predictive revenue forecasting in Indian Rupees (₹).
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >

            <button
              onClick={() => navigate('/login')}
              className={`px-8 py-3.5 rounded-xl border text-sm font-bold transition-all hover:scale-105 cursor-pointer ${
                isDarkMode
                  ? 'border-white/15 bg-white/5 hover:bg-white/10 text-white'
                  : 'border-black/10 bg-black/5 hover:bg-black/10 text-[#0F0F0F]'
              }`}
            >
             Log In
            </button>

            <button
              onClick={() => {
                switchRole('CUSTOMER');
                navigate('/customer/menu');
              }}
              className="px-8 py-3.5 bg-[#FF6B35] hover:bg-[#FFA366] text-white font-bold text-sm rounded-xl shadow-xl shadow-[#FF6B35]/30 flex items-center gap-2.5 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Explore AI Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            
          </motion.div>

          {/* Quick RBAC Tester Strip */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`p-4 rounded-2xl border max-w-xl mx-auto mt-8 ${
              isDarkMode ? 'bg-[#1A1A1A]/80 border-white/10' : 'bg-gray-50 border-black/10'
            }`}
          >
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
              Launch Direct RBAC Workspace:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <button
                onClick={() => {
                  switchRole('CUSTOMER');
                  navigate('/customer');
                }}
                className="p-2 rounded-lg bg-[#FF6B35]/15 hover:bg-[#FF6B35]/25 text-[#FF6B35] font-bold border border-[#FF6B35]/30 flex items-center justify-center gap-1.5"
              >
                <span>Customer</span>
              </button>
              <button
                onClick={() => {
                  switchRole('STAFF');
                  navigate('/staff/kitchen');
                }}
                className="p-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 font-bold border border-amber-500/30 flex items-center justify-center gap-1.5"
              >
                <span>Staff KDS</span>
              </button>
              <button
                onClick={() => {
                  switchRole('ADMIN');
                  navigate('/admin');
                }}
                className="p-2 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-400 font-bold border border-red-500/30 flex items-center justify-center gap-1.5"
              >
                <span>Admin</span>
              </button>
              <button
                onClick={() => {
                  switchRole('OWNER');
                  navigate('/owner');
                }}
                className="p-2 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-400 font-bold border border-cyan-500/30 flex items-center justify-center gap-1.5"
              >
                <span>Owner BI</span>
              </button>
            </div>
          </motion.div> */}
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Gourmet Orders Served', value: '1,42,800+', sub: 'Across Bengaluru & Mumbai' },
            { label: 'AI Health Accuracy', value: '98.6%', sub: 'Validated Clinical DB' },
            { label: 'Kitchen Turnaround', value: '14.2 min', sub: 'Average ticket speed' },
            { label: 'Total Revenue Tracked', value: '₹ 4.82 Cr', sub: 'Calculated in INR (₹)' },
          ].map((stat, i) => (
            <GlassCard key={i} className="text-center p-6 space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-[#FF6B35]">{stat.value}</span>
              <p className="text-xs font-bold tracking-wide">{stat.label}</p>
              <p className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.sub}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Zap className="w-3.5 h-3.5" />
            <span>Intelligent Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold">Autonomous Restaurant Intelligence</h2>
          <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Every touchpoint is enhanced by algorithms tuned specifically for Indian culinary profiles and metabolic wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <GlassCard key={i} glowOnHover className="p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/15 flex items-center justify-center text-[#FF6B35]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-gray-300">
                      {cap.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">{cap.title}</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {cap.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-inherit flex items-center text-xs font-bold text-[#FF6B35] gap-1">
                  <span>Explore Feature</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Featured AI Dishes Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#FF6B35] uppercase tracking-wider">Culinary Spotlight</span>
            <h2 className="text-3xl font-extrabold mt-1">Chef-Crafted Wellness Dishes</h2>
          </div>
          <button
            onClick={() => {
              switchRole('CUSTOMER');
              navigate('/customer/menu');
            }}
            className="text-xs font-bold text-[#FF6B35] flex items-center gap-1 hover:underline"
          >
            <span>View Complete Menu (₹)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredDishes.map((dish) => (
            <GlassCard key={dish.id} className="overflow-hidden p-0 flex flex-col group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{dish.rating}</span>
                </div>
                <div className="absolute top-3 left-3 bg-[#FF6B35] px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow">
                  Score {dish.healthScore}/100
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>{dish.cuisine}</span>
                    <span>{dish.macros.calories} kcal</span>
                  </div>
                  <h3 className="font-bold text-base line-clamp-1">{dish.name}</h3>
                  <p className={`text-xs mt-2 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {dish.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-inherit flex items-center justify-between">
                  <span className="text-lg font-black text-[#FF6B35]">{formatINR(dish.price)}</span>
                  <button
                    onClick={() => {
                      addToCart(dish, 1);
                      switchRole('CUSTOMER');
                      navigate('/customer/menu');
                    }}
                    className="px-4 py-2 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-xl shadow transition-all flex items-center gap-1.5"
                  >
                    <span>Order Now</span>
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#FF6B35] uppercase tracking-wider">Patron Reviews</span>
          <h2 className="text-3xl font-extrabold">Loved by Health Conscious Diners</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Dr. Ananya Ray',
              role: 'Endocrinologist, Bengaluru',
              text: 'The diabetic-friendly filter and ingredient verification algorithm is a game changer. I can confidently recommend SmartBite dishes to all my patients.',
              avatar: 'https://images.unsplash.com/photo-1594824813512-32a26569eb44?w=150&auto=format&fit=crop&q=80',
            },
            {
              name: 'Kabir Varma',
              role: 'Fitness Coach & Athlete',
              text: 'Having accurate protein and carb macros calculated in real-time alongside authentic Indian spices has completely transformed my daily meal prep.',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
            },
            {
              name: 'Shalini Singhal',
              role: 'Product VP, FinTech',
              text: 'The AI Mood recommendation suggested the Kokum Chia Elixir when I was stressed from back-to-back meetings. Absolute perfection and refreshing!',
              avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
            },
          ].map((item, i) => (
            <GlassCard key={i} className="p-6 space-y-4 flex flex-col justify-between">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className={`text-xs italic leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                "{item.text}"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-inherit">
                <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold">{item.name}</h4>
                  <p className="text-[10px] text-gray-400">{item.role}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#FF6B35] to-[#FFA366] p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-black">Ready to experience SmartBite AI?</h2>
            <p className="text-sm text-white/90 max-w-lg">
              Join thousands of patrons and leading restaurant operations leveraging AI for culinary perfection.
            </p>
          </div>
          <button
            onClick={() => {
              switchRole('CUSTOMER');
              navigate('/customer');
            }}
            className="px-8 py-4 bg-white hover:bg-white/90 text-[#FF6B35] font-black text-sm rounded-2xl shadow-xl transition-all hover:scale-105 flex-shrink-0"
          >
            Launch Customer Portal
          </button>
        </div>
      </section>
    </div>
  );
};
