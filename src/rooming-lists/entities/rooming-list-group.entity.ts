import { ApiProperty } from '@nestjs/swagger';
import { RoomingList } from './rooming-list.entity';

export class RoomingListGroup {
  @ApiProperty({
    description: 'The ID of the event',
    example: 1
  })
  eventId: number;

  @ApiProperty({
    description: 'The name of the event',
    example: 'Summer Conference 2024',
    nullable: true
  })
  eventName: string | null;

  @ApiProperty({
    description: 'The count of rooming lists for this event',
    example: 5
  })
  roomingCount: number;

  @ApiProperty({
    description: 'Array of rooming lists associated with this event',
    type: [RoomingList]
  })
  roomingLists: RoomingList[];
} 