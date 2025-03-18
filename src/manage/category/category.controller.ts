import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from 'src/entity/category.entity';

@Controller('menu-category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<{ category: Category[] }> {
    const category = await this.categoryService.findAll();
    return { category };
  }

  @Get(':category_id')
  async findOne(@Param('category_id') categoryId: number): Promise<Category> {
    return await this.categoryService.findOne(categoryId);
  }

  @Post()
  async create(@Body() categoryData: Category): Promise<Category> {
    const createdCategory = await this.categoryService.create(categoryData);
    return createdCategory;
  }

  @Patch(':category_id')
  async update(
    @Param('category_id') categoryId: number,
    @Body() categoryData: Partial<Category>,
  ): Promise<Category> {
    const updateCatagory = await this.categoryService.update(
      categoryId,
      categoryData,
    );
    return updateCatagory;
  }

  @Delete(':category_id')
  async remove(@Param('category_id') categoryId: number): Promise<void> {
    return await this.categoryService.remove(categoryId);
  }
}
