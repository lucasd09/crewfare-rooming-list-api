import { Test } from "@nestjs/testing";
import { BookingsController } from "./bookings.controller";
import { BookingsService } from "./bookings.service";
import { DATABASE_CONNECTION } from "../database/connection";

describe("Bookings Controller", () => {
  let controller: BookingsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [
        BookingsService,
        {
          provide: DATABASE_CONNECTION,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BookingsController>(BookingsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
