import { Inject, Injectable } from "@nestjs/common";
import type { CreateRoomingListDto } from "./dto/create-rooming-list.dto";
import { DATABASE_CONNECTION } from "../database/connection";
import { roomingListsTable } from "../database/schemas";
import { eq, inArray, sql } from "drizzle-orm";
import type { RoomingList } from "./entities/rooming-list.entity";
import type { Database } from "../database/types";
import { UpdateRoomingListDto } from "./dto/update-rooming-list.dto";

@Injectable()
export class RoomingListsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: Database,
  ) {}

  async create(data: CreateRoomingListDto) {
    const createdRoomingList = await this.db
      .insert(roomingListsTable)
      .values(data)
      .returning();

    return createdRoomingList;
  }

  async createBulk(data: CreateRoomingListDto[]) {
    const createdRoomingList = await this.db
      .insert(roomingListsTable)
      .values(data)
      .returning();

    return createdRoomingList;
  }

  async findAll() {
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
      .orderBy(roomingListsTable.eventId)
      .execute();

    return data;
  }

  findOne(id: number) {
    return this.db.query.roomingListsTable.findFirst({
      where: (roomingLists, { eq }) => eq(roomingLists.roomingListId, id),
    });
  }

  async update(id: number, data: UpdateRoomingListDto) {
    const updatedRoomingList = await this.db
      .update(roomingListsTable)
      .set(data)
      .where(eq(roomingListsTable.roomingListId, id))
      .returning();

    return updatedRoomingList;
  }

  remove(id: number) {
    this.db
      .delete(roomingListsTable)
      .where(eq(roomingListsTable.roomingListId, id));
  }

  removeBulk(ids: number[]) {
    this.db
      .delete(roomingListsTable)
      .where(inArray(roomingListsTable.roomingListId, ids));
  }
}
