import { Gun } from "@/types/gun";
import Link from "next/link";

// 1. This function runs on the SERVER, not the browser.
async function getGuns(): Promise<Gun[]> {
  // We fetch directly from the Backend API
  const res = await fetch("http://127.0.0.1:4000/guns", {
    cache: "no-store", // Ensures we always get fresh data (Dynamic Rendering)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch guns");
  }

  return res.json();
}

// 2. The Page Component
export default async function Home() {
  const guns = await getGuns();

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          Gun Wiki
        </h1>
        <p className="text-gray-400 text-lg">
          The ultimate encyclopedia of firearms.
        </p>
      </header>

      {/* Grid of Guns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {guns.map((gun) => (
          <Link 
            href={`/wiki/${gun._id}`} 
            key={gun._id}
            className="group block bg-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border border-gray-700"
          >
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={gun.image_url}
                alt={gun.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-blue-600 text-xs font-bold px-2 py-1 rounded text-white">
                  {gun.specs.caliber}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                {gun.name}
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                {gun.manufacturer}
              </p>
              
              {/* Mini Specs */}
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 border-t border-gray-700 pt-4">
                <div>
                  <span className="block text-gray-600 text-xs uppercase">Action</span>
                  <span className="text-gray-300">{gun.specs.action}</span>
                </div>
                <div>
                  <span className="block text-gray-600 text-xs uppercase">Weight</span>
                  <span className="text-gray-300">{gun.specs.weight}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}