import Link from "next/link";
import { Gun } from "../types/gun";
import GunGallery from "../components/GunGallery"; // Import our new component

// 1. Fetch Data (Server Side)
async function getGuns(): Promise<Gun[]> {
  try {
    const res = await fetch("http://127.0.0.1:4000/guns", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const guns = await getGuns();

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Gun Wiki
          </h1>
          <Link 
            href="/add" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add New Gun
          </Link>
        </div>

        {/* 2. Pass the data to the Smart Gallery */}
        <GunGallery initialGuns={guns} />
        
      </div>
    </main>
  );
}