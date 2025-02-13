import { pgTable, integer, primaryKey } from "drizzle-orm/pg-core";
import { bookingsTable } from "./bookings.schema";
import { roomingListsTable } from "./rooming-list.schema";

export const roomingListBooking = pgTable(
	"rooming_list_booking",
	{
		roomingListId: integer("rooming_list_id").references(
			() => roomingListsTable.roomingListId,
		),
		bookingId: integer("booking_id").references(() => bookingsTable.bookingId),
	},
	(table) => [primaryKey({ columns: [table.roomingListId, table.bookingId] })],
);
