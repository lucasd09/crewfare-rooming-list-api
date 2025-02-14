import { Inject, Injectable } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { DATABASE_CONNECTION } from "src/database/database-connection";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../database/schemas";
import { eq, inArray, sql } from "drizzle-orm";

@Injectable()
export class BookingsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  create(data: CreateBookingDto) {
    const createdBooking = this.db
      .insert(schema.bookingsTable)
      .values(data)
      .returning();

    return createdBooking;
  }

  createBulk(data: CreateBookingDto[]) {
    const createdBookings = this.db
      .insert(schema.bookingsTable)
      .values(data)
      .returning();

    return createdBookings;
  }

  findAll() {
    return this.db.query.bookingsTable.findMany();
  }

  findOne(id: number) {
    return this.db.query.bookingsTable.findFirst({
      where: (bookings, { eq }) => eq(bookings.bookingId, id),
    });
  }

  async findByRoomingListId(id: number) {
    const { bookingsTable, roomingListBooking, roomingListsTable } = schema;

    const [data] = await this.db
      .select({
        minDate: sql`MIN(${bookingsTable.checkInDate})`,
        maxDate: sql`MAX(${bookingsTable.checkOutDate})`,
        bookingsCount: sql`COUNT(${bookingsTable.bookingId})`,
        bookings: sql`json_agg(${bookingsTable}.*)`,
      })
      .from(bookingsTable)
      .leftJoin(
        roomingListBooking,
        eq(roomingListBooking.bookingId, bookingsTable.bookingId),
      )
      .leftJoin(
        roomingListsTable,
        eq(roomingListsTable.roomingListId, roomingListBooking.roomingListId),
      )
      .where(eq(roomingListsTable.roomingListId, id))
      .groupBy(roomingListsTable.roomingListId);

    return data;
  }

  update(id: number, data: UpdateBookingDto) {
    const updatedBooking = this.db
      .update(schema.bookingsTable)
      .set(data)
      .where(eq(schema.bookingsTable.bookingId, id));

    return updatedBooking;
  }

  remove(id: number) {
    const removedBooking = this.db
      .delete(schema.bookingsTable)
      .where(eq(schema.bookingsTable.bookingId, id))
      .returning();

    return removedBooking;
  }

  removeBulk(ids: number[]) {
    const removedBooking = this.db
      .delete(schema.bookingsTable)
      .where(inArray(schema.bookingsTable.bookingId, ids))
      .returning();

    return removedBooking;
  }
}
