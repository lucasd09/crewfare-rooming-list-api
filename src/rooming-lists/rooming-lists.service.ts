import { Inject, Injectable } from "@nestjs/common";
import type { CreateRoomingListDto } from "./dto/create-rooming-list.dto";
import { DATABASE_CONNECTION } from "../database/connection";
import { roomingListsTable } from "../database/schemas";
import { eq, inArray, sql, and, or, like, ilike } from "drizzle-orm";
import type { RoomingList } from "./entities/rooming-list.entity";
import type { Database } from "../database/types";
import { UpdateRoomingListDto } from "./dto/update-rooming-list.dto";
import { FindListDataDto } from "./dto/find-list-data.dto";
import { RoomingListGroup } from "./entities/rooming-list-group.entity";
import { PaginatedResponseDto } from "./dto/paginated-response.dto";

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
    return this.db.query.roomingListsTable.findMany();
  }

  async findListData(query: FindListDataDto): Promise<PaginatedResponseDto<RoomingListGroup>> {
    const searchConditions = [];

    if (query.search) {
      searchConditions.push(
        or(
          ilike(roomingListsTable.eventName, `%${query.search}%`),
          ilike(roomingListsTable.rfpName, `%${query.search}%`),
          ilike(roomingListsTable.agreement_type, `%${query.search}%`)
        )
      );
    }

    const statusConditions = []

    if (query.active === "true") {
      statusConditions.push(eq(roomingListsTable.status, "received"),)
    }

    if (query.closed === "true") {
      statusConditions.push(eq(roomingListsTable.status, "completed"),)
    }

    if (query.cancelled === "true") {
      statusConditions.push(eq(roomingListsTable.status, "archived"),)
    } 

    if (statusConditions.length > 0) {
      searchConditions.push(or(...statusConditions))
    }

    const whereClause = searchConditions.length > 0 ? and(...searchConditions) : undefined;

    const totalCount = await this.db
      .select({
        count: sql<number>`count(distinct ${roomingListsTable.eventId})`
      })
      .from(roomingListsTable)
      .where(whereClause)
      .execute();

    const total = Number(totalCount[0].count);
    
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;

    const offset = (page - 1) * limit;

    const select = this.db
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
      .limit(limit)
      .offset(offset);

    const selectQuery = whereClause ? select.where(whereClause) : select;

    const data = await selectQuery.execute();
    
    const totalPages = Math.ceil(total / limit);

    return {
      items: data as RoomingListGroup[],
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1
    };
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

  async remove(id: number) {
    const data = await this.db
      .delete(roomingListsTable)
      .where(eq(roomingListsTable.roomingListId, id))
      .returning();

    return data;
  }

  async removeBulk(ids: number[]) {
    const result = await this.db
      .delete(roomingListsTable)
      .where(inArray(roomingListsTable.roomingListId, ids))
      .returning();

    const data = result.map((item) => item.roomingListId);

    return data;
  }
}
