import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entity/order.entity';
import { Repository } from 'typeorm';
import { OrderStatus } from 'src/store/order/order-status.enum';

import { OrderCreateDto } from './order.dto';
import { Table } from 'src/entity/table.entity';

@Injectable()
export class OrderService {
  private runNumber = 0;
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(Table)
    private tableRepository: Repository<Table>,
  ) {}

  async findAll() {
    return await this.orderRepository.find();
  }

  async findOne(orderId: number) {
    return await this.orderRepository.findOneBy({
      order_id: orderId,
    });
  }

  async generateOrderNumber(tableId: number, data: OrderCreateDto) {
    const table = await this.tableRepository.findOne({
      where: { table_id: tableId },
    });

    if (!table) {
      throw new Error(`Table with ID ${tableId} not found`);
    }

    const existingOrder = await this.orderRepository.findOne({
      where: {
        branch_company_id: table.branch_company_id,
        table_id: tableId,
        order_status: OrderStatus.Ordering,
      },
    });

    if (existingOrder) return existingOrder;

    const branchIdFormatted = String(table.branch_company_id).padStart(
      3,
      '000',
    );
    const tableIdFormatted = String(tableId).padStart(4, '0000');
    const currentDate = new Date();
    const year = String(currentDate.getFullYear()).slice(-2);
    const month = String(currentDate.getMonth() + 1).padStart(2, '00');
    const runNumber = String(++this.runNumber).padStart(6, '000000');
    const orderNumber = `O${branchIdFormatted}${tableIdFormatted}${year}${month}${runNumber}`;

    const newOrder = this.orderRepository.create({
      branch_company_id: table.branch_company_id,
      table_id: tableId,
      order_number: orderNumber,
      order_status: OrderStatus.Ordering,
    });
    Object.assign(newOrder, data);
    return await this.orderRepository.save(newOrder);
  }

  async update(
    orderId: number,
    orderStatus: string,
    orderData: OrderCreateDto,
  ) {
    const orders = await this.orderRepository.findOneBy({ order_id: orderId });
    if (!orders) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    orders.order_status = orderStatus;
    Object.assign(orders, orderData);
    return await this.orderRepository.save(orders);
  }

  async remove(orderId: number) {
    const result = await this.orderRepository.delete(orderId);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
  }
}
