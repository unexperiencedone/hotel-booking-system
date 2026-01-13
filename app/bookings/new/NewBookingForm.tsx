'use client'

import { useActionState } from "react";
import { createBooking } from "@/app/actions/booking";
import { Button } from "@/components/ui/button";



// We pass hotels as a prop from the server component (see below)
export default function NewBookingForm({ hotels }: { hotels: any[] }) {
  const [state, formAction, isPending] = useActionState(createBooking, null);

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white border rounded-2xl shadow-sm text-black">
      <h1 className="text-2xl font-bold mb-2">Create Reservation</h1>
      <p className="text-gray-500 mb-8">Enter the customer&apos;s email to link the booking.</p>

      <form action={formAction} className="space-y-5">
        {state?.error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {state.error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-semibold">Customer Email</label>
          <input
            name="email"
            type="email"
            placeholder="customer@gmail.com"
            required
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Select Hotel</label>
          <select 
            name="hotelId" 
            className="w-full p-3 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            {hotels.map((h) => (
              <option key={h.id} value={h.id}>{h.name} - {h.location}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Check-in</label>
            <input name="checkinDate" type="date" required className="w-full p-3 border rounded-xl" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Check-out</label>
            <input name="checkoutDate" type="date" required className="w-full p-3 border rounded-xl" />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full py-6 font-bold text-lg" 
          disabled={isPending}
        >
          {isPending ? "Processing..." : "Confirm Reservation"}
        </Button>
      </form>
    </div>
  );
}