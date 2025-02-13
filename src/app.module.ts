import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { BookingsModule } from './bookings/bookings.module';
import { RoomingListsModule } from './rooming-lists/rooming-lists.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, BookingsModule, RoomingListsModule],
	controllers: [],
})
export class AppModule {}
