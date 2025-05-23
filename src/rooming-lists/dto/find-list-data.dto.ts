import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class FindListDataDto {
  @ApiPropertyOptional({ description: 'Search term for filtering rooming lists' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Filter by active status' })
  @IsOptional()
  @IsString()
  active?: string;

  @ApiPropertyOptional({ description: 'Filter by closed status' })
  @IsOptional()
  @IsString()
  closed?: string;

  @ApiPropertyOptional({ description: 'Filter by cancelled status' })
  @IsOptional()
  @IsString()
  cancelled?: string;

  @ApiPropertyOptional({
    description: 'Page number (1-based)',
    minimum: 1,
    default: 1
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    minimum: 1,
    maximum: 100,
    default: 10
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;
} 