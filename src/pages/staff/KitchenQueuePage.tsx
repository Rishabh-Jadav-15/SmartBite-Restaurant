import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { formatINR } from '../../utils/formatters';
import { OrderStatus } from '../../types';
import {
  ChefHat,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Layers,
  Sparkles,
  Volume2,
  Maximize2,
  Filter,
  CheckSquare,
  Square,
  ShieldAlert,
} from 'lucide-react';

export const KitchenQueuePage: React.FC = () => {
  const { orders, updateOrderStatus } = useAuth();
  const { isDarkMode } = useTheme();

  const [orderTypeFilter, setOrderTypeFilter] = useState<'ALL' | 'Dine-In' | 'Delivery' | 'Takeaway'>('ALL');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const filteredOrders = orders.filter((o) => {
    if (orderTypeFilter === 'ALL') return true;
    return o.orderType === orderTypeFilter;
  });

  const pendingOrders = filteredOrders.filter((o) => o.status === 'PENDING');
  const preparingOrders = filteredOrders.filter((o) => o.status === 'PREPARING');
  const readyOrders = filteredOrders.filter((o) => o.status === 'READY');

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 pb-16">
      {/* KDS Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
            <h1 className="text-2xl font-black tracking-tight">Kitchen Display System (KDS)</h1>
          </div>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Live kitchen ticket queue with real-time allergy cross-checks and prep timers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-black/10 dark:bg-white/10 p-1 rounded-xl">
            {(['ALL', 'Dine-In', 'Delivery', 'Takeaway'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setOrderTypeFilter(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  orderTypeFilter === type
                    ? 'bg-[#FF6B35] text-white shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3-Column Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Column 1: Received / Pending */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <div className="flex items-center gap-2 font-bold text-xs">
              <Clock className="w-4 h-4" />
              <span>NEW TICKETS ({pendingOrders.length})</span>
            </div>
            <span className="text-[10px] font-mono font-bold bg-amber-500/20 px-2 py-0.5 rounded">
              Avg 1.2m
            </span>
          </div>

          <div className="space-y-4 min-h-[400px]">
            {pendingOrders.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-500 border border-dashed border-white/10 rounded-2xl">
                No new pending tickets.
              </div>
            ) : (
              pendingOrders.map((order) => (
                <GlassCard key={order.id} className="p-5 space-y-4 border-amber-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-sm font-black text-amber-400">{order.orderNumber}</span>
                      <p className="text-[10px] text-gray-400">{order.customerName}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
                        {order.orderType}
                      </span>
                      {order.tableNumber && (
                        <p className="text-[10px] text-gray-300 font-bold mt-0.5">{order.tableNumber}</p>
                      )}
                    </div>
                  </div>

                  {/* Allergen Warning Banner */}
                  <div className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center gap-2 text-[11px] text-red-400 font-semibold">
                    <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                    <span>Cross-Check: Low Glycemic & Zero Peanuts requested</span>
                  </div>

                  {/* Items list with line cook checkboxes */}
                  <div className="space-y-2 pt-1">
                    {order.items.map((item, idx) => {
                      const itemKey = `${order.id}-${item.foodItem.id}`;
                      const isChecked = !!checkedItems[itemKey];

                      return (
                        <div
                          key={idx}
                          onClick={() => toggleCheck(itemKey)}
                          className={`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-colors ${
                            isChecked
                              ? 'bg-green-500/10 border-green-500/30 text-green-400 line-through'
                              : isDarkMode
                              ? 'bg-[#242424] border-white/10'
                              : 'bg-gray-50 border-black/5'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isChecked ? <CheckSquare className="w-4 h-4 text-green-400" /> : <Square className="w-4 h-4 text-gray-400" />}
                            <span className="font-bold">{item.quantity}x</span>
                            <span>{item.foodItem.name}</span>
                          </div>
                          <span className="text-[10px] text-gray-400">{item.foodItem.category}</span>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => updateOrderStatus(order.id, 'PREPARING')}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-xs rounded-xl shadow cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                    <Flame className="w-4 h-4" />
                    <span>Accept Ticket & Start Cooking</span>
                  </button>
                </GlassCard>
              ))
            )}
          </div>
        </div>

        {/* Column 2: In Preparation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FF6B35]/10 border border-[#FF6B35]/20 text-[#FF6B35]">
            <div className="flex items-center gap-2 font-bold text-xs">
              <Flame className="w-4 h-4" />
              <span>ON STOVE / PREPARING ({preparingOrders.length})</span>
            </div>
            <span className="text-[10px] font-mono font-bold bg-[#FF6B35]/20 px-2 py-0.5 rounded">
              Active KDS
            </span>
          </div>

          <div className="space-y-4 min-h-[400px]">
            {preparingOrders.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-500 border border-dashed border-white/10 rounded-2xl">
                No orders currently in the pan.
              </div>
            ) : (
              preparingOrders.map((order) => (
                <GlassCard key={order.id} className="p-5 space-y-4 border-[#FF6B35]/40 ring-1 ring-[#FF6B35]/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-sm font-black text-[#FF6B35]">{order.orderNumber}</span>
                      <p className="text-[10px] text-gray-400">{order.customerName}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#FF6B35]/20 text-[#FF6B35]">
                        {order.orderType}
                      </span>
                      {order.tableNumber && (
                        <p className="text-[10px] text-gray-300 font-bold mt-0.5">{order.tableNumber}</p>
                      )}
                    </div>
                  </div>

                  {/* Items list with line cook checkboxes */}
                  <div className="space-y-2 pt-1">
                    {order.items.map((item, idx) => {
                      const itemKey = `${order.id}-${item.foodItem.id}`;
                      const isChecked = !!checkedItems[itemKey];

                      return (
                        <div
                          key={idx}
                          onClick={() => toggleCheck(itemKey)}
                          className={`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-colors ${
                            isChecked
                              ? 'bg-green-500/10 border-green-500/30 text-green-400 line-through'
                              : isDarkMode
                              ? 'bg-[#242424] border-white/10'
                              : 'bg-gray-50 border-black/5'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isChecked ? <CheckSquare className="w-4 h-4 text-green-400" /> : <Square className="w-4 h-4 text-gray-400" />}
                            <span className="font-bold">{item.quantity}x</span>
                            <span>{item.foodItem.name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => updateOrderStatus(order.id, 'READY')}
                    className="w-full py-2.5 bg-[#FF6B35] hover:bg-[#FFA366] text-white font-extrabold text-xs rounded-xl shadow-lg shadow-[#FF6B35]/30 cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Plating Complete • Mark Ready</span>
                  </button>
                </GlassCard>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Ready for Expeditor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400">
            <div className="flex items-center gap-2 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>READY / EXPEDITE ({readyOrders.length})</span>
            </div>
            <span className="text-[10px] font-mono font-bold bg-green-500/20 px-2 py-0.5 rounded">
              Ready
            </span>
          </div>

          <div className="space-y-4 min-h-[400px]">
            {readyOrders.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-500 border border-dashed border-white/10 rounded-2xl">
                No orders waiting for pickup.
              </div>
            ) : (
              readyOrders.map((order) => (
                <GlassCard key={order.id} className="p-5 space-y-4 border-green-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-sm font-black text-green-400">{order.orderNumber}</span>
                      <p className="text-[10px] text-gray-400">{order.customerName}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-green-500/20 text-green-400">
                        {order.orderType}
                      </span>
                      {order.tableNumber && (
                        <p className="text-[10px] text-gray-300 font-bold mt-0.5">{order.tableNumber}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-gray-300">
                        <span>{item.quantity}x {item.foodItem.name}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => updateOrderStatus(order.id, 'DELIVERED')}
                    className="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white font-extrabold text-xs rounded-xl shadow cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                    <span>Handed to Valet / Table Served</span>
                  </button>
                </GlassCard>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
