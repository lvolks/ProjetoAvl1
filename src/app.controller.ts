import {
  Controller,
  Get,
  Body,
  Post,
  Put,
  Delete,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./models/Product";
import { ResponseCreateProduct } from "./dtos/RespondeCreateProduct";
import { ProductDTO } from "./dtos/ProductDTO";
import { ResponseUpdateProduct } from "./dtos/RespondeUpdateProduct";

@Controller()
export class AppController {
  constructor(
    @InjectModel(Product)
    private product: typeof Product,
    private readonly appService: AppService
  ) {
    Product.sync()
  }

  // ------------------------------------ POST --------------------------------------

  @Post("/product")
  async createProduct(
    @Body() postData: ProductDTO
  ): Promise<ResponseCreateProduct> {
    await this.product.create({
      name: postData.name,
      company: postData.company,
      description: postData.description,
      quantity: postData.quantity,
      brand: postData.brand,
      value: postData.value,
    });

    return new ResponseCreateProduct("Produto inserido com sucesso", postData);
  }

  // ------------------------------------ GET --------------------------------------

  @Get("/product")
  async getProduct(): Promise<Product[]> {
    return this.product.findAll();
  }

  @Get("/product/:id")
  async getProductById(@Param("id") id: number): Promise<Product[]> {
    return this.product.findAll({
      where: {
        id,
      },
    });
  }

  @Get("/product-querystring")
  async getProductByQueryString(
    @Query("name") name: string
  ): Promise<Product[]> {
    return this.product.findAll({
      where: {
        name,
      },
    });
  }

  // ------------------------------------ PUT --------------------------------------

  @Put("/product")
  async putProduct(
    @Query("id") id: number,
    @Body() body: ProductDTO
  ): Promise<ResponseUpdateProduct> {
    this.validation(id, body);

    return new ResponseUpdateProduct(
      await this.appService.putProduct(id, body)
    );
  }

  // ------------------------------------ DELETE --------------------------------------

  @Delete("/product")
  async deleteProduct(@Query("id") id: number) {
    this.validationIdElement(id);
    await this.appService.deleteProduct(id);

    return {
      message: 'Produto removido com sucesso'
    };
  }

  // ------------------------------------ VALIDATIONS --------------------------------------

  private validation(id: number, body: ProductDTO) {
    this.validationIdElement(id);
    this.validationBody(body);
  }

  private validationIdElement(id: number) {
    if (!id) {
      throw new HttpException(
        "Bad request: Id não está presente",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  private validationBody(body: ProductDTO) {
    if (
      !body.name ||
      !body.company ||
      !body.description ||
      !body.quantity ||
      !body.brand ||
      !body.value
    ) {
      throw new HttpException(
        "Bad request: é necessário que todos os campos sejam preenchidos",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
