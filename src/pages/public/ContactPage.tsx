import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#FF6B35] uppercase tracking-wider">Contact & Support</span>
        <h1 className="text-4xl font-extrabold tracking-tight">We're Here to Help</h1>
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Have inquiries about enterprise AI deployment, catering partnerships, or clinical menu integration? Reach out anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact info cards */}
        <div className="space-y-4">
          <GlassCard className="p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/15 flex items-center justify-center text-[#FF6B35] flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Headquarters</h4>
              <p className={`text-xs mt-1 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Level 6, SmartBite Towers, 100ft Road, Indiranagar, Bengaluru, Karnataka 560038
              </p>
            </div>
          </GlassCard>

          <GlassCard className="p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Email Us</h4>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                support@smartbite.ai<br />enterprise@smartbite.ai
              </p>
            </div>
          </GlassCard>

          <GlassCard className="p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Customer Helpline</h4>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                +91 80 4920 8800 (9:00 AM - 11:00 PM IST)
              </p>
            </div>
          </GlassCard>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <GlassCard className="p-8">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Message Received!</h3>
                <p className={`text-xs max-w-sm mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Thank you for reaching out. Our culinary relations officer will respond within 4 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-[#FF6B35] underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold">Send us a Direct Message</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Your Full Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikram Malhotra"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] transition-colors ${
                        isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] transition-colors ${
                        isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Inquiry Topic</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] transition-colors ${
                      isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                    }`}
                  >
                    <option>General Inquiry</option>
                    <option>Catering & Corporate Reservations</option>
                    <option>AI Nutrition Integration</option>
                    <option>Restaurant Franchising</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can assist your dining experience or business operations..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] transition-colors ${
                      isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#FF6B35]/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
