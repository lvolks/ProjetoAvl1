import { ProductDTO } from './ProductDTO';

export class ResponseCreateProduct {
  public message: string;
  public product: ProductDTO;

  public constructor(message, product: ProductDTO) {
    this.message = message;
    this.product = product;
  }
}