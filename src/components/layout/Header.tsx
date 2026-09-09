import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { ThemeToggle } from './ThemeToggle';
import { RoleBadge } from '../common/RoleBadge';
import { UserRole } from '../../types';
import {
  Sparkles,
  ShoppingBag,
  Bell,
  Menu as MenuIcon,
  ChevronDown,
  LogOut,
  User as UserIcon,
  Utensils,
  ExternalLink,
  Flame,
} from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
  onOpenCart?: () => void;
  currentPath: string;
  navigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onOpenCart,
  currentPath,
  navigate,
}) => {
  const { user, role, switchRole, isAuthenticated, logout, cartCount } = useAuth();
  const { isDarkMode } = useTheme();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const roles: { role: UserRole; title: string; desc: string }[] = [
    { role: 'CUSTOMER', title: 'Customer', desc: 'Menu, Cart, AI Wellness, Orders' },
    { role: 'STAFF', title: 'Kitchen Staff', desc: 'Kanban Queue, Tables, Turnaround' },
    { role: 'ADMIN', title: 'Restaurant Admin', desc: 'Menu, Users, Orders & DB Master' },
    { role: 'OWNER', title: 'Executive Owner', desc: 'Profit, Forecast Engine, BI Reports' },
  ];

  const isPublicPage = ['/', '/about', '/contact', '/login', '/register', '/forgot-password'].includes(currentPath);

  return (
    <header
      id="main-app-header"
      className={`sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-colors duration-300 ${
        isDarkMode
          ? 'bg-[#0F0F0F]/90 border-white/10 text-white'
          : 'bg-white/90 border-black/10 text-[#0F0F0F]'
      }`}
    >
      <div className={`w-full ${isPublicPage ? 'max-w-7xl mx-auto' : ''} px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4`}>
        {/* Left: Hamburger (mobile/desktop toggle) + Logo */}
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <button
              onClick={onToggleSidebar}
              className={`p-2 rounded-xl border transition-colors ${
                isDarkMode
                  ? 'border-white/10 hover:bg-white/10 text-gray-300'
                  : 'border-black/10 hover:bg-black/5 text-gray-700'
              }`}
              title="Toggle Navigation Menu"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          )}

          <div
            onClick={() => {
              if (role === 'CUSTOMER') navigate('/customer');
              else if (role === 'STAFF') navigate('/staff');
              else if (role === 'ADMIN') navigate('/admin');
              else if (role === 'OWNER') navigate('/owner');
              else navigate('/');
            }}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FFA366] flex items-center justify-center shadow-lg shadow-[#FF6B35]/30 group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-[#FF6B35] via-[#FFA366] to-[#FF6B35] bg-clip-text text-transparent">
                  SmartBite
                </span>
                {/* <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
                  AI
                </span> */}
              </div>
              <span className="text-[10px] tracking-wider uppercase opacity-60 font-semibold -mt-1 hidden sm:inline">
                Culinary Intelligence
              </span>
            </div>
          </div>
        </div>

        {/* Center: Quick Role Switcher Pill & Public links */}
        {/* <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                  isDarkMode
                    ? 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-200'
                    : 'bg-black/5 hover:bg-black/10 border-black/10 text-gray-800'
                }`}
                title="Switch Active RBAC Persona"
              >
                <span className="opacity-70">Active RBAC:</span>
                <RoleBadge role={role} size="sm" />
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {roleSwitcherOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setRoleSwitcherOpen(false)}
                  />
                  <div
                    className={`absolute left-0 mt-2 w-72 rounded-2xl shadow-2xl border p-2 z-40 space-y-1 ${
                      isDarkMode ? 'bg-[#1A1A1A] border-white/15 text-white' : 'bg-white border-black/10 text-[#0F0F0F]'
                    }`}
                  >
                    <div className="px-3 py-2 border-b border-inherit">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#FF6B35]">
                        Switch User Access Role
                      </p>
                      <p className="text-[11px] opacity-70">
                        Evaluates strict role navigation & page permissions
                      </p>
                    </div>
                    {roles.map((r) => (
                      <button
                        key={r.role}
                        onClick={() => {
                          switchRole(r.role);
                          setRoleSwitcherOpen(false);
                          if (r.role === 'CUSTOMER') navigate('/customer');
                          if (r.role === 'STAFF') navigate('/staff');
                          if (r.role === 'ADMIN') navigate('/admin');
                          if (r.role === 'OWNER') navigate('/owner');
                        }}
                        className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all ${
                          role === r.role
                            ? 'bg-[#FF6B35]/15 border border-[#FF6B35]/30'
                            : isDarkMode
                            ? 'hover:bg-white/5'
                            : 'hover:bg-black/5'
                        }`}
                      >
                        <div>
                          <div className="font-semibold flex items-center gap-2">
                            <RoleBadge role={r.role} size="sm" />
                          </div>
                          <p className="text-[10px] opacity-60 mt-1">{r.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4 text-xs font-medium">
              <button
                onClick={() => navigate('/')}
                className={`hover:text-[#FF6B35] transition-colors ${currentPath === '/' ? 'text-[#FF6B35] font-bold' : ''}`}
              >
                Home
              </button>
              <button
                onClick={() => navigate('/about')}
                className={`hover:text-[#FF6B35] transition-colors ${currentPath === '/about' ? 'text-[#FF6B35] font-bold' : ''}`}
              >
                About
              </button>
              <button
                onClick={() => navigate('/contact')}
                className={`hover:text-[#FF6B35] transition-colors ${currentPath === '/contact' ? 'text-[#FF6B35] font-bold' : ''}`}
              >
                Contact
              </button>
            </div>
          )}
        </div> */}

        {/* Right: Cart (Customer only) + Theme Toggle + User Profile */}
        <div className="flex items-center gap-3">
          {/* Public Login Button if not authenticated */}
          {!isAuthenticated && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/login')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                  isDarkMode
                    ? 'border-white/10 hover:bg-white/10 text-white'
                    : 'border-black/10 hover:bg-black/5 text-[#0F0F0F]'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#FF6B35] hover:bg-[#FFA366] text-white shadow-md shadow-[#FF6B35]/25 transition-all"
              >
                Get Started
              </button>
            </div>
          )}

          {/* Cart Trigger (Only Customer role) */}
          {isAuthenticated && role === 'CUSTOMER' && onOpenCart && (
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className={`relative p-2.5 rounded-xl border transition-colors ${
                isDarkMode
                  ? 'border-white/10 hover:bg-white/10 text-gray-200'
                  : 'border-black/10 hover:bg-black/5 text-gray-800'
              }`}
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#FF6B35]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#FF6B35] text-white text-[11px] font-bold flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Theme Toggle Button (40x40px circular, top-right) */}
          <ThemeToggle />

          {/* User Profile Dropdown */}
          {isAuthenticated && user && (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className={`flex items-center gap-2.5 p-1.5 rounded-xl border transition-all ${
                  isDarkMode
                    ? 'border-white/10 hover:bg-white/10'
                    : 'border-black/10 hover:bg-black/5'
                }`}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-lg object-cover ring-1 ring-[#FF6B35]/40"
                />
                <div className="hidden lg:flex flex-col text-left leading-tight">
                  <span className="text-xs font-bold truncate max-w-[120px]">{user.name}</span>
                  <span className="text-[10px] text-gray-400 capitalize">{user.role.toLowerCase()}</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 opacity-60 hidden lg:inline" />
              </button>

              {profileDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setProfileDropdownOpen(false)}
                  />
                  <div
                    className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl border p-2 z-40 space-y-1 ${
                      isDarkMode ? 'bg-[#1A1A1A] border-white/15 text-white' : 'bg-white border-black/10 text-[#0F0F0F]'
                    }`}
                  >
                    <div className="p-3 border-b border-inherit">
                      <p className="text-xs font-bold truncate">{user.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                      <div className="mt-2">
                        <RoleBadge role={user.role} size="sm" />
                      </div>
                    </div>

                    {role === 'CUSTOMER' && (
                      <button
                        onClick={() => {
                          navigate('/customer/profile');
                          setProfileDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors ${
                          isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                        }`}
                      >
                        <UserIcon className="w-4 h-4 text-[#FF6B35]" />
                        <span>My Profile & Preferences</span>
                      </button>
                    )}

                    <div className="border-t border-inherit pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                          navigate('/login');
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs text-red-500 flex items-center gap-2.5 transition-colors ${
                          isDarkMode ? 'hover:bg-red-500/10' : 'hover:bg-red-50'
                        }`}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
