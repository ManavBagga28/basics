// import { PrismaClient } from "@prisma/client";
// import { ICatalogRepository } from "../interface/catalogRepository.interface";
// import { Product } from "../types/product";
// import { NotFoundError } from "../utils/error";

// export class CatalogRepository implements ICatalogRepository {
//   _prisma: PrismaClient;

//   constructor() {
//     this._prisma = new PrismaClient();
//   }

//   async create(data: Product): Promise<Product> {
//     return this._prisma.product.create({
//       data,
//     });
//   }
//   async update(data: Product): Promise<Product> {
//     return this._prisma.product.update({
//       where: { id: data.id },
//       data,
//     });
//   }
//   async delete(id: any) {
//     return this._prisma.product.delete({
//       where: { id },
//     });
//   }
//   async find(limit: number, offset: number): Promise<Product[]> {
//     return this._prisma.product.findMany({
//       take: limit,
//       skip: offset,
//     });
//   }
//   async findOne(id: number): Promise<Product> {
//     const product = await this._prisma.product.findFirst({
//       where: { id },
//     });
//     if (product) {
//       return Promise.resolve(product);
//     }
//     throw new NotFoundError("product not found");
//   }
// }

import { Repository } from "typeorm";
import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { AppDataSource } from "~src/config/ormconfig";
import { NotFoundError } from "../utils/error";
import { Product } from "~src/entities/products";

export class CatalogRepository implements ICatalogRepository {
  private _repository: Repository<Product>;

  constructor() {
    this._repository = AppDataSource.getRepository(Product);
  }

  async create(data: Product): Promise<Product> {
    const product = this._repository.create(data);
    return await this._repository.save(product);
  }

  async update(data: Product): Promise<Product> {
    await this._repository.update(data?.id || 0, data);
    return this.findOne(data?.id || 0); 
  }

  async delete(id: number): Promise<void> {
    const product = await this.findOne(id);
    if (!product) throw new NotFoundError("Product not found");
    await this._repository.remove(product); 
  }

  async find(limit: number, offset: number): Promise<Product[]> {
    return await this._repository.find({
      take: limit, 
      skip: offset, 
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this._repository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    return product;
  }
}
