import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from 'src/entity/menu.entity';
import { MenuService } from 'src/manage/menu/menu.service';
import { MenuController } from './menu.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  providers: [MenuService],
  controllers: [MenuController],
})
export class MenuModule {}
