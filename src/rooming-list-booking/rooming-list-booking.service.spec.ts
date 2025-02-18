import { DATABASE_CONNECTION } from "../database/connection";
import { Test } from "@nestjs/testing";
import { CreateRoomingListBookingDto } from "./dto/create-rooming-list-booking.dto";
import { RoomingListBookingService } from "./rooming-list-booking.service";
import { roomingListBooking } from "../database/schemas";
describe("Rooming List Bookings Service", () => {
  let roomingListBookingService: RoomingListBookingService;

  const mockDb = {
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    returning: jest.fn(),
    query: {
      roomingListBooking: {
        findMany: jest
          .fn()
          .mockReturnValue([{ bookingId: 1, roomingListId: 1 }]),
        findFirst: jest
          .fn()
          .mockReturnValue({ bookingId: 1, roomingListId: 1 }),
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
        RoomingListBookingService,
        {
          provide: DATABASE_CONNECTION,
          useValue: mockDb,
        },
      ],
    }).compile();

    roomingListBookingService = module.get<RoomingListBookingService>(
      RoomingListBookingService,
    );
  });

  it("should be defined", () => {
    expect(roomingListBookingService).toBeDefined();
  });

  it("should create a RoomingListBooking relation", async () => {
    const dto: CreateRoomingListBookingDto = {
      roomingListId: 1,
      bookingId: 1,
    };

    mockDb.returning.mockReturnValue([{ bookingId: 1, roomingListId: 1 }]);

    const result = await roomingListBookingService.create(dto);

    expect(mockDb.insert).toHaveBeenCalledWith(roomingListBooking);
    expect(mockDb.values).toHaveBeenCalledWith(dto);
    expect(mockDb.returning).toHaveBeenCalled();

    expect(result).toEqual([{ bookingId: 1, roomingListId: 1 }]);
  });

  it("should create multiple RoomingListBooking relations", async () => {
    const dto: CreateRoomingListBookingDto[] = [
      {
        roomingListId: 1,
        bookingId: 1,
      },
      {
        roomingListId: 2,
        bookingId: 2,
      },
    ];

    mockDb.returning.mockReturnValue([
      { bookingId: 1, roomingListId: 1 },
      { bookingId: 2, roomingListId: 2 },
    ]);

    const result = await roomingListBookingService.createBulk(dto);

    expect(mockDb.insert).toHaveBeenCalledWith(roomingListBooking);
    expect(mockDb.values).toHaveBeenCalledWith(dto);
    expect(mockDb.returning).toHaveBeenCalled();

    expect(result).toEqual([
      { bookingId: 1, roomingListId: 1 },
      { bookingId: 2, roomingListId: 2 },
    ]);
  });

  it("should find all RoomingListBookings", async () => {
    const result = await roomingListBookingService.findAll();

    expect(mockDb.query.roomingListBooking.findMany).toHaveBeenCalled();
    expect(result).toEqual([{ bookingId: 1, roomingListId: 1 }]);
  });
});
