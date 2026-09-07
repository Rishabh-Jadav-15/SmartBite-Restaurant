import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { Flame, HeartPulse, Sparkles, ShieldCheck, Award, Zap, Users } from 'lucide-react';

export const AboutPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-[#FF6B35] uppercase tracking-wider">Company Vision</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Where Culinary Art Meets Metabolic Science
        </h1>
        <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          SmartBite AI was founded in Bengaluru with a singular mission: to make dining out healthy, personalized, and operationally effortless using cutting-edge artificial intelligence.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-8 space-y-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#FF6B35]/15 flex items-center justify-center text-[#FF6B35] mx-auto">
            <HeartPulse className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold">1. Metabolic Precision</h3>
          <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Every ingredient is cataloged with its Glycemic Index, inflammatory profile, and allergen markers to safeguard diners with chronic health conditions.
          </p>
        </GlassCard>

        <GlassCard className="p-8 space-y-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 flex items-center justify-center text-cyan-400 mx-auto">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold">2. Culinary AI Models</h3>
          <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Proprietary recommendation neural nets trained on diverse Indian culinary traditions, pairing regional spices with health requirements.
          </p>
        </GlassCard>

        <GlassCard className="p-8 space-y-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 mx-auto">
            <Zap className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold">3. Zero-Latency KDS</h3>
          <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Real-time kitchen queues, table allocation, and predictive revenue analytics empowering restaurant teams to operate at maximum efficiency.
          </p>
        </GlassCard>
      </div>

      {/* Leadership Team */}
      <div className="space-y-8">
        <div className="text-center">
          <span className="text-xs font-bold text-[#FF6B35] uppercase tracking-wider">Our Architects</span>
          <h2 className="text-3xl font-extrabold mt-1">Culinary & AI Leadership</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: 'Chef Sanjeev K.',
              role: 'Chief Culinary Officer',
              desc: 'Master of Ayurvedic culinary heritage & modern fusion.',
              img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&auto=format&fit=crop&q=80',
            },
            {
              name: 'Dr. Radhika Iyer',
              role: 'Head of Nutrition Tech',
              desc: 'Clinical nutritionist & metabolic researcher.',
              img: 'https://images.unsplash.com/photo-1594824813512-32a26569eb44?w=300&auto=format&fit=crop&q=80',
            },
            {
              name: 'Aditya Mathur',
              role: 'VP AI Engineering',
              desc: 'Ex-DeepMind engineer specializing in LLM routing.',
              img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
            },
            {
              name: 'Nandini Joshi',
              role: 'Hospitality Operations Lead',
              desc: '15+ years managing fine dining chains in India.',
              img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
            },
          ].map((member, i) => (
            <GlassCard key={i} className="p-4 text-center space-y-3">
              <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full mx-auto object-cover ring-2 ring-[#FF6B35]/30" />
              <div>
                <h4 className="font-bold text-sm">{member.name}</h4>
                <p className="text-[11px] text-[#FF6B35] font-semibold">{member.role}</p>
                <p className={`text-[11px] mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{member.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};
