import { Body, Controller, Delete, Get, Param, Post, Header } from '@nestjs/common';
import { ProductsService } from './products.service';
import { DeleteResponse, PostResponse, Product } from 'src/util/interfaces';

@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Get('/get/:productId')
  getProducts(@Param('productId') productId: string) {
    const response = this.ProductsService.getProduct(productId);
    console.log("dsa", response);
    return response;
  }

  @Delete('/delete/:id')
  deleteProduct(@Param('id') id: string): DeleteResponse {
    let response: DeleteResponse = this.ProductsService.deleteItem(id);
    return response;
  }

  @Post('/add')
  @Header('Content-type', 'application/json')
  async addProduct(@Body() body: Product) {
    let response = await this.ProductsService.createProduct(body);
    return response;
  }
}
