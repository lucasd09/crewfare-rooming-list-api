import { Module } from "@nestjs/common";
import { RoomingListsService } from "./rooming-lists.service";
import { RoomingListsController } from "./rooming-lists.controller";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [RoomingListsController],
  providers: [RoomingListsService],
})
export class RoomingListsModule {}
