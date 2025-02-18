import { DATABASE_CONNECTION } from "../database/connection";
import { RoomingListsService } from "./rooming-lists.service";
import { Test } from "@nestjs/testing";
import { CreateRoomingListDto } from "./dto/create-rooming-list.dto";
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
        findMany: jest.fn().mockReturnValue(mockSelectResult[0].roomingLists),
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

    update: jest.fn().mockImplementation(() => ({
      set: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      returning: jest
        .fn()
        .mockResolvedValue(mockSelectResult[0].roomingLists[0]),
    })),
    delete: jest.fn().mockImplementation(() => ({
      where: jest.fn().mockReturnThis(),
      returning: jest.fn().mockReturnValue([1]),
    })),
    where: jest.fn(),
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

  it("should find all rooming lists grouped by event", async () => {
    const result = await roomingListService.findListData();

    expect(result).toEqual(mockSelectResult);
  });

  it("should find all rooming lists", async () => {
    const result = await roomingListService.findAll();

    expect(result).toEqual(mockSelectResult[0].roomingLists);
  });

  it("should find a rooming list by ID", async () => {
    const result = await roomingListService.findOne(1);

    expect(mockDb.query.roomingListsTable.findFirst).toHaveBeenCalledWith({
      where: expect.any(Function),
    });
    expect(result).toEqual(mockSelectResult[0].roomingLists[0]);
  });

  it("should update a rooming list", async () => {
    const dto = mockSelectResult[0].roomingLists[0];

    mockDb.returning.mockReturnValue(dto);

    const result = await roomingListService.update(1, dto);

    expect(result).toEqual(dto);
  });

  it("should remove a rooming list", async () => {
    mockDb.returning.mockReturnValue([1]);
    const result = await roomingListService.remove(1);

    expect(mockDb.delete).toHaveBeenCalledWith(roomingListsTable);
    expect(result).toEqual([1]);
  });

  it("should remove multiple rooming lists (bulk)", async () => {
    const ids = [1, 2];

    mockDb.returning.mockReturnValue(ids);

    const result = await roomingListService.removeBulk(ids);

    expect(mockDb.delete).toHaveBeenCalledWith(roomingListsTable);
    expect(result).toEqual(ids);
  });
});
