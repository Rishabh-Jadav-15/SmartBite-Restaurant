import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../hooks/useTheme';
import { GlassCard } from '../../../components/common/GlassCard';
import { formatINR } from '../../../utils/formatters';
import {
  Smile,
  Zap,
  Coffee,
  Sparkles,
  Heart,
  Plus,
  Flame,
  BatteryCharging,
  BrainCircuit,
  PartyPopper,
} from 'lucide-react';

export const AIMoodRecommendation: React.FC = () => {
  const { menuItems, addToCart } = useAuth();
  const { isDarkMode } = useTheme();

  const [selectedMood, setSelectedMood] = useState<'STRESSED' | 'TIRED' | 'BRAIN_FOG' | 'CELEBRATING' | 'COMFORT'>('STRESSED');

  const moods = [
    {
      id: 'STRESSED',
      title: 'High Stress / Anxious',
      subtitle: 'GABA & Serotonin Boost',
      desc: 'Dishes rich in magnesium, tryptophan, and cooling botanical extracts (Kokum, Chia, Ashwagandha infused spices) to downregulate cortisol.',
      icon: Heart,
      color: 'from-pink-500/20 to-purple-500/20',
      recommendedDishIds: ['m6', 'm1'],
    },
    {
      id: 'TIRED',
      title: 'Exhausted / Low Energy',
      subtitle: 'Mitochondrial ATP Ignite',
      desc: 'Clean iron-dense complexes, medium-chain triglycerides, and sustained complex carbs without glycemic crash.',
      icon: BatteryCharging,
      color: 'from-amber-500/20 to-orange-500/20',
      recommendedDishIds: ['m3', 'm2'],
    },
    {
      id: 'BRAIN_FOG',
      title: 'Brain Fog / Deep Focus',
      subtitle: 'Nootropic & Polyphenols',
      desc: 'Curcumin piperine complexes, lutein, and high antioxidant greens to enhance cerebral blood flow and cognitive sharpness.',
      icon: BrainCircuit,
      color: 'from-cyan-500/20 to-blue-500/20',
      recommendedDishIds: ['m4', 'm5'],
    },
    {
      id: 'CELEBRATING',
      title: 'Party & Celebration',
      subtitle: 'Dopamine & Gourmet Euphoria',
      desc: 'Rich, celebratory smoked tandoori infusions, saffron notes, and indulgent yet gut-friendly culinary treasures.',
      icon: PartyPopper,
      color: 'from-red-500/20 to-yellow-500/20',
      recommendedDishIds: ['m2', 'm7'],
    },
    {
      id: 'COMFORT',
      title: 'Seeking Warm Comfort',
      subtitle: 'Endorphins & Soothing Warmth',
      desc: 'Velvety dal makhani simmered with low saturated fat, paired with slow-cooked aromatic millets and herbal broths.',
      icon: Coffee,
      color: 'from-emerald-500/20 to-teal-500/20',
      recommendedDishIds: ['m5', 'm1'],
    },
  ];

  const activeMood = moods.find((m) => m.id === selectedMood) || moods[0];
  const recommendedDishes = menuItems.filter((d) => activeMood.recommendedDishIds.includes(d.id));

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 mb-2">
          <Smile className="w-3.5 h-3.5" />
          <span>Neuro-Nutritional AI Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">AI Mood-Based Dining Intelligence</h1>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Align your culinary choices with your emotional state through neurotransmitter-supporting botanical ingredients.
        </p>
      </div>

      {/* Mood Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {moods.map((m) => {
          const Icon = m.icon;
          const isSelected = selectedMood === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedMood(m.id as any)}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#FF6B35]/20 border-[#FF6B35] text-white shadow-xl scale-102'
                  : isDarkMode
                  ? 'bg-[#1A1A1A] border-white/10 text-gray-400 hover:bg-white/5'
                  : 'bg-white border-black/10 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="space-y-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-[#FF6B35] text-white' : 'bg-black/10 dark:bg-white/10'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xs">{m.title}</h3>
                <span className="text-[10px] text-cyan-400 font-semibold block">{m.subtitle}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Neuro-Nutrient Explanation Banner */}
      <GlassCard className="p-6 border-amber-500/30 bg-amber-500/5 space-y-3">
        <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
          <Sparkles className="w-4 h-4" />
          <span>Biochemical Rationale for {activeMood.title}</span>
        </div>
        <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {activeMood.desc}
        </p>
      </GlassCard>

      {/* Recommended Dishes for This Mood */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Chef Creations Aligned with Your Mood</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedDishes.map((dish) => (
            <GlassCard key={dish.id} className="p-0 overflow-hidden flex flex-col sm:flex-row group">
              <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-[#FF6B35] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  Score {dish.healthScore}/100
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] text-cyan-400 font-bold uppercase">{dish.cuisine}</span>
                  <h4 className="font-bold text-base leading-tight mt-1">{dish.name}</h4>
                  <p className={`text-xs mt-1.5 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {dish.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-inherit flex items-center justify-between">
                  <span className="text-sm font-black text-[#FF6B35]">{formatINR(dish.price)}</span>
                  <button
                    onClick={() => addToCart(dish, 1)}
                    className="px-4 py-2 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-xl shadow transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Order (₹)</span>
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
