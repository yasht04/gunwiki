"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Gun } from "../../types/gun";

export default function ComparePage() {
  const [guns, setGuns] = useState<Gun[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("compareList");
    if (saved) {
      setGuns(JSON.parse(saved));
    }
  }, []);

  const clearComparison = () => {
    localStorage.removeItem("compareList");
    setGuns([]);
  };

  if (guns.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-4">No Guns Selected</h1>
        <Link href="/" className="text-blue-500 hover:underline text-xl">Go back to Gallery</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            Comparison Table
          </h1>
          <div className="flex gap-4">
            <button onClick={clearComparison} className="text-red-500 hover:text-red-400 font-bold">Clear All</button>
            <Link href="/" className="bg-gray-700 text-white px-6 py-2 rounded-lg font-bold">Back to Home</Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-0 border border-gray-300 dark:border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* LABELS */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 flex flex-col gap-8 pt-64 font-bold text-gray-500 dark:text-gray-400">
            <div className="h-8 flex items-center">Category</div>
            <div className="h-8 flex items-center">Caliber</div>
            <div className="h-8 flex items-center">Weight</div>
            <div className="h-8 flex items-center">Length</div>
            <div className="h-8 flex items-center">Action</div>
            <div className="h-20 flex items-center">Description</div>
          </div>

          {/* GUN COLUMNS */}
          {guns.map((gun) => (
            <div key={gun._id} className="bg-white dark:bg-gray-900 border-l border-gray-300 dark:border-gray-700 p-6 text-center">
              
              {/* Image & Title */}
              <div className="h-56 mb-6 flex items-end justify-center">
                <img src={gun.image_url} className="max-h-full max-w-full object-contain drop-shadow-lg hover:scale-110 transition-transform" />
              </div>
              <h2 className="text-2xl font-black mb-10 text-blue-600 dark:text-blue-400">{gun.name}</h2>

              {/* Stats */}
              <div className="flex flex-col gap-8 font-medium text-lg">
                <div className="h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded">{gun.category}</div>
                <div className="h-8 flex items-center justify-center">{gun.specs?.caliber || "-"}</div>
                <div className="h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded">{gun.specs?.weight || "-"}</div>
                <div className="h-8 flex items-center justify-center">{gun.specs?.length || "-"}</div>
                <div className="h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded">{gun.specs?.action || "-"}</div>
                <div className="h-20 text-sm overflow-y-auto text-gray-500 leading-tight text-left pl-4">{gun.description}</div>
              </div>
            </div>
          ))}
          
          {/* FILLER (If only 1 gun selected) */}
          {guns.length === 1 && (
             <div className="bg-gray-50 dark:bg-black/20 border-l border-gray-300 dark:border-gray-700 flex items-center justify-center">
               <Link href="/" className="text-center p-8 border-2 border-dashed border-gray-500 rounded-xl hover:border-blue-500 hover:text-blue-500 transition-all">
                 <div className="text-4xl mb-2">+</div>
                 <div className="font-bold">Add Another Gun</div>
               </Link>
             </div>
          )}

        </div>
      </div>
    </main>
  );
}