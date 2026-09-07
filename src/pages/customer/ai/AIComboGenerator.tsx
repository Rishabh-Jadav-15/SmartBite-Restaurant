import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../hooks/useTheme';
import { GlassCard } from '../../../components/common/GlassCard';
import { formatINR } from '../../../utils/formatters';
import {
  Layers,
  Sparkles,
  Plus,
  ArrowRight,
  HeartPulse,
  Flame,
  CheckCircle2,
  Tag,
} from 'lucide-react';

export const AIComboGenerator: React.FC = () => {
  const { menuItems, addToCart } = useAuth();
  const { isDarkMode } = useTheme();

  const combos = [
    {
      id: 'combo-1',
      name: 'Cardio-Metabolic Power Bundle',
      desc: 'Pairing Foxtail Millet Khichdi with Kokum Chia Elixir boosts dietary fiber while active garcinol accelerates cellular digestion.',
      dish1: menuItems.find((d) => d.id === 'm1') || menuItems[0],
      dish2: menuItems.find((d) => d.id === 'm6') || menuItems[1],
      healthScore: 98,
      originalPrice: 340 + 160,
      comboPrice: 425, // ₹ 75 savings
      savings: 75,
      synergyBadge: '100% Bioavailable',
    },
    {
      id: 'combo-2',
      name: 'High-Protein Tandoori Feast',
      desc: 'Smoked Malai Soya Chaap paired with Sprouted Moong Salad creates a 42g complete amino acid chain.',
      dish1: menuItems.find((d) => d.id === 'm2') || menuItems[0],
      dish2: menuItems.find((d) => d.id === 'm3') || menuItems[1],
      healthScore: 94,
      originalPrice: 320 + 260,
      comboPrice: 490, // ₹ 90 savings
      savings: 90,
      synergyBadge: '42g Complete Protein',
    },
    {
      id: 'combo-3',
      name: 'Ayurvedic Anti-Inflammatory Lunch',
      desc: 'Keto Palak Paneer paired with Moringa Infused Roti stimulates microcirculation and minimizes inflammatory prostaglandins.',
      dish1: menuItems.find((d) => d.id === 'm4') || menuItems[0],
      dish2: menuItems.find((d) => d.id === 'm7') || menuItems[1],
      healthScore: 96,
      originalPrice: 380 + 80,
      comboPrice: 399, // ₹ 61 savings
      savings: 61,
      synergyBadge: 'High Curcumin & Iron',
    },
  ];

  const handleAddCombo = (combo: typeof combos[0]) => {
    addToCart(combo.dish1, 1);
    addToCart(combo.dish2, 1);
  };

  return (
    <div className="space-y-8 pb-16">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#FF6B35]/15 text-[#FF6B35] border border-[#FF6B35]/30 mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>Synergistic Nutrition Synthesis</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">AI Smart Combo Generator</h1>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Algorithmically paired gourmet dishes engineered for nutrient synergy and bundled savings in Indian Rupees (₹).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {combos.map((combo) => (
          <GlassCard key={combo.id} className="p-0 overflow-hidden flex flex-col justify-between group">
            {/* 2-image split banner */}
            <div className="relative h-48 grid grid-cols-2 gap-0.5 overflow-hidden">
              <img src={combo.dish1.image} alt={combo.dish1.name} className="w-full h-full object-cover" />
              <img src={combo.dish2.image} alt={combo.dish2.name} className="w-full h-full object-cover" />
              
              <div className="absolute top-3 left-3 bg-[#FF6B35] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                Save {formatINR(combo.savings)}
              </div>

              <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded border border-cyan-500/30">
                {combo.synergyBadge}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">Score {combo.healthScore}/100</span>
                  <span className="text-[10px] text-gray-400">2 Items Paired</span>
                </div>
                <h3 className="font-bold text-base">{combo.name}</h3>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {combo.desc}
                </p>

                <div className={`p-3 rounded-xl border text-xs space-y-1 ${
                  isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/5'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                    <span className="truncate">{combo.dish1.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="truncate">{combo.dish2.name}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-inherit flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-[#FF6B35]">{formatINR(combo.comboPrice)}</span>
                    <span className="text-xs line-through text-gray-400">{formatINR(combo.originalPrice)}</span>
                  </div>
                  <span className="text-[10px] text-green-500 font-bold">Includes 5% GST</span>
                </div>

                <button
                  onClick={() => handleAddCombo(combo)}
                  className="px-4 py-2 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-xl shadow transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Combo (₹)</span>
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
