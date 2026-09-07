import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../hooks/useTheme';
import { GlassCard } from '../../../components/common/GlassCard';
import { formatINR } from '../../../utils/formatters';
import {
  Activity,
  Heart,
  ShieldCheck,
  Plus,
  Flame,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from 'lucide-react';

export const AIDiseaseRecommendation: React.FC = () => {
  const { menuItems, addToCart } = useAuth();
  const { isDarkMode } = useTheme();

  const [selectedCondition, setSelectedCondition] = useState<string>('Type-2 Diabetes');

  const conditions = [
    {
      id: 'Type-2 Diabetes',
      name: 'Type-2 Diabetes & Insulin Resistance',
      description: 'Focuses on ultra-low glycemic index carbs, soluble fiber, complex millets, and slow-release glucose curves.',
      keyBeneficialNutrients: ['Soluble Fiber (>8g)', 'Magnesium', 'Chromium', 'Alpha-Lipoic Acid'],
      bannedCompounds: ['Refined Flour (Maida)', 'High Fructose Corn Syrup', 'Deep-Fried Starches'],
    },
    {
      id: 'Hypertension',
      name: 'Hypertension & Cardiovascular Health',
      description: 'Emphasizes high potassium-to-sodium ratio, pink Himalayan salt limits, A2 cow ghee, and dietary nitrates.',
      keyBeneficialNutrients: ['Potassium (>400mg)', 'Nitrates (Beetroot/Spinach)', 'Omega-3 ALA', 'Garlic Allicin'],
      bannedCompounds: ['Excess Commercial Table Salt', 'Trans Fats', 'Artificial Preservatives'],
    },
    {
      id: 'PCOS',
      name: 'PCOS & Hormonal Balance',
      description: 'Anti-inflammatory formulation to regulate androgen levels, promote gut microflora, and stabilize insulin spikes.',
      keyBeneficialNutrients: ['Inositol', 'Zinc', 'Vitamin D3 / K2 Cofactors', 'Flaxseed Lignans'],
      bannedCompounds: ['Dairy with A1 Casein', 'Refined Sugars', 'Saturated Palm Oil'],
    },
    {
      id: 'IBS',
      name: 'IBS & Gastrointestinal Sensitivity',
      description: 'Low FODMAP certified botanical cuisine with Kokum, sprouted pulses, bloomed chia seeds, and hing.',
      keyBeneficialNutrients: ['Prebiotics (Sprouted Moong)', 'Kokum Garcinol', 'Bloomed Chia Mucilage'],
      bannedCompounds: ['Raw Onions & Garlic (High FODMAP)', 'Artificial Sweeteners', 'Carbonation'],
    },
  ];

  const currentConditionData = conditions.find((c) => c.id === selectedCondition) || conditions[0];

  const recommendedDishes = menuItems.filter((dish) =>
    dish.suitableForConditions.some((cond) => cond.toLowerCase().includes(selectedCondition.toLowerCase()))
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-2">
          <Activity className="w-3.5 h-3.5" />
          <span>Clinical Nutrition Protocol</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">AI Medical Nutrition Engine</h1>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Select clinical diagnoses or metabolic biomarkers to filter chef-crafted dishes backed by ICMR nutritional standards.
        </p>
      </div>

      {/* Disease Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {conditions.map((c) => {
          const isSelected = selectedCondition === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCondition(c.id)}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg scale-102 ring-1 ring-emerald-500'
                  : isDarkMode
                  ? 'bg-[#1A1A1A] border-white/10 text-gray-400 hover:bg-white/5'
                  : 'bg-white border-black/10 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="font-bold text-xs">{c.name}</span>
              <span className="text-[10px] text-emerald-400 mt-2 font-semibold">Active Bio-Filter</span>
            </button>
          );
        })}
      </div>

      {/* Disease Rationale Glass Card */}
      <GlassCard className="p-6 space-y-4 border-emerald-500/30 bg-emerald-500/5">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <ShieldCheck className="w-4 h-4" />
          <span>Clinical Formulation Strategy: {currentConditionData.name}</span>
        </div>
        <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {currentConditionData.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-green-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Target Therapeutic Nutrients</span>
            </span>
            <ul className="text-xs space-y-0.5 text-gray-300">
              {currentConditionData.keyBeneficialNutrients.map((nut, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-green-400" />
                  <span>{nut}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-red-400 flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5" />
              <span>Excluded / Contraindicated Elements</span>
            </span>
            <ul className="text-xs space-y-0.5 text-gray-300">
              {currentConditionData.bannedCompounds.map((comp, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-red-400" />
                  <span>{comp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </GlassCard>

      {/* Recommended Dishes Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Recommended Clinical Menu Matches ({recommendedDishes.length})</h2>
          <span className="text-xs text-gray-400">All prices in Indian Rupees (₹)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedDishes.map((dish) => (
            <GlassCard key={dish.id} className="p-0 overflow-hidden flex flex-col justify-between group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  Clinical Score: {dish.healthScore}/100
                </div>
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded">
                  GI: {dish.glycemicIndex}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{dish.category}</span>
                    <span className="text-emerald-400 font-semibold">{dish.cuisine}</span>
                  </div>

                  <h3 className="font-bold text-base mt-1">{dish.name}</h3>
                  <p className={`text-xs mt-1.5 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {dish.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {dish.suitableForConditions.map((cond, i) => (
                      <span
                        key={i}
                        className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                          cond.toLowerCase().includes(selectedCondition.toLowerCase())
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-black/10 dark:bg-white/10 text-gray-400'
                        }`}
                      >
                        {cond}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-inherit flex items-center justify-between">
                  <div>
                    <span className="text-base font-black text-[#FF6B35]">{formatINR(dish.price)}</span>
                    <span className="text-[10px] text-gray-400 block font-mono">
                      {dish.macros.calories} kcal • P: {dish.macros.protein}g
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(dish, 1)}
                    className="px-4 py-2 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-xl shadow transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add (₹)</span>
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
