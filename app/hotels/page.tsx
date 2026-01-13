// app/hotels/page.tsx
import { db } from "@/db";
import { hotels } from "@/db/schema";
import { ilike, or } from "drizzle-orm";
import SearchInput from "./SearchInput";

// 1. Update the type to wrap searchParams in a Promise
export default async function HotelsPage(props: {
  searchParams: Promise<{ query?: string }>;
}) {
  // 2. Await the searchParams before using them
  const searchParams = await props.searchParams;
  const query = searchParams.query || "";

  // 3. Fetch hotels with the filter
  const allHotels = await db
    .select()
    .from(hotels)
    .where(
      or(
        ilike(hotels.name, `%${query}%`),
        ilike(hotels.location, `%${query}%`)
      )
    );

  return (
    <div className="p-10 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-500">Find a Hotel</h1>
       <form className="mb-8 flex gap-2">
        <input
          name="query"
          defaultValue={query}
          placeholder="Search by name or city..."
          className="p-3 border rounded-lg w-full max-w-md shadow-sm text-black"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">
          Search
        </button>
      </form> 
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {allHotels.map((hotel) => (
          <div key={hotel.id} className="border p-4 rounded-xl shadow hover:shadow-lg transition bg-white">
            <h2 className="text-xl font-bold text-black">{hotel.name}</h2>
            <p className="text-gray-500">{hotel.location}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-yellow-600 font-bold">⭐ {hotel.rating}</span>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}