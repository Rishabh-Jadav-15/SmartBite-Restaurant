import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { RoleBadge } from '../../components/common/RoleBadge';
import {
  User,
  HeartPulse,
  Target,
  Shield,
  MapPin,
  Save,
  CheckCircle2,
  Moon,
  Sun,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const [name, setName] = useState(user?.name || 'Aarav Sharma');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [healthConditions, setHealthConditions] = useState<string[]>(
    user?.healthProfile?.conditions || user?.healthProfile?.medicalConditions || ['Type-2 Diabetes', 'Hypertension Risk']
  );
  const [allergies, setAllergies] = useState<string[]>(
    user?.healthProfile?.allergies || ['Peanuts']
  );
  const [dailyCalorieTarget, setDailyCalorieTarget] = useState(
    user?.healthProfile?.dailyCalorieTarget || 2100
  );
  const [saved, setSaved] = useState(false);

  const conditionOptions = ['Type-2 Diabetes', 'Hypertension Risk', 'PCOS', 'Celiac Disease', 'High Cholesterol', 'Hyperacidity'];
  const allergyOptions = ['Peanuts', 'Dairy / Lactose', 'Gluten', 'Soy', 'Shellfish', 'Tree Nuts'];

  const toggleCondition = (c: string) => {
    setHealthConditions((prev) =>
      prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c]
    );
  };

  const toggleAllergy = (a: string) => {
    setAllergies((prev) =>
      prev.includes(a) ? prev.filter((item) => item !== a) : [...prev, a]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      phone,
      healthProfile: {
        conditions: healthConditions,
        medicalConditions: healthConditions,
        healthGoals: user?.healthProfile?.healthGoals || ['Weight Loss'],
        allergies,
        dietaryPreference: user?.healthProfile?.dietaryPreference || 'Veg',
        dailyCalorieTarget,
      },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Account & Metabolic Profile</h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Fine-tune clinical conditions, dietary preferences, and AI menu adaptation rules.
          </p>
        </div>
        {user && <RoleBadge role={user.role} />}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Details */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#FF6B35] flex items-center gap-2">
            <User className="w-4 h-4" /> Personal Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] ${
                  isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Email (Authenticated)</label>
              <input
                type="email"
                disabled
                value={user?.email || 'aarav.sharma@example.com'}
                className="w-full px-3.5 py-2.5 rounded-xl border text-xs opacity-60 bg-black/5 dark:bg-white/5 border-inherit"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Contact Phone (+91)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] ${
                  isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Theme Display Preference</label>
              <button
                type="button"
                onClick={toggleTheme}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs flex items-center justify-between ${
                  isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                }`}
              >
                <span>Current Mode: <strong>{isDarkMode ? 'Premium Dark' : 'Refined Light'}</strong></span>
                {isDarkMode ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-[#FF6B35]" />}
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Metabolic & Clinical Conditions */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <HeartPulse className="w-4 h-4" /> AI Metabolic Health Conditions
            </h3>
            <span className="text-[10px] text-gray-400">Used by AI Disease Matcher</span>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-gray-400">
              Select conditions so SmartBite AI can auto-highlight safe glycemic and sodium recipes:
            </p>
            <div className="flex flex-wrap gap-2">
              {conditionOptions.map((cond) => (
                <button
                  type="button"
                  key={cond}
                  onClick={() => toggleCondition(cond)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    healthConditions.includes(cond)
                      ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                      : isDarkMode
                      ? 'bg-[#242424] border border-white/10 text-gray-400'
                      : 'bg-gray-50 border border-black/10 text-gray-600'
                  }`}
                >
                  {healthConditions.includes(cond) ? '✓ ' : '+ '} {cond}
                </button>
              ))}
            </div>
          </div>

          {/* Allergies */}
          <div className="space-y-2 pt-3 border-t border-inherit">
            <span className="block text-xs font-semibold">Strict Allergen Exclusions:</span>
            <div className="flex flex-wrap gap-2">
              {allergyOptions.map((allg) => (
                <button
                  type="button"
                  key={allg}
                  onClick={() => toggleAllergy(allg)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    allergies.includes(allg)
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                      : isDarkMode
                      ? 'bg-[#242424] border border-white/10 text-gray-400'
                      : 'bg-gray-50 border border-black/10 text-gray-600'
                  }`}
                >
                  {allergies.includes(allg) ? '⚠️ ' : '+ '} {allg}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Caloric Target */}
          <div className="pt-3 border-t border-inherit">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold">Daily Calorie Target (Kcal)</label>
              <span className="font-bold text-sm text-[#FF6B35]">{dailyCalorieTarget} kcal</span>
            </div>
            <input
              type="range"
              min="1400"
              max="3500"
              step="50"
              value={dailyCalorieTarget}
              onChange={(e) => setDailyCalorieTarget(Number(e.target.value))}
              className="w-full accent-[#FF6B35]"
            />
          </div>
        </GlassCard>

        {/* Submit */}
        <div className="flex items-center justify-between">
          {saved && (
            <span className="text-xs font-bold text-green-500 flex items-center gap-1.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4" /> Profile Updated Successfully!
            </span>
          )}
          <button
            type="submit"
            className="ml-auto px-8 py-3 bg-[#FF6B35] hover:bg-[#FFA366] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#FF6B35]/25 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
