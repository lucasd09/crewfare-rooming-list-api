import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Booking } from "./entities/booking.entity";

@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() data: CreateBookingDto) {
    return this.bookingsService.create(data);
  }

  @Post("bulk")
  @ApiOperation({
    summary: "Create multiple bookings in bulk",
    description: "Creates multiple bookings from an array of booking DTOs.",
  })
  @ApiResponse({
    status: 201,
    description: "The bookings have been successfully created.",
    type: [Booking], // Return type is an array of Booking
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input",
  })
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

  @Patch(":id")
  update(@Param("id") id: string, @Body() data: UpdateBookingDto) {
    return this.bookingsService.update(+id, data);
  }

  @Delete(":id")
  remove(@Param("id") data: number) {
    return this.bookingsService.remove(data);
  }

  @Post("deleteBulk")
  async deleteRoomingLists(@Body() ids: number[]) {
    return this.bookingsService.removeBulk(ids);
  }
}
