import { CategoriesRepo, ProductsRepo } from '../repos';
import {
  GetCategoryDto, CreateCategoryDto, DeleteCategoryDto, UpdateCategoryDto,
} from '../dtos';
import { ICategory, IProduct } from '../interfaces';

export class CategoriesService {
  constructor(private readonly repo: CategoriesRepo,
    private readonly productsRepo: ProductsRepo) { }

  getAllCategories = () => {
    return this.repo.getAllCategories();
  }

  getCategoryById = (dto: GetCategoryDto) => {
    return this.repo.getCategoryById(dto);
  }

  createCategory = (category: CreateCategoryDto) => {
    return this.repo.createCategory(category);
  }

  updateCategory = (category: UpdateCategoryDto, pid: string) => {
    return this.repo.updateCategory(category, pid);
  }

  deleteCategory(category: DeleteCategoryDto) {
    return this.repo.deleteCategory(category);
  }

  getCategoryProducts(category: GetCategoryDto): IProduct[] {
    return this.productsRepo.getAllProduct('categoryId', category.id);
  }

  categoryExists(dto: GetCategoryDto) {
    return !!this.getCategoryById(dto);
  }
}