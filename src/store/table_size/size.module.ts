import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Size } from 'src/entity/size.entity'; // Import Entity Size ที่เราได้สร้างไว้
import { SizeService } from './size.service';
import { SizeController } from './size.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Size])],
  providers: [SizeService],
  controllers: [SizeController],
})
export class SizeModule {}
