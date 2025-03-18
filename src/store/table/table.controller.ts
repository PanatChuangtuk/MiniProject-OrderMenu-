import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Res,
  Patch,
} from '@nestjs/common';
import { TableService } from './table.service';
import { Response } from 'express';
import { TableCreateDto } from 'src/store/table/table.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('table')
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  async findAll() {
    const tables = await this.tableService.findAll();
    return { tables };
  }
  @ApiParam({ name: 'table_id', example: '1', type: 'number' })
  @Get('/tableId/:table_id')
  async findOne(@Param('table_id') tableId: number) {
    return await this.tableService.findOne(tableId);
  }

  @Post('/createTable')
  async create(
    @Body('qrcode_url') qrcode_url: string,
    @Body('table_size_id') table_size_id: number,
    @Body() tableCreateDto: TableCreateDto,
    @Res() response: Response,
  ) {
    const qrCodeFilePath = await this.tableService.create(
      tableCreateDto,
      qrcode_url,
      'table',
      'outputPath',
      table_size_id,
    );
    response.status(200).json({ qrCodeFilePath });
    {
      return qrCodeFilePath;
    }
  }

  @ApiParam({ name: 'table_id', example: '1', type: 'number' })
  @Patch('/updateTable/:table_id')
  async update(
    @Param('table_id') tableId: number,
    @Body() tableData: TableCreateDto,
  ) {
    return await this.tableService.update(tableId, tableData);
  }

  @ApiParam({ name: 'table_id', example: '1', type: 'number' })
  @Delete('/deleteTable/:table_id')
  async remove(@Param('table_id') tableId: number) {
    await this.tableService.remove(tableId);
  }
}
