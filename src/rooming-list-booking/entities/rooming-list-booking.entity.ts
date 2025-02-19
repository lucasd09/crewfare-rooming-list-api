import { ApiProperty } from "@nestjs/swagger";

export class RoomingListBooking {
  @ApiProperty({ example: 1, description: "Relation id of the rooming list" })
  roomingListId: number;
  @ApiProperty({ example: 1, description: "Relation id of the booking" })
  bookingId: number;

  constructor(partial: Partial<RoomingListBooking>) {
    Object.assign(this, partial);
  }
}
