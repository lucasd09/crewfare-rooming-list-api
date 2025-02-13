export class RoomingList {
  roomingListId: number;
  eventId?: number;
  eventName: string;
  hotelId?: number;
  rfpName: string;
  cutOffDate: string;
  status: string;
  agreementType: string;

  constructor(partial: Partial<RoomingList>) {
    Object.assign(this, partial);
  }
}
