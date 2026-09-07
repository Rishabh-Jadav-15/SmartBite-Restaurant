import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <GlassCard className="p-6">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#FF6B35] mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </button>

          <h2 className="text-xl font-bold mb-1">Reset Password</h2>
          <p className={`text-xs mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Enter the email associated with your SmartBite AI account and we'll transmit a secure reset link.
          </p>

          {sent ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold">Password Reset Link Sent!</h4>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Check your inbox at <span className="font-semibold text-white">{email}</span> for next instructions.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="mt-4 px-6 py-2.5 bg-[#FF6B35] text-white text-xs font-bold rounded-xl"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@smartbite.ai"
                    className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] transition-colors ${
                      isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send Reset Link</span>
              </button>
            </form>
          )}
        </GlassCard>
      </div>
    </div>
  );
};
