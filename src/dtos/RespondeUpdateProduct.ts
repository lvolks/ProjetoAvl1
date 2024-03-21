import { ProductDTO } from './ProductDTO';

export class ResponseUpdateProduct {
  public message: string;
  public product: ProductDTO;

  public constructor(product: ProductDTO) {
    this.message = "This update of this products is success";
    this.product = product;
  }
}