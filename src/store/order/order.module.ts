import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entity/order.entity';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Table } from 'src/entity/table.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Order, Table])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
