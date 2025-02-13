import { pgTable, integer, varchar, serial } from "drizzle-orm/pg-core";

export const bookingsTable = pgTable("booking", {
  bookingId: serial("booking_id").primaryKey(),
  hotelId: integer("hotel_id").notNull(),
  eventId: integer("event_id").notNull(),
  guestName: varchar("guest_name"),
  guestPhoneNumber: varchar("guest_phone_number"),
  checkInDate: varchar("check_in_date"),
  checkOutDate: varchar("check_out_date"),
});
