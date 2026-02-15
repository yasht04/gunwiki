// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Gun } from "../types/gun";
// import ThemeToggle from "./ThemeToggle";

// interface GunGalleryProps {
//   initialGuns: Gun[];
// }

// export default function GunGallery({ initialGuns }: GunGalleryProps) {
//   const [search, setSearch] = useState("");
//   const [activeCategory, setActiveCategory] = useState("All");

//   const categories = ["All", "Assault Rifle", "Pistol", "Sniper", "SMG", "Shotgun", "LMG", "Heavy"];

//   // FILTER LOGIC
//   const filteredGuns = initialGuns.filter((gun) => {
//     const matchesSearch = gun.name.toLowerCase().includes(search.toLowerCase());
//     const gunCategory = gun.category || "Uncategorized";
//     const matchesCategory = activeCategory === "All" || gunCategory === activeCategory;

//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div>
//       {/* --- HEADER ISLAND --- */}
//       <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl backdrop-blur-sm transition-colors duration-300">
        
//         {/* LEFT: Logo */}
//         <div className="flex items-center">
//           <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400 dark:from-blue-400 dark:to-emerald-400 whitespace-nowrap">
//             Gun Wiki
//           </h1>
//         </div>

//         {/* MIDDLE: Search & Filter Group */}
//         <div className="flex flex-1 w-full max-w-2xl gap-2">
          
//           {/* CATEGORY DROPDOWN */}
//           <select
//             value={activeCategory}
//             onChange={(e) => setActiveCategory(e.target.value)}
//             className="p-3 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer font-medium"
//           >
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>

//           {/* SEARCH BAR */}
//           <input
//             type="text"
//             placeholder="🔍 Search guns..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="flex-1 w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner placeholder-gray-500"
//           />
//         </div>

//         {/* RIGHT: Actions */}
//         <div className="flex items-center gap-3">
//           <ThemeToggle />
          
//           <Link 
//             href="/add" 
//             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 flex items-center gap-2 whitespace-nowrap"
//           >
//             <span className="text-xl">+</span> <span className="hidden md:inline">Add Gun</span>
//           </Link>
//         </div>
//       </div>

//       {/* GRID DISPLAY */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {filteredGuns.map((gun) => (
//           <Link
//             href={`/wiki/${gun._id}`}
//             key={gun._id}
//             className="group block bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border border-gray-200 dark:border-gray-700"
//           >
//             {/* Image Area */}
//             <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-900">
//               <img
//                 src={gun.image_url}
//                 alt={gun.name}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//               />
//               <div className="absolute top-4 right-4">
//                 <span className="bg-white/90 dark:bg-black/50 backdrop-blur-md text-xs font-bold px-2 py-1 rounded text-gray-900 dark:text-white border border-gray-200 dark:border-white/20 shadow-sm">
//                   {gun.category || "Unknown"}
//                 </span>
//               </div>
//             </div>

//             {/* Text Area */}
//             <div className="p-6">
//               <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//                 {gun.name}
//               </h2>
//               <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
//                 {gun.description}
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>

//       {/* NO RESULTS MESSAGE */}
//       {filteredGuns.length === 0 && (
//         <div className="text-center py-20 text-gray-500 dark:text-gray-400">
//           <p className="text-xl">No guns found matching "{search}"</p>
//         </div>
//       )}
//     </div>
//   );
// }

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
    <div className="space-y-8">
      
      {/* --- HUD HEADER --- */}
      <div className="sticky top-4 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-4 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* 1. LOGO AREA */}
          <div className="flex items-center gap-3">
            <div className="w-3 h-10 bg-blue-600 rounded-full"></div> {/* Accent Bar */}
            <h1 className="text-2xl font-black tracking-tighter uppercase italic text-gray-900 dark:text-white">
              Gun<span className="text-blue-600">Wiki</span>
            </h1>
          </div>

          {/* 2. UNIFIED SEARCH BAR (The "Command Center") */}
          <div className="flex w-full max-w-2xl bg-gray-100 dark:bg-gray-800 rounded-2xl p-1 border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            
            {/* Category Select (Left Side) */}
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="bg-transparent text-gray-700 dark:text-gray-300 font-bold px-4 py-2 text-sm outline-none cursor-pointer hover:text-blue-500 transition-colors border-r border-gray-300 dark:border-gray-600"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-white dark:bg-gray-800">
                  {cat}
                </option>
              ))}
            </select>

            {/* Search Input (Right Side) */}
            <input
              type="text"
              placeholder="Search database..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent px-4 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none font-medium"
            />
            
            {/* Search Icon (Visual only) */}
            <div className="pr-4 flex items-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* 3. ACTION BUTTONS */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <Link 
              href="/add" 
              className="group relative bg-gray-900 dark:bg-white text-white dark:text-black font-bold py-3 px-6 rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              <div className="absolute inset-0 bg-blue-600 mix-blend-multiply opacity-0 group-hover:opacity-20 transition-opacity" />
              <span className="flex items-center gap-2">
                <span>+</span> New Entry
              </span>
            </Link>
          </div>

        </div>
      </div>

      {/* --- GRID DISPLAY --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGuns.map((gun) => (
          <Link
            href={`/wiki/${gun._id}`}
            key={gun._id}
            className="group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            {/* Image Container */}
            <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
              <img
                src={gun.image_url}
                alt={gun.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              
              {/* Category Badge (Floating) */}
              <div className="absolute bottom-3 left-3">
                <span className="bg-white/90 dark:bg-black/80 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-sm">
                  {gun.category || "Unknown"}
                </span>
              </div>
            </div>

            {/* Info Area */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {gun.name}
                </h2>
                {/* Manufacturer Tag */}
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded">
                  {gun.manufacturer || "N/A"}
                </span>
              </div>
              
              <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
                {gun.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* NO RESULTS STATE */}
      {filteredGuns.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center opacity-50">
          <div className="text-6xl mb-4">🕵️‍♂️</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">No matches found</h3>
          <p className="text-gray-500">Try adjusting your search or category filter.</p>
        </div>
      )}

    </div>
  );
}