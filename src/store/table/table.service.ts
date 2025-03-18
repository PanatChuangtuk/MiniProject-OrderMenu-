import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from 'src/entity/table.entity';
import * as qrcode from 'qrcode';
import * as fs from 'fs';
import * as path from 'path';
import { TableCreateDto } from 'src/store/table/table.dto';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private tableRepository: Repository<Table>,
  ) {}
  // ค้นหาข้อมูลทั้งหมดในตาราง
  async findAll() {
    return await this.tableRepository.find();
  }
  // ค้นหาข้อมูลในตารางด้วย ID ที่กำหนด
  async findOne(tableId: number) {
    const table = await this.tableRepository.findOne({
      where: { table_id: tableId },
    });
    if (!table) {
      throw new NotFoundException(`Table with ID ${tableId} not found`);
    }
    return table;
  }

  // สร้าง QR code และบันทึกไฟล์

  // สร้างข้อมูลใหม่ในตาราง
  async create(
    tableData: TableCreateDto,
    qrData: string,
    outputPath: string,
    qrcode_url: string,
    table_size_id: number,
  ) {
    const pathFile = `src/uploads/${outputPath}`;

    if (!fs.existsSync(pathFile)) {
      fs.mkdirSync(pathFile, { recursive: true });
    }
    if (!qrcode_url) {
      throw new BadRequestException('qrcode_url parameter is missing');
    } else if (!table_size_id) {
      throw new BadRequestException('table_size_id is missing');
    }

    try {
      const newTable = this.tableRepository.create({
        ...tableData,
        qrcode_url,
      });
      const savedQr = await this.tableRepository.save(newTable);
      const qrCodeBuffer = await qrcode.toBuffer(savedQr.table_id.toString(), {
        errorCorrectionLevel: 'H',
        width: 512,
      });
      const qrCodeFileName = `QR_TABLE_${savedQr.table_id}.png`;
      savedQr.qrcode_url = qrCodeFileName;
      const qrCodeFilePath = path.join(pathFile, qrCodeFileName);
      await fs.promises.writeFile(qrCodeFilePath, qrCodeBuffer);
      return await this.tableRepository.save(savedQr);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(
        'Failed to generate or save QR code OR table_size_id is missing it limit 3 size',
      );
    }
  }
  async update(tableId: number, tableData: TableCreateDto) {
    const table = await this.tableRepository.findOne({
      where: { table_id: tableId },
    });
    if (!table) {
      throw new NotFoundException(`Table with ID ${tableId} not found`);
    }
    Object.assign(table, tableData);
    return await this.tableRepository.save(table);
  }
  // ลบข้อมูลในตาราง
  async remove(tableId: number) {
    const result = await this.tableRepository.delete(tableId);
    if (result.affected === 0) {
      throw new NotFoundException(`Table with ID ${tableId} not found`);
    }
  }
}
