import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from 'src/entity/order.entity';
import { JoinColumn, ManyToOne } from 'typeorm';
import { OrderMenuStatus } from 'src/store/order_menu/ordermenu-status.enum';
import { Menu } from './menu.entity';
@Entity('order_menu')
export class OrderMenu {
  @PrimaryGeneratedColumn()
  order_menu_id: number;

  @Column()
  qty: number;

  @Column()
  price: number;

  @Column({
    name: 'order_menu_status',
    enum: OrderMenuStatus,
    default: OrderMenuStatus.Preparing,
  })
  order_menu_status: string;

  @ManyToOne(() => Order, (order) => order.orderMenus)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  order_id: number;

  @ManyToOne(() => Menu, (menu) => menu.orderMenus)
  @JoinColumn({ name: 'menu_id' })
  menus: Menu;

  @Column()
  menu_id: number;
  forEach: any;
  static map: any;
  static forEach: any;
}
