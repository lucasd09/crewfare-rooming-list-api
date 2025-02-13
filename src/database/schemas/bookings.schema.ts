import { relations } from "drizzle-orm";
import { pgTable, integer, varchar, date } from "drizzle-orm/pg-core";
import { roomingListBooking } from "./rooming-list-booking.schema";

export const bookingsTable = pgTable("booking", {
  bookingId: integer("booking_id").primaryKey(),
  hotelId: integer("hotel_id").notNull(),
  eventId: integer("event_id").notNull(),
  guestName: varchar("guest_name"),
  guestPhoneNumber: varchar("guest_phone_number"),
  checkInDate: date("check_in_date"),
  checkOutDate: date("check_out_date"),
});

export const bookingsRelations = relations(bookingsTable, ({ many }) => ({
  roomingListBooking: many(roomingListBooking),
}));
