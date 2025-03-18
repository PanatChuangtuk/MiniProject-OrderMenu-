import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Order } from 'src/entity/order.entity';
import { Branch } from 'src/entity/branch.entity';
import { OrderMenu } from 'src/entity/order-menu.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,

    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(OrderMenu)
    private orderMenuRepository: Repository<OrderMenu>,
  ) {}

  async findAll(options: IPaginationOptions) {
    return paginate(this.orderRepository, options);
  }

  async findAdmin(branchCompanyId: number, options: IPaginationOptions) {
    const branch = await this.branchRepository.findOne({
      select: ['branch_company_id'],
      where: { branch_company_id: branchCompanyId },
    });

    if (!branch) {
      throw new NotFoundException(
        `Branch with ID ${branchCompanyId} not found`,
      );
    }
    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .where('order.branch_company_id = :branchCompanyId', { branchCompanyId })
      .leftJoin('order.branche', 'branche')
      .where('branche.branch_company_id = :branchCompanyId');
    const order = await paginate(queryBuilder, options);
    return { branch_company_id: branch.branch_company_id, order: order };
  }

  async findHistory(orderId: number, options: IPaginationOptions) {
    const order = await this.orderMenuRepository.findOne({
      select: ['order_id'],
      where: { order_id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    const queryBuilder = this.orderMenuRepository
      .createQueryBuilder('orderMenus')
      .leftJoinAndSelect('orderMenus.menus', 'menus')
      .select([
        'orderMenus.order_menu_id',
        'orderMenus.qty',
        'orderMenus.price',
        'orderMenus.order_menu_status',
        'menus.menu_id',
        'menus.menu_name',
        'menus.menu_picture',
      ])
      .where('orderMenus.order_id = :orderId', { orderId });

    // .andWhere('orderMenus.order_menu_status = :order_menu_status', {
    //   order_menu_status: 'successful',
    // });

    const orderDetail = await paginate(queryBuilder, options);

    const total = orderDetail.items.reduce((i, a) => i + a.qty * a.price, 0);
    const vatRate = 0.07; // 7%
    const vatAmount = total * vatRate;
    console.log(total);
    // คำนวณยอดรวมรวม VAT
    const vat = total + vatAmount;

    return {
      order_id: order.order_id,
      total,
      vat,
      orderDetail: orderDetail,
    };
  }
}
