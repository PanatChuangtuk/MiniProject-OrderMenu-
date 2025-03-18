import {
  Controller,
  Get,
  Query,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { OrderService } from './order.service';

import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('manage-order')
@Controller('manage-order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @ApiQuery({ name: 'page', example: '1', type: 'number' })
  @ApiQuery({ name: 'limit', example: '10', type: 'number' })
  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.orderService.findAll({
      page,
      limit,
    });
  }
  @ApiParam({ name: 'branchCompanyId', example: '1', type: 'number' })
  @ApiQuery({ name: 'page', example: '1', type: 'number' })
  @ApiQuery({ name: 'limit', example: '10', type: 'number' })
  @Get('/branchId/:branchCompanyId')
  async findAdmin(
    @Param('branchCompanyId') branchCompanyId: number,
    @Body('order')
    @Query('page', ParseIntPipe)
    page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.orderService.findAdmin(branchCompanyId, {
      page,
      limit,
      route: `manage-order/branchId/${branchCompanyId}`,
    });
  }

  @Get('orderId/:orderId')
  async findHistory(
    @Param('orderId') orderId: number,
    @Body('orderMenus')
    @Query('page', ParseIntPipe)
    page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.orderService.findHistory(orderId, {
      page,
      limit,
      route: `manage-order/orderId/${orderId}`,
    });
  }
}
