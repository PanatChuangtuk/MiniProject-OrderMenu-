import { ApiProperty } from '@nestjs/swagger';
//import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { timeStamp } from 'console';
import { OrderStatus } from 'src/store/order/order-status.enum';
import { Timestamp } from 'typeorm';

export class OrderCreateDto {
  @ApiProperty({
    type: Number,
    description: 'OrderId',
    example: '1',
  })
  @IsNumber()
  order_id: number;

  @ApiProperty({
    type: timeStamp,
    description: 'timeOrder',
    example: '2024-07-17T12:30:45Z',
  })
  @IsString()
  time_order: Timestamp;

  @ApiProperty({
    type: String,
    description: 'Order Status',
    enum: OrderStatus,
    example: OrderStatus.Successfully,
    enumName: 'OrderStatus',
  })
  @IsEnum(OrderStatus)
  order_status: OrderStatus;

  @ApiProperty({
    type: String,
    description: 'Total',
    example: '1000',
  })
  @IsNumber()
  total: number;

  @ApiProperty({
    type: Number,
    description: 'dpId',
    example: '1',
  })
  @IsNumber()
  dp_id: number;

  @ApiProperty({
    type: Number,
    description: 'tableId',
    example: '1',
  })
  @IsNumber()
  table_id: number;

  @ApiProperty({
    type: Number,
    description: 'CustomerId',
    example: '1',
  })
  @IsNumber()
  customer_id: number;

  @ApiProperty({
    type: Number,
    description: 'branchCompanyId',
    example: '1',
  })
  @IsNumber()
  branch_company_id: number;
}
