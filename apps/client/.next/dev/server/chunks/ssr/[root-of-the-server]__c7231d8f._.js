module.exports = [
"[project]/Desktop/GUN/apps/client/src/app/favicon.ico.mjs { IMAGE => \"[project]/Desktop/GUN/apps/client/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/GUN/apps/client/src/app/favicon.ico.mjs { IMAGE => \"[project]/Desktop/GUN/apps/client/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Desktop/GUN/apps/client/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/GUN/apps/client/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/Desktop/GUN/apps/client/src/components/GunGallery.tsx [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
}),
"[project]/Desktop/GUN/apps/client/src/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$GUN$2f$apps$2f$client$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/GUN/apps/client/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$GUN$2f$apps$2f$client$2f$src$2f$components$2f$GunGallery$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/GUN/apps/client/src/components/GunGallery.tsx [app-rsc] (ecmascript)");
;
;
async function getGuns() {
    try {
        const res = await fetch("http://127.0.0.1:4000/guns", {
            cache: "no-store"
        });
        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        return [];
    }
}
async function Home() {
    const guns = await getGuns();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$GUN$2f$apps$2f$client$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-8 transition-colors duration-300",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$GUN$2f$apps$2f$client$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$GUN$2f$apps$2f$client$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$GUN$2f$apps$2f$client$2f$src$2f$components$2f$GunGallery$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                initialGuns: guns
            }, void 0, false, {
                fileName: "[project]/Desktop/GUN/apps/client/src/app/page.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/GUN/apps/client/src/app/page.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/GUN/apps/client/src/app/page.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/GUN/apps/client/src/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/GUN/apps/client/src/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c7231d8f._.js.map