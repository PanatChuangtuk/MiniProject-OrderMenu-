import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(categoryId: number): Promise<Category> {
    return await this.categoryRepository.findOneBy({
      categoryId: categoryId,
    });
  }

  async create(categoryData: Partial<Category>): Promise<Category> {
    const newCategory = this.categoryRepository.create(categoryData);
    return await this.categoryRepository.save(newCategory);
  }

  async update(
    categoryId: number,
    categoryData: Partial<Category>,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ categoryId });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
    Object.assign(category, categoryData);
    return await this.categoryRepository.save(category);
  }

  async remove(categoryId: number): Promise<void> {
    const result = await this.categoryRepository.delete(categoryId);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
  }
}
