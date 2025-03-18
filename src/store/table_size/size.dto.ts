import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsString } from 'class-validator';

export class SizeCreateDto {
  @ApiProperty({
    type: Number,
    description: 'TableSizeId',
    example: '1',
  })
  @IsNumber()
  table_size_id: number;

  @ApiProperty({
    type: Number,
    description: 'tableMaximum',
    example: '1',
  })
  @IsNumber()
  table_maximum: number;

  @ApiProperty({
    type: Number,
    description: 'quantityTable',
    example: '1',
  })
  @IsNumber()
  quantity_table: number;

  @ApiProperty({
    type: String,
    description: 'tableType',
    example: 'Small',
  })
  @IsString()
  table_type: string;
}

export class SizeResponseDto {
  table_size_id: number;
  table_maximum: number;
  quantity_table: number;
  table_type: string;
}
