"use client";

import { useRouter } from "next/navigation";
import { Gun } from "../types/gun";

export default function CompareButton({ gun }: { gun: Gun }) {
  const router = useRouter();

  const handleCompare = () => {
    // 1. Get existing list from Local Storage
    const existing = localStorage.getItem("compareList");
    let list: Gun[] = existing ? JSON.parse(existing) : [];

    // 2. Check if gun is already added
    if (list.find((g) => g._id === gun._id)) {
      alert("⚠️ This gun is already in your comparison list!");
      return;
    }

    // 3. Add new gun
    if (list.length >= 2) {
      // If list is full (2 items), replace the oldest one (first one)
      list = [list[1], gun]; 
    } else {
      list.push(gun);
    }

    // 4. Save back to storage
    localStorage.setItem("compareList", JSON.stringify(list));

    // 5. Navigate Logic
    if (list.length === 2) {
      router.push("/compare"); // Go to compare page immediately if we have 2
    } else {
      alert(`✅ ${gun.name} added! Go pick one more gun to compare.`);
      router.push("/"); // Go back home to pick another
    }
  };

  return (
    <button
      onClick={handleCompare}
      className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-purple-500/30 flex items-center gap-2"
    >
      ⚖️ Compare Gun
    </button>
  );
}