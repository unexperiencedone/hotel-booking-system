import { pgTable, serial, varchar, integer, timestamp, pgEnum, decimal, date, bigserial } from "drizzle-orm/pg-core";

// 1. Define Enums (like your Role and Status)
export const roleEnum = pgEnum('role', ['customer', 'admin']);
export const statusEnum = pgEnum('status', ['pending', 'confirmed', 'cancelled', 'checked_in', 'checked_out']);

// 2. Users Table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 50 }).unique().notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  fullName: varchar('full_name', { length: 100 }),
  role: roleEnum('role').default('customer'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 3. Hotels Table
export const hotels = pgTable('hotels', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  location: varchar('location', { length: 255 }),
  rating: decimal('rating', { precision: 2, scale: 1 }).default('0.0'),
});

// 4. Room Types Table
export const roomTypes = pgTable('room_types', {
  id: serial('id').primaryKey(),
  hotelId: integer('hotel_id').references(() => hotels.id).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  basePrice: decimal('base_price', { precision: 10, scale: 2 }).notNull(),
  capacity: integer('capacity').notNull(),
  totalCount: integer('total_count').default(10),
});

// 5. Bookings Table (Using BigSerial for BigInt)
export const bookings = pgTable('bookings', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  hotelId: integer('hotel_id').references(() => hotels.id).notNull(),
  status: statusEnum('status').default('pending'),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  checkinDate: date('checkin_date').notNull(),
  checkoutDate: date('checkout_date').notNull(),
});