import React from 'react';
import { UserRole } from '../../types';
import { Shield, Sparkles, ChefHat, UserCheck, Crown } from 'lucide-react';

interface RoleBadgeProps {
  role: UserRole;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, showIcon = true, size = 'md' }) => {
  const config = {
    CUSTOMER: {
      label: 'Customer',
      icon: Sparkles,
      bg: 'bg-[#FF6B35]/15 text-[#FF6B35] border-[#FF6B35]/30',
      dot: 'bg-[#FF6B35]',
    },
    STAFF: {
      label: 'Kitchen Staff',
      icon: ChefHat,
      bg: 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30',
      dot: 'bg-[#F59E0B]',
    },
    ADMIN: {
      label: 'Admin',
      icon: Shield,
      bg: 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30',
      dot: 'bg-[#EF4444]',
    },
    OWNER: {
      label: 'Executive Owner',
      icon: Crown,
      bg: 'bg-[#00D9FF]/15 text-[#00D9FF] dark:text-[#00D9FF] text-[#0088AA] border-[#00D9FF]/30',
      dot: 'bg-[#00D9FF]',
    },
  }[role];

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 gap-1.5 font-medium',
    md: 'text-xs px-3 py-1 gap-2 font-semibold tracking-wide',
    lg: 'text-sm px-4 py-1.5 gap-2.5 font-bold',
  }[size];

  const Icon = config.icon;

  return (
    <span
      id={`role-badge-${role.toLowerCase()}`}
      className={`inline-flex items-center rounded-full border shadow-sm ${config.bg} ${sizeClasses} uppercase`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      <span>{config.label}</span>
    </span>
  );
};
