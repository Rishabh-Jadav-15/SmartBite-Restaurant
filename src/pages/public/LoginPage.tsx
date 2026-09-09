import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { RoleBadge } from '../../components/common/RoleBadge';
import { UserRole } from '../../types';
import { Flame, Lock, Mail, ArrowRight, Sparkles, CheckCircle2, Shield } from 'lucide-react';

export const LoginPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { login, switchRole } = useAuth();
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('aarav.sharma@example.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    // Route based on role
    if (email.includes('chef') || email.includes('staff')) navigate('/staff');
    else if (email.includes('admin')) navigate('/admin');
    else if (email.includes('owner') || email.includes('singhania')) navigate('/owner');
    else navigate('/customer');
  };

  const handleQuickRoleSelect = (targetRole: UserRole) => {
    switchRole(targetRole);
    if (targetRole === 'CUSTOMER') navigate('/customer');
    if (targetRole === 'STAFF') navigate('/staff');
    if (targetRole === 'ADMIN') navigate('/admin');
    if (targetRole === 'OWNER') navigate('/owner');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Icon */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#FFA366] flex items-center justify-center shadow-xl shadow-[#FF6B35]/30 mx-auto">
            <Flame className="w-6 h-6 text-white fill-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight">SmartBite Login</h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Sign in to your role-authorized workspace
          </p>
        </div>

        {/* 1-Click Fast Sandbox Logins
        <GlassCard className="p-4 border-[#FF6B35]/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B35] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> 1-Click Sandbox Portals:
            </span>
            <span className="text-[10px] opacity-60">Instant Access</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickRoleSelect('CUSTOMER')}
              className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all hover:scale-102 ${
                isDarkMode ? 'bg-[#242424] hover:bg-[#2a2a2a] border-white/10' : 'bg-white hover:bg-orange-50 border-black/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold">Customer</span>
                <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
              </div>
              <span className="text-[10px] opacity-60">Menu, Cart & AI Wellness</span>
            </button>

            <button
              onClick={() => handleQuickRoleSelect('STAFF')}
              className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all hover:scale-102 ${
                isDarkMode ? 'bg-[#242424] hover:bg-[#2a2a2a] border-white/10' : 'bg-white hover:bg-amber-50 border-black/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold">Kitchen Staff</span>
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              </div>
              <span className="text-[10px] opacity-60">Kanban Queue & Service</span>
            </button>

            <button
              onClick={() => handleQuickRoleSelect('ADMIN')}
              className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all hover:scale-102 ${
                isDarkMode ? 'bg-[#242424] hover:bg-[#2a2a2a] border-white/10' : 'bg-white hover:bg-red-50 border-black/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold">Admin</span>
                <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
              </div>
              <span className="text-[10px] opacity-60">Users, Menu & Orders CRUD</span>
            </button>

            <button
              onClick={() => handleQuickRoleSelect('OWNER')}
              className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all hover:scale-102 ${
                isDarkMode ? 'bg-[#242424] hover:bg-[#2a2a2a] border-white/10' : 'bg-white hover:bg-cyan-50 border-black/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold">Executive Owner</span>
                <span className="w-2 h-2 rounded-full bg-[#00D9FF]" />
              </div>
              <span className="text-[10px] opacity-60">Profit BI & Forecasts (₹)</span>
            </button>
          </div>
        </GlassCard> */}
        

        {/* Standard Login Form */}
        <GlassCard className="p-6">
          <form onSubmit={handleStandardLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="customer@gmail.com"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] transition-colors ${
                    isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                  }`}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold">Password</label>
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-[11px] text-[#FF6B35] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] transition-colors ${
                    isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#FF6B35] focus:ring-0"
                />
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Remember session</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#FF6B35]/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>Login</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-inherit text-center text-xs">
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Don't have an account yet? </span>
            <button
              onClick={() => navigate('/register')}
              className="font-bold text-[#FF6B35] hover:underline"
            >
              Create Account
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
