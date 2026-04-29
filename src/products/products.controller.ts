import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma, Status } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createProductDto: Prisma.ProductCreateInput) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @HttpCode(200)
  findAll(@Query("status") status: Status) {
    return this.productsService.findAll(status);
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: number, @Body() updateProductDto: Prisma.ProductUpdateInput) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }
}
