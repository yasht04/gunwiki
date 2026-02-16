"use client";

import { useState } from "react";
import Link from "next/link";
import { Gun } from "../types/gun";
import ThemeToggle from "./ThemeToggle";

interface GunGalleryProps {
  initialGuns: Gun[];
}

export default function GunGallery({ initialGuns }: GunGalleryProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  // --- NEW: Comparison State ---
  const [selectedGuns, setSelectedGuns] = useState<Gun[]>([]);
  const [isComparing, setIsComparing] = useState(false);

  const categories = ["All", "Assault Rifle", "Pistol", "Sniper", "SMG", "Shotgun", "LMG", "Heavy"];

  // FILTER LOGIC
  const filteredGuns = initialGuns.filter((gun) => {
    const matchesSearch = gun.name.toLowerCase().includes(search.toLowerCase());
    const gunCategory = gun.category || "Uncategorized";
    const matchesCategory = activeCategory === "All" || gunCategory === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // --- NEW: Toggle Selection ---
  const toggleSelection = (gun: Gun) => {
    if (selectedGuns.find((g) => g._id === gun._id)) {
      // Remove if already selected
      setSelectedGuns(selectedGuns.filter((g) => g._id !== gun._id));
    } else {
      // Add if less than 2 selected
      if (selectedGuns.length < 2) {
        setSelectedGuns([...selectedGuns, gun]);
      } else {
        alert("You can only compare 2 guns at a time!");
      }
    }
  };

  return (
    <div>
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 bg-white dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl backdrop-blur-sm transition-colors duration-300">
        <div className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400 dark:from-blue-400 dark:to-emerald-400 whitespace-nowrap">
            Gun Wiki
          </h1>
        </div>

        <div className="flex flex-1 w-full max-w-2xl gap-2">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="p-3 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer font-medium"
          >
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input
            type="text"
            placeholder="🔍 Search guns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner placeholder-gray-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/add" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 flex items-center gap-2 whitespace-nowrap">
            <span className="text-xl">+</span> <span className="hidden md:inline">Add Gun</span>
          </Link>
        </div>
      </div>

      {/* --- GRID DISPLAY --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
        {filteredGuns.map((gun) => {
          const isSelected = selectedGuns.some(g => g._id === gun._id);
          
          return (
            <div key={gun._id} className={`group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 border ${isSelected ? 'border-blue-500 ring-2 ring-blue-500 shadow-xl scale-[1.02]' : 'border-gray-200 dark:border-gray-700 hover:shadow-2xl'}`}>
              
              {/* CHECKBOX OVERLAY */}
              <div className="absolute top-3 left-3 z-30">
                <button 
                  onClick={() => toggleSelection(gun)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${isSelected ? 'bg-blue-500 border-blue-500 text-white' : 'bg-black/40 border-white text-transparent hover:border-blue-400'}`}
                >
                  ✓
                </button>
              </div>

              <Link href={`/wiki/${gun._id}`}>
                <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-900">
                  <img
                    src={gun.image_url}
                    alt={gun.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 dark:bg-black/50 backdrop-blur-md text-xs font-bold px-2 py-1 rounded text-gray-900 dark:text-white border border-gray-200 dark:border-white/20 shadow-sm">
                      {gun.category || "Unknown"}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {gun.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {gun.description}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* --- FLOATING COMPARE BAR --- */}
      {selectedGuns.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-gray-900/90 backdrop-blur-md text-white px-6 py-4 rounded-full shadow-2xl border border-gray-700 flex items-center gap-6 animate-bounce-in">
          <span className="font-bold">{selectedGuns.length} / 2 Selected</span>
          
          <button 
            onClick={() => setSelectedGuns([])}
            className="text-gray-400 hover:text-white text-sm underline"
          >
            Clear
          </button>

          <button
            onClick={() => setIsComparing(true)}
            disabled={selectedGuns.length < 2}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              selectedGuns.length === 2 
                ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/50" 
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            Compare Now
          </button>
        </div>
      )}

      {/* --- COMPARISON MODAL --- */}
      {isComparing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl relative animate-fade-in">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsComparing(false)}
              className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-800 p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors z-10"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold text-center py-8 text-gray-900 dark:text-white">Head-to-Head Comparison</h2>

            <div className="grid grid-cols-3 gap-0 border-t border-gray-200 dark:border-gray-800">
              
              {/* LABELS COLUMN */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 font-bold text-gray-500 dark:text-gray-400 flex flex-col gap-6 pt-64 md:pt-80">
                <div className="h-10 flex items-center">Category</div>
                <div className="h-10 flex items-center">Caliber</div>
                <div className="h-10 flex items-center">Weight</div>
                <div className="h-10 flex items-center">Length</div>
                <div className="h-10 flex items-center">Action</div>
              </div>

              {/* GUN 1 COLUMN */}
              {selectedGuns.map((gun) => (
                <div key={gun._id} className="border-l border-gray-200 dark:border-gray-800 p-4 text-center">
                  <div className="h-48 md:h-64 mb-4 flex items-end justify-center">
                    <img src={gun.image_url} className="max-h-full max-w-full object-contain rounded-lg" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6">{gun.name}</h3>

                  <div className="flex flex-col gap-6 text-gray-900 dark:text-white font-medium">
                    <div className="h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded">{gun.category}</div>
                    <div className="h-10 flex items-center justify-center">{gun.specs?.caliber || "-"}</div>
                    <div className="h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded">{gun.specs?.weight || "-"}</div>
                    <div className="h-10 flex items-center justify-center">{gun.specs?.length || "-"}</div>
                    <div className="h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded">{gun.specs?.action || "-"}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}