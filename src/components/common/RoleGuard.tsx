import React from 'react';
import { UserRole } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { ShieldAlert, ArrowRight, Sparkles } from 'lucide-react';
import { RoleBadge } from './RoleBadge';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
  navigate: (path: string) => void;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  allowedRoles,
  children,
  navigate,
}) => {
  const { role, switchRole, isAuthenticated } = useAuth();
  const { isDarkMode } = useTheme();

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold mb-2">Authentication Required</h2>
        <p className={`text-xs max-w-md mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Please sign in to your SmartBite AI account to access this role-protected module.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2.5 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-xl shadow-lg transition-all"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  // OWNER has supreme role privilege to access all system modules
  const isAllowed = allowedRoles.includes(role) || role === 'OWNER';

  if (!isAllowed) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-4 shadow-lg shadow-amber-500/10">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="text-xs uppercase font-mono tracking-widest text-amber-500 font-bold">
            Access Restricted by RBAC Policy
          </span>
        </div>
        <h2 className="text-2xl font-black mb-2">Unauthorized Role Access</h2>
        <p className={`text-xs max-w-lg mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Your current persona <span className="font-semibold underline uppercase text-[#FF6B35]">{role}</span> does not have privileges to view this operational zone. This area is strictly reserved for:
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {allowedRoles.map((r) => (
            <RoleBadge key={r} role={r} size="md" />
          ))}
        </div>

        <div className={`p-5 rounded-2xl border max-w-md w-full mb-6 ${
          isDarkMode ? 'bg-[#1A1A1A] border-white/10' : 'bg-gray-50 border-black/10'
        }`}>
          <p className="text-xs font-bold mb-3 flex items-center justify-center gap-1.5 text-[#FF6B35]">
            <Sparkles className="w-4 h-4" /> Quick RBAC Persona Testing
          </p>
          <p className={`text-[11px] mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            For sandbox evaluation, you can switch immediately to any permitted role:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {allowedRoles.map((targetRole) => (
              <button
                key={targetRole}
                onClick={() => {
                  switchRole(targetRole);
                  if (targetRole === 'CUSTOMER') navigate('/customer');
                  if (targetRole === 'STAFF') navigate('/staff');
                  if (targetRole === 'ADMIN') navigate('/admin');
                  if (targetRole === 'OWNER') navigate('/owner');
                }}
                className="px-3 py-2 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
              >
                <span>Switch to {targetRole}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            if (role === 'CUSTOMER') navigate('/customer');
            else if (role === 'STAFF') navigate('/staff');
            else if (role === 'ADMIN') navigate('/admin');
            else if (role === 'OWNER') navigate('/owner');
            else navigate('/');
          }}
          className={`text-xs font-semibold underline underline-offset-4 ${
            isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
          }`}
        >
          Return to My Role Dashboard
        </button>
      </div>
    );
  }

  return <>{children}</>;
};
