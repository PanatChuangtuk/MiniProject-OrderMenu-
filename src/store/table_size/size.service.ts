import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from 'src/entity/size.entity'; // Adjust path based on your project structure
import { SizeCreateDto } from 'src/store/table_size/size.dto';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private sizeRepository: Repository<Size>,
  ) {}

  async findAll() {
    return await this.sizeRepository.find();
  }

  async findOne(tableSizeId: number) {
    const size = await this.sizeRepository.findOneBy({
      table_size_id: tableSizeId,
    });
    if (!size) {
      throw new NotFoundException(`Size with ID ${tableSizeId} not found`);
    }
    return size;
  }

  async create(tableSizeId: number, sizeData: SizeCreateDto) {
    if (!tableSizeId == !tableSizeId) {
      throw new NotFoundException(
        `Size with ID is not create the Program limit is 3`,
      );
    }
    const newSize = this.sizeRepository.create(sizeData);
    return await this.sizeRepository.save(newSize);
  }

  async update(tableSizeId: number, sizeData: SizeCreateDto) {
    const table = await this.sizeRepository.findOne({
      where: { table_size_id: tableSizeId },
    });
    if (!table) {
      throw new NotFoundException(`Table with ID ${tableSizeId} not found`);
    }
    Object.assign(table, sizeData);
    return await this.sizeRepository.save(table);
  }

  async remove(sizeId: number) {
    const result = await this.sizeRepository.delete(sizeId);
    if (result.affected === 0) {
      throw new NotFoundException(`Size with ID ${sizeId} not found`);
    }
  }
}
