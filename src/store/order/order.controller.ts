import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderStatus } from 'src/store/order/order-status.enum';
import { OrderCreateDto } from './order.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll() {
    return await this.orderService.findAll();
  }
  @ApiParam({ name: 'order_id', example: '1', type: 'number' })
  @Get('/orderId/:order_id')
  async findOne(@Param('order_id') orderId: number) {
    return await this.orderService.findOne(orderId);
  }
  @ApiParam({ name: 'table_id', example: '1', type: 'number' })
  @Post('/createOrder/:table_id')
  async generateOrderNumber(
    @Param('table_id') tableId: number,
    data: OrderCreateDto,
  ) {
    return await this.orderService.generateOrderNumber(tableId, data);
  }
  @ApiParam({
    name: 'order_status',
    description: 'Order Status',
    enum: OrderStatus,
    example: OrderStatus.Successfully,
  })
  @Patch('/updateOrder/:order_id/:order_status')
  async update(
    @Param('order_id') orderId: number,
    @Param('order_status') orderStatus: OrderStatus,
    @Body() orderData: OrderCreateDto,
  ) {
    return await this.orderService.update(orderId, orderStatus, orderData);
  }
  @ApiParam({ name: 'order_id', example: '1', type: 'number' })
  @Delete('/deleteOrder/:order_id')
  async remove(@Param('order_id') orderId: number) {
    return await this.orderService.remove(orderId);
  }
}
