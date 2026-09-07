import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../hooks/useTheme';
import { GlassCard } from '../../../components/common/GlassCard';
import { formatINR } from '../../../utils/formatters';
import {
  Target,
  Dumbbell,
  Flame,
  Scale,
  Sparkles,
  Plus,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';

export const AIGoalMealPlanner: React.FC = () => {
  const { menuItems, addToCart } = useAuth();
  const { isDarkMode } = useTheme();

  const [targetGoal, setTargetGoal] = useState<'FAT_LOSS' | 'LEAN_MUSCLE' | 'ENDURANCE' | 'LONGEVITY'>('FAT_LOSS');
  const [calorieBudget, setCalorieBudget] = useState<number>(1800);

  const goalProfiles = {
    FAT_LOSS: {
      name: 'Fat Loss & Ketogenic Deficit',
      subtitle: 'High Protein, Moderate Fat, Low Glycemic Carbs',
      macroRatio: '35% P / 45% F / 20% C',
      recommendedItemIds: ['m1', 'm3', 'm6'],
    },
    LEAN_MUSCLE: {
      name: 'Hypertrophy & Lean Mass Gain',
      subtitle: 'High Protein, Complex Carbohydrate Fuel',
      macroRatio: '40% P / 20% F / 40% C',
      recommendedItemIds: ['m2', 'm4', 'm7'],
    },
    ENDURANCE: {
      name: 'Cardio & Sustained Aerobic Stamina',
      subtitle: 'Slow-burn Millets & Electrolyte Hydration',
      macroRatio: '25% P / 20% F / 55% C',
      recommendedItemIds: ['m1', 'm6', 'm7'],
    },
    LONGEVITY: {
      name: 'Ayurvedic Cellular Longevity',
      subtitle: 'High Polyphenols, Anti-inflammatory Spices',
      macroRatio: '25% P / 35% F / 40% C',
      recommendedItemIds: ['m1', 'm3', 'm4'],
    },
  };

  const currentGoalData = goalProfiles[targetGoal];
  const mealPlanItems = menuItems.filter((m) => currentGoalData.recommendedItemIds.includes(m.id));

  const totalCalories = mealPlanItems.reduce((sum, item) => sum + item.macros.calories, 0);
  const totalProtein = mealPlanItems.reduce((sum, item) => sum + item.macros.protein, 0);
  const totalCarbs = mealPlanItems.reduce((sum, item) => sum + item.macros.carbs, 0);
  const totalFat = mealPlanItems.reduce((sum, item) => sum + item.macros.fat, 0);
  const totalPrice = mealPlanItems.reduce((sum, item) => sum + item.price, 0);

  const handleAddAllToCart = () => {
    mealPlanItems.forEach((item) => addToCart(item, 1));
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 mb-2">
          <Target className="w-3.5 h-3.5" />
          <span>Macro Calibration Matrix</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">AI Goal-Based Meal Planner</h1>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Configure your personal metabolic objectives to synthesize a nutritionally optimized daily Indian meal bundle.
        </p>
      </div>

      {/* Goal Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { id: 'FAT_LOSS', name: 'Fat Loss', icon: Flame },
          { id: 'LEAN_MUSCLE', name: 'Lean Muscle', icon: Dumbbell },
          { id: 'ENDURANCE', name: 'Endurance', icon: TrendingUp },
          { id: 'LONGEVITY', name: 'Longevity', icon: Sparkles },
        ].map((goal) => {
          const Icon = goal.icon;
          const isSelected = targetGoal === goal.id;
          return (
            <button
              key={goal.id}
              onClick={() => setTargetGoal(goal.id as any)}
              className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-lg ring-1 ring-cyan-500'
                  : isDarkMode
                  ? 'bg-[#1A1A1A] border-white/10 text-gray-400 hover:bg-white/5'
                  : 'bg-white border-black/10 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className={`p-2 rounded-xl ${isSelected ? 'bg-cyan-500 text-white' : 'bg-black/10 dark:bg-white/10'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs">{goal.name}</span>
            </button>
          );
        })}
      </div>

      {/* Target Macro Summary */}
      <GlassCard className="p-6 space-y-4 border-cyan-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-base">{currentGoalData.name}</h3>
            <p className="text-xs text-gray-400">{currentGoalData.subtitle} • Target Ratio: {currentGoalData.macroRatio}</p>
          </div>

          <button
            onClick={handleAddAllToCart}
            className="px-5 py-2.5 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#FF6B35]/25 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Order Full Meal Plan ({formatINR(totalPrice)})</span>
          </button>
        </div>

        {/* Calculated Nutrient Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-black/10 dark:bg-white/5 border border-inherit text-center">
            <span className="text-[10px] text-gray-400 uppercase font-semibold">Total Energy</span>
            <p className="text-lg font-black text-[#FF6B35]">{totalCalories} kcal</p>
          </div>
          <div className="p-3 rounded-xl bg-black/10 dark:bg-white/5 border border-inherit text-center">
            <span className="text-[10px] text-gray-400 uppercase font-semibold">Protein</span>
            <p className="text-lg font-black text-cyan-400">{totalProtein}g</p>
          </div>
          <div className="p-3 rounded-xl bg-black/10 dark:bg-white/5 border border-inherit text-center">
            <span className="text-[10px] text-gray-400 uppercase font-semibold">Net Carbs</span>
            <p className="text-lg font-black text-green-400">{totalCarbs}g</p>
          </div>
          <div className="p-3 rounded-xl bg-black/10 dark:bg-white/5 border border-inherit text-center">
            <span className="text-[10px] text-gray-400 uppercase font-semibold">Healthy Fats</span>
            <p className="text-lg font-black text-amber-400">{totalFat}g</p>
          </div>
        </div>
      </GlassCard>

      {/* Suggested Meal Breakdown */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Recommended Meals in this Plan</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mealPlanItems.map((dish) => (
            <GlassCard key={dish.id} className="p-0 overflow-hidden flex flex-col justify-between group">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-[#FF6B35] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  Score {dish.healthScore}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] text-cyan-400 font-bold uppercase">{dish.category}</span>
                  <h4 className="font-bold text-sm mt-1">{dish.name}</h4>
                  <p className={`text-xs mt-1 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {dish.description}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-2 font-mono">
                    <span>{dish.macros.calories} kcal</span>
                    <span>• P: {dish.macros.protein}g</span>
                    <span>• C: {dish.macros.carbs}g</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-inherit flex items-center justify-between">
                  <span className="text-sm font-black text-[#FF6B35]">{formatINR(dish.price)}</span>
                  <button
                    onClick={() => addToCart(dish, 1)}
                    className="p-2 rounded-xl bg-[#FF6B35] hover:bg-[#FFA366] text-white transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
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
