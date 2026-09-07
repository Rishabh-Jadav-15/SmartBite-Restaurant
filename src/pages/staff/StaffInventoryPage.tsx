import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { formatINR } from '../../utils/formatters';
import {
  Package,
  AlertTriangle,
  CheckCircle2,
  Plus,
  RefreshCw,
  TrendingDown,
  DollarSign,
} from 'lucide-react';

export const StaffInventoryPage: React.FC = () => {
  const { inventory, updateInventoryStock } = useAuth();
  const { isDarkMode } = useTheme();
  const [restockedNotice, setRestockedNotice] = useState<string | null>(null);

  const handleRestock = (id: string, name: string, addQty: number) => {
    updateInventoryStock(id, addQty);
    setRestockedNotice(`Restocked ${name} (+${addQty})`);
    setTimeout(() => setRestockedNotice(null), 2500);
  };

  return (
    <div className="space-y-6 pb-16">
      {restockedNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-500 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{restockedNotice}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Kitchen Raw Materials Inventory</h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Live ingredient stock levels, threshold limits, and fast vendor purchase orders in INR (₹).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.map((item) => {
          const isCritical = item.status === 'CRITICAL' || item.status === 'LOW';

          return (
            <GlassCard
              key={item.id}
              className={`p-5 space-y-4 flex flex-col justify-between ${
                item.status === 'CRITICAL'
                  ? 'border-red-500/40 bg-red-500/5'
                  : item.status === 'LOW'
                  ? 'border-amber-500/40 bg-amber-500/5'
                  : ''
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">{item.category}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      item.status === 'IN_STOCK'
                        ? 'bg-green-500/20 text-green-400'
                        : item.status === 'LOW'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-red-500/20 text-red-400 animate-pulse'
                    }`}
                  >
                    {item.status.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="font-bold text-base">{item.name}</h3>

                {/* Stock Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Current: {item.currentStock} {item.unit}</span>
                    <span className="text-gray-400">Min: {item.minThreshold} {item.unit}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        item.status === 'IN_STOCK' ? 'bg-green-500' : item.status === 'LOW' ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(100, (item.currentStock / (item.minThreshold * 2.5)) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs pt-2">
                  <span className="text-gray-400">Unit Cost (₹):</span>
                  <span className="font-bold text-[#FF6B35]">{formatINR(item.unitCost)} / {item.unit}</span>
                </div>
              </div>

              {/* Fast replenish button */}
              <div className="pt-3 border-t border-inherit flex gap-2">
                <button
                  onClick={() => handleRestock(item.id, item.name, 10)}
                  className="flex-1 py-2 bg-[#FF6B35] hover:bg-[#FFA366] text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Restock +10 {item.unit}</span>
                </button>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};
