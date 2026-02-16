"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Gun } from "../types/gun";
import ThemeToggle from "./ThemeToggle";
import CompareButton from "./CompareButton";

interface GunGalleryProps {
  initialGuns: Gun[];
}

export default function GunGallery({ initialGuns }: GunGalleryProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  // --- NEW: Advanced Filter States ---
  const [showFilters, setShowFilters] = useState(false);
  const [activeManufacturer, setActiveManufacturer] = useState("All");
  const [activeAction, setActiveAction] = useState("All");
  const [sortBy, setSortBy] = useState("Name (A-Z)");

  const categories = ["All", "Assault Rifle", "Pistol", "Sniper", "SMG", "Shotgun", "LMG", "Heavy"];

  // 1. DYNAMICALLY EXTRACT OPTIONS (So you don't have to type them manually)
  const manufacturers = useMemo(() => {
    const list = initialGuns.map((g) => g.manufacturer).filter(Boolean);
    return ["All", ...Array.from(new Set(list))].sort();
  }, [initialGuns]);

  const actions = useMemo(() => {
    const list = initialGuns.map((g) => g.specs?.action).filter(Boolean);
    return ["All", ...Array.from(new Set(list))].sort();
  }, [initialGuns]);

  // 2. ADVANCED FILTER LOGIC
  const filteredGuns = initialGuns
    .filter((gun) => {
      // Basic Search
      const matchesSearch = gun.name.toLowerCase().includes(search.toLowerCase());
      
      // Category Filter
      const gunCategory = gun.category || "Uncategorized";
      const matchesCategory = activeCategory === "All" || gunCategory === activeCategory;

      // Manufacturer Filter
      const matchesManu = activeManufacturer === "All" || gun.manufacturer === activeManufacturer;

      // Action Filter
      const matchesAction = activeAction === "All" || gun.specs?.action === activeAction;

      return matchesSearch && matchesCategory && matchesManu && matchesAction;
    })
    .sort((a, b) => {
      // Sorting Logic
      if (sortBy === "Name (Z-A)") return b.name.localeCompare(a.name);
      return a.name.localeCompare(b.name); // Default A-Z
    });

  return (
    <div>
      {/* --- HEADER ISLAND --- */}
      <div className="flex flex-col gap-4 mb-8 bg-white dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl backdrop-blur-sm transition-colors duration-300">
        
        {/* TOP ROW: Logo, Search, Main Actions */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400 dark:from-blue-400 dark:to-emerald-400 whitespace-nowrap">
              Gun Wiki
            </h1>
          </div>

          <div className="flex flex-1 w-full max-w-3xl gap-2">
            {/* Primary Category Filter */}
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="hidden md:block p-3 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer font-medium"
            >
              {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            {/* Search Input */}
            <input
              type="text"
              placeholder="🔍 Search guns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none shadow-inner"
            />

            {/* TOGGLE ADVANCED FILTERS BUTTON */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3 rounded-xl border transition-all flex items-center gap-2 font-bold ${
                showFilters 
                  ? "bg-blue-100 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-400" 
                  : "bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              <span className="text-lg">⚡</span> <span className="hidden md:inline">Filters</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/add" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 flex items-center gap-2 whitespace-nowrap">
              <span className="text-xl">+</span> <span className="hidden md:inline">Add</span>
            </Link>
          </div>
        </div>

        {/* --- EXPANDABLE FILTER PANEL --- */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top-2 duration-200">
            
            {/* Manufacturer Filter */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Manufacturer</label>
              <select
                value={activeManufacturer}
                onChange={(e) => setActiveManufacturer(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 outline-none"
              >
                {manufacturers.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            {/* Action Type Filter */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Action Type</label>
              <select
                value={activeAction}
                onChange={(e) => setActiveAction(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 outline-none"
              >
                {actions.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            {/* Sort Order */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 outline-none"
              >
                <option>Name (A-Z)</option>
                <option>Name (Z-A)</option>
              </select>
            </div>
            
            {/* Reset Link */}
            <div className="md:col-span-3 text-right">
              <button 
                onClick={() => { setActiveManufacturer("All"); setActiveAction("All"); setSortBy("Name (A-Z)"); }}
                className="text-xs text-red-500 hover:text-red-700 font-bold underline"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- GRID DISPLAY --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGuns.map((gun) => (
          <div key={gun._id} className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border border-gray-200 dark:border-gray-700 flex flex-col">
            <Link href={`/wiki/${gun._id}`} className="block relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-900">
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
            </Link>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {gun.name}
                </h2>
                <div className="flex gap-2 mb-3">
                    {/* Tiny badges for quick specs */}
                    {gun.manufacturer && <span className="text-[10px] font-bold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-500 dark:text-gray-300 uppercase">{gun.manufacturer}</span>}
                    {gun.specs?.action && <span className="text-[10px] font-bold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-500 dark:text-gray-300 uppercase line-clamp-1">{gun.specs.action}</span>}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {gun.description}
                </p>
              </div>
              
              {/* Compare Button is now part of the card footer */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                 <Link href={`/wiki/${gun._id}`} className="text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline">View Details →</Link>
                 <div className="scale-90 origin-right">
                    <CompareButton gun={gun} />
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NO RESULTS MESSAGE */}
      {filteredGuns.length === 0 && (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <p className="text-xl">No guns found matching filters</p>
          <button 
             onClick={() => {setSearch(""); setActiveCategory("All"); setActiveManufacturer("All"); setActiveAction("All");}} 
             className="mt-4 text-blue-500 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}