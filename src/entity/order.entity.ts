import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { OrderStatus } from 'src/store/order/order-status.enum';
import { OrderMenu } from 'src/entity/order-menu.entity';
import { Table } from './table.entity';
import { Branch } from './branch.entity';
@Entity('order')
//import { Branch } from './branch.entity';import { OneToMany } from 'typeorm';
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  time_order: string;

  @Column({
    name: 'order_status',
    enum: OrderStatus,
    default: OrderStatus.Ordering,
  })
  order_status: string;

  @Column()
  total: number;

  @Column()
  order_number: string;

  @Column()
  dp_id: number;

  @Column()
  table_id: number;
  @ManyToOne(() => Table, (table) => table.order)
  @JoinColumn({ name: 'table_id' })
  table: Table;

  @Column()
  customer_id: number;

  @OneToMany(() => OrderMenu, (orderMenu) => orderMenu.order)
  orderMenus: OrderMenu[];

  @Column()
  branch_company_id: number;

  @ManyToOne(() => Branch, (branch) => branch.order)
  @JoinColumn({ name: 'branch_company_id' })
  branche: Branch;
}
