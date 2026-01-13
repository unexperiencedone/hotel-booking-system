'use server'

import { db } from "@/db";
import { users } from "@/db/schema";
import { registerSchema } from "@/db/validation";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function registerUser(prevState: any, formData: FormData) {
  // 1. Convert FormData to a plain object
  const data = Object.fromEntries(formData.entries());
  
  // 2. Validate with Zod
  const validatedFields = registerSchema.safeParse(data);
  
  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  const { email, password, fullName } = validatedFields.data;

  // 3. Check if user already exists
  const existingUser = await db.select().from(users).where(eq(users.email, email));
  if (existingUser.length > 0) {
    return { error: { email: ["Email already registered"] } };
  }

  // 4. Hash the password (Security First!)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 5. Insert into Neon
  await db.insert(users).values({
    email,
    fullName,
    passwordHash: hashedPassword,
    role: 'customer'
  });

  redirect("/login");
}