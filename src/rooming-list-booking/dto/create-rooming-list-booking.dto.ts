import { IsInt } from "class-validator";

export class CreateRoomingListBookingDto {
  @IsInt()
  roomingListId: number;

  @IsInt()
  bookingId: number;
}
