"use client";   

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this gun?");

    if (confirmed) {
      await fetch(`http://127.0.0.1:4000/guns/${id}`, {
        method: "DELETE",
      });

      alert("Gun deleted!");
      router.push("/"); 
      router.refresh(); 
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