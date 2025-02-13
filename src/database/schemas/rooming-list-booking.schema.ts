import { pgTable, integer, primaryKey } from "drizzle-orm/pg-core";
import { bookingsTable } from "./bookings.schema";
import { roomingListsTable } from "./rooming-list.schema";
import { relations } from "drizzle-orm";

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

export const roomingListBookingRelations = relations(
  roomingListBooking,
  ({ one }) => ({
    roomingList: one(roomingListsTable, {
      fields: [roomingListBooking.roomingListId],
      references: [roomingListsTable.roomingListId],
    }),
    booking: one(bookingsTable, {
      fields: [roomingListBooking.bookingId],
      references: [bookingsTable.bookingId],
    }),
  }),
);
