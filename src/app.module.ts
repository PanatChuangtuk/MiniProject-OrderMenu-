import { OrderMenuModule } from './store/order_menu/ordermenu.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './manage/company/company.module';
import { Company } from './entity/company.entity';
import { BranchModule } from './store/branch/branch.module'; // ตั้งชื่อ path ตามโครงสร้างของโปรเจค
import { Branch } from 'src/entity/branch.entity';
//import { join } from 'path';
//import { BranchModule } from './branch/branch.module';
import { TableModule } from 'src/store/table/table.module';
//import { Branch } from './entity/branch.entity';
import { Table } from './entity/table.entity';
//import { join } from 'path';
import { CategoryModule } from './manage/category/category.module';
import { Category } from './entity/category.entity';
import { Menu } from './entity/menu.entity';
import { MenuModule } from './manage/menu/menu.module';

import { OrderModule } from 'src/store/order/order.module';
import { Order } from './entity/order.entity';
import { OrderMenu } from 'src/entity/order-menu.entity';
//import { BranchModule } from './branch/branch.module';
import { ManageOrderModule } from 'src/manage/order/order.module';
//import { Branch } from './entity/branch.entity';
import { Size } from 'src/entity/size.entity';
import { SizeModule } from 'src/store/table_size/size.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: '45.91.132.173',
      host: '127.0.0.1',
      port: 3306,
      // username: 'mee_nu',
      // password: '6pL5zKiZfbAyLHmy',
      // database: 'mee_nu',
      username: 'root',
      password: '',
      database: 'mee_nu',
      entities: [
        Company,
        Branch,
        Table,
        Category,
        Menu,
        Order,
        OrderMenu,
        Size,
      ],
      synchronize: false, // ไม่แนะนำใน production
    }),
    CompanyModule,
    BranchModule,
    TableModule,
    CategoryModule, // เพิ่ม BranchModule เข้ามาใน imports
    MenuModule,
    OrderModule,
    SizeModule,
    OrderMenuModule,
    ManageOrderModule,
  ],
})
export class AppModule {}
