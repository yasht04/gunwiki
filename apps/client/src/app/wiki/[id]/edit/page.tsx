"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditGun({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  
  // Unwrap the params Promise (Next.js 15 requirement)
  const { id } = use(params);

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    category: "Assault Rifle",
    description: "",
    image_url: "",
    caliber: "",
    weight: "",
    length: "",
    action: "",
  });

  const categories = ["Assault Rifle", "Pistol", "Sniper", "SMG", "Shotgun", "LMG", "Heavy"];

  // 1. FETCH EXISTING DATA ON LOAD
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://127.0.0.1:4000/guns/${id}`);
      const data = await res.json();
      
      // Fill the form with the data we got back
      setFormData({
        name: data.name,
        manufacturer: data.manufacturer,
        category: data.category || "Assault Rifle",
        description: data.description,
        image_url: data.image_url,
        caliber: data.specs.caliber,
        weight: data.specs.weight,
        length: data.specs.length,
        action: data.specs.action,
      });
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const password = prompt("🔐 Enter Admin Password to update:");
    if (!password) return;

    const payload = {
      name: formData.name,
      manufacturer: formData.manufacturer,
      category: formData.category,
      description: formData.description,
      image_url: formData.image_url,
      specs: {
        caliber: formData.caliber,
        weight: formData.weight,
        length: formData.length,
        action: formData.action,
      },
    };

    // 2. SEND PUT REQUEST
    const res = await fetch(`http://127.0.0.1:4000/guns/${id}`, {
      method: "PUT", // <--- Changing method to PUT
      headers: { 
        "Content-Type": "application/json",
        "admin-secret": password 
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("✅ Gun updated!");
      router.push(`/wiki/${id}`); // Go back to the details page
      router.refresh();
    } else {
      alert("❌ Update Failed: Wrong Password");
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="text-white text-center p-20">Loading gun data...</div>;

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-yellow-400">Edit Gun</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-2xl border border-yellow-500/30 shadow-2xl">
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-yellow-400">Basic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input name="name" value={formData.name} onChange={handleChange} className="bg-gray-700 p-3 rounded text-white border border-gray-600 focus:border-yellow-500 outline-none" placeholder="Name" />
              <select name="category" value={formData.category} onChange={handleChange} className="bg-gray-700 p-3 rounded text-white border border-gray-600 focus:border-yellow-500 outline-none">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <input name="manufacturer" value={formData.manufacturer} onChange={handleChange} className="w-full bg-gray-700 p-3 rounded text-white border border-gray-600 focus:border-yellow-500 outline-none" placeholder="Manufacturer" />
            <input name="image_url" value={formData.image_url} onChange={handleChange} className="w-full bg-gray-700 p-3 rounded text-white border border-gray-600 focus:border-yellow-500 outline-none" placeholder="Image URL" />
            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full bg-gray-700 p-3 rounded text-white border border-gray-600 focus:border-yellow-500 outline-none" placeholder="Description" />
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-700">
             <h2 className="text-xl font-semibold text-yellow-400">Specs</h2>
             <div className="grid grid-cols-2 gap-4">
               <input name="caliber" value={formData.caliber} onChange={handleChange} className="bg-gray-700 p-3 rounded text-white" placeholder="Caliber" />
               <input name="action" value={formData.action} onChange={handleChange} className="bg-gray-700 p-3 rounded text-white" placeholder="Action" />
               <input name="weight" value={formData.weight} onChange={handleChange} className="bg-gray-700 p-3 rounded text-white" placeholder="Weight" />
               <input name="length" value={formData.length} onChange={handleChange} className="bg-gray-700 p-3 rounded text-white" placeholder="Length" />
             </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button type="submit" className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-3 rounded-xl transition-all">
              Save Changes
            </button>
            <Link href={`/wiki/${id}`} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl text-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}