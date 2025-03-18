import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/entity/company.entity';
import { Repository } from 'typeorm';
import { CompanyCreateDto } from './company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async findAll() {
    return await this.companyRepository.find();
  }

  async findOne(companyId: number) {
    return await this.companyRepository.findOneBy({
      company_id: companyId,
    });
  }

  async create(companyData: CompanyCreateDto) {
    const newCompany = this.companyRepository.create(companyData);
    return await this.companyRepository.save(newCompany);
  }

  async update(
    company_id: number,
    companyData: CompanyCreateDto,
  ): Promise<Company> {
    const company = await this.companyRepository.findOneBy({ company_id });
    if (!company) {
      throw new NotFoundException(`Company with ID ${company_id} not found`);
    }
    Object.assign(company, companyData);
    return await this.companyRepository.save(company);
  }

  async remove(companyId: number) {
    const result = await this.companyRepository.delete(companyId);
    if (result.affected === 0) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }
  }
}
