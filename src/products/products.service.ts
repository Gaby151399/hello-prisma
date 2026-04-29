import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Status } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: Prisma.ProductCreateInput) {
    return this.databaseService.product.create({ data });
  }

  async findAll(status?: Status) {
    return this.databaseService.product.findMany({
      where: status ? { status } : undefined,
    });
  }

  async findOne(id: number) {
    const product = await this.databaseService.product.findUnique({ where: { id: id } });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async update(id: number, data: Prisma.ProductUpdateInput) {
    await this.findOne(id);
    return this.databaseService.product.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseService.product.delete({ where: { id } });
  }
}
