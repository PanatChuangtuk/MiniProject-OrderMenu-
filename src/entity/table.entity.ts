import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Size } from 'src/entity/size.entity';
import { Branch } from 'src/entity/branch.entity';
import { Order } from './order.entity';

@Entity('table_branch')
export class Table {
  @PrimaryGeneratedColumn()
  table_id: number;

  @Column()
  table_number: number;

  @Column()
  qrcode_url: string;

  @Column()
  branch_company_id: number;
  @ManyToOne(() => Branch, (branch) => branch.table)
  @JoinColumn({ name: 'branch_company_id' })
  branche: Branch;

  @Column()
  table_size_id: number;

  @ManyToOne(() => Size, (size) => size.table)
  @JoinColumn({ name: 'table_size_id' })
  size: Size;

  @OneToMany(() => Order, (order) => order.table)
  order: Order[];
}
