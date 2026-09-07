import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { formatINR } from '../../utils/formatters';
import { OrderStatus } from '../../types';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Download,
  AlertTriangle,
} from 'lucide-react';

export const OrderManagementPage: React.FC = () => {
  const { orders, updateOrderStatus } = useAuth();
  const { isDarkMode } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDownloadInvoice = (orderNumber: string) => {
    alert(`Downloading Official Tax Invoice for ${orderNumber} (Indian GST compliant).`);
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Order Audit & Invoice Ledger</h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Track transaction histories, override order states, and export official tax records in ₹.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order ID or phone number..."
            className={`w-full pl-10 pr-4 py-2 rounded-xl border text-xs outline-none focus:border-[#FF6B35] ${
              isDarkMode ? 'bg-[#1A1A1A] border-white/10 text-white' : 'bg-white border-black/10 text-black'
            }`}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'PENDING', 'PREPARING', 'READY', 'DELIVERED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-[#FF6B35] text-white shadow'
                  : isDarkMode
                  ? 'bg-[#1A1A1A] border border-white/10 text-gray-400'
                  : 'bg-white border border-black/10 text-gray-600'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'bg-black/30 border-white/10' : 'bg-gray-50 border-black/10'}`}>
                <th className="p-4 font-bold">Order Ref</th>
                <th className="p-4 font-bold">Customer</th>
                <th className="p-4 font-bold">Fulfillment</th>
                <th className="p-4 font-bold">Items Qty</th>
                <th className="p-4 font-bold">Total (₹)</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold">Payment</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-inherit">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className={`hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${
                    isDarkMode ? 'border-white/5' : 'border-black/5'
                  }`}
                >
                  <td className="p-4 font-mono font-bold text-[#FF6B35]">{order.orderNumber}</td>
                  <td className="p-4">
                    <p className="font-semibold">{order.customerName}</p>
                    <p className="text-[10px] text-gray-400">{order.customerPhone}</p>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold">{order.orderType}</span>
                    {order.tableNumber && <p className="text-[10px] text-gray-400">{order.tableNumber}</p>}
                  </td>
                  <td className="p-4">{order.items.reduce((s, i) => s + i.quantity, 0)} Items</td>
                  <td className="p-4 font-black text-[#FF6B35]">{formatINR(order.total, true)}</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-bold outline-none ${
                        isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                      }`}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PREPARING">PREPARING</option>
                      <option value="READY">READY</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/15 text-green-400">
                      {order.paymentStatus}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-0.5">{order.paymentMethod}</p>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDownloadInvoice(order.orderNumber)}
                      className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 text-gray-300 hover:text-white transition-colors"
                      title="Download GST Invoice"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
