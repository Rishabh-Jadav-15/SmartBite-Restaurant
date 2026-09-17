import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
// import { UserRole } from '../../types';
import { Flame, Mail, User, Phone, ArrowRight } from 'lucide-react';

export const RegisterPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { register } = useAuth();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: true,
  });

  const [registerError, setRegisterError] = useState('');
const [isLoading, setIsLoading] = useState(false);

const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  setRegisterError('');

  if (formData.password !== formData.confirmPassword) {
    setRegisterError('Passwords do not match.');
    return;
  }

  setIsLoading(true);

  try {
    await register(
      formData.name,
      formData.email,
      formData.phone,
      formData.password
    );

    navigate('/customer');
  } catch (error) {
    console.error('Registration failed:', error);

    setRegisterError(
      error instanceof Error
        ? error.message
        : 'Registration failed. Please try again.'
    );
  } finally {
    setIsLoading(false);
  }
};
// const handleRegister = async (e: React.FormEvent) => {
//   e.preventDefault();

//   setRegisterError('');

//   if (formData.password !== formData.confirmPassword) {
//     setRegisterError('Passwords do not match.');
//     return;
//   }

//   setIsLoading(true);

//   try {
//     const response = await fetch(
//       'http://127.0.0.1:8000/api/auth/register/',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password,
//         }),
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       const errorMessage =
//         data.email?.[0] ||
//         data.password?.[0] ||
//         data.name?.[0] ||
//         data.phone?.[0] ||
//         data.detail ||
//         'Registration failed. Please try again.';

//       throw new Error(errorMessage);
//     }

//     // await login(formData.email, formData.password);

//     // navigate('/customer');
    
//       const { register } = useAuth();
//   await register(
//   formData.name,
//   formData.email,
//   formData.phone,
//   formData.password
// );

// navigate('/customer');
//   } catch (error) {
//     console.error('Registration failed:', error);

//     setRegisterError(
//       error instanceof Error
//         ? error.message
//         : 'Registration failed. Please try again.'
//     );
//   } finally {
//     setIsLoading(false);
//   }
// };
  // const handleRegister = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   login(formData.email, formData.role);
  //   if (formData.role === 'CUSTOMER') navigate('/customer');
  //   else if (formData.role === 'STAFF') navigate('/staff');
  //   else if (formData.role === 'ADMIN') navigate('/admin');
  //   else if (formData.role === 'OWNER') navigate('/owner');
  // };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#FFA366] flex items-center justify-center shadow-xl shadow-[#FF6B35]/30 mx-auto">
            <Flame className="w-6 h-6 text-white fill-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight">Create SmartBite Account</h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Join our AI-powered culinary & metabolic health ecosystem
          </p>
        </div>

        <GlassCard className="p-6">
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rishabh Jadav"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] transition-colors ${
                    isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.com"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] transition-colors ${
                    isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] transition-colors ${
                    isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                  }`}
                />
              </div>
            </div>

            {/* <div>
              <label className="block text-xs font-semibold mb-1">Account Role Workspace</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] transition-colors ${
                  isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                }`}
              >
                <option value="CUSTOMER">Customer (Dine, Health AI, Orders)</option>
                <option value="STAFF">Kitchen / Service Staff (Kanban KDS)</option>
                <option value="ADMIN">Restaurant Administrator (Operations)</option>
                <option value="OWNER">Executive Business Owner (Analytics & BI)</option>
              </select>
            </div> */}

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold mb-1">Password</label>
                <input
                  required
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] transition-colors ${
                    isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                  }`}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Confirm</label>
                <input
                  required
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] transition-colors ${
                    isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                  }`}
                />
              </div>
            </div>

            <div className="pt-2">
            {registerError && (
  <div className="text-xs text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
    {registerError}
  </div>
  )}        <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#FF6B35] hover:bg-[#FFA366] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-lg shadow-[#FF6B35]/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
                <span>{isLoading ? 'Creating account...':'Complete Registration'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-4 pt-4 border-t border-inherit text-center text-xs">
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Already registered? </span>
            <button
              onClick={() => navigate('/login')}
              className="font-bold text-[#FF6B35] hover:underline"
            >
              Sign In
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
