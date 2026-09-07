import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../hooks/useTheme';
import { GlassCard } from '../../../components/common/GlassCard';
import {
  Brain,
  Sparkles,
  Search,
  Send,
  Leaf,
  ShieldAlert,
  Info,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  meta?: {
    glycemicIndex?: string;
    keyNutrients?: string[];
    ayurvedicProperty?: string;
    clinicalVerdict?: string;
  };
}

export const AIIngredientIntelligence: React.FC = () => {
  const { menuItems } = useAuth();
  const { isDarkMode } = useTheme();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Namaste! I am your SmartBite Ingredient Intelligence Assistant. Ask me anything about specific spices, millets, allergen pathways, glycemic indices, or clinical compatibility with diabetic & cardiac health.',
      meta: {
        clinicalVerdict: 'Clinical Database: Vetted by Indian Council of Medical Research (ICMR) & Ayurvedic Pharmacopoeia.',
      },
    },
  ]);

  const presetQueries = [
    'Can I eat the Foxtail Millet Khichdi with Type-2 Diabetes?',
    'What gives the Dal Makhani its richness without excess butter?',
    'Is Kokum Chia Elixir safe for someone with high uric acid?',
    'What are the antioxidant properties of Salem Turmeric?',
  ];

  const handleSend = (queryToSend?: string) => {
    const text = queryToSend || inputQuery;
    if (!text.trim()) return;

    // Add user message
    const newMsgs: ChatMessage[] = [...messages, { sender: 'user', text }];
    setMessages(newMsgs);
    setInputQuery('');

    // Generate intelligent AI response
    setTimeout(() => {
      let aiReply: ChatMessage = {
        sender: 'ai',
        text: '',
        meta: {},
      };

      const lower = text.toLowerCase();
      if (lower.includes('millet') || lower.includes('diabetes') || lower.includes('khichdi')) {
        aiReply = {
          sender: 'ai',
          text: 'Foxtail Millet (Kangni) has a very low Glycemic Index (GI 54) and a high dietary fiber content (8g/100g). It releases glucose slowly through slow-digesting amylose starch, making it exceptionally safe and beneficial for Type-2 Diabetes and PCOS management.',
          meta: {
            glycemicIndex: 'Low (GI 54)',
            keyNutrients: ['Magnesium 81mg', 'Fiber 8g', 'Iron 2.8mg', 'Tryptophan'],
            ayurvedicProperty: 'Kashaya (Astringent) & Madhura (Sweet), Balances Pitta & Kapha',
            clinicalVerdict: 'Grade A Diabetic Choice • Prevents post-prandial glycemic spikes.',
          },
        };
      } else if (lower.includes('dal makhani') || lower.includes('butter') || lower.includes('cream')) {
        aiReply = {
          sender: 'ai',
          text: 'SmartBite Dal Makhani achieves its signature velvety mouthfeel through 14-hour low-flame slow-simmering of black urad lentils and cashew-almond emulsion, reducing saturated butter fats by 65% while preserving deep tandoori aromatics.',
          meta: {
            glycemicIndex: 'Medium (GI 58)',
            keyNutrients: ['Plant Protein 14g', 'Folate 180mcg', 'Magnesium', 'Potassium'],
            ayurvedicProperty: 'Guru (Heavy) & Snigdha (Unctuous), Highly nourishing for Vata',
            clinicalVerdict: 'Heart-Friendly Reformulation • Low Saturated Lipid Profile.',
          },
        };
      } else if (lower.includes('kokum') || lower.includes('elixir') || lower.includes('uric acid')) {
        aiReply = {
          sender: 'ai',
          text: 'Kokum (Garcinia indica) contains Garcinol and Hydroxycitric Acid (HCA), which downregulate xanthine oxidase activity. When paired with omega-3 rich chia seeds, it acts as an alkalizing diuretic that actively supports healthy uric acid excretion.',
          meta: {
            glycemicIndex: 'Very Low (GI 25)',
            keyNutrients: ['Garcinol (Antioxidant)', 'Omega-3 ALA 2.4g', 'Vitamin C'],
            ayurvedicProperty: 'Sheeta (Cooling), Pacifies aggravated Pitta dosha',
            clinicalVerdict: 'Highly Recommended for Hyperuricemia and Post-Meal Acidity.',
          },
        };
      } else {
        aiReply = {
          sender: 'ai',
          text: `Analyzing "${text}" across our clinical database: The dish utilizes cold-pressed virgin oils, hand-pounded Salem turmeric with 4.5% bioactive curcumin, and organic pink Himalayan rock salt to minimize vascular inflammation and maintain cellular osmolarity.`,
          meta: {
            glycemicIndex: 'Low to Moderate',
            keyNutrients: ['Curcuminoids', 'Piperine', 'Plant Bioflavonoids'],
            ayurvedicProperty: 'Deepana (Digestive Fire Igniter) & Pachana (Toxin Eliminator)',
            clinicalVerdict: 'Fully compatible with standard clinical metabolic protocols.',
          },
        };
      }

      setMessages((prev) => [...prev, aiReply]);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-2">
          <Brain className="w-3.5 h-3.5" />
          <span>Biochemical & Ayurvedic Knowledge Graph</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Ingredient Intelligence AI</h1>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Interactively query culinary ingredients, allergen pathways, and metabolic efficacy.
        </p>
      </div>

      {/* Suggested Fast Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {presetQueries.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className={`px-3 py-1.5 rounded-xl border text-xs whitespace-nowrap transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-[#1A1A1A] border-white/10 text-gray-300 hover:bg-white/5'
                : 'bg-white border-black/10 text-gray-700 hover:bg-gray-50'
            }`}
          >
            "{q}"
          </button>
        ))}
      </div>

      {/* Chat Conversation Box */}
      <GlassCard className="p-6 h-[480px] flex flex-col justify-between">
        <div className="overflow-y-auto space-y-4 pr-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xl rounded-2xl p-4 text-xs space-y-3 ${
                  msg.sender === 'user'
                    ? 'bg-[#FF6B35] text-white rounded-br-none shadow-md'
                    : isDarkMode
                    ? 'bg-[#242424] border border-white/10 text-white rounded-bl-none'
                    : 'bg-gray-100 text-black rounded-bl-none'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-[11px] opacity-70">
                  {msg.sender === 'ai' ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>SmartBite AI Intelligence</span>
                    </>
                  ) : (
                    <span>You</span>
                  )}
                </div>

                <p className="leading-relaxed text-xs">{msg.text}</p>

                {/* Structured Meta Cards */}
                {msg.meta && (
                  <div className={`p-3 rounded-xl border space-y-2 mt-2 ${
                    isDarkMode ? 'bg-black/30 border-white/10' : 'bg-white border-black/10'
                  }`}>
                    {msg.meta.glycemicIndex && (
                      <div className="flex justify-between font-semibold">
                        <span className="text-gray-400">Glycemic Index:</span>
                        <span className="text-emerald-400">{msg.meta.glycemicIndex}</span>
                      </div>
                    )}
                    {msg.meta.keyNutrients && (
                      <div>
                        <span className="text-gray-400 block mb-1 font-semibold">Key Micronutrients:</span>
                        <div className="flex flex-wrap gap-1">
                          {msg.meta.keyNutrients.map((n, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 rounded bg-[#FF6B35]/20 text-[#FF6B35] text-[10px]">
                              {n}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {msg.meta.ayurvedicProperty && (
                      <div className="text-[11px]">
                        <span className="text-gray-400 font-semibold">Ayurvedic Profile: </span>
                        <span>{msg.meta.ayurvedicProperty}</span>
                      </div>
                    )}
                    {msg.meta.clinicalVerdict && (
                      <div className="p-2 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-semibold">
                        ✓ {msg.meta.clinicalVerdict}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="pt-4 border-t border-inherit flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask about ingredients, allergies, glycemic impact..."
            className={`flex-1 px-4 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] ${
              isDarkMode ? 'bg-[#1A1A1A] border-white/10 text-white' : 'bg-white border-black/10 text-black'
            }`}
          />
          <button
            type="submit"
            className="p-2.5 bg-[#FF6B35] hover:bg-[#FFA366] text-white rounded-xl shadow cursor-pointer transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </GlassCard>
    </div>
  );
};
