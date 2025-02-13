import { IsInt, IsNotEmpty, IsString, IsDateString } from "class-validator";

export class CreateBookingDto {
  @IsInt()
  bookingId: number;

  @IsInt()
  hotelId: number;

  @IsInt()
  eventId: number;

  @IsString()
  @IsNotEmpty()
  guestName: string;

  @IsString()
  @IsNotEmpty()
  guestPhoneNumber: string;

  @IsDateString()
  @IsNotEmpty()
  checkInDate: string;

  @IsDateString()
  @IsNotEmpty()
  checkOutDate: string;
}
