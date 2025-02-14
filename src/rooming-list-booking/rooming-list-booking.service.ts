import { Inject, Injectable } from "@nestjs/common";
import { CreateRoomingListBookingDto } from "./dto/create-rooming-list-booking.dto";
import * as schema from "../database/schemas";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_CONNECTION } from "src/database/database-connection";

@Injectable()
export class RoomingListBookingService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  create(data: CreateRoomingListBookingDto) {
    const createdRoomingListBooking = this.db
      .insert(schema.roomingListBooking)
      .values(data)
      .returning();

    return createdRoomingListBooking;
  }

  createBulk(data: CreateRoomingListBookingDto[]) {
    const createdRoomingListBooking = this.db
      .insert(schema.roomingListBooking)
      .values(data)
      .returning();

    return createdRoomingListBooking;
  }

  findAll() {
    return this.db.query.roomingListBooking.findMany();
  }
}
