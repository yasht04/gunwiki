"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Gun } from "../types/gun";

export default function CompareButton({ gun }: { gun: Gun }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [candidateGuns, setCandidateGuns] = useState<Gun[]>([]);
  const [search, setSearch] = useState("");

  const handleMainClick = () => {
    const existing = localStorage.getItem("compareList");
    let list: Gun[] = existing ? JSON.parse(existing) : [];
    if (list.find((g) => g._id === gun._id)) {
      alert("⚠️ This gun is already selected!");
      if (list.length === 1) setShowModal(true);
      return;
    }

    
    if (list.length >= 1) {
       list = [list[0], gun];
       localStorage.setItem("compareList", JSON.stringify(list));
       router.push("/compare");
    } else {
   
       list.push(gun);
       localStorage.setItem("compareList", JSON.stringify(list));
       setShowModal(true); 
    }
  };

  
  const handleSecondSelection = (secondGun: Gun) => {
    const existing = localStorage.getItem("compareList");
    let list: Gun[] = existing ? JSON.parse(existing) : [gun];

    list.push(secondGun); 
    
    
    localStorage.setItem("compareList", JSON.stringify(list));
    setShowModal(false);
    router.push("/compare");
  };

  
  useEffect(() => {
    if (showModal) {
      fetch("http://localhost:4000/guns")
        .then(res => res.json())
        .then(data => {
            setCandidateGuns(data.filter((g: Gun) => g._id !== gun._id));
        });
    }
  }, [showModal, gun._id]);

  return (
    <>
      {/* --- THE MAIN BUTTON --- */}
      <button
        onClick={handleMainClick}
        className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-purple-500/30 flex items-center gap-2"
      >
        ⚖️ Compare Gun
      </button>

      {/* --- THE POPUP MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-xl max-h-[80vh] flex flex-col border border-gray-700 shadow-2xl relative">
            
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Select Opponent</h3>
                <p className="text-gray-500 text-sm">
                  Comparing against: <span className="text-purple-500 font-bold">{gun.name}</span>
                </p>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white text-gray-500 w-8 h-8 rounded-full transition-colors font-bold"
              >
                ✕
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              <input 
                autoFocus
                type="text" 
                placeholder="🔍 Search for a rival..." 
                className="w-full p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white shadow-inner"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Gun List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {candidateGuns
                .filter(g => g.name.toLowerCase().includes(search.toLowerCase()))
                .map(candidate => (
                <button 
                  key={candidate._id}
                  onClick={() => handleSecondSelection(candidate)}
                  className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all border border-transparent hover:border-purple-500 group text-left"
                >
                  <img src={candidate.image_url} className="w-16 h-12 object-cover rounded bg-gray-200 dark:bg-black" alt={candidate.name} />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                        {candidate.name}
                    </h4>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded">
                        {candidate.category}
                    </span>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 text-purple-600 font-bold text-sm">
                    SELECT →
                  </div>
                </button>
              ))}
              
              {/* Empty State */}
              {candidateGuns.length === 0 && (
                  <div className="text-center py-8 text-gray-500">Loading guns...</div>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}