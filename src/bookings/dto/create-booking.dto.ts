import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsNotEmpty, IsDateString } from "class-validator";

export class CreateBookingDto {
  @ApiProperty({ example: 1, description: "Unique ID of the booking" })
  @IsInt()
  bookingId: number;

  @ApiProperty({ example: 101, description: "ID of the hotel" })
  @IsInt()
  hotelId: number;

  @ApiProperty({ example: 202, description: "ID of the event" })
  @IsInt()
  eventId: number;

  @ApiProperty({ example: "John Doe", description: "Guest's full name" })
  @IsString()
  @IsNotEmpty()
  guestName: string;

  @ApiProperty({ example: "+1234567890", description: "Guest's phone number" })
  @IsString()
  @IsNotEmpty()
  guestPhoneNumber: string;

  @ApiProperty({
    example: "2025-06-01",
    description: "Check-in date (YYYY-MM-DD)",
  })
  @IsDateString()
  @IsNotEmpty()
  checkInDate: string;

  @ApiProperty({
    example: "2025-06-07",
    description: "Check-out date (YYYY-MM-DD)",
  })
  @IsDateString()
  @IsNotEmpty()
  checkOutDate: string;
}
