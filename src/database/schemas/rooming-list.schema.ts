import { pgTable, integer, varchar } from "drizzle-orm/pg-core";

export const roomingListsTable = pgTable("rooming_list", {
	roomingListId: integer("rooming_list_id").primaryKey(),
	eventId: integer("event_id"),
	eventName: varchar("event_name"),
	hotelId: integer("hotel_id"),
	rfpName: varchar("rfp_name"),
	cutOffDate: varchar("cut_off_date"),
	status: varchar("status"),
	agreement_type: varchar("agreement_type"),
});
