import { Category } from './enums';

export interface Product {
  productId: string;
  name: string;
  category: Category;
  price: number;
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

export type Operation = 'GET' | 'POST' | 'DELETE'; 