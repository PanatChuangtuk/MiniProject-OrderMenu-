import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { Menu } from 'src/entity/menu.entity';
import { MenuService } from 'src/manage/menu/menu.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('manage-menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async findAll(): Promise<{ menu: Menu[] }> {
    const menu = await this.menuService.findAll();
    return { menu };
  }

  @Get(':id')
  async findOne(@Param('id') menuId: number): Promise<Menu> {
    return await this.menuService.findOne(menuId);
  }

  @Post()
  async create(@Body() menuData: Menu): Promise<Menu> {
    const createdMenu = await this.menuService.create(menuData);
    return createdMenu;
  }

  @Patch(':id')
  async update(
    @Param('id') menuId: number,
    @Body() menuData: Partial<Menu>,
  ): Promise<Menu> {
    const updateMenu = await this.menuService.update(menuId, menuData);
    return updateMenu;
  }

  @Delete(':id')
  async remove(@Param('id') menuId: number): Promise<void> {
    return await this.menuService.remove(menuId);
  }

  @Post('picture') //multiple files upload
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: 'public/img',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image',
        })
        .addMaxSizeValidator({
          maxSize: 10000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Express.Multer.File,
  ) {
    const newFile = [];
    for (const [k, v] of Object.entries(files)) {
      newFile[k] = v.filename;
    }
    console.log(newFile);
    return {
      statusCode: 200,
      data: newFile,
    };
  }
}
