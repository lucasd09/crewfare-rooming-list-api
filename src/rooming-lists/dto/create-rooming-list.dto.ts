import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsNotEmpty, IsDateString } from "class-validator";

export class CreateRoomingListDto {
  @ApiProperty({ example: 1, description: "Unique ID of the rooming list" })
  @IsInt()
  roomingListId: number;

  @ApiProperty({ example: 202, description: "ID of the associated event" })
  @IsInt()
  eventId: number;

  @ApiProperty({
    example: "Tech Conference 2025",
    description: "Name of the event",
  })
  @IsString()
  @IsNotEmpty()
  eventName: string;

  @ApiProperty({ example: 101, description: "ID of the hotel" })
  @IsInt()
  hotelId: number;

  @ApiProperty({
    example: "Corporate Booking",
    description: "Request for Proposal (RFP) name",
  })
  @IsString()
  @IsNotEmpty()
  rfpName: string;

  @ApiProperty({
    example: "2025-05-15",
    description: "Cut-off date for rooming list (YYYY-MM-DD)",
  })
  @IsDateString()
  @IsNotEmpty()
  cutOffDate: string;

  @ApiProperty({
    example: "Confirmed",
    description: "Status of the rooming list",
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    example: "Corporate",
    description: "Type of agreement for the rooming list",
  })
  @IsString()
  @IsNotEmpty()
  agreement_type: string;
}
