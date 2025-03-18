import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Table } from 'src/entity/table.entity';
@Entity('table_size')
export class Size {
  @PrimaryGeneratedColumn()
  table_size_id: number;

  @Column()
  table_maximum: number;

  @Column()
  quantity_table: number;

  @Column()
  table_type: string;

  @OneToMany(() => Table, (table) => table.size)
  table: Table[];
}
