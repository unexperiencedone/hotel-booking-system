'use server'

import { db } from "@/db";
import { bookings, users, hotels } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBooking(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const hotelId = Number(formData.get("hotelId"));
  const checkinDate = formData.get("checkinDate") as string;
  const checkoutDate = formData.get("checkoutDate") as string;
  const totalPrice = formData.get("totalPrice") || "0";

  // 1. Find the user by Email
  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    return { error: "No user found with this email. Please register first." };
  }

  try {
    // 2. Insert the booking using the User's ID found from their email
    await db.insert(bookings).values({
      userId: user.id,
      hotelId: hotelId,
      status: 'confirmed',
      totalPrice: totalPrice.toString(),
      checkinDate: checkinDate,
      checkoutDate: checkoutDate,
    });
  } catch (err) {
    console.error(err);
    return { error: "Database error: Could not create booking." };
  }

  revalidatePath("/hotels");
  redirect("/hotels"); // Send them back to see the inventory
}