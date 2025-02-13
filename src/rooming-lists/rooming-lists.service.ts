import { Inject, Injectable } from "@nestjs/common";
import { CreateRoomingListDto } from "./dto/create-rooming-list.dto";
import { UpdateRoomingListDto } from "./dto/update-rooming-list.dto";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_CONNECTION } from "src/database/database-connection";
import * as schema from "../database/schemas";
import { eq } from "drizzle-orm";

@Injectable()
export class RoomingListsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  create(data: CreateRoomingListDto) {
    const createdRoomingList = this.db
      .insert(schema.roomingListsTable)
      .values(data)
      .returning();

    return createdRoomingList;
  }

  findAll() {
    return this.db.query.roomingListsTable.findMany();
  }

  findOne(id: number) {
    return this.db.query.roomingListsTable.findFirst({
      where: (roomingLists, { eq }) => eq(roomingLists.roomingListId, id),
    });
  }

  update(id: number, data: UpdateRoomingListDto) {
    const updatedRoomingList = this.db
      .update(schema.roomingListsTable)
      .set(data)
      .where(eq(schema.roomingListsTable.roomingListId, id));

    return updatedRoomingList;
  }

  remove(id: number) {
    const removedRoomingList = this.db
      .delete(schema.roomingListsTable)
      .where(eq(schema.roomingListsTable.roomingListId, id))
      .returning();

    return removedRoomingList;
  }
}
