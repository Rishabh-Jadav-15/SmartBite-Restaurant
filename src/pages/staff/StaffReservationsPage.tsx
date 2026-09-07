import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import {
  CalendarDays,
  Users,
  CheckCircle2,
  Clock,
  MapPin,
  Utensils,
  Plus,
} from 'lucide-react';

export const StaffReservationsPage: React.FC = () => {
  const { reservations, updateReservationStatus } = useAuth();
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Table Allocation & Host Stand</h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Live seating management, guest arrival check-in, and table turnover tracking.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.map((res) => (
          <GlassCard key={res.id} className="p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-[#FF6B35]">{res.bookingRef}</span>
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                    res.status === 'CONFIRMED'
                      ? 'bg-blue-500/20 text-blue-400'
                      : res.status === 'SEATED'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {res.status}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base">{res.customerName}</h3>
                <p className="text-xs text-gray-400">{res.customerPhone}</p>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{res.date} at {res.timeSlot}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>{res.partySize} Guests • Assigned: <strong>{res.tableNumber}</strong></span>
                </div>
                {res.specialRequests && (
                  <p className="text-[11px] text-gray-400 italic pt-1">
                    Note: "{res.specialRequests}"
                  </p>
                )}
                {res.dietaryRequirements.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {res.dietaryRequirements.map((d, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-red-500/15 text-red-400 font-semibold">
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-3 border-t border-inherit flex items-center gap-2">
              {res.status === 'CONFIRMED' && (
                <button
                  onClick={() => updateReservationStatus(res.id, 'SEATED')}
                  className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white font-bold text-xs rounded-xl shadow cursor-pointer transition-all"
                >
                  Mark Guest Seated
                </button>
              )}
              {res.status === 'SEATED' && (
                <button
                  onClick={() => updateReservationStatus(res.id, 'COMPLETED')}
                  className="flex-1 py-2 bg-black/10 dark:bg-white/10 hover:bg-black/20 text-xs font-bold rounded-xl transition-all"
                >
                  Table Cleared (Completed)
                </button>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
