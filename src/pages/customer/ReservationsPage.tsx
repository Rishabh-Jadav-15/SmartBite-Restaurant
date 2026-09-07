import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { Reservation } from '../../types';
import {
  CalendarDays,
  Clock,
  Users,
  Utensils,
  CheckCircle2,
  Sparkles,
  MapPin,
  XCircle,
  Plus,
} from 'lucide-react';

export const ReservationsPage: React.FC = () => {
  const { reservations, createReservation, user } = useAuth();
  const { isDarkMode } = useTheme();

  const [date, setDate] = useState('2026-03-02');
  const [timeSlot, setTimeSlot] = useState('19:30');
  const [partySize, setPartySize] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [dietaryRequirements, setDietaryRequirements] = useState<string[]>(['Low Glycemic']);
  const [bookingSuccess, setBookingSuccess] = useState<Reservation | null>(null);

  const availableSlots = [
    '12:30', '13:00', '13:30', '14:00',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  const handleBookTable = (e: React.FormEvent) => {
    e.preventDefault();
    const newRes = createReservation({
      customerName: user?.name || 'Aarav Sharma',
      customerPhone: user?.phone || '+91 98765 43210',
      customerEmail: user?.email || 'aarav.sharma@example.com',
      date,
      timeSlot,
      partySize,
      tableNumber: 'Table T-Auto',
      status: 'CONFIRMED',
      specialRequests: specialRequests || 'Window table preferred',
      dietaryRequirements,
    });

    setBookingSuccess(newRes);
  };

  const toggleDietary = (item: string) => {
    if (dietaryRequirements.includes(item)) {
      setDietaryRequirements(dietaryRequirements.filter((d) => d !== item));
    } else {
      setDietaryRequirements([...dietaryRequirements, item]);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Table Reservations & Dining</h1>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Reserve tables with smart AI dietary prep for personalized hospitality in Indiranagar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF6B35]" />
              <h2 className="text-lg font-bold">Reserve a Gourmet Table</h2>
            </div>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Reservation Confirmed!</h3>
                <p className={`text-xs max-w-md mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Your table is scheduled for <strong>{bookingSuccess.date}</strong> at <strong>{bookingSuccess.timeSlot}</strong> for <strong>{bookingSuccess.partySize} guests</strong>.
                </p>
                <div className="p-3 bg-black/10 dark:bg-white/10 rounded-xl inline-block text-xs font-mono font-bold text-[#FF6B35]">
                  Booking Ref: {bookingSuccess.bookingRef}
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setBookingSuccess(null)}
                    className="px-6 py-2.5 bg-[#FF6B35] text-white text-xs font-bold rounded-xl shadow"
                  >
                    Make Another Reservation
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookTable} className="space-y-5">
                {/* Date & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Reservation Date</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] ${
                        isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Number of Guests</label>
                    <select
                      value={partySize}
                      onChange={(e) => setPartySize(Number(e.target.value))}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] ${
                        isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                      }`}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Time Slots Grid */}
                <div>
                  <label className="block text-xs font-semibold mb-2">Select Arrival Time Slot</label>
                  <div className="grid grid-cols-5 gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setTimeSlot(slot)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                          timeSlot === slot
                            ? 'bg-[#FF6B35] text-white shadow-md'
                            : isDarkMode
                            ? 'bg-[#242424] border border-white/10 text-gray-300 hover:bg-white/5'
                            : 'bg-gray-50 border border-black/10 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dietary Prep Notification for Chefs */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold">Notify Kitchen AI of Dietary Restrictions</label>
                  <div className="flex flex-wrap gap-2">
                    {['Vegetarian', 'Diabetic Care', 'Low Sodium', 'Gluten Sensitivity', 'Nut Allergy', 'Low GI'].map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => toggleDietary(item)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          dietaryRequirements.includes(item)
                            ? 'bg-cyan-500 text-white shadow'
                            : isDarkMode
                            ? 'bg-[#242424] border border-white/10 text-gray-400'
                            : 'bg-gray-50 border border-black/10 text-gray-600'
                        }`}
                      >
                        {dietaryRequirements.includes(item) ? '✓ ' : '+ '} {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Special Occasion or Seating Notes</label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Anniversary dinner, terrace garden view requested"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] ${
                      isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#FF6B35]/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>Confirm Table Booking</span>
                </button>
              </form>
            )}
          </GlassCard>
        </div>

        {/* Existing Reservations Sidebar */}
        <div className="space-y-4">
          <h3 className="text-base font-bold">Your Table Itineraries</h3>

          <div className="space-y-3">
            {reservations.map((res) => (
              <GlassCard key={res.id} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#FF6B35]">{res.bookingRef}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    res.status === 'CONFIRMED' ? 'bg-green-500/15 text-green-400' : 'bg-amber-500/15 text-amber-400'
                  }`}>
                    {res.status}
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <p className="font-bold flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{res.date} at {res.timeSlot}</span>
                  </p>
                  <p className="text-gray-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>{res.partySize} Guests • {res.tableNumber}</span>
                  </p>
                  {res.dietaryRequirements && res.dietaryRequirements.length > 0 && (
                    <p className="text-[11px] text-cyan-400">
                      Diet: {res.dietaryRequirements.join(', ')}
                    </p>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
