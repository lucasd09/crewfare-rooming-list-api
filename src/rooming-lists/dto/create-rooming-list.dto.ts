import { IsInt, IsNotEmpty, IsString, IsDateString } from "class-validator";

export class CreateRoomingListDto {
  @IsInt()
  roomingListId: number;

  @IsInt()
  eventId: number;

  @IsString()
  @IsNotEmpty()
  eventName: string;

  @IsInt()
  hotelId: number;

  @IsString()
  @IsNotEmpty()
  rfpName: string;

  @IsDateString()
  @IsNotEmpty()
  cutOffDate: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  agreement_type: string;
}
