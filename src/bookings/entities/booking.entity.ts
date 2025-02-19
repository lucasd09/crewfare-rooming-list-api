import { ApiProperty } from "@nestjs/swagger";

export class Booking {
  @ApiProperty({ example: 1, description: "Unique ID of the booking" })
  bookingId: number;

  @ApiProperty({
    example: 101,
    description: "ID of the hotel",
    required: false,
  })
  hotelId?: number;

  @ApiProperty({
    example: 202,
    description: "ID of the event",
    required: false,
  })
  eventId?: number;

  @ApiProperty({ example: "John Doe", description: "Guest's full name" })
  guestName: string;

  @ApiProperty({ example: "+1234567890", description: "Guest's phone number" })
  guestPhoneNumber: string;

  @ApiProperty({
    example: "2025-06-01",
    description: "Check-in date (YYYY-MM-DD)",
  })
  checkInDate: string;

  @ApiProperty({
    example: "2025-06-07",
    description: "Check-out date (YYYY-MM-DD)",
  })
  checkOutDate: string;

  constructor(partial: Partial<Booking>) {
    Object.assign(this, partial);
  }
}
