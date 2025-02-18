import { Inject, Injectable } from "@nestjs/common";
import { CreateRoomingListBookingDto } from "./dto/create-rooming-list-booking.dto";
import { DATABASE_CONNECTION } from "../database/connection";
import { roomingListBooking } from "../database/schemas";
import { Database } from "../database/types";

@Injectable()
export class RoomingListBookingService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Database,
  ) {}

  create(data: CreateRoomingListBookingDto) {
    const createdRoomingListBooking = this.db
      .insert(roomingListBooking)
      .values(data)
      .returning();

    return createdRoomingListBooking;
  }

  createBulk(data: CreateRoomingListBookingDto[]) {
    const createdRoomingListBooking = this.db
      .insert(roomingListBooking)
      .values(data)
      .returning();

    return createdRoomingListBooking;
  }

  findAll() {
    return this.db.query.roomingListBooking.findMany();
  }
}
