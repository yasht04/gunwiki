import { Gun } from "../../../types/gun";
import Link from "next/link";
import DeleteButton from "../../../components/DeleteButton";
async function getGun(id: string): Promise<Gun | null> {
  try {
    const res = await fetch(`http://127.0.0.1:4000/guns/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function GunDetails(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const gun = await getGun(params.id);

  if (!gun) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Gun Not Found</h1>
        <Link href="/" className="text-blue-400 hover:underline">
          ← Back to Wiki
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          ← Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Image */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden bg-gray-800 border border-gray-700 shadow-2xl">
            <img
              src={gun.image_url}
              alt={gun.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-2">
              <span className="bg-blue-600 text-sm font-bold px-3 py-1 rounded-full text-white">
                {gun.manufacturer}
              </span>
            </div>

            <h1 className="text-6xl font-bold mb-6 tracking-tight">
              {gun.name}
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {gun.description}
            </p>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {gun.description}
            </p>

            {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
             {/* EDIT BUTTON (Yellow) */}
             <Link 
               href={`/wiki/${gun._id}/edit`}
               className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-yellow-500/30 flex items-center gap-2"
             >
               ✎ Edit Gun
             </Link>

             {/* Existing Delete Button */}
             <DeleteButton id={gun._id} />
          </div>

            {/* Tech Specs Table (existing code) */}

            {/* Tech Specs Table */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4 text-gray-400 uppercase tracking-wider">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-2 gap-y-4">
                <SpecItem label="Caliber" value={gun.specs.caliber} />
                <SpecItem label="Action" value={gun.specs.action} />
                <SpecItem label="Weight" value={gun.specs.weight} />
                <SpecItem label="Length" value={gun.specs.length} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-gray-700 pb-2 mr-4">
      <span className="block text-gray-500 text-xs uppercase mb-1">
        {label}
      </span>
      <span className="text-lg font-medium text-white">{value}</span>
    </div>
  );
}
