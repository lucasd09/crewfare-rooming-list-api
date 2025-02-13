import { Inject, Injectable } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { DATABASE_CONNECTION } from "src/database/database-connection";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../database/schemas";
import { eq } from "drizzle-orm";

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

  findAll() {
    return this.db.query.bookingsTable.findMany();
  }

  findOne(id: number) {
    return this.db.query.bookingsTable.findFirst({
      where: (bookings, { eq }) => eq(bookings.bookingId, id),
    });
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
}
