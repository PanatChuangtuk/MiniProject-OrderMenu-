import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsString } from 'class-validator';

export class TableCreateDto {
  @ApiProperty({
    type: Number,
    description: 'tableId',
    example: '1',
  })
  @IsNumber()
  table_id: number;

  @ApiProperty({
    type: Number,
    description: 'tableNumber',
    example: '1',
  })
  @IsNumber()
  table_number: number;

  @ApiProperty({
    type: String,
    description: 'qrcodeUrl',
    example: 'Blank',
  })
  @IsString()
  readonly qrcode_url: string;

  @ApiProperty({
    type: Number,
    description: 'branchCompanyId',
    example: '1',
  })
  @IsNumber()
  branch_company_id: number;

  @ApiProperty({
    type: Number,
    description: 'tableSizeId',
    example: '1',
  })
  @IsNumber()
  table_size_id: number;
}

export class TableResponseDto {
  table_id: number;
  table_number: number;
  qrcode_url: string;
  branch_company_id: number;
  table_size_id: number;
}
