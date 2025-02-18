import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";

@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() data: CreateBookingDto) {
    return this.bookingsService.create(data);
  }

  @Post("bulk")
  createBulk(@Body() data: CreateBookingDto[]) {
    return this.bookingsService.createBulk(data);
  }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Get("/byRoomingListId/:id")
  findByRoomingListId(@Param("id") id: string) {
    return this.bookingsService.findByRoomingListId(+id);
  }

  @Delete(":id")
  @HttpCode(204)
  remove(@Param("id") data: number) {
    return this.bookingsService.remove(data);
  }

  @Post("deleteBulk")
  @HttpCode(204)
  async deleteRoomingLists(@Body() ids: number[]) {
    return this.bookingsService.removeBulk(ids);
  }
}
