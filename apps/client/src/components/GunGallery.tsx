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

  const categories = ["All", "Assault Rifle", "Pistol", "Sniper", "SMG", "Shotgun", "LMG", "Heavy"];

  // FILTER LOGIC
  const filteredGuns = initialGuns.filter((gun) => {
    const matchesSearch = gun.name.toLowerCase().includes(search.toLowerCase());
    const gunCategory = gun.category || "Uncategorized";
    const matchesCategory = activeCategory === "All" || gunCategory === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* --- HEADER ISLAND (Clean & Modern) --- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 bg-white dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl backdrop-blur-sm transition-colors duration-300">
        
        {/* LOGO: Blue/Teal Gradient */}
        <div className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400 dark:from-blue-400 dark:to-emerald-400 whitespace-nowrap">
            Gun Wiki
          </h1>
        </div>

        {/* MIDDLE: Search & Filter Group */}
        <div className="flex flex-1 w-full max-w-2xl gap-2">
          
          {/* CATEGORY DROPDOWN */}
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="p-3 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer font-medium"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* SEARCH BAR */}
          <input
            type="text"
            placeholder="🔍 Search guns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner placeholder-gray-500"
          />
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <Link 
            href="/add" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 flex items-center gap-2 whitespace-nowrap"
          >
            <span className="text-xl">+</span> <span className="hidden md:inline">Add Gun</span>
          </Link>
        </div>
      </div>

      {/* GRID DISPLAY */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGuns.map((gun) => (
          <Link
            href={`/wiki/${gun._id}`}
            key={gun._id}
            className="group block bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            {/* Image Area */}
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

            {/* Text Area */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {gun.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {gun.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* NO RESULTS MESSAGE */}
      {filteredGuns.length === 0 && (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <p className="text-xl">No guns found matching "{search}"</p>
        </div>
      )}
    </div>
  );
}