import { PartialType } from "@nestjs/mapped-types";
import { CreateBookingDto } from "./create-booking.dto";
import { IsInt, IsOptional } from "class-validator";

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  @IsInt()
  @IsOptional()
  bookingId?: number;
}
