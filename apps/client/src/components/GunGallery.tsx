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
    <div className="relative z-10"> {/* z-10 to sit above vignette */}
      
      {/* --- HEADER: The "Riddler" Terminal Look --- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b-2 border-vengeance pb-8">
        
        {/* LOGO: Big, Red, and Brutal */}
        <h1 className="text-5xl font-black uppercase tracking-widest text-vengeance drop-shadow-[0_0_10px_rgba(225,11,22,0.8)]">
          GUN_WIKI
        </h1>

        {/* SEARCH & FILTER GROUP */}
        <div className="flex flex-col md:flex-row w-full max-w-3xl gap-4">
          
          {/* CATEGORY SELECTOR (Square corners) */}
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="p-4 bg-black border-2 border-gray-700 text-vengeance font-bold uppercase tracking-wider focus:border-vengeance focus:outline-none focus:shadow-[0_0_15px_rgba(225,11,22,0.3)]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat.toUpperCase()}</option>
            ))}
          </select>

          {/* SEARCH BAR (Terminal Input) */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="INITIALIZE_SEARCH..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-4 bg-black border-2 border-gray-700 text-white placeholder-gray-600 font-mono uppercase focus:border-vengeance focus:outline-none focus:shadow-[0_0_15px_rgba(225,11,22,0.3)]"
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link 
            href="/add" 
            className="bg-vengeance hover:bg-vengeance-dark text-black hover:text-white font-black py-4 px-8 uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(225,11,22,0.6)]"
          >
            + ACCESS
          </Link>
        </div>
      </div>

      {/* --- GRID DISPLAY --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGuns.map((gun) => (
          <Link
            href={`/wiki/${gun._id}`}
            key={gun._id}
            className="group block bg-concrete border border-gray-800 hover:border-vengeance transition-all duration-300 relative overflow-hidden"
          >
            {/* Image Area with "Red Overlay" on hover */}
            <div className="relative h-64 bg-black overflow-hidden">
              <div className="absolute inset-0 bg-vengeance opacity-0 group-hover:opacity-20 transition-opacity z-10 mix-blend-multiply"></div>
              <img
                src={gun.image_url}
                alt={gun.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
              />
              <div className="absolute top-0 right-0 bg-vengeance text-black font-bold px-3 py-1 text-xs uppercase tracking-wider">
                {gun.category || "UNKNOWN"}
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 border-t-2 border-gray-800 group-hover:border-vengeance">
              <h2 className="text-2xl font-black text-white group-hover:text-vengeance uppercase tracking-wide mb-2">
                {gun.name}
              </h2>
              <p className="text-gray-500 font-mono text-sm line-clamp-2 uppercase">
                {gun.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* NO RESULTS */}
      {filteredGuns.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl text-vengeance font-bold uppercase tracking-widest animate-pulse">
            NO_DATA_FOUND
          </p>
        </div>
      )}
    </div>
  );
}