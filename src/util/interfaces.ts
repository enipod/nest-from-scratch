import { Category } from './enums';

export interface Product {
  id: string;
  name: string;
  category: Category;
}

export interface PostResponse {
  code: number;
  message: string;
  createdProduct?: Product;
}

export interface DeleteResponse {
    code: number;
    message: string;
    deletedProduct?: string;
}
