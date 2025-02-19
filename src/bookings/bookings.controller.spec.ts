import { Test, TestingModule } from "@nestjs/testing";
import { BookingsController } from "./bookings.controller";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { Booking } from "./entities/booking.entity";

describe("Bookings Controller", () => {
  let controller: BookingsController;
  let service: BookingsService;

  const mockBookingsData: Booking[] = [
    {
      bookingId: 1,
      hotelId: 0,
      eventId: 0,
      guestName: "GuestName",
      guestPhoneNumber: "",
      checkInDate: "",
      checkOutDate: "",
    },
    {
      bookingId: 2,
      hotelId: 0,
      eventId: 0,
      guestName: "updated guestName only",
      guestPhoneNumber: "",
      checkInDate: "",
      checkOutDate: "",
    },
  ];

  const mockFindByRoomingListId = {
    minDate: "",
    maxDate: "",
    bookingsCount: 2,
    bookings: mockBookingsData,
  };

  const mockBookingsService = {
    findAll: jest.fn().mockResolvedValue(mockBookingsData),
    findOne: jest.fn().mockResolvedValue(mockBookingsData[0]),
    findByRoomingListId: jest.fn().mockResolvedValue(mockFindByRoomingListId),
    create: jest.fn().mockResolvedValue(mockBookingsData[0]),
    createBulk: jest.fn().mockResolvedValue(mockBookingsData),
    update: jest.fn().mockResolvedValue(mockBookingsData[1]),
    remove: jest.fn().mockResolvedValue(mockBookingsData[0]),
    removeBulk: jest.fn().mockResolvedValue([1, 2]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [
        {
          provide: BookingsService,
          useValue: mockBookingsService,
        },
      ],
    }).compile();

    controller = module.get<BookingsController>(BookingsController);
    service = module.get<BookingsService>(BookingsService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return all bookings", async () => {
    const result = await controller.findAll();

    expect(result).toEqual(mockBookingsData);
    expect(service.findAll).toHaveBeenCalled();
  });

  it("should return one booking", async () => {
    const result = await controller.findOne("1");

    expect(result).toEqual(mockBookingsData[0]);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it("should return bookings by roomingListId", async () => {
    const result = await controller.findByRoomingListId("1");

    expect(result).toEqual(mockFindByRoomingListId);
    expect(service.findByRoomingListId).toHaveBeenCalledWith(1);
  });

  it("should create a booking", async () => {
    const dto: CreateBookingDto = {
      bookingId: 1,
      hotelId: 0,
      eventId: 0,
      guestName: "guestName",
      guestPhoneNumber: "",
      checkInDate: "",
      checkOutDate: "",
    };

    const result = await controller.create(dto);
    expect(result).toEqual(mockBookingsData[0]);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it("should create multiple bokings (bulk)", async () => {
    const dto: CreateBookingDto[] = [
      {
        bookingId: 1,
        hotelId: 0,
        eventId: 0,
        guestName: "GuestName",
        guestPhoneNumber: "",
        checkInDate: "",
        checkOutDate: "",
      },
      {
        bookingId: 2,
        hotelId: 0,
        eventId: 0,
        guestName: "updated guestName only",
        guestPhoneNumber: "",
        checkInDate: "",
        checkOutDate: "",
      },
    ];
    const result = await controller.createBulk(dto);

    expect(service.createBulk).toHaveBeenCalledWith(dto);
    expect(result).toEqual(dto);
  });

  it("should update a booking", async () => {
    const dto: UpdateBookingDto = {
      guestName: "updated guestName only",
    };
    const result = await controller.update("2", dto);
    expect(result).toEqual(mockBookingsData[1]);
    expect(service.update).toHaveBeenCalledWith(2, dto);
  });

  it("should delete a booking", async () => {
    const result = await controller.remove(1);

    expect(result).toEqual(mockBookingsData[0]);
    expect(service.remove).toHaveBeenCalledWith(1);
  });

  it("should delete multiple bookings (bulk)", async () => {
    const ids = [1, 2];

    const result = await controller.deleteRoomingLists(ids);

    expect(service.removeBulk).toHaveBeenCalledWith(ids);
    expect(result).toEqual(ids);
  });
});
