import { Injectable } from '@nestjs/common';
import { DeleteResponse, PostResponse, Product } from 'src/util/interfaces';
import { productsTableName } from 'src/configuration';
import { Api } from 'src/util/enums';
import { Operation } from 'src/util/interfaces';
import AWS from 'aws-sdk';
const dynamoClient = new AWS.DynamoDB({ region: 'eu-central-1' });

@Injectable()
export class ProductsService {
  constructor() {}

  getProduct(productId: string) {
    // const params = this.createParams(Api.GET, null, productId);
    const payload = {
      Key: {
        ProductId: {
          S: productId,
        },
      },
      TableName: productsTableName,
    };

    let item: object;
    dynamoClient.getItem(payload, (err, data) => {
      if (err) {
        return err;
      } else {
        // console.log(data)
        item = data;
      }
    });
    return item;
  }

  deleteItem(id: string): DeleteResponse {
    return {
      code: 200,
      message: 'Product deleted successfully.',
      deletedProduct: id,
    };
  }

  createProduct(details: Product) {
    try {
      const putParams = {
        Item: {
          ProductId: {
            S: details.productId,
          },
          category: {
            S: details.category,
          },
          price: {
            N: `${details.price}`,
          },
          name: {
            S: details.name,
          },
        },
        TableName: 'products',
      };

      const getParams = {
        Key: {
          ProductId: {
            S: details.productId,
          },
        },
        TableName: 'Products',
      };

      dynamoClient.putItem(putParams, (err, data) => {
        if (err) {
          throw err;
        } else {
          return dynamoClient.getItem(getParams, (err, data) => {
            if (err) {
              throw err;
            } else return data;
          });
        }
      });
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  private createParams(
    operation: Operation,
    details: Product = null,
    productId: string = null,
  ) {
    let payload = {};

    if (operation == Api.GET) {
      payload = {
        Key: {
          ProductId: {
            S: productId,
          },
        },
        TableName: productsTableName,
      };
    } else if (operation == Api.POST) {
      payload = {
        Item: {
          ProductId: {
            S: details.productId,
          },
          category: {
            S: details.category,
          },
          price: {
            N: `${details.price}`,
          },
          name: {
            S: details.name,
          },
        },
        TableName: productsTableName,
      };
    } else if (operation == Api.DELETE) {
      payload = {};
    }
    return payload;
  }
}
