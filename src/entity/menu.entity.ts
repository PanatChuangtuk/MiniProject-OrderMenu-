import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderMenu } from './order-menu.entity';

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn()
  menu_id: number;

  @Column()
  menu_name: string;

  @Column()
  menu_detail: string;

  @Column()
  menu_picture: string;
  @Column()
  category_id: number;
  @Column()
  menu_price: number;

  @OneToMany(() => OrderMenu, (orderMenu) => orderMenu.menus)
  orderMenus: OrderMenu[];
}
