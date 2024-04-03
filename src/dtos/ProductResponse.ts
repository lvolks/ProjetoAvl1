import { ProductDTO } from './ProductDTO';

export class ProductResponse {
  public message: string;
  public product: ProductDTO | null;

  public constructor(message: string, product: ProductDTO | null) {
    this.message = message;
    this.product = product;
  }
}