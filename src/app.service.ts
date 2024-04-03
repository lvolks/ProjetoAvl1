import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductDTO } from './dtos/ProductDTO';
import { Product } from './models/Product';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Product)
    private product: typeof Product
  ) {}
  
  // ------------------------------------ SERVICE POST --------------------------------------

  async createProduct(data: ProductDTO) {
    return this.product.create({
      name: data.name,
      company: data.company,
      description: data.description,
      quantity: data.quantity,
      brand: data.brand,
      value: data.value,
    });
  }


  // ------------------------------------ SERVICE PUT --------------------------------------

  async putProduct(
    id: number,
    putData: ProductDTO
  ) {
    const product = await this.product.findOne({
      where: {
        id,
      }
    });

    if (!product) {
      throw new HttpException(
        'Not Found product to this id', 
        HttpStatus.NOT_FOUND
      );
    }

    return await product.update(putData);
  }

  // ------------------------------------ SERVICE DELETE --------------------------------------

  async deleteProduct(id: number) {
    const product = await this.product.findOne({
      where: {
        id,
      }
    });

    if (!product) {
      throw new HttpException(
        'Not Found product to this id', 
        HttpStatus.NOT_FOUND
      );
    }

    return await product.destroy();
  }
}
