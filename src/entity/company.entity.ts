import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Branch } from 'src/entity/branch.entity';
@Entity('company_brand')
export class Company {
  @PrimaryGeneratedColumn()
  company_id: number;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column({ name: 'company_address' })
  companyAddress: string;

  @Column({ name: 'phone_company' })
  companyPhone: string;

  @Column({ name: 'email_company' })
  companyEmail: string;

  @OneToMany(() => Branch, (branch) => branch.company)
  branche: Branch[];
}
