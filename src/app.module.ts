import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { BookingsModule } from "./bookings/bookings.module";
import { RoomingListsModule } from "./rooming-lists/rooming-lists.module";
import { RoomingListBookingModule } from './rooming-list-booking/rooming-list-booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    BookingsModule,
    RoomingListsModule,
    RoomingListBookingModule,
  ],
  controllers: [],
})
export class AppModule {}
