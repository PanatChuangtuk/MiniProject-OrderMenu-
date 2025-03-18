import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from 'src/entity/branch.entity';
import { BranchCreateDto /*BranchResponseDto*/ } from './branch.dto';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}

  async findAll() {
    return await this.branchRepository.find({
      relations: ['company'],
    });
  }

  async findOne(branchCompanyId: number) {
    const branch = await this.branchRepository.findOne({
      where: { branch_company_id: branchCompanyId },
    });
    if (!branch) {
      throw new NotFoundException(
        `Branch with ID ${branchCompanyId} not found`,
      );
    }
    return branch;
  }

  async create(branchCreateDto: BranchCreateDto) {
    const newBranch = this.branchRepository.create(branchCreateDto);

    return await this.branchRepository.save(newBranch);
  }

  async update(branchCompanyId: number, branchData: BranchCreateDto) {
    const branch = await this.branchRepository.findOne({
      where: { branch_company_id: branchCompanyId },
    });
    if (!branch) {
      throw new NotFoundException(
        `Branch with ID ${branchCompanyId} not found`,
      );
    }
    Object.assign(branch, branchData);
    return await this.branchRepository.save(branch);
  }

  async remove(branchCompanyId: number) {
    const result = await this.branchRepository.delete(branchCompanyId);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Branch with ID ${branchCompanyId} not found`,
      );
    }
  }
}
