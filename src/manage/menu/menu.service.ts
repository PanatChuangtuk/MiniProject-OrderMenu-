import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from 'src/entity/menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async findAll(): Promise<Menu[]> {
    return await this.menuRepository.find();
  }

  async findOne(menuId: number): Promise<Menu> {
    return await this.menuRepository.findOneBy({
      menu_id: menuId,
    });
  }

  async create(menuData: Partial<Menu>): Promise<Menu> {
    const newMenu = this.menuRepository.create(menuData);
    return await this.menuRepository.save(newMenu);
  }

  async update(menuId: number, menuData: Partial<Menu>): Promise<Menu> {
    const menu = await this.menuRepository.findOneBy({ menu_id: menuId });
    if (!menu) {
      throw new NotFoundException(`Menu with ID ${menuId} not found`);
    }
    Object.assign(menu, menuData);
    return await this.menuRepository.save(menu);
  }

  async remove(menuId: number): Promise<void> {
    const result = await this.menuRepository.delete(menuId);
    if (result.affected === 0) {
      throw new NotFoundException(`Menu with ID ${menuId} not found`);
    }
  }
}
