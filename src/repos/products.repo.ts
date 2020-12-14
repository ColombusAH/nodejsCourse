import { IProduct } from "interfaces";
import { GetProductDto, CreateProductDto, UpdateProductDto, DeleteProductDto } from '../dtos';
import { v4 as uuidv4 } from 'uuid';


export class ProductsRepo {

  constructor(private readonly productDb: any) {
  }

  getAllProducts = (): IProduct[] => {
    return this.productDb.value();
  };

  getAllProduct = (by: string, value: string): IProduct[] => {
    return this.productDb.filter({ [by]: [value] }).value();
  }

  getProductById = ({ id }: GetProductDto): IProduct => {
    const products = this.productDb.value() as IProduct[];
    return products.find(p => p.id === id);
  };

  createProduct = (productDto: CreateProductDto) => {
    const id = uuidv4();
    this.productDb.push({ id, ...productDto }).write();
    return { id, ...productDto };
  };

  updateProduct(product: UpdateProductDto, pid: string) {
    this.productDb
      .find({ id: pid })
      .assign({ pid, ...product })
      .write();
    return { id: pid, ...product };
  }

  deleteProduct({ id }: DeleteProductDto) {
    this.productDb.remove({ id }).write();
    return null;
  }
}