import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { formatINR } from '../../utils/formatters';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export const CartPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { cart, updateQuantity, removeFromCart, clearCart, cartSubtotal, cartCount } = useAuth();
  const { isDarkMode } = useTheme();

  const gstTax = cartSubtotal * 0.05; // 5% GST in INR
  const deliveryFee = cartSubtotal > 0 ? (cartSubtotal > 500 ? 0 : 40) : 0;
  const discount = cartSubtotal > 600 ? 50 : 0;
  const total = Math.max(0, cartSubtotal + gstTax + deliveryFee - discount);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#FF6B35]/15 text-[#FF6B35] flex items-center justify-center">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
        <p className={`text-xs max-w-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Explore our AI-recommended gourmet Indian dishes and health-conscious bowls!
        </p>
        <button
          onClick={() => navigate('/customer/menu')}
          className="px-6 py-3 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-xl shadow-lg transition-all"
        >
          Browse Full Menu (₹)
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Order Cart</h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Review items, customize quantities, and proceed to secure checkout in Indian Rupees (₹).
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-red-500 hover:underline flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map(({ foodItem, quantity }) => (
            <GlassCard key={foodItem.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={foodItem.image}
                  alt={foodItem.name}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#FF6B35] uppercase">{foodItem.category}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/15 text-green-400 font-bold">
                      Score {foodItem.healthScore}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm leading-tight">{foodItem.name}</h3>
                  <p className="text-xs font-bold text-[#FF6B35]">{formatINR(foodItem.price)}</p>
                  <p className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {foodItem.macros.calories} kcal • Protein {foodItem.macros.protein}g
                  </p>
                </div>
              </div>

              {/* Quantity controls and item total */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                <span className="font-extrabold text-sm text-[#FF6B35]">
                  {formatINR(foodItem.price * quantity)}
                </span>

                <div className="flex items-center gap-2 bg-black/10 dark:bg-white/10 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(foodItem.id, quantity - 1)}
                    className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold px-2">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(foodItem.id, quantity + 1)}
                    className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(foodItem.id)}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                >
                  Remove
                </button>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Price & Summary Checkout Card */}
        <div>
          <GlassCard className="p-6 space-y-5 sticky top-20">
            <h3 className="text-base font-bold pb-2 border-b border-inherit">Order Summary</h3>

            {/* Promo Code Pill */}
            <div className="flex items-center gap-2">
              <div className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-xl border text-xs ${
                isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/10'
              }`}>
                <Tag className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span className="font-mono font-bold text-[#FF6B35]">SMARTWELL50</span>
                <span className="text-[10px] text-green-500 font-bold ml-auto">APPLIED</span>
              </div>
            </div>

            {/* Line items breakdown */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal ({cartCount} items)</span>
                <span className="font-semibold">{formatINR(cartSubtotal, true)}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>GST (5% ₹)</span>
                <span className="font-semibold">{formatINR(gstTax, true)}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Delivery Partner Fee</span>
                <span className="font-semibold">
                  {deliveryFee === 0 ? <span className="text-green-500 font-bold">FREE (Orders &gt; ₹500)</span> : formatINR(deliveryFee, true)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-500">
                  <span>AI Wellness Savings (₹)</span>
                  <span className="font-bold">-{formatINR(discount, true)}</span>
                </div>
              )}
              <div className={`border-t pt-3 mt-3 flex justify-between text-base font-bold ${
                isDarkMode ? 'border-white/10' : 'border-black/10'
              }`}>
                <span>Total Amount (₹)</span>
                <span className="text-xl text-[#FF6B35] font-black">{formatINR(total, true)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/customer/checkout')}
              className="w-full py-3.5 bg-[#FF6B35] hover:bg-[#FFA366] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#FF6B35]/25 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-102"
            >
              <span>Proceed to Checkout (₹)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>UPI, Cards & NetBanking Supported</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
