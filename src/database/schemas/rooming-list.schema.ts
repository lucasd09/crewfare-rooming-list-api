import { relations } from "drizzle-orm";
import { pgTable, integer, varchar } from "drizzle-orm/pg-core";
import { roomingListBooking } from "./rooming-list-booking.schema";

export const roomingListsTable = pgTable("rooming_list", {
  roomingListId: integer("rooming_list_id").primaryKey(),
  hotelId: integer("hotel_id").notNull(),
  eventId: integer("event_id").notNull(),
  eventName: varchar("event_name"),
  rfpName: varchar("rfp_name"),
  cutOffDate: varchar("cut_off_date"),
  status: varchar("status"),
  agreement_type: varchar("agreement_type"),
});

export const roomingListsRelations = relations(
  roomingListsTable,
  ({ many }) => ({
    roomingListBooking: many(roomingListBooking),
  }),
);
