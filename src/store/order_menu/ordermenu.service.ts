import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderMenuCreateDto, OrderMenuDto } from './order-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderMenu } from 'src/entity/order-menu.entity';
import { Repository } from 'typeorm';

import { Order } from 'src/entity/order.entity';
import { Menu } from 'src/entity/menu.entity';

@Injectable()
export class OrderMenuService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderMenu)
    private orderMenuRepository: Repository<OrderMenu>,
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}
  async findAllOrderMenu() {
    return await this.orderMenuRepository.find();
  }
  async findStatus(orderId: number, orderMenuStatus: string) {
    const orders = await this.orderRepository.findOne({
      where: {
        order_id: orderId,
      },
      relations: ['orderMenus'],
    });

    // Check if the order exists
    if (!orders) {
      throw new BadRequestException(`Order with ID ${orderId} not found`);
    }
    const status = await this.orderMenuRepository.findOne({
      where: { order_menu_status: orderMenuStatus },
    });
    if (!status) {
      throw new BadRequestException(
        `OrderMenuStatus not found Or  False it have { preparing, successful, cancelled }`,
      );
    }

    const query = this.orderMenuRepository
      .createQueryBuilder('orderMenu')
      .select([
        'order.order_id ',
        'orderMenu.order_menu_id ',
        'orderMenu.price ',
        'orderMenu.qty ',
      ])
      .leftJoin('orderMenu.order', 'order')
      .where('order.order_id = :orderId', { orderId })
      .andWhere('orderMenu.order_menu_status = :orderMenuStatus', {
        orderMenuStatus,
      });

    const orderMenus = await query.getRawMany();

    return {
      order_id: orders.order_id,
      orderMenus: orderMenus,
    };
  }
  async createOrder(orderId: number, menuItems: OrderMenuCreateDto[]) {
    try {
      const order = await this.orderRepository.findOne({
        where: { order_id: orderId },
      });

      for (const menuItem of menuItems) {
        const menu = await this.menuRepository.findOne({
          where: { menu_id: menuItem.menu_id, menu_price: menuItem.price },
        });
        const orderMenu = this.orderMenuRepository.create({
          order_id: order.order_id,
          qty: menuItem.qty,
          price: menu.menu_price,
          menu_id: menuItem.menu_id,
        });

        await this.orderMenuRepository.save(orderMenu);
      }
      return `Create OrderId ${orderId} complete`;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Unable to create order information. Please fill in information or False',
      );
    }
  }

  async update(
    orderMenuId: number,
    orderMenuStatus: string,
    orderData: OrderMenuDto,
  ) {
    const orders = await this.orderMenuRepository.findOneBy({
      order_menu_id: orderMenuId,
    });
    if (!orders) {
      throw new NotFoundException(`Order with ID ${orderMenuId} not found`);
    }
    orders.order_menu_status = orderMenuStatus;
    Object.assign(orders, orderData);
    return await this.orderMenuRepository.save(orders);
  }

  async remove(orderMenuId: number) {
    const result = await this.orderMenuRepository.delete(orderMenuId);
    if (result.affected === 0) {
      throw new NotFoundException(`OrderMenu with ID ${orderMenuId} not found`);
    } else {
      return `OrderMenu ID ${orderMenuId} has been deleted.`;
    }
  }
}
