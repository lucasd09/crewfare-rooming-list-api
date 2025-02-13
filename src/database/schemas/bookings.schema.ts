import { pgTable, integer, varchar } from "drizzle-orm/pg-core";

export const bookingsTable = pgTable("booking", {
	bookingId: integer("booking_id").primaryKey(),
	hotelId: integer("hotel_id"),
	eventId: integer("event_id"),
	guestName: varchar("guest_name"),
	guestPhoneNumber: varchar("guest_phone_number"),
	checkInDate: varchar("check_in_date"),
	checkOutDate: varchar("check_out_date"),
});
