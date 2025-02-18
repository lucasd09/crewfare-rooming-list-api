import { Test } from "@nestjs/testing";
import { BookingsService } from "./bookings.service";
import { DATABASE_CONNECTION } from "../database/connection";
import type { CreateBookingDto } from "./dto/create-booking.dto";
import { bookingsTable } from "../database/schemas";
import { eq, inArray } from "drizzle-orm";

describe("Bookings Service", () => {
  let bookingsService: BookingsService;

  const mockSelectResult = {
    minDate: "2025-02-01",
    maxDate: "2025-02-10",
    bookingsCount: 3,
    bookings: [
      {
        bookingId: 1,
        guestName: "John Doe",
        guestPhoneNumber: "123456789",
        checkInDate: "2025-02-01",
        checkOutDate: "2025-02-05",
        hotelId: 101,
        eventId: 202,
      },
      {
        bookingId: 2,
        guestName: "Jane Smith",
        guestPhoneNumber: "987654321",
        checkInDate: "2025-02-02",
        checkOutDate: "2025-02-06",
        hotelId: 102,
        eventId: 203,
      },
    ],
  };

  const mockDb = {
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    returning: jest.fn(),
    query: {
      bookingsTable: {
        findMany: jest.fn().mockReturnValue(mockSelectResult.bookings),
        findFirst: jest.fn().mockReturnValue(mockSelectResult.bookings[0]),
      },
    },
    select: jest.fn().mockImplementation(() => ({
      from: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue(mockSelectResult),
    })),
    where: jest.fn(),
    delete: jest.fn().mockReturnThis(),
    inArray: jest.fn().mockReturnThis(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: DATABASE_CONNECTION,
          useValue: mockDb,
        },
      ],
    }).compile();

    bookingsService = moduleRef.get<BookingsService>(BookingsService);
  });

  it("should be defined", () => {
    expect(bookingsService).toBeDefined();
  });

  it("should create a booking", async () => {
    const dto: CreateBookingDto = {
      guestName: "John Doe",
      checkInDate: "2025-03-01",
      checkOutDate: "2025-03-05",
      bookingId: 0,
      hotelId: 0,
      eventId: 0,
      guestPhoneNumber: "",
    };

    mockDb.returning.mockReturnValue([{ bookingId: 1, guestName: "John Doe" }]);

    const result = await bookingsService.create(dto);

    expect(mockDb.insert).toHaveBeenCalledWith(bookingsTable);
    expect(mockDb.values).toHaveBeenCalledWith(dto);
    expect(mockDb.returning).toHaveBeenCalled();
    expect(result).toEqual([{ bookingId: 1, guestName: "John Doe" }]);
  });

  it("should create multiple bookings (bulk)", async () => {
    const dto: CreateBookingDto[] = [
      {
        guestName: "John Doe",
        checkInDate: "2025-03-01",
        checkOutDate: "2025-03-05",
        bookingId: 1,
        hotelId: 0,
        eventId: 0,
        guestPhoneNumber: "",
      },
      {
        guestName: "Jane Doe",
        checkInDate: "2025-04-01",
        checkOutDate: "2025-04-05",
        bookingId: 2,
        hotelId: 0,
        eventId: 0,
        guestPhoneNumber: "",
      },
    ];

    mockDb.returning.mockReturnValue([
      { bookingId: 1, guestName: "John Doe" },
      { bookingId: 2, guestName: "Jane Doe" },
    ]);

    const result = await bookingsService.createBulk(dto);

    expect(mockDb.insert).toHaveBeenCalledWith(bookingsTable);
    expect(mockDb.values).toHaveBeenCalledWith(dto);
    expect(mockDb.returning).toHaveBeenCalled();
    expect(result).toEqual([
      { bookingId: 1, guestName: "John Doe" },
      { bookingId: 2, guestName: "Jane Doe" },
    ]);
  });

  it("should find all bookings", async () => {
    const result = await bookingsService.findAll();

    expect(mockDb.query.bookingsTable.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockSelectResult.bookings);
  });

  it("should find a booking by ID", async () => {
    const result = await bookingsService.findOne(1);

    expect(mockDb.query.bookingsTable.findFirst).toHaveBeenCalledWith({
      where: expect.any(Function),
    });
    expect(result).toEqual(mockSelectResult.bookings[0]);
  });

  it("should find bookings by rooming list id", async () => {
    const result = await bookingsService.findByRoomingListId(1);

    expect(result).toEqual(mockSelectResult);
  });

  it("should remove a booking", async () => {
    await bookingsService.remove(1);

    expect(mockDb.delete).toHaveBeenCalledWith(bookingsTable);
    expect(mockDb.where).toHaveBeenCalledWith(eq(bookingsTable.bookingId, 1));
  });

  it("should remove multiple bookings (bulk)", async () => {
    const ids = [1, 2];

    await bookingsService.removeBulk(ids);

    expect(mockDb.delete).toHaveBeenCalledWith(bookingsTable);
    expect(mockDb.where).toHaveBeenCalledWith(
      inArray(bookingsTable.bookingId, ids),
    );
  });
});
