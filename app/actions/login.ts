'use server'

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 1. Find user in Neon
  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    return { error: "Invalid email or password" };
  }

  // 2. Compare Hashed Password
  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordCorrect) {
    return { error: "Invalid email or password" };
  }

  // 3. Set a simple Session Cookie (For now, we'll use a plain cookie)
  // In a production app, you'd use a JWT or a library like Iron Session
  const cookieStore = await cookies();
  cookieStore.set("user_id", user.id.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });

  redirect("/hotels");
}