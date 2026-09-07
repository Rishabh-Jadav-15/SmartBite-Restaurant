import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { formatINR } from '../../utils/formatters';
import {
  ChefHat,
  Clock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  CalendarDays,
  Utensils,
  ArrowRight,
  TrendingUp,
  Flame,
} from 'lucide-react';

export const StaffDashboard: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { orders, reservations, inventory, user, updateOrderStatus } = useAuth();
  const { isDarkMode } = useTheme();

  const pendingOrders = orders.filter((o) => o.status === 'PENDING');
  const cookingOrders = orders.filter((o) => o.status === 'PREPARING');
  const readyOrders = orders.filter((o) => o.status === 'READY');
  const lowStockItems = inventory.filter((i) => i.status === 'LOW' || i.status === 'CRITICAL');

  return (
    <div className="space-y-8 pb-16">
      {/* Welcome Staff Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-[#FF6B35]/20 border border-amber-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <ChefHat className="w-3.5 h-3.5" />
            <span>Kitchen Display System (KDS) Live</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Kitchen Operations • {user?.name || 'Head Chef'}
          </h1>
          <p className={`text-xs sm:text-sm max-w-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Live order queue active. Average prep speed: 12.4 minutes. All dietary allergy cross-checks running.
          </p>
        </div>

        <button
          onClick={() => navigate('/staff/kitchen')}
          className="px-6 py-3 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#FF6B35]/30 flex items-center gap-2 transition-all cursor-pointer hover:scale-105"
        >
          <Layers className="w-4 h-4" />
          <span>Open Full Kanban KDS</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Real-Time Metric Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Incoming Tickets</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-amber-400">{pendingOrders.length}</p>
          <p className="text-[11px] text-gray-400">Needs immediate chef accept</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Active Cooking</span>
            <Flame className="w-4 h-4 text-[#FF6B35]" />
          </div>
          <p className="text-2xl font-black text-[#FF6B35]">{cookingOrders.length}</p>
          <p className="text-[11px] text-gray-400">On stove / tandoor</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Ready for Expeditor</span>
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-2xl font-black text-green-400">{readyOrders.length}</p>
          <p className="text-[11px] text-gray-400">Plated & garnished</p>
        </GlassCard>

        <GlassCard className="p-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Low Raw Inventory</span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <p className="text-2xl font-black text-red-400">{lowStockItems.length} SKUs</p>
          <p className="text-[11px] text-gray-400">Restock notification sent</p>
        </GlassCard>
      </div>

      {/* Live Kanban Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <span>Priority Live Order Stream</span>
          </h2>
          <button
            onClick={() => navigate('/staff/kitchen')}
            className="text-xs font-bold text-[#FF6B35] hover:underline flex items-center gap-1"
          >
            <span>Full KDS Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pending Column */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2 text-xs font-bold text-amber-400">
              <span>RECEIVED ({pendingOrders.length})</span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            </div>

            {pendingOrders.length === 0 ? (
              <div className="p-6 rounded-2xl border border-dashed border-white/10 text-center text-xs text-gray-400">
                No new orders waiting
              </div>
            ) : (
              pendingOrders.map((order) => (
                <GlassCard key={order.id} className="p-4 space-y-3 border-amber-500/30">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs">{order.orderNumber}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">
                      {order.orderType}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between font-semibold">
                        <span>{it.quantity}x {it.foodItem.name}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => updateOrderStatus(order.id, 'PREPARING')}
                    className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs rounded-xl shadow transition-all cursor-pointer"
                  >
                    Start Cooking →
                  </button>
                </GlassCard>
              ))
            )}
          </div>

          {/* Cooking Column */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2 text-xs font-bold text-[#FF6B35]">
              <span>COOKING ({cookingOrders.length})</span>
              <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse" />
            </div>

            {cookingOrders.length === 0 ? (
              <div className="p-6 rounded-2xl border border-dashed border-white/10 text-center text-xs text-gray-400">
                No active cooking tickets
              </div>
            ) : (
              cookingOrders.map((order) => (
                <GlassCard key={order.id} className="p-4 space-y-3 border-[#FF6B35]/40">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs">{order.orderNumber}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF6B35]/20 text-[#FF6B35] font-bold">
                      {order.tableNumber || 'Delivery'}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between font-semibold">
                        <span>{it.quantity}x {it.foodItem.name}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => updateOrderStatus(order.id, 'READY')}
                    className="w-full py-2 bg-[#FF6B35] hover:bg-[#FFA366] text-white font-bold text-xs rounded-xl shadow transition-all cursor-pointer"
                  >
                    Mark Ready for Pickup →
                  </button>
                </GlassCard>
              ))
            )}
          </div>

          {/* Ready Column */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2 text-xs font-bold text-green-400">
              <span>READY ({readyOrders.length})</span>
              <span className="w-2 h-2 rounded-full bg-green-400" />
            </div>

            {readyOrders.length === 0 ? (
              <div className="p-6 rounded-2xl border border-dashed border-white/10 text-center text-xs text-gray-400">
                No orders waiting for pickup
              </div>
            ) : (
              readyOrders.map((order) => (
                <GlassCard key={order.id} className="p-4 space-y-3 border-green-500/30">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs">{order.orderNumber}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/20 text-green-400 font-bold">
                      {order.orderType}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between font-semibold">
                        <span>{it.quantity}x {it.foodItem.name}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => updateOrderStatus(order.id, 'OUT_FOR_DELIVERY')}
                    className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-bold text-xs rounded-xl shadow transition-all cursor-pointer"
                  >
                    Dispatch / Serve Table
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
