import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { FoodItem } from '../../types';
import { GlassCard } from '../../components/common/GlassCard';
import { formatINR } from '../../utils/formatters';
import {
  Search,
  SlidersHorizontal,
  Star,
  Plus,
  HeartPulse,
  Flame,
  Info,
  CheckCircle2,
  X,
  Sparkles,
  ShieldAlert,
  Brain,
} from 'lucide-react';

export const MenuPage: React.FC = () => {
  const { menuItems, addToCart } = useAuth();
  const { isDarkMode } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [dietaryFilter, setDietaryFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('FEATURED');
  const [selectedDish, setSelectedDish] = useState<FoodItem | null>(null);
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const categories = ['All', 'Healthy Bowls', 'Main Course', 'Appetizers', 'Breads & Rice', 'Beverages', 'Desserts'];
  const dietaryOptions = ['All', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Low GI', 'High Protein (20g+)'];

  const filteredDishes = useMemo(() => {
    return menuItems
      .filter((dish) => {
        const matchesSearch =
          dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dish.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCat = selectedCategory === 'All' || dish.category === selectedCategory;

        let matchesDiet = true;
        if (dietaryFilter === 'Vegetarian') matchesDiet = dish.isVegetarian;
        else if (dietaryFilter === 'Vegan') matchesDiet = dish.isVegan;
        else if (dietaryFilter === 'Gluten-Free') matchesDiet = dish.isGlutenFree;
        else if (dietaryFilter === 'Low GI') matchesDiet = dish.glycemicIndex === 'Low';
        else if (dietaryFilter === 'High Protein (20g+)') matchesDiet = dish.macros.protein >= 20;

        return matchesSearch && matchesCat && matchesDiet;
      })
      .sort((a, b) => {
        if (sortBy === 'PRICE_ASC') return a.price - b.price;
        if (sortBy === 'PRICE_DESC') return b.price - a.price;
        if (sortBy === 'HEALTH_SCORE') return b.healthScore - a.healthScore;
        if (sortBy === 'RATING') return b.rating - a.rating;
        return 0; // Featured default
      });
  }, [menuItems, searchQuery, selectedCategory, dietaryFilter, sortBy]);

  const handleAddToCart = (dish: FoodItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToCart(dish, 1);
    setAddedItemNotice(dish.name);
    setTimeout(() => setAddedItemNotice(null), 2500);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Toast notification */}
      {addedItemNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#FF6B35] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>Added "{addedItemNotice}" to Cart!</span>
        </div>
      )}

      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Smart Culinary Menu</h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Explore chef specials curated with precision macros and glycemic intelligence.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by dish, spice, or ingredient..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] transition-all ${
              isDarkMode ? 'bg-[#1A1A1A] border-white/10 text-white' : 'bg-white border-black/10 text-black'
            }`}
          />
        </div>
      </div>

      {/* Categories & Filter Bar */}
      <div className="space-y-3">
        {/* Category horizontal scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#FF6B35] text-white shadow-md shadow-[#FF6B35]/25'
                  : isDarkMode
                  ? 'bg-[#1A1A1A] border border-white/10 text-gray-300 hover:bg-white/5'
                  : 'bg-white border border-black/10 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sub-Filters: Dietary & Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Dietary options */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-1">Diet:</span>
            {dietaryOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setDietaryFilter(opt)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                  dietaryFilter === opt
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    : isDarkMode
                    ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                    : 'bg-black/5 text-gray-600 hover:bg-black/10'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Sort Select */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400 font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-3 py-1.5 rounded-lg border text-xs outline-none focus:border-[#FF6B35] ${
                isDarkMode ? 'bg-[#1A1A1A] border-white/10 text-white' : 'bg-white border-black/10 text-black'
              }`}
            >
              <option value="FEATURED">Chef Recommended</option>
              <option value="HEALTH_SCORE">Health Score (Highest)</option>
              <option value="PRICE_ASC">Price (₹): Low to High</option>
              <option value="PRICE_DESC">Price (₹): High to Low</option>
              <option value="RATING">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Dishes */}
      {filteredDishes.length === 0 ? (
        <div className="py-16 text-center space-y-3">
          <p className="text-sm font-bold text-gray-400">No gourmet dishes matched your current filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setDietaryFilter('All');
            }}
            className="text-xs font-bold text-[#FF6B35] underline"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => (
            <GlassCard
              key={dish.id}
              clickable
              glowOnHover
              onClick={() => setSelectedDish(dish)}
              className="p-0 overflow-hidden flex flex-col justify-between group cursor-pointer"
            >
              {/* Dish Image + Badges */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold text-white shadow ${
                      dish.healthScore >= 90
                        ? 'bg-emerald-500'
                        : dish.healthScore >= 75
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                    }`}
                  >
                    Score {dish.healthScore}/100
                  </span>
                  {dish.isChefSpecial && (
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#FF6B35] text-white shadow uppercase tracking-wider">
                      Chef Special
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded text-xs font-bold text-white flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{dish.rating}</span>
                </div>

                <div className="absolute bottom-2 left-3 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-gray-200">
                  {dish.macros.calories} kcal • {dish.macros.protein}g Protein
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{dish.cuisine}</span>
                    <span className="font-semibold text-cyan-400">GI: {dish.glycemicIndex}</span>
                  </div>
                  <h3 className="font-bold text-base leading-tight group-hover:text-[#FF6B35] transition-colors line-clamp-1">
                    {dish.name}
                  </h3>
                  <p className={`text-xs line-clamp-2 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {dish.description}
                  </p>
                </div>

                {/* Macro Micro-Badges */}
                <div className="flex items-center gap-2 text-[10px] text-gray-400 pt-1">
                  <span className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-inherit">
                    C: {dish.macros.carbs}g
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-inherit">
                    F: {dish.macros.fat}g
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-inherit">
                    Fiber: {dish.macros.fiber}g
                  </span>
                </div>

                {/* Pricing & Add to Cart button (locked vibrant orange) */}
                <div className="pt-3 border-t border-inherit flex items-center justify-between">
                  <div>
                    <span className="text-base font-black text-[#FF6B35]">{formatINR(dish.price)}</span>
                    <p className="text-[10px] text-gray-400">Incl. GST</p>
                  </div>

                  <button
                    id={`add-cart-btn-${dish.id}`}
                    onClick={(e) => handleAddToCart(dish, e)}
                    className="px-4 py-2 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-xl shadow-md shadow-[#FF6B35]/25 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Dish Detailed Nutrition & AI Modal */}
      {selectedDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
          <div
            className={`w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border relative my-8 ${
              isDarkMode ? 'bg-[#1A1A1A] border-white/15 text-white' : 'bg-white border-black/10 text-[#0F0F0F]'
            }`}
          >
            <button
              onClick={() => setSelectedDish(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              {/* Header Details */}
              <div className="flex flex-col sm:flex-row gap-5">
                <img
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  className="w-full sm:w-48 h-48 rounded-2xl object-cover"
                />
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#FF6B35] uppercase">{selectedDish.category}</span>
                    <span className="text-xs text-gray-400">• {selectedDish.cuisine}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black">{selectedDish.name}</h2>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {selectedDish.description}
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xl font-black text-[#FF6B35]">{formatINR(selectedDish.price)}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 font-bold">
                      Health Score {selectedDish.healthScore}/100
                    </span>
                  </div>
                </div>
              </div>

              {/* Nutrition Facts Grid */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Nutritional Facts Breakdown</h4>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
                  <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/5'}`}>
                    <span className="text-[10px] text-gray-400 block">Energy</span>
                    <span className="font-black text-[#FF6B35]">{selectedDish.macros.calories} kcal</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/5'}`}>
                    <span className="text-[10px] text-gray-400 block">Protein</span>
                    <span className="font-bold text-cyan-400">{selectedDish.macros.protein}g</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/5'}`}>
                    <span className="text-[10px] text-gray-400 block">Carbs</span>
                    <span className="font-bold">{selectedDish.macros.carbs}g</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/5'}`}>
                    <span className="text-[10px] text-gray-400 block">Fats</span>
                    <span className="font-bold">{selectedDish.macros.fat}g</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/5'}`}>
                    <span className="text-[10px] text-gray-400 block">Fiber</span>
                    <span className="font-bold text-emerald-400">{selectedDish.macros.fiber}g</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/5'}`}>
                    <span className="text-[10px] text-gray-400 block">Glycemic</span>
                    <span className="font-bold text-amber-400">{selectedDish.glycemicIndex}</span>
                  </div>
                </div>
              </div>

              {/* Ingredients & Allergens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className={`p-3.5 rounded-xl border ${isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/5'}`}>
                  <span className="font-bold block mb-1">Key Ingredients:</span>
                  <p className="opacity-80">{selectedDish.ingredients.join(', ')}</p>
                </div>
                <div className={`p-3.5 rounded-xl border ${isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/5'}`}>
                  <span className="font-bold block mb-1">Allergen Safety:</span>
                  <p className="opacity-80">
                    {selectedDish.allergens.length > 0 ? selectedDish.allergens.join(', ') : 'Zero major allergens detected'}
                  </p>
                </div>
              </div>

              {/* Disease Compatibility AI Engine */}
              <div className="rounded-2xl bg-cyan-500/10 border border-cyan-500/20 p-4 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                  <Brain className="w-4 h-4" />
                  <span>SmartBite AI Clinical Assessment</span>
                </div>
                <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Safe for {selectedDish.suitableForConditions.join(', ') || 'General Wellness'}. 
                  {selectedDish.avoidForConditions.length > 0 && ` Caution suggested for patrons with ${selectedDish.avoidForConditions.join(', ')}.`}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedDish(null)}
                  className={`px-5 py-2.5 rounded-xl border text-xs font-semibold ${
                    isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'
                  }`}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleAddToCart(selectedDish);
                    setSelectedDish(null);
                  }}
                  className="px-6 py-2.5 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#FF6B35]/30 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add {selectedDish.name} to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
