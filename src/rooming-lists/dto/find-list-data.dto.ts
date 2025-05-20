import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindListDataDto {
  @ApiPropertyOptional({ description: 'Search term for filtering rooming lists' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Filter by active status' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  active?: string;

  @ApiPropertyOptional({ description: 'Filter by closed status' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  closed?: string;

  @ApiPropertyOptional({ description: 'Filter by cancelled status' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  cancelled?: string;
} 