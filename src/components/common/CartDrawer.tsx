import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { formatINR } from '../../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onProceedToCheckout,
}) => {
  const { cart, updateQuantity, removeFromCart, clearCart, cartSubtotal, cartCount } = useAuth();
  const { isDarkMode } = useTheme();

  const gstTax = cartSubtotal * 0.05; // 5% GST
  const deliveryFee = cartSubtotal > 0 ? (cartSubtotal > 500 ? 0 : 40) : 0;
  const discount = cartSubtotal > 600 ? 50 : 0;
  const total = Math.max(0, cartSubtotal + gstTax + deliveryFee - discount);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className={`w-screen max-w-md flex flex-col shadow-2xl ${
                isDarkMode ? 'bg-[#1A1A1A] border-l border-white/10 text-white' : 'bg-white border-l border-black/10 text-[#0F0F0F]'
              }`}
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-inherit flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/15 flex items-center justify-center text-[#FF6B35]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Your Order Cart</h2>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {cartCount} {cartCount === 1 ? 'item' : 'items'} selected
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      title="Clear Cart"
                      className={`p-2 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                        isDarkMode ? 'text-gray-400 hover:text-red-400 hover:bg-white/5' : 'text-gray-500 hover:text-red-600 hover:bg-black/5'
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className={`p-2 rounded-full transition-colors ${
                      isDarkMode ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-black/5 text-gray-600'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center text-[#FF6B35]">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base">Your cart is empty</h3>
                      <p className={`text-xs mt-1 max-w-[220px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Explore our AI-recommended gourmet Indian dishes and health-conscious bowls!
                      </p>
                    </div>
                  </div>
                ) : (
                  cart.map(({ foodItem, quantity }) => (
                    <motion.div
                      layout
                      key={foodItem.id}
                      className={`p-3.5 rounded-xl border flex gap-3.5 items-center transition-all ${
                        isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/5'
                      }`}
                    >
                      <img
                        src={foodItem.image}
                        alt={foodItem.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-semibold text-sm truncate leading-tight">{foodItem.name}</h4>
                          <button
                            onClick={() => removeFromCart(foodItem.id)}
                            className="text-gray-400 hover:text-red-500 p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-[#FF6B35]">{formatINR(foodItem.price)}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                            foodItem.healthScore >= 90 ? 'bg-green-500/15 text-green-400' : 'bg-orange-500/15 text-orange-400'
                          }`}>
                            Score {foodItem.healthScore}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {foodItem.macros.calories} kcal
                          </span>
                          <div className="flex items-center gap-2 bg-black/20 dark:bg-white/10 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(foodItem.id, quantity - 1)}
                              className="w-5 h-5 rounded flex items-center justify-center hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold px-1">{quantity}</span>
                            <button
                              onClick={() => updateQuantity(foodItem.id, quantity + 1)}
                              className="w-5 h-5 rounded flex items-center justify-center hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Price Breakdown & Checkout */}
              {cart.length > 0 && (
                <div className={`p-6 border-t ${isDarkMode ? 'border-white/10 bg-[#151515]' : 'border-black/10 bg-gray-50'}`}>
                  <div className="space-y-2 text-xs mb-4">
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Item Subtotal (₹)</span>
                      <span className="font-semibold">{formatINR(cartSubtotal, true)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>GST (5% ₹)</span>
                      <span className="font-semibold">{formatINR(gstTax, true)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Delivery Fee (₹)</span>
                      <span className="font-semibold">
                        {deliveryFee === 0 ? <span className="text-green-500 font-bold">FREE</span> : formatINR(deliveryFee, true)}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-500">
                        <span>AI Wellness Discount (₹)</span>
                        <span className="font-bold">-{formatINR(discount, true)}</span>
                      </div>
                    )}
                    <div className={`border-t pt-2 mt-2 flex justify-between text-sm font-bold ${
                      isDarkMode ? 'border-white/10' : 'border-black/10'
                    }`}>
                      <span>Total Amount (₹)</span>
                      <span className="text-base text-[#FF6B35] font-extrabold">{formatINR(total, true)}</span>
                    </div>
                  </div>

                  <button
                    id="cart-proceed-checkout-btn"
                    onClick={() => {
                      onClose();
                      onProceedToCheckout();
                    }}
                    className="w-full py-3.5 px-4 bg-[#FF6B35] hover:bg-[#FFA366] text-white font-bold rounded-xl shadow-lg shadow-[#FF6B35]/25 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-gray-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                    <span>Safe & Secure UPI / Card Payments</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
