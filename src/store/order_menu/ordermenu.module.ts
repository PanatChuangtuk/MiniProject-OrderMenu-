import { Module } from '@nestjs/common';
import { OrderMenu } from 'src/entity/order-menu.entity';

import { OrderMenuService } from './ordermenu.service';
import { OrderMenuController } from './ordermenu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entity/order.entity';
import { Menu } from 'src/entity/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderMenu, Order, Menu])],
  providers: [OrderMenuService],
  controllers: [OrderMenuController],
})
export class OrderMenuModule {}
