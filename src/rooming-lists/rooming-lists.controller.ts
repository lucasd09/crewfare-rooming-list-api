import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from "@nestjs/common";
import { RoomingListsService } from "./rooming-lists.service";
import { CreateRoomingListDto } from "./dto/create-rooming-list.dto";
import { UpdateRoomingListDto } from "./dto/update-rooming-list.dto";
import { ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { RoomingList } from "./entities/rooming-list.entity";
import { FindListDataDto } from "./dto/find-list-data.dto";
import { RoomingListGroup } from "./entities/rooming-list-group.entity";
import { PaginatedResponseDto } from "./dto/paginated-response.dto";

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
  @ApiOperation({
    summary: "Get rooming list data with filters and pagination",
    description: "Retrieves rooming list data with optional filtering by search term and status, supports pagination",
  })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'active', required: false, type: Boolean })
  @ApiQuery({ name: 'closed', required: false, type: Boolean })
  @ApiQuery({ name: 'cancelled', required: false, type: Boolean })
  @ApiQuery({ 
    name: 'page', 
    required: false, 
    type: Number,
    description: 'Page number (1-based)',
    minimum: 1,
    default: 1
  })
  @ApiQuery({ 
    name: 'limit', 
    required: false, 
    type: Number,
    description: 'Number of items per page',
    minimum: 1,
    maximum: 100,
    default: 10
  })
  @ApiResponse({
    status: 200,
    description: "The successfully retrieved Rooming Lists grouped by its events with pagination metadata",
    type: PaginatedResponseDto<RoomingListGroup>
  })
  findListData(@Query() query: FindListDataDto): Promise<PaginatedResponseDto<RoomingListGroup>> {
    return this.roomingListsService.findListData(query);
  }

  @Get()
  findAll() {
    return this.roomingListsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.roomingListsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() updateRoomingListDto: UpdateRoomingListDto,
  ) {
    return this.roomingListsService.update(id, updateRoomingListDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.roomingListsService.remove(id);
  }

  @Post("deleteBulk")
  async deleteRoomingLists(@Body() ids: number[]) {
    return this.roomingListsService.removeBulk(ids);
  }
}
