// app/hotels/page.tsx
import { db } from "@/db"; 
import { hotels } from "@/db/schema";

export default async function HotelsPage() {
  // 1. Fetch data from Neon
  const allHotels = await db.select().from(hotels);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hotel Inventory</h1>
            <p className="text-gray-500">Manage and view all hotels synced from your database.</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            + Add New Hotel
          </button>
        </header>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Hotel Name</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold">Rating</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allHotels.map((hotel) => (
                <tr key={hotel.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{hotel.name}</td>
                  <td className="px-6 py-4 text-gray-600">{hotel.location}</td>
                  <td className="px-6 py-4">
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm font-bold">
                      ★ {hotel.rating}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:underline text-sm font-medium">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {allHotels.length === 0 && (
            <div className="p-20 text-center">
              <p className="text-gray-400 text-lg italic">No hotels found. Is the database seeded?</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}