import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from "@nestjs/common";
import { RoomingListsService } from "./rooming-lists.service";
import { CreateRoomingListDto } from "./dto/create-rooming-list.dto";
import { UpdateRoomingListDto } from "./dto/update-rooming-list.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { RoomingList } from "./entities/rooming-list.entity";

@Controller("roomingLists")
export class RoomingListsController {
  constructor(private readonly roomingListsService: RoomingListsService) {}

  @Post()
  create(@Body() data: CreateRoomingListDto) {
    return this.roomingListsService.create(data);
  }

  @Post("bulk")
  @ApiOperation({
    summary: "Create multiple rooming lists in bulk",
    description:
      "Creates multiple rooming lists from an array of rooming list DTOs.",
  })
  @ApiResponse({
    status: 201,
    description: "The rooming lists have been successfully created.",
    type: [RoomingList],
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input",
  })
  createBulk(@Body() data: CreateRoomingListDto[]) {
    return this.roomingListsService.createBulk(data);
  }

  @Get("getListData")
  findListData() {
    return this.roomingListsService.findListData();
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

  @Post("deleteBulk")
  async deleteRoomingLists(@Body() ids: number[]) {
    return this.roomingListsService.removeBulk(ids);
  }
}
