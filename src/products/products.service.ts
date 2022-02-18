import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { DeleteResponse, PostResponse, Product } from 'src/util/interfaces';

@Injectable()
export class ProductsService {
  getProducts(numberOfItems: number): Product[] {
    let counter = numberOfItems;
    let products = [];
    while (counter > 0) {
      products.push({
        id: counter,
        name: `Product no: ${counter}`,
      });
      counter--;
    }

    return products.reverse();
  }

  deleteItem(id: string): DeleteResponse {
    return {
      code: 200,
      message: 'Product deleted successfully.',
      deletedProduct: id,
    };
  }
  
  async createProduct(details: Product): Promise<PostResponse> {
    return {
      code: 200,
      message: 'Product added succesfully.',
      createdProduct: details,
    };
  }

}
