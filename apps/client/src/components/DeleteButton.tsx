"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    // 1. Ask for the password
    const password = prompt("🔐 Enter Admin Password to delete this gun:");
    
    if (!password) return; // If they hit Cancel, stop everything.

    // 2. Send the DELETE request WITH the password in the headers
    const res = await fetch(`http://127.0.0.1:4000/guns/${id}`, {
      method: "DELETE",
      headers: {
        "admin-secret": password // <--- This is the key!
      }
    });

    if (res.ok) {
      alert("✅ Gun deleted successfully!");
      router.push("/"); // Go back home
      router.refresh(); // Refresh the list
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