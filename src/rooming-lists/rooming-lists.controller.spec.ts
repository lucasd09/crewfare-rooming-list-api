import { Test } from "@nestjs/testing";
import { RoomingListsController } from "./rooming-lists.controller";
import { RoomingListsService } from "./rooming-lists.service";
import { DATABASE_CONNECTION } from "../database/connection";

describe("Bookings Controller", () => {
  let controller: RoomingListsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [RoomingListsController],
      providers: [
        RoomingListsService,
        {
          provide: DATABASE_CONNECTION,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<RoomingListsController>(RoomingListsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
