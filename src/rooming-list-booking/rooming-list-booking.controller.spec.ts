import { Test } from "@nestjs/testing";
import { RoomingListBookingController } from "./rooming-list-booking.controller";
import { RoomingListBookingService } from "./rooming-list-booking.service";
import { DATABASE_CONNECTION } from "../database/connection";

describe("Bookings Controller", () => {
  let controller: RoomingListBookingController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [RoomingListBookingController],
      providers: [
        RoomingListBookingService,
        {
          provide: DATABASE_CONNECTION,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<RoomingListBookingController>(
      RoomingListBookingController,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
