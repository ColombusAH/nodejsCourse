"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
class CategoriesService {
    constructor(repo, productsRepo) {
        this.repo = repo;
        this.productsRepo = productsRepo;
        this.getAllCategories = () => {
            return this.repo.getAllCategories();
        };
        this.getCategoryById = (dto) => {
            return this.repo.getCategoryById(dto);
        };
        this.createCategory = (category) => {
            return this.repo.createCategory(category);
        };
        this.updateCategory = (category, pid) => {
            return this.repo.updateCategory(category, pid);
        };
    }
    deleteCategory(category) {
        return this.repo.deleteCategory(category);
    }
    getCategoryProducts(category) {
        return this.productsRepo.getAllProduct('categoryId', category.id);
    }
    categoryExists(dto) {
        return !!this.getCategoryById(dto);
    }
}
exports.CategoriesService = CategoriesService;
