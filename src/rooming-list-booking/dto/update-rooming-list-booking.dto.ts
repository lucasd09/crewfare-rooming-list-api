import { PartialType } from "@nestjs/mapped-types";
import { CreateRoomingListBookingDto } from "./create-rooming-list-booking.dto";

export class UpdateRoomingListBookingDto extends PartialType(
  CreateRoomingListBookingDto,
) {}
