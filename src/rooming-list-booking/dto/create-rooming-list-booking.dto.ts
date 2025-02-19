import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CreateRoomingListBookingDto {
  @ApiProperty({ example: 1, description: "Relation id of the rooming list" })
  @IsInt()
  roomingListId: number;

  @ApiProperty({ example: 1, description: "Relation id of the booking" })
  @IsInt()
  bookingId: number;
}
