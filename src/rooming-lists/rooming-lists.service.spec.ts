import { DATABASE_CONNECTION } from "../database/connection";
import { RoomingListsService } from "./rooming-lists.service";
import { Test } from "@nestjs/testing";
import { CreateRoomingListDto } from "./dto/create-rooming-list.dto";

describe("Rooming Lists Service", () => {
  let roomingListService: RoomingListsService;

  const mockDb = {
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    returning: jest.fn(),
    query: {
      roomingListsTable: {
        findMany: jest
          .fn()
          .mockReturnValue([
            { roomingListId: 1, eventId: 1, eventName: "Ultra Miami" },
          ]),
        findFirst: jest.fn().mockReturnValue({
          roomingListId: 1,
          eventId: 1,
          eventName: "Ultra Miami",
        }),
      },
    },
    select: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
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

    expect(mockDb.query.roomingListsTable.findMany).toHaveBeenCalled();
    expect(result).toEqual([
      { roomingListId: 1, eventId: 1, eventName: "Ultra Miami" },
    ]);
  });

  it("should find a rooming list by ID", async () => {
    const result = await roomingListService.findOne(1);

    expect(mockDb.query.roomingListsTable.findFirst).toHaveBeenCalledWith({
      where: expect.any(Function),
    });
    expect(result).toEqual({
      roomingListId: 1,
      eventId: 1,
      eventName: "Ultra Miami",
    });
  });
});
