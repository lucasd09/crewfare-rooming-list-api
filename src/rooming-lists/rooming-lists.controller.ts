import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RoomingListsService } from "./rooming-lists.service";
import { CreateRoomingListDto } from "./dto/create-rooming-list.dto";
import { UpdateRoomingListDto } from "./dto/update-rooming-list.dto";

@Controller("roomingLists")
export class RoomingListsController {
  constructor(private readonly roomingListsService: RoomingListsService) {}

  @Post()
  create(@Body() createRoomingListDto: CreateRoomingListDto) {
    return this.roomingListsService.create(createRoomingListDto);
  }

  @Get()
  findAll() {
    return this.roomingListsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.roomingListsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateRoomingListDto: UpdateRoomingListDto,
  ) {
    return this.roomingListsService.update(+id, updateRoomingListDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.roomingListsService.remove(+id);
  }
}
