import { Gun } from "../types/gun";
import GunGallery from "../components/GunGallery";

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
        {/* All the UI logic is now handled inside GunGallery */}
        <GunGallery initialGuns={guns} />
      </div>
    </main>
  );
}