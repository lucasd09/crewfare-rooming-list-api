import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { RoomingListsService } from "./rooming-lists.service";
import { CreateRoomingListDto } from "./dto/create-rooming-list.dto";

@Controller("roomingLists")
export class RoomingListsController {
  constructor(private readonly roomingListsService: RoomingListsService) {}

  @Post()
  create(@Body() data: CreateRoomingListDto) {
    return this.roomingListsService.create(data);
  }

  @Post("bulk")
  createBulk(@Body() data: CreateRoomingListDto[]) {
    return this.roomingListsService.createBulk(data);
  }

  @Get()
  findAll() {
    return this.roomingListsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.roomingListsService.findOne(+id);
  }

  @Delete(":id")
  @HttpCode(204)
  remove(@Param("id") id: string) {
    return this.roomingListsService.remove(+id);
  }

  @Post("deleteBulk")
  @HttpCode(204)
  async deleteRoomingLists(@Body() ids: number[]) {
    return this.roomingListsService.removeBulk(ids);
  }
}
