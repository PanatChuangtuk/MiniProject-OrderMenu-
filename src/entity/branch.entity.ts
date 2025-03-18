import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Company } from 'src/entity/company.entity';
import { Table } from 'src/entity/table.entity';
import { Order } from './order.entity';
@Entity('branch_company')
export class Branch {
  @PrimaryGeneratedColumn()
  branch_company_id: number;

  @Column()
  branch_name: string;

  @Column()
  branch_address: string;

  @Column()
  branch_number: string;

  @Column()
  branch_email: string;

  @Column()
  branch_phone: string;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @Column()
  company_id: number;

  @ManyToOne(() => Company, (company) => company.branche)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany(() => Table, (table) => table.branche)
  table: Table[];

  @OneToMany(() => Order, (order) => order.branche)
  order: Order[];
}
