import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { DeleteResponse, PostResponse, Product } from 'src/util/interfaces';
import { report } from 'process';

@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Get('/get/:noOfItems')
  getProducts(@Param('noOfItems') noOfItems: number): Product[] {
    return this.ProductsService.getProducts(noOfItems);
  }

  @Delete('/delete/:id')
  deleteProduct(@Param('id') id: string): DeleteResponse {
    let response: DeleteResponse = this.ProductsService.deleteItem(id);
    return response;
  }

  @Post('/add')
  async addProduct(body: Product): Promise<PostResponse> {
    let response: PostResponse =
      await this.ProductsService.createProduct(body);
    return response;
  }
}
