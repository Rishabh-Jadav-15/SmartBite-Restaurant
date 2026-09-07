import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { formatINR } from '../../utils/formatters';
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  RotateCcw,
  ChefHat,
  Package,
  MapPin,
  Phone,
} from 'lucide-react';

export const OrdersPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { orders, addToCart } = useAuth();
  const { isDarkMode } = useTheme();
  const [selectedOrderTab, setSelectedOrderTab] = useState<'ACTIVE' | 'HISTORY'>('ACTIVE');

  const activeOrders = orders.filter((o) => o.status !== 'DELIVERED' && o.status !== 'CANCELLED');
  const pastOrders = orders.filter((o) => o.status === 'DELIVERED' || o.status === 'CANCELLED');

  const displayedOrders = selectedOrderTab === 'ACTIVE' ? activeOrders : pastOrders;

  const getStatusStepIndex = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 0;
      case 'PREPARING':
        return 1;
      case 'READY':
        return 2;
      case 'OUT_FOR_DELIVERY':
        return 3;
      case 'DELIVERED':
        return 4;
      default:
        return 0;
    }
  };

  const steps = [
    { label: 'Received', icon: Clock },
    { label: 'Cooking', icon: ChefHat },
    { label: 'Ready', icon: Package },
    { label: 'Dispatched', icon: Truck },
    { label: 'Delivered', icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Order Tracking & History</h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Live kitchen dispatch pipeline and previous invoices in Indian Rupees (₹).
          </p>
        </div>

        {/* Tab pills */}
        <div className="flex items-center gap-2 bg-black/10 dark:bg-white/10 p-1 rounded-xl">
          <button
            onClick={() => setSelectedOrderTab('ACTIVE')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              selectedOrderTab === 'ACTIVE'
                ? 'bg-[#FF6B35] text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Active Orders ({activeOrders.length})
          </button>
          <button
            onClick={() => setSelectedOrderTab('HISTORY')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              selectedOrderTab === 'HISTORY'
                ? 'bg-[#FF6B35] text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Past History ({pastOrders.length})
          </button>
        </div>
      </div>

      {displayedOrders.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FF6B35]/15 text-[#FF6B35] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold">No {selectedOrderTab.toLowerCase()} orders found</h3>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Ready to taste chef-prepared wellness delicacies?
          </p>
          <button
            onClick={() => navigate('/customer/menu')}
            className="px-6 py-2.5 bg-[#FF6B35] text-white text-xs font-bold rounded-xl shadow-lg"
          >
            Browse Food Menu
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {displayedOrders.map((order) => {
            const currentStepIdx = getStatusStepIndex(order.status);

            return (
              <GlassCard key={order.id} className="p-6 space-y-6">
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-inherit">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-black text-[#FF6B35]">{order.orderNumber}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FF6B35]/15 text-[#FF6B35] font-bold uppercase">
                        {order.status}
                      </span>
                      <span className="text-xs text-gray-400">• {order.orderType}</span>
                    </div>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Placed on {order.createdAt} • ETA: {order.estimatedTime}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-lg font-black text-[#FF6B35]">{formatINR(order.total, true)}</span>
                    <p className="text-[10px] text-gray-400">Paid via {order.paymentMethod}</p>
                  </div>
                </div>

                {/* Progress Steps for Active orders */}
                {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
                  <div className="py-2">
                    <div className="grid grid-cols-5 gap-2">
                      {steps.map((step, sIdx) => {
                        const Icon = step.icon;
                        const isDone = sIdx <= currentStepIdx;
                        const isCurrent = sIdx === currentStepIdx;

                        return (
                          <div key={sIdx} className="flex flex-col items-center text-center space-y-1.5">
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                                isCurrent
                                  ? 'bg-[#FF6B35] text-white ring-4 ring-[#FF6B35]/30 shadow-lg animate-pulse'
                                  : isDone
                                  ? 'bg-green-500 text-white'
                                  : 'bg-black/10 dark:bg-white/10 text-gray-400'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className={`text-[10px] font-bold ${isCurrent ? 'text-[#FF6B35]' : isDone ? 'text-white' : 'text-gray-500'}`}>
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Items in order */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ordered Items</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-xl border flex items-center gap-3 ${
                          isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/5'
                        }`}
                      >
                        <img
                          src={item.foodItem.image}
                          alt={item.foodItem.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-xs truncate">{item.foodItem.name}</h5>
                          <p className="text-[11px] text-gray-400">Qty: {item.quantity} • {formatINR(item.foodItem.price)} each</p>
                        </div>
                        <span className="text-xs font-bold text-[#FF6B35]">
                          {formatINR(item.foodItem.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery details & Re-order action */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-inherit text-xs">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4 text-[#FF6B35]" />
                    <span>{order.deliveryAddress || order.tableNumber || 'Bangalore Fine Dine Table'}</span>
                  </div>

                  <button
                    onClick={() => {
                      order.items.forEach((it) => addToCart(it.foodItem, it.quantity));
                      navigate('/customer/cart');
                    }}
                    className="px-4 py-2 bg-[#FF6B35]/15 hover:bg-[#FF6B35] text-[#FF6B35] hover:text-white font-bold rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Re-order Items (₹)</span>
                  </button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
};
