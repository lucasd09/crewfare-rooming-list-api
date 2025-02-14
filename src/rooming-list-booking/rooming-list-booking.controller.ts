import { Controller, Get, Post, Body } from "@nestjs/common";
import { RoomingListBookingService } from "./rooming-list-booking.service";
import { CreateRoomingListBookingDto } from "./dto/create-rooming-list-booking.dto";

@Controller("rooming-list-booking")
export class RoomingListBookingController {
  constructor(
    private readonly roomingListBookingService: RoomingListBookingService,
  ) {}

  @Post()
  create(@Body() data: CreateRoomingListBookingDto) {
    return this.roomingListBookingService.create(data);
  }

  @Post("bulk")
  createBulk(@Body() data: CreateRoomingListBookingDto[]) {
    return this.roomingListBookingService.createBulk(data);
  }

  @Get()
  findAll() {
    return this.roomingListBookingService.findAll();
  }
}
