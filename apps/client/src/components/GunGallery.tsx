"use client";

import { useState } from "react";
import Link from "next/link";
import { Gun } from "../types/gun";

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
      {/* --- NEW HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur-sm">
        
        {/* LEFT: Logo */}
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 whitespace-nowrap">
          Gun Wiki
        </h1>

        {/* MIDDLE: Search Bar (Now centered!) */}
        <div className="w-full max-w-xl">
          <input
            type="text"
            placeholder="🔍 Search guns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-900 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner"
          />
        </div>

        {/* RIGHT: Add Button */}
        <Link 
          href="/add" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 flex items-center gap-2 whitespace-nowrap"
        >
          <span className="text-xl">+</span> Add Gun
        </Link>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full font-bold transition-all text-sm ${
              activeCategory === cat
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID DISPLAY */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGuns.map((gun) => (
          <Link
            href={`/wiki/${gun._id}`}
            key={gun._id}
            className="group block bg-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border border-gray-700"
          >
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