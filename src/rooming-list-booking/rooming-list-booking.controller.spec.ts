import { Test, TestingModule } from "@nestjs/testing";
import { RoomingListBookingController } from "./rooming-list-booking.controller";
import { RoomingListBookingService } from "./rooming-list-booking.service";
import { CreateRoomingListBookingDto } from "./dto/create-rooming-list-booking.dto";
import { RoomingListBooking } from "./entities/rooming-list-booking.entity";

describe("RoomingListBookingController", () => {
  let controller: RoomingListBookingController;
  let service: RoomingListBookingService;

  const mockRoomingListBookings: RoomingListBooking[] = [
    {
      roomingListId: 1,
      bookingId: 1,
    },
    {
      roomingListId: 1,
      bookingId: 2,
    },
    {
      roomingListId: 2,
      bookingId: 3,
    },
  ];

  const mockRoomingListBookingService = {
    create: jest.fn().mockResolvedValue(mockRoomingListBookings[0]),
    createBulk: jest.fn().mockResolvedValue(mockRoomingListBookings),
    findAll: jest.fn().mockResolvedValue(mockRoomingListBookings),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomingListBookingController],
      providers: [
        {
          provide: RoomingListBookingService,
          useValue: mockRoomingListBookingService,
        },
      ],
    }).compile();

    controller = module.get<RoomingListBookingController>(
      RoomingListBookingController,
    );
    service = module.get<RoomingListBookingService>(RoomingListBookingService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a booking", async () => {
    const dto: CreateRoomingListBookingDto = {
      roomingListId: 0,
      bookingId: 0,
    };
    const result = await controller.create(dto);
    expect(result).toEqual(mockRoomingListBookings[0]);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it("should create multiple bookings (bulk)", async () => {
    const dto: CreateRoomingListBookingDto[] = [
      {
        roomingListId: 1,
        bookingId: 1,
      },
      {
        roomingListId: 1,
        bookingId: 2,
      },
      {
        roomingListId: 2,
        bookingId: 3,
      },
    ];
    const result = await controller.createBulk(dto);
    expect(result).toEqual(dto);
    expect(service.createBulk).toHaveBeenCalledWith(dto);
  });

  it("should return all bookings", async () => {
    const result = await controller.findAll();
    expect(result).toEqual(mockRoomingListBookings);
    expect(service.findAll).toHaveBeenCalled();
  });
});
