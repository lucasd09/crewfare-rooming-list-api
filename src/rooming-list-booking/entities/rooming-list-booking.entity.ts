export class RoomingListBooking {
  roomingListId: number;
  bookingId: number;

  constructor(partial: Partial<RoomingListBooking>) {
    Object.assign(this, partial);
  }
}
