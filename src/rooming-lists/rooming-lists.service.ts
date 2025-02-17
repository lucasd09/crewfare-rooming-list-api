import { Inject, Injectable } from "@nestjs/common";
import { CreateRoomingListDto } from "./dto/create-rooming-list.dto";
import { UpdateRoomingListDto } from "./dto/update-rooming-list.dto";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_CONNECTION } from "src/database/database-connection";
import * as schema from "../database/schemas";
import { eq, inArray, sql } from "drizzle-orm";
import { RoomingList } from "./entities/rooming-list.entity";

@Injectable()
export class RoomingListsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(data: CreateRoomingListDto) {
    const createdRoomingList = await this.db
      .insert(schema.roomingListsTable)
      .values(data)
      .returning();

    return createdRoomingList;
  }

  async createBulk(data: CreateRoomingListDto[]) {
    const createdRoomingList = await this.db
      .insert(schema.roomingListsTable)
      .values(data)
      .returning();

    return createdRoomingList;
  }

  async findAll() {
    const { roomingListsTable } = schema;

    const data = await this.db
      .select({
        eventId: roomingListsTable.eventId,
        eventName: roomingListsTable.eventName,
        roomingCount: sql<number>`cast(coalesce(count(${roomingListsTable.roomingListId}), 0) as int)`,
        roomingLists: sql<RoomingList[]>`json_agg(
          json_build_object(
            'roomingListId', ${roomingListsTable.roomingListId},
            'eventId', ${roomingListsTable.eventId},
            'eventName', ${roomingListsTable.eventName},
            'hotelId', ${roomingListsTable.hotelId},
            'rfpName', ${roomingListsTable.rfpName},
            'cutOffDate', ${roomingListsTable.cutOffDate},
            'status', ${roomingListsTable.status},
            'agreementType', ${roomingListsTable.agreement_type}
          )
        )`,
      })
      .from(roomingListsTable)
      .groupBy(roomingListsTable.eventId, roomingListsTable.eventName)
      .orderBy(roomingListsTable.eventId);

    return data;
  }

  findOne(id: number) {
    return this.db.query.roomingListsTable.findFirst({
      where: (roomingLists, { eq }) => eq(roomingLists.roomingListId, id),
    });
  }

  async update(id: number, data: UpdateRoomingListDto) {
    const updatedRoomingList = await this.db
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

  removeBulk(ids: number[]) {
    const removedRoomingLists = this.db
      .delete(schema.roomingListsTable)
      .where(inArray(schema.roomingListsTable.roomingListId, ids))
      .returning();

    return removedRoomingLists;
  }
}
