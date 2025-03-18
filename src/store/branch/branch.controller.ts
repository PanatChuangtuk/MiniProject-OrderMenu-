import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchCreateDto } from './branch.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
@ApiTags('branches')
@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Get()
  async findAll() {
    return await this.branchService.findAll();
  }
  @ApiParam({ name: 'branchCompanyId', example: '1', type: 'number' })
  @Get('/branchId/:branchCompanyId')
  async findOne(@Param('branchCompanyId') branchId: number) {
    return await this.branchService.findOne(branchId);
  }

  @Post('/createBranch')
  async create(@Body() payload: BranchCreateDto) {
    return await this.branchService.create(payload);
  }

  @ApiParam({ name: 'branchCompanyId', example: '1', type: 'number' })
  @Patch('/updateBranch/:branchCompanyId')
  async update(
    @Param('branchCompanyId') branch_company_id: number,
    @Body() branchData: BranchCreateDto,
  ) {
    return await this.branchService.update(branch_company_id, branchData);
  }

  @ApiParam({ name: 'branchCompanyId', example: '1', type: 'number' })
  @Delete('/deleteBranch/:branchCompanyId')
  async remove(@Param('branchCompanyId') branchId: number) {
    return await this.branchService.remove(branchId);
  }
}
