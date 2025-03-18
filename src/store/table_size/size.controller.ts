import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeCreateDto } from 'src/store/table_size/size.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('size')
@Controller('size') // กำหนด path สำหรับ Controller
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Get()
  async findAll() {
    return await this.sizeService.findAll();
  }

  @ApiParam({ name: 'table_size_id', example: '1', type: 'number' })
  @Get('sizeId/:table_size_id')
  async findOne(@Param('table_size_id') sizeId: number) {
    return await this.sizeService.findOne(sizeId);
  }

  @Post('/createSize')
  async create(@Body() tableSizeId: number, sizeData: SizeCreateDto) {
    return await this.sizeService.create(tableSizeId, sizeData);
  }

  @ApiParam({ name: 'table_size_id', example: '1', type: 'number' })
  @Patch('/updateSize/:table_size_id')
  async update(
    @Param('table_size_id') sizeId: number,
    @Body() sizeData: SizeCreateDto,
  ) {
    return await this.sizeService.update(sizeId, sizeData);
  }

  @ApiParam({ name: 'table_size_id', example: '1', type: 'number' })
  @Delete('/deleteSize/:table_size_id')
  async remove(@Param('table_size_id') sizeId: number) {
    await this.sizeService.remove(sizeId);
  }
}
