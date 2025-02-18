import { DATABASE_CONNECTION } from "../database/connection";
import { RoomingListsService } from "./rooming-lists.service";
import { Test } from "@nestjs/testing";
import { CreateRoomingListDto } from "./dto/create-rooming-list.dto";
import { eq, inArray } from "drizzle-orm";
import { roomingListsTable } from "../database/schemas";

describe("Rooming Lists Service", () => {
  let roomingListService: RoomingListsService;

  const mockSelectResult = [
    {
      eventId: 1,
      eventName: "string",
      roomingCount: 0,
      roomingLists: [
        {
          roomingListId: 1,
          eventId: 1,
          eventName: "string",
          hotelId: 1,
          rfpName: "string",
          cutOffDate: "string",
          status: "string",
          agreementType: "string",
        },
        {
          roomingListId: 1,
          eventId: 1,
          eventName: "string",
          hotelId: 1,
          rfpName: "string",
          cutOffDate: "string",
          status: "string",
          agreementType: "string",
        },
      ],
    },
  ];

  const mockDb = {
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    returning: jest.fn(),
    query: {
      roomingListsTable: {
        findFirst: jest
          .fn()
          .mockReturnValue(mockSelectResult[0].roomingLists[0]),
      },
    },
    select: jest.fn().mockImplementation(() => ({
      from: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue(mockSelectResult),
    })),
    where: jest.fn(),
    delete: jest.fn().mockReturnThis(),
    inArray: jest.fn().mockReturnThis(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RoomingListsService,
        {
          provide: DATABASE_CONNECTION,
          useValue: mockDb,
        },
      ],
    }).compile();

    roomingListService = module.get<RoomingListsService>(RoomingListsService);
  });

  it("should be defined", () => {
    expect(roomingListService).toBeDefined();
  });

  it("should create a rooming list", async () => {
    const dto: CreateRoomingListDto = {
      roomingListId: 1,
      eventId: 1,
      eventName: "Ultra Miami",
      hotelId: 100,
      rfpName: "ACL-2025",
      cutOffDate: "2025-09-01",
      status: "completed",
      agreement_type: "leisure",
    };

    mockDb.returning.mockReturnValue(dto);

    const result = await roomingListService.create(dto);

    expect(result).toEqual(dto);
  });

  it("should create multiple rooming lists", async () => {
    const dto: CreateRoomingListDto[] = [
      {
        roomingListId: 1,
        eventId: 1,
        eventName: "Ultra Miami",
        hotelId: 100,
        rfpName: "ACL-2025",
        cutOffDate: "2025-09-01",
        status: "completed",
        agreement_type: "leisure",
      },
      {
        roomingListId: 2,
        eventId: 2,
        eventName: "Ultra Miami 2",
        hotelId: 100,
        rfpName: "ACL-2025",
        cutOffDate: "2025-09-01",
        status: "completed",
        agreement_type: "leisure",
      },
    ];

    mockDb.returning.mockReturnValue(dto);

    const result = await roomingListService.createBulk(dto);

    expect(result).toEqual(dto);
  });

  it("should find all bookings grouped by event", async () => {
    const result = await roomingListService.findAll();

    expect(result).toEqual(mockSelectResult);
  });

  it("should find a rooming list by ID", async () => {
    const result = await roomingListService.findOne(1);

    expect(mockDb.query.roomingListsTable.findFirst).toHaveBeenCalledWith({
      where: expect.any(Function),
    });
    expect(result).toEqual(mockSelectResult[0].roomingLists[0]);
  });

  it("should remove a rooming list", async () => {
    await roomingListService.remove(1);

    expect(mockDb.delete).toHaveBeenCalledWith(roomingListsTable);
    expect(mockDb.where).toHaveBeenCalledWith(
      eq(roomingListsTable.roomingListId, 1),
    );
  });

  it("should remove multiple rooming lists (bulk)", async () => {
    const ids = [1, 2];

    await roomingListService.removeBulk(ids);

    expect(mockDb.delete).toHaveBeenCalledWith(roomingListsTable);
    expect(mockDb.where).toHaveBeenCalledWith(
      inArray(roomingListsTable.roomingListId, ids),
    );
  });
});
