import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { formatINR } from '../../utils/formatters';
import { FoodItem } from '../../types';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  X,
  Sparkles,
  SlidersHorizontal,
  Flame,
  Star,
} from 'lucide-react';

export const MenuManagementPage: React.FC = () => {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useAuth();
  const { isDarkMode } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingDish, setEditingDish] = useState<FoodItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [savedToast, setSavedToast] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<FoodItem>>({
    name: '',
    description: '',
    category: 'Healthy Bowls',
    cuisine: 'North Indian',
    price: 350,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    isChefSpecial: false,
    healthScore: 92,
    glycemicIndex: 'Low',
    rating: 4.8,
    reviewCount: 40,
    ingredients: ['Foxtail Millet', 'Moong Dal', 'A2 Desi Ghee', 'Salem Turmeric'],
    allergies: [],
    suitableForConditions: ['Type-2 Diabetes', 'Hypertension Risk'],
    avoidForConditions: [],
    macros: {
      calories: 380,
      protein: 16,
      carbs: 48,
      fat: 10,
      fiber: 8,
      sugar: 2,
    },
  });

  const filteredDishes = menuItems.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenEdit = (dish: FoodItem) => {
    setEditingDish(dish);
    setFormData({ ...dish });
    setIsCreatingNew(false);
  };

  const handleOpenCreate = () => {
    setIsCreatingNew(true);
    setEditingDish(null);
    setFormData({
      name: '',
      description: '',
      category: 'Healthy Bowls',
      cuisine: 'South Indian',
      price: 280,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isChefSpecial: false,
      healthScore: 90,
      glycemicIndex: 'Low',
      rating: 4.9,
      reviewCount: 12,
      ingredients: ['Finger Millet (Ragi)', 'Coconut Oil', 'Curry Leaves', 'Mustard Seeds'],
      allergies: [],
      suitableForConditions: ['Type-2 Diabetes'],
      avoidForConditions: [],
      macros: {
        calories: 320,
        protein: 14,
        carbs: 42,
        fat: 8,
        fiber: 7,
        sugar: 1,
      },
    });
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreatingNew) {
      addMenuItem(formData as Omit<FoodItem, 'id'>);
      setSavedToast(`Dish "${formData.name}" added to menu!`);
    } else if (editingDish) {
      updateMenuItem(editingDish.id, formData);
      setSavedToast(`Dish "${formData.name}" updated!`);
    }
    setIsCreatingNew(false);
    setEditingDish(null);
    setTimeout(() => setSavedToast(null), 3000);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from the active menu?`)) {
      deleteMenuItem(id);
      setSavedToast(`Deleted "${name}"`);
      setTimeout(() => setSavedToast(null), 2500);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {savedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-500 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{savedToast}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Menu Catalog CRUD Management</h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Add, modify, calibrate macros, and update prices in Indian Rupees (₹).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 bg-[#FF6B35] hover:bg-[#FFA366] text-white text-xs font-bold rounded-xl shadow cursor-pointer transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Dish SKU</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter dishes by name or category..."
          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] ${
            isDarkMode ? 'bg-[#1A1A1A] border-white/10 text-white' : 'bg-white border-black/10 text-black'
          }`}
        />
      </div>

      {/* Dishes Table / Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDishes.map((dish) => (
          <GlassCard key={dish.id} className="p-0 overflow-hidden flex flex-col justify-between group">
            <div className="relative h-44">
              <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-xs font-bold text-white px-2 py-0.5 rounded">
                Score: {dish.healthScore}
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(dish)}
                  className="p-2 rounded-lg bg-black/70 backdrop-blur-sm text-white hover:text-[#FF6B35] transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(dish.id, dish.name)}
                  className="p-2 rounded-lg bg-black/70 backdrop-blur-sm text-white hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{dish.category}</span>
                  <span className="text-cyan-400 font-semibold">{dish.cuisine}</span>
                </div>
                <h4 className="font-bold text-base mt-1 line-clamp-1">{dish.name}</h4>
                <p className={`text-xs mt-1 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {dish.description}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-2 font-mono">
                  <span>{dish.macros.calories} kcal</span>
                  <span>• P: {dish.macros.protein}g</span>
                  <span>• C: {dish.macros.carbs}g</span>
                  <span>• F: {dish.macros.fat}g</span>
                </div>
              </div>

              <div className="pt-3 border-t border-inherit flex items-center justify-between">
                <span className="text-base font-black text-[#FF6B35]">{formatINR(dish.price)}</span>
                <button
                  onClick={() => handleOpenEdit(dish)}
                  className="text-xs font-bold text-gray-400 hover:text-white transition-colors"
                >
                  Edit Details →
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Edit / Create Dish Modal */}
      {(isCreatingNew || editingDish) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
          <div
            className={`w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border relative my-8 ${
              isDarkMode ? 'bg-[#1A1A1A] border-white/15 text-white' : 'bg-white border-black/10 text-black'
            }`}
          >
            <button
              onClick={() => {
                setIsCreatingNew(false);
                setEditingDish(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleSaveForm} className="space-y-4">
              <h2 className="text-xl font-black">
                {isCreatingNew ? 'Create New Dish Item' : `Edit "${editingDish?.name}"`}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Dish Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] ${
                      isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Price (₹ INR)</label>
                  <input
                    required
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] ${
                      isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none focus:border-[#FF6B35] ${
                    isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Calories (kcal)</label>
                  <input
                    type="number"
                    value={formData.macros?.calories}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        macros: { ...formData.macros!, calories: Number(e.target.value) },
                      })
                    }
                    className={`w-full px-3 py-2 rounded-xl border text-xs ${
                      isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/10'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Protein (g)</label>
                  <input
                    type="number"
                    value={formData.macros?.protein}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        macros: { ...formData.macros!, protein: Number(e.target.value) },
                      })
                    }
                    className={`w-full px-3 py-2 rounded-xl border text-xs ${
                      isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/10'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    value={formData.macros?.carbs}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        macros: { ...formData.macros!, carbs: Number(e.target.value) },
                      })
                    }
                    className={`w-full px-3 py-2 rounded-xl border text-xs ${
                      isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/10'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Health Score</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.healthScore}
                    onChange={(e) => setFormData({ ...formData, healthScore: Number(e.target.value) })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs ${
                      isDarkMode ? 'bg-[#242424] border-white/10' : 'bg-gray-50 border-black/10'
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-inherit">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingNew(false);
                    setEditingDish(null);
                  }}
                  className="px-5 py-2.5 rounded-xl border text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#FF6B35] hover:bg-[#FFA366] text-white font-bold text-xs rounded-xl shadow-lg"
                >
                  Save Dish Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
