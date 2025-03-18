import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  // IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
// import { OrderMenuStatus } from './ordermenu-status.enum';

export class OrderMenuCreateDto {
  @ApiProperty({
    type: Number,
    description: 'orderMenuId',
    example: '1',
  })
  @IsNumber()
  @IsNotEmpty()
  order_menu_id: number;

  @ApiProperty({
    type: Number,
    description: 'Quantity',
    example: '10',
  })
  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @ApiProperty({
    type: Number,
    description: 'Price',
    example: '10000',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    type: Number,
    description: 'menuId',
    example: '1',
  })
  @IsNotEmpty({ each: true })
  @IsNumber()
  menu_id: number;
}
export class OrderMenuDto {
  @ApiProperty({
    type: Number,
    description: 'OrderId',
    example: '1',
  })
  @IsNumber()
  order_id: number;

  // @ApiProperty({
  //   type: String,
  //   description: 'OrderMenuStatus',
  //   default: OrderMenuStatus.Successful,
  // })
  // @IsEnum(OrderMenuStatus)
  // readonly order_menu_status: string;
  @ApiProperty({
    type: [OrderMenuCreateDto],
    description: 'List of menu items',
  })
  @IsArray()
  @IsNotEmpty({ each: true })
  @ValidateNested({ each: true })
  @Type(() => OrderMenuCreateDto)
  menu: OrderMenuCreateDto[];
}
