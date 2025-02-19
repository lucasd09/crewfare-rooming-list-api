import { ApiProperty } from "@nestjs/swagger";

export class RoomingList {
  @ApiProperty({ example: 1, description: "Unique ID of the rooming list" })
  roomingListId: number;

  @ApiProperty({
    example: 202,
    description: "ID of the associated event",
    required: false,
  })
  eventId?: number;

  @ApiProperty({
    example: "Tech Conference 2025",
    description: "Name of the event",
  })
  eventName: string;

  @ApiProperty({
    example: 101,
    description: "ID of the hotel",
    required: false,
  })
  hotelId?: number;

  @ApiProperty({
    example: "Corporate Booking",
    description: "Request for Proposal (RFP) name",
  })
  rfpName: string;

  @ApiProperty({
    example: "2025-05-15",
    description: "Cut-off date for rooming list (YYYY-MM-DD)",
  })
  cutOffDate: string;

  @ApiProperty({
    example: "Confirmed",
    description: "Status of the rooming list",
  })
  status: string;

  @ApiProperty({
    example: "Leisure",
    description: "Type of agreement for the rooming list",
  })
  agreementType: string;

  constructor(partial: Partial<RoomingList>) {
    Object.assign(this, partial);
  }
}
