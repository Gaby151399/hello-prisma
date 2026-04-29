import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Status } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService {
  constructor( private readonly databaseService: DatabaseService){}

  async create(data: Prisma.ProductCreateInput) {
    try {
      return await this.databaseService.product.create({
        data
      })
    } catch (error) {
      throw new error(error)
    }
  }

  async findAll(status?: Status) {
    if(!status){
      return await this.databaseService.product.findMany({});
    }
    
    return this.databaseService.product.findMany({
      where: {
        status: status
      }
    });
  }

  async findOne(id: number) {
    try {
      const product = await this.databaseService.product.findUnique({
        where: {id}
      });
      
      if(!product){
        throw new NotFoundException(`Product #${id} not found`);
      }

      return product;
    } catch (error) {
      throw new error(error)
    }
  }

  async update(id: number, data: Prisma.ProductUpdateInput) {
    const productExists = await this.findOne(id);
    if(!productExists){
      throw new NotFoundException(`Product #${id} not found`);
    }

    try {
      return await this.databaseService.product.update({
        where:{id},
        data
      })
    } catch (error) {
      throw new error(error)
    }
  }

  async remove(id: number) {
    const productExists = await this.findOne(id);
    if(!productExists){
      throw new NotFoundException(`Product #${id} not found`);
    }
    try {
      return await this.databaseService.product.delete({
        where:{id},
      })
    } catch (error) {
      throw new error(error)
    }
  }
}
