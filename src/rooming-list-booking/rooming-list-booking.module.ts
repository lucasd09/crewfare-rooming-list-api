import { Module } from "@nestjs/common";
import { RoomingListBookingService } from "./rooming-list-booking.service";
import { RoomingListBookingController } from "./rooming-list-booking.controller";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [RoomingListBookingController],
  providers: [RoomingListBookingService],
})
export class RoomingListBookingModule {}
