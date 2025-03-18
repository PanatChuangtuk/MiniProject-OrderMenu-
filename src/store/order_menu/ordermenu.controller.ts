import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderMenuStatus } from './ordermenu-status.enum';
import { OrderMenuDto } from './order-menu.dto';
import { OrderMenuService } from './ordermenu.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
@ApiTags('orderMenu')
@Controller('orderMenu')
export class OrderMenuController {
  constructor(private readonly orderMenuService: OrderMenuService) {}

  @Get()
  async findAllOrderMenu() {
    return await this.orderMenuService.findAllOrderMenu();
  }
  @ApiParam({ name: 'orderId', example: '1', type: 'number' })
  @ApiParam({ name: 'orderMenuStatus', example: 'preparing', type: 'string' })
  @Get(':orderId/status/:orderMenuStatus')
  async getOrderStatus(
    @Param('orderId') orderId: number,
    @Param('orderMenuStatus') orderMenuStatus: string,
  ) {
    return await this.orderMenuService.findStatus(orderId, orderMenuStatus);
  }

  @Post('/createOrderMenu/')
  async createOrder(
    @Body()
    @Param('order_id')
    @Param('menu_id')
    orderMenuDto: OrderMenuDto,
  ) {
    const { order_id, menu } = orderMenuDto;
    return await this.orderMenuService.createOrder(order_id, menu);
  }
  @ApiParam({ name: 'order_menu_id', example: '1', type: 'number' })
  @Patch('/updateOrderMenu/:order_menu_id/:order_menu_status')
  async update(
    @Param('order_menu_id') orderMenuId: number,
    @Param('order_menu_status') orderMenuStatus: OrderMenuStatus,
    @Body() orderMenuData: OrderMenuDto,
  ) {
    return await this.orderMenuService.update(
      orderMenuId,
      orderMenuStatus,
      orderMenuData,
    );
  }
  @ApiParam({ name: 'order_menu_id', example: '1', type: 'number' })
  @Delete('/deleteOrderMenu/:order_menu_id')
  async remove(@Param('order_menu_id') orderMenuId: number) {
    return await this.orderMenuService.remove(orderMenuId);
  }
}
