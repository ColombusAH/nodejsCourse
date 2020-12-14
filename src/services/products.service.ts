import { GetProductDto, CreateProductDto, UpdateProductDto, DeleteProductDto } from '../dtos';
import { ProductsRepo } from '../repos';

export class ProductService {
  constructor(private readonly repo: ProductsRepo) { }

  getAllProducts = () => {
    return this.repo.getAllProducts();
  }

  getProductById = (dto: GetProductDto) => {
    return this.repo.getProductById(dto);
  }

  createProduct = (product: CreateProductDto) => {
    return this.repo.createProduct(product);
  }

  updateProduct = (product: UpdateProductDto, pid: string) => {
    return this.repo.updateProduct(product, pid);
  }

  deleteProduct(product: DeleteProductDto) {
    return this.repo.deleteProduct(product);
  }
}