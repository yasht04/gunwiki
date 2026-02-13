"use client"; // Needs to be client-side for search to work

import { useState } from "react";
import Link from "next/link";
import { Gun } from "../types/gun";

interface GunGalleryProps {
  initialGuns: Gun[];
}

export default function GunGallery({ initialGuns }: GunGalleryProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // The list of categories we want to show buttons for
  const categories = ["All", "Assault Rifle", "Pistol", "Sniper", "SMG", "Heavy"];

  // 1. FILTER LOGIC
  const filteredGuns = initialGuns.filter((gun) => {
    // Check if name matches search
    const matchesSearch = gun.name.toLowerCase().includes(search.toLowerCase());
    
    // Check if category matches (or if "All" is selected)
    // Note: We use "||" to handle old guns that don't have a category yet
    const gunCategory = gun.category || "Uncategorized";
    const matchesCategory = activeCategory === "All" || gunCategory === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* SEARCH BAR & FILTERS */}
      <div className="mb-12 space-y-6">
        
        {/* Search Input */}
        <input
          type="text"
          placeholder="🔍 Search guns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white text-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-bold transition-all ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRID DISPLAY */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGuns.map((gun) => (
          <Link
            href={`/wiki/${gun._id}`}
            key={gun._id}
            className="group block bg-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border border-gray-700"
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden bg-gray-900">
              <img
                src={gun.image_url}
                alt={gun.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-black/50 backdrop-blur-md text-xs font-bold px-2 py-1 rounded text-white border border-white/20">
                  {gun.category || "Unknown"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                {gun.name}
              </h2>
              <p className="text-gray-400 text-sm line-clamp-2">
                {gun.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* NO RESULTS MESSAGE */}
      {filteredGuns.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">No guns found matching "{search}"</p>
        </div>
      )}
    </div>
  );
}