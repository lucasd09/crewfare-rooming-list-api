import { Test, TestingModule } from "@nestjs/testing";
import { RoomingListsController } from "./rooming-lists.controller";
import { RoomingListsService } from "./rooming-lists.service";
import { RoomingList } from "./entities/rooming-list.entity";
import { CreateRoomingListDto } from "./dto/create-rooming-list.dto";
import { UpdateRoomingListDto } from "./dto/update-rooming-list.dto";

describe("Rooming Lists Controller", () => {
  let controller: RoomingListsController;
  let service: RoomingListsService;

  const mockRoomingLists: RoomingList[] = [
    {
      roomingListId: 1,
      eventId: 1,
      eventName: "event 1",
      rfpName: "",
      cutOffDate: "",
      status: "",
      agreementType: "",
    },
    {
      roomingListId: 2,
      eventId: 1,
      eventName: "event 1",
      rfpName: "ACL-2025",
      cutOffDate: "",
      status: "",
      agreementType: "",
    },
    {
      roomingListId: 3,
      eventId: 2,
      eventName: "event 2",
      rfpName: "",
      cutOffDate: "",
      status: "",
      agreementType: "",
    },
  ];

  const mockFindListData = [
    {
      eventId: 1,
      eventName: "event 1",
      roomingLists: [mockRoomingLists[0], mockRoomingLists[1]],
    },
    {
      eventId: 2,
      eventName: "event 2",
      roomingLists: [mockRoomingLists[2]],
    },
  ];

  const mockRoomingListsService = {
    findAll: jest.fn().mockResolvedValue(mockRoomingLists),
    findOne: jest.fn().mockResolvedValue(mockRoomingLists[0]),
    create: jest.fn().mockResolvedValue(mockRoomingLists[0]),
    createBulk: jest.fn().mockResolvedValue(mockRoomingLists),
    update: jest.fn().mockResolvedValue(mockRoomingLists[1]),
    remove: jest.fn().mockResolvedValue(mockRoomingLists[0]),
    removeBulk: jest.fn().mockResolvedValue([1, 2]),
    findListData: jest.fn().mockResolvedValue(mockFindListData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomingListsController],
      providers: [
        {
          provide: RoomingListsService,
          useValue: mockRoomingListsService,
        },
      ],
    }).compile();

    controller = module.get<RoomingListsController>(RoomingListsController);
    service = module.get<RoomingListsService>(RoomingListsService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return all rooming lists", async () => {
    const result = await controller.findAll();

    expect(result).toEqual(mockRoomingLists);
    expect(service.findAll).toHaveBeenCalled();
  });

  it("should return a single rooming list", async () => {
    const result = await controller.findOne("1");

    expect(result).toEqual(mockRoomingLists[0]);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it("should create a rooming list", async () => {
    const dto: CreateRoomingListDto = {
      roomingListId: 1,
      eventId: 1,
      eventName: "event 1",
      hotelId: 0,
      rfpName: "",
      cutOffDate: "",
      status: "",
      agreement_type: "",
    };

    const result = await controller.create(dto);

    expect(result).toEqual(mockRoomingLists[0]);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it("should create multiple rooming lists", async () => {
    const dto: CreateRoomingListDto[] = [
      {
        roomingListId: 1,
        eventId: 1,
        eventName: "event 1",
        rfpName: "",
        cutOffDate: "",
        status: "",
        agreement_type: "",
        hotelId: 0,
      },
      {
        roomingListId: 2,
        eventId: 1,
        eventName: "event 1",
        rfpName: "ACL-2025",
        cutOffDate: "",
        status: "",
        agreement_type: "",
        hotelId: 0,
      },
      {
        roomingListId: 3,
        eventId: 2,
        eventName: "event 2",
        rfpName: "",
        cutOffDate: "",
        status: "",
        agreement_type: "",
        hotelId: 0,
      },
    ];

    const result = await controller.createBulk(dto);

    expect(service.createBulk).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockRoomingLists);
  });

  it("should return list data", async () => {
    const result = await controller.findListData();

    expect(result).toEqual(mockFindListData);
    expect(service.findListData).toHaveBeenCalled();
  });

  it("should update a rooming list", async () => {
    const dto: UpdateRoomingListDto = {
      rfpName: "ACL-2025",
    };
    const result = await controller.update("2", dto);
    expect(result).toEqual(mockRoomingLists[1]);
    expect(service.update).toHaveBeenCalledWith(2, dto);
  });

  it("should delete a rooming list", async () => {
    const result = await controller.remove("1");

    expect(result).toEqual(mockRoomingLists[0]);
    expect(service.remove).toHaveBeenCalledWith(1);
  });

  it("should delete multiple rooming lists (bulk)", async () => {
    const ids = [1, 2];
    const result = await controller.deleteRoomingLists(ids);

    expect(result).toEqual(ids);
    expect(service.removeBulk).toHaveBeenCalledWith(ids);
  });
});
