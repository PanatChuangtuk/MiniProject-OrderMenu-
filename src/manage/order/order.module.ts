import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entity/order.entity';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Table } from 'src/entity/table.entity';
import { Branch } from 'src/entity/branch.entity';
import { OrderMenu } from 'src/entity/order-menu.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Order, Table, Branch, OrderMenu])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class ManageOrderModule {}
