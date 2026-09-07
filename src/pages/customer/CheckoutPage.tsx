import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { formatINR } from '../../utils/formatters';
import { Order } from '../../types';
import {
  MapPin,
  CreditCard,
  QrCode,
  Smartphone,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

export const CheckoutPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { cart, cartSubtotal, cartCount, createOrder, user } = useAuth();
  const { isDarkMode } = useTheme();

  const [orderType, setOrderType] = useState<'Delivery' | 'Dine-In' | 'Takeaway'>('Delivery');
  const [selectedAddress, setSelectedAddress] = useState('Flat 402, Prestige Palms, Indiranagar, Bengaluru, 560038');
  const [customAddress, setCustomAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('Table T-04');
  const [paymentMethod, setPaymentMethod] = useState<'UPI (GPay/PhonePe)' | 'Credit/Debit Card' | 'NetBanking' | 'Cash on Delivery'>('UPI (GPay/PhonePe)');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const gstTax = cartSubtotal * 0.05;
  const deliveryFee = orderType === 'Delivery' ? (cartSubtotal > 500 ? 0 : 40) : 0;
  const discount = cartSubtotal > 600 ? 50 : 0;
  const total = Math.max(0, cartSubtotal + gstTax + deliveryFee - discount);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const newOrder = createOrder({
        userId: user?.id || 'usr-guest',
        customerName: user?.name || 'Aarav Sharma',
        customerPhone: user?.phone || '+91 98765 43210',
        customerEmail: user?.email || 'aarav.sharma@example.com',
        items: [...cart],
        subtotal: cartSubtotal,
        tax: gstTax,
        deliveryFee,
        discount,
        total,
        status: 'PENDING',
        orderType,
        tableNumber: orderType === 'Dine-In' ? tableNumber : undefined,
        deliveryAddress: orderType === 'Delivery' ? (customAddress || selectedAddress) : undefined,
        paymentMethod,
        paymentStatus: paymentMethod === 'Cash on Delivery' ? 'PENDING' : 'PAID',
        estimatedTime: orderType === 'Delivery' ? '30-35 mins' : '15-20 mins',
      });

      setIsProcessing(false);
      setConfirmedOrder(newOrder);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF6B35', '#FFA366', '#00D9FF', '#22C55E'],
        });
      } catch {}
    }, 1200);
  };

  if (confirmedOrder) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <GlassCard className="max-w-lg w-full p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mx-auto shadow-lg shadow-green-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs uppercase font-mono font-bold text-green-500 tracking-wider">
              Payment Verified • Order Dispatched to Kitchen KDS
            </span>
            <h2 className="text-2xl font-black">Order Placed Successfully!</h2>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Order Reference <span className="font-mono font-bold text-white">{confirmedOrder.orderNumber}</span>
            </p>
          </div>

          <div className={`p-4 rounded-2xl border text-left text-xs space-y-2 ${
            isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/10'
          }`}>
            <div className="flex justify-between">
              <span className="text-gray-400">Order Mode:</span>
              <span className="font-bold">{confirmedOrder.orderType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Estimated Fulfillment:</span>
              <span className="font-bold text-cyan-400">{confirmedOrder.estimatedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Paid via:</span>
              <span className="font-bold">{confirmedOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-sm font-black text-[#FF6B35] pt-2 border-t border-inherit">
              <span>Amount Paid (₹):</span>
              <span>{formatINR(confirmedOrder.total, true)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => navigate('/customer/orders')}
              className="flex-1 py-3 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-xl shadow-lg transition-all"
            >
              Track Order Real-Time
            </button>
            <button
              onClick={() => navigate('/customer/menu')}
              className={`flex-1 py-3 rounded-xl border text-xs font-semibold ${
                isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'
              }`}
            >
              Back to Menu
            </button>
          </div>
        </GlassCard>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <ShoppingBag className="w-12 h-12 text-gray-400" />
        <h2 className="text-xl font-bold">No active items in cart</h2>
        <button
          onClick={() => navigate('/customer/menu')}
          className="px-6 py-2.5 bg-[#FF6B35] text-white text-xs font-bold rounded-xl"
        >
          Explore Menu
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Express Checkout (₹)</h1>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Select fulfillment mode, Indian delivery address, and encrypted payment gateway.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Fulfillment & Payment Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Fulfillment Type */}
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#FF6B35]">
              1. Fulfillment Method
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {(['Delivery', 'Dine-In', 'Takeaway'] as const).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setOrderType(type)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    orderType === type
                      ? 'bg-[#FF6B35]/20 border-[#FF6B35] text-[#FF6B35] font-bold'
                      : isDarkMode
                      ? 'bg-[#242424] border-white/10 text-gray-300'
                      : 'bg-gray-50 border-black/10 text-gray-700'
                  }`}
                >
                  <span className="text-xs font-bold block">{type}</span>
                  <span className="text-[10px] opacity-70">
                    {type === 'Delivery' ? '30-40 min' : type === 'Dine-In' ? 'Table Service' : 'Self Pickup'}
                  </span>
                </button>
              ))}
            </div>

            {/* Address input if Delivery */}
            {orderType === 'Delivery' && (
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-semibold">Delivery Location (Bengaluru / Mumbai)</label>
                <div className="space-y-2">
                  {[
                    'Flat 402, Prestige Palms, Indiranagar, Bengaluru, 560038',
                    'Villa 12, Palm Meadows, Whitefield, Bengaluru, 560066',
                  ].map((addr) => (
                    <label
                      key={addr}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer text-xs ${
                        selectedAddress === addr
                          ? 'border-[#FF6B35] bg-[#FF6B35]/10'
                          : isDarkMode
                          ? 'border-white/10 bg-[#242424]'
                          : 'border-black/10 bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="addressRadio"
                        checked={selectedAddress === addr && !customAddress}
                        onChange={() => {
                          setSelectedAddress(addr);
                          setCustomAddress('');
                        }}
                        className="mt-0.5 text-[#FF6B35]"
                      />
                      <div className="flex-1">
                        <span className="font-semibold">{addr}</span>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="pt-2">
                  <input
                    type="text"
                    placeholder="Or enter a new custom delivery address..."
                    value={customAddress}
                    onChange={(e) => setCustomAddress(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] ${
                      isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Table input if Dine-In */}
            {orderType === 'Dine-In' && (
              <div className="pt-2 space-y-2">
                <label className="block text-xs font-semibold">Select Table Number</label>
                <select
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] ${
                    isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                  }`}
                >
                  <option>Table T-01 (Terrace Garden)</option>
                  <option>Table T-04 (Window Booth)</option>
                  <option>Table T-07 (Main Dining Hall)</option>
                  <option>Table T-12 (Executive Suite)</option>
                </select>
              </div>
            )}
          </GlassCard>

          {/* Step 2: Payment Method (INR Focused) */}
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#FF6B35]">
              2. INR Payment Options
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: 'UPI (GPay/PhonePe)',
                  title: 'UPI Instant Payment',
                  desc: 'Google Pay, PhonePe, Paytm, BHIM',
                  icon: Smartphone,
                },
                {
                  id: 'Credit/Debit Card',
                  title: 'Credit / Debit Card',
                  desc: 'Visa, MasterCard, RuPay, Amex',
                  icon: CreditCard,
                },
                {
                  id: 'NetBanking',
                  title: 'NetBanking',
                  desc: 'HDFC, ICICI, SBI, Axis, Kotak',
                  icon: QrCode,
                },
                {
                  id: 'Cash on Delivery',
                  title: 'Cash on Delivery / Table',
                  desc: 'Pay directly via Cash or Card on arrival',
                  icon: Banknote,
                },
              ].map((method) => {
                const Icon = method.icon;
                const isSelected = paymentMethod === method.id;
                return (
                  <button
                    type="button"
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      isSelected
                        ? 'bg-[#FF6B35]/15 border-[#FF6B35] text-[#FF6B35]'
                        : isDarkMode
                        ? 'bg-[#242424] border-white/10 hover:bg-[#2a2a2a]'
                        : 'bg-gray-50 border-black/10 hover:bg-gray-100'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#FF6B35] text-white' : 'bg-black/10 dark:bg-white/10'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs">{method.title}</h4>
                      <p className="text-[11px] opacity-70 mt-0.5">{method.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Order Confirmation Card */}
        <div>
          <GlassCard className="p-6 space-y-4 sticky top-20">
            <h3 className="text-base font-bold pb-2 border-b border-inherit">Order Items ({cartCount})</h3>

            <div className="max-h-48 overflow-y-auto space-y-2 text-xs">
              {cart.map(({ foodItem, quantity }) => (
                <div key={foodItem.id} className="flex justify-between items-center">
                  <span className="truncate max-w-[160px]">
                    {quantity}x {foodItem.name}
                  </span>
                  <span className="font-bold text-[#FF6B35]">{formatINR(foodItem.price * quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs pt-3 border-t border-inherit">
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
                <span className="font-semibold">{formatINR(cartSubtotal, true)}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>GST (5% ₹)</span>
                <span className="font-semibold">{formatINR(gstTax, true)}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Delivery</span>
                <span className="font-semibold">{deliveryFee === 0 ? 'FREE' : formatINR(deliveryFee, true)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-500">
                  <span>AI Wellness Discount</span>
                  <span className="font-bold">-{formatINR(discount, true)}</span>
                </div>
              )}
              <div className={`border-t pt-3 flex justify-between text-base font-black ${
                isDarkMode ? 'border-white/10' : 'border-black/10'
              }`}>
                <span>Total (₹)</span>
                <span className="text-xl text-[#FF6B35] font-black">{formatINR(total, true)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#FF6B35] hover:bg-[#FFA366] disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-lg shadow-[#FF6B35]/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-102"
            >
              {isProcessing ? (
                <span>Authorizing Payment (₹)...</span>
              ) : (
                <>
                  <span>Pay {formatINR(total, true)} & Confirm</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              <span>256-Bit Encrypted Payment Channel</span>
            </div>
          </GlassCard>
        </div>
      </form>
    </div>
  );
};
