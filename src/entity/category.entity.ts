import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('menu_category')
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  categoryId: number;

  @Column({ name: 'category_name' })
  categoryName: string;
}
