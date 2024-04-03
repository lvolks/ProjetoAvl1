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
import { ProductDTO } from "./dtos/ProductDTO";
import { ProductResponse } from "./dtos/ProductResponse";

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
    @Body() body: ProductDTO
  ) {
    this.validateProductBody(body);
    const data = await this.appService.createProduct(body)

    return new ProductResponse("Produto inserido com sucesso", data);
  }

  // ------------------------------------ GET --------------------------------------

  @Get("/product")
  async getProduct(): Promise<Product[]> {
    return this.product.findAll();
  }

  @Get("/product/:id")
  async getProductById(@Param("id") id: number): Promise<Product> {
    this.validateId(id);
    return this.product.findOne({
      where: {
        id,
      },
    });
  }

  @Get("/product-search")
  async searchProduct(
    @Query("name") name: string
  ): Promise<Product> {
    this.validateName(name)
    return this.product.findOne({
      where: {
        name,
      },
    });
  }

  // ------------------------------------ PUT --------------------------------------

  @Put("/product/:id")
  async putProduct(
    @Param("id") id: number,
    @Body() body: ProductDTO
  ) {
    this.validateId(id);
    this.validateProductBody(body);

    const updatedProduct = await this.appService.putProduct(id, body)

    return new ProductResponse("Produto atualizado com sucesso", updatedProduct);
  }

  // ------------------------------------ DELETE --------------------------------------

  @Delete("/product/:id")
  async deleteProduct(@Param("id") id: number) {
    this.validateId(id);
    await this.appService.deleteProduct(id);

    return new ProductResponse("Produto removido com sucesso", null);
  }

  // ------------------------------------ VALIDATIONS --------------------------------------

  private validateId(id: number) {
    if (!id) {
      throw new HttpException(
        "Bad request: Id não está presente",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  private validateName(name: string) {
    if (!name) {
      throw new HttpException(
        "Bad request: name não está presente",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  private validateProductBody(body: ProductDTO) {
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
