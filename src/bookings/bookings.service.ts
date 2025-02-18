import { Inject, Injectable } from "@nestjs/common";
import type { CreateBookingDto } from "./dto/create-booking.dto";
import { DATABASE_CONNECTION } from "../database/connection";
import { eq, inArray, sql } from "drizzle-orm";
import type { Booking } from "./entities/booking.entity";
import {
  bookingsTable,
  roomingListBooking,
  roomingListsTable,
} from "../database/schemas";
import type { Database } from "../database/types";
import { UpdateBookingDto } from "./dto/update-booking.dto";

@Injectable()
export class BookingsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Database,
  ) {}

  async create(data: CreateBookingDto) {
    const createdBooking = await this.db
      .insert(bookingsTable)
      .values(data)
      .returning();

    return createdBooking;
  }

  async createBulk(data: CreateBookingDto[]) {
    const createdBookings = await this.db
      .insert(bookingsTable)
      .values(data)
      .returning();

    return createdBookings;
  }

  async findAll() {
    const data = await this.db.query.bookingsTable.findMany();

    return data;
  }

  findOne(id: number) {
    return this.db.query.bookingsTable.findFirst({
      where: (bookings, { eq }) => eq(bookings.bookingId, id),
    });
  }

  async findByRoomingListId(id: number) {
    const data = await this.db
      .select({
        minDate: sql<string>`MIN(${bookingsTable.checkInDate})`,
        maxDate: sql<string>`MAX(${bookingsTable.checkOutDate})`,
        bookingsCount: sql<number>`COUNT(${bookingsTable.bookingId})`,
        bookings: sql<Booking[]>`json_agg(
          json_build_object(
            'bookingId', ${bookingsTable.bookingId},
            'hotelId', ${bookingsTable.hotelId},
            'eventId', ${bookingsTable.eventId},
            'guestName', ${bookingsTable.guestName},
            'guestPhoneNumber', ${bookingsTable.guestPhoneNumber},
            'checkInDate', ${bookingsTable.checkInDate},
            'checkOutDate', ${bookingsTable.checkOutDate}
          )
        )`,
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
      .groupBy(roomingListsTable.roomingListId)
      .execute();

    return data[0];
  }

  async update(id: number, data: UpdateBookingDto) {
    const updatedBooking = await this.db
      .update(bookingsTable)
      .set(data)
      .where(eq(bookingsTable.bookingId, id))
      .returning();

    return updatedBooking;
  }

  remove(id: number) {
    this.db.delete(bookingsTable).where(eq(bookingsTable.bookingId, id));
  }

  removeBulk(ids: number[]) {
    this.db.delete(bookingsTable).where(inArray(bookingsTable.bookingId, ids));
  }
}
