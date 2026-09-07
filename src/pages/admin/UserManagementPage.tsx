import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { RoleBadge } from '../../components/common/RoleBadge';
import { User, UserRole } from '../../types';
import { Users, UserPlus, Search, Shield, CheckCircle2, ShieldAlert } from 'lucide-react';

export const UserManagementPage: React.FC = () => {
  const { isDarkMode } = useTheme();

  // Mocked RBAC User List
  const [usersList, setUsersList] = useState<User[]>([
    {
      id: 'usr-1',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      phone: '+91 98765 43210',
      role: 'CUSTOMER',
      createdAt: '2026-01-10',
    },
    {
      id: 'usr-2',
      name: 'Chef Vikram Malhotra',
      email: 'vikram.chef@smartbite.ai',
      phone: '+91 98765 11223',
      role: 'STAFF',
      createdAt: '2025-11-20',
    },
    {
      id: 'usr-3',
      name: 'Priya Nambiar',
      email: 'priya.admin@smartbite.ai',
      phone: '+91 98765 33445',
      role: 'ADMIN',
      createdAt: '2025-08-15',
    },
    {
      id: 'usr-4',
      name: 'Rajesh Singhania',
      email: 'rajesh.owner@smartbite.ai',
      phone: '+91 98765 55667',
      role: 'OWNER',
      createdAt: '2025-06-01',
    },
    {
      id: 'usr-5',
      name: 'Ananya Deshmukh',
      email: 'ananya.d@example.com',
      phone: '+91 98765 77889',
      role: 'CUSTOMER',
      createdAt: '2026-02-01',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'STAFF' as UserRole,
  });

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsersList(
      usersList.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: newStaff.name,
      email: newStaff.email,
      phone: newStaff.phone,
      role: newStaff.role,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUsersList([newUser, ...usersList]);
    setShowAddModal(false);
    setNewStaff({ name: '', email: '', phone: '', role: 'STAFF' });
  };

  const filteredUsers = usersList.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Role-Based Access Control (RBAC)</h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Audit user accounts, modify security authorization levels, and provision staff credentials.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-xl shadow flex items-center gap-2 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Provision New Staff</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by user name, email, or role..."
          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] ${
            isDarkMode ? 'bg-[#1A1A1A] border-white/10 text-white' : 'bg-white border-black/10 text-black'
          }`}
        />
      </div>

      {/* RBAC Table */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'bg-black/30 border-white/10' : 'bg-gray-50 border-black/10'}`}>
                <th className="p-4 font-bold">User Identity</th>
                <th className="p-4 font-bold">Contact Phone</th>
                <th className="p-4 font-bold">Current Role Badge</th>
                <th className="p-4 font-bold">Modify Authorization Level</th>
                <th className="p-4 font-bold">Joined On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-inherit">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-sm">{u.name}</p>
                    <p className="text-[11px] text-gray-400">{u.email}</p>
                  </td>
                  <td className="p-4 font-mono">{u.phone}</td>
                  <td className="p-4">
                    <RoleBadge role={u.role} />
                  </td>
                  <td className="p-4">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold outline-none ${
                        isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                      }`}
                    >
                      <option value="CUSTOMER">CUSTOMER</option>
                      <option value="STAFF">STAFF (Kitchen KDS)</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="OWNER">OWNER</option>
                    </select>
                  </td>
                  <td className="p-4 text-gray-400">{u.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Provision Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div
            className={`w-full max-w-md rounded-3xl p-6 shadow-2xl border ${
              isDarkMode ? 'bg-[#1A1A1A] border-white/15 text-white' : 'bg-white border-black/10 text-black'
            }`}
          >
            <form onSubmit={handleAddStaff} className="space-y-4">
              <h2 className="text-lg font-bold">Provision Staff Account</h2>

              <div>
                <label className="block text-xs font-semibold mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  placeholder="e.g. Sanjeev Kapoor"
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs outline-none focus:border-[#FF6B35] ${
                    isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Staff Email</label>
                <input
                  required
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  placeholder="name@smartbite.ai"
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs outline-none focus:border-[#FF6B35] ${
                    isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Role Permission</label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value as UserRole })}
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs outline-none focus:border-[#FF6B35] ${
                    isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                  }`}
                >
                  <option value="STAFF">Kitchen / Service Staff</option>
                  <option value="ADMIN">Restaurant Administrator</option>
                  <option value="OWNER">Executive Owner</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF6B35] text-white font-bold text-xs rounded-xl shadow"
                >
                  Provision User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
