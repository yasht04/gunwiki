"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddGun() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    description: "",
    image_url: "",
    caliber: "",
    weight: "",
    length: "",
    action: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    const payload = {
      name: formData.name,
      manufacturer: formData.manufacturer,
      description: formData.description,
      image_url: formData.image_url,
      specs: {
        caliber: formData.caliber,
        weight: formData.weight,
        length: formData.length,
        action: formData.action,
      },
    };

    
    const res = await fetch("http://127.0.0.1:4000/guns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/"); 
      router.refresh(); 
    } else {
      alert("Failed to add gun!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Add New Gun</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-2xl border border-gray-700">
          
          {/* Basic Info Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-400">Basic Information</h2>
            <input name="name" placeholder="Gun Name (e.g. AK-47)" required onChange={handleChange} className="w-full bg-gray-700 p-3 rounded text-white border border-gray-600 focus:border-blue-500 outline-none" />
            <input name="manufacturer" placeholder="Manufacturer" required onChange={handleChange} className="w-full bg-gray-700 p-3 rounded text-white border border-gray-600 focus:border-blue-500 outline-none" />
            <input name="image_url" placeholder="Image URL (http://...)" required onChange={handleChange} className="w-full bg-gray-700 p-3 rounded text-white border border-gray-600 focus:border-blue-500 outline-none" />
            <textarea name="description" placeholder="Description" rows={3} required onChange={handleChange} className="w-full bg-gray-700 p-3 rounded text-white border border-gray-600 focus:border-blue-500 outline-none" />
          </div>

          {/* Technical Specs Section */}
          <div className="space-y-4 pt-4 border-t border-gray-700">
            <h2 className="text-xl font-semibold text-blue-400">Technical Specs</h2>
            <div className="grid grid-cols-2 gap-4">
              <input name="caliber" placeholder="Caliber (e.g. 7.62mm)" required onChange={handleChange} className="bg-gray-700 p-3 rounded text-white border border-gray-600 focus:border-blue-500 outline-none" />
              <input name="action" placeholder="Action (e.g. Gas-operated)" required onChange={handleChange} className="bg-gray-700 p-3 rounded text-white border border-gray-600 focus:border-blue-500 outline-none" />
              <input name="weight" placeholder="Weight (e.g. 3.5kg)" required onChange={handleChange} className="bg-gray-700 p-3 rounded text-white border border-gray-600 focus:border-blue-500 outline-none" />
              <input name="length" placeholder="Length (e.g. 880mm)" required onChange={handleChange} className="bg-gray-700 p-3 rounded text-white border border-gray-600 focus:border-blue-500 outline-none" />
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all">
              Add Gun
            </button>
            <Link href="/" className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl text-center transition-all">
              Cancel
            </Link>
          </div>

        </form>
      </div>
    </main>
  );
}