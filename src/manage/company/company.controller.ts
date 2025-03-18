import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { CompanyService } from './company.service';

import { CompanyCreateDto } from './company.dto';

@Controller('company_brand')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async findAll() {
    return await this.companyService.findAll();
  }

  @Get(':company_id')
  async findOne(@Param('company_id') companyId: number) {
    return await this.companyService.findOne(companyId);
  }

  @Post()
  async create(@Body() companyData: CompanyCreateDto) {
    return await this.companyService.create(companyData);
  }

  @Patch(':company_id')
  async update(
    @Param('company_id') companyId: number,
    @Body() companyData: CompanyCreateDto,
  ) {
    return await this.companyService.update(companyId, companyData);
  }

  @Delete(':company_id')
  async remove(@Param('company_id') companyId: number) {
    return await this.companyService.remove(companyId);
  }
}
