"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    
    const password = prompt("🔐 Enter Admin Password to delete this gun:");
    
    if (!password) return; 
    const res = await fetch(`http://127.0.0.1:4000/guns/${id}`, {
      method: "DELETE",
      headers: {
        "admin-secret": password 
      }
    });

    if (res.ok) {
      alert("✅ Gun deleted successfully!");
      router.push("/"); 
      router.refresh();
    } else {
      alert("❌ WRONG PASSWORD! Access Denied.");
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-red-500/30"
    >
      Delete Gun
    </button>
  );
}