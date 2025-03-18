import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from 'src/entity/table.entity';
import { TableService } from './table.service';
import { TableController } from './table.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Table])],
  providers: [TableService],
  controllers: [TableController],
})
export class TableModule {}
