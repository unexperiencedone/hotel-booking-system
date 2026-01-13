import { db } from "@/db";
import { hotels } from "@/db/schema";
import NewBookingForm from "./NewBookingForm"; // Assume you split the UI into a client component

export default async function Page() {
  const allHotels = await db.select().from(hotels);
  
  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <NewBookingForm hotels={allHotels} />
    </main>
  );
}