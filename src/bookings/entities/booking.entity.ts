export class Booking {
  bookingId: number;
  hotelId?: number;
  eventId?: number;
  guestName: string;
  guestPhoneNumber: string;
  checkInDate: string;
  checkOutDate: string;

  constructor(partial: Partial<Booking>) {
    Object.assign(this, partial);
  }
}
