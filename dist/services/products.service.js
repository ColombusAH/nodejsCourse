"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
class ProductService {
    constructor(repo) {
        this.repo = repo;
        this.getAllProducts = () => {
            return this.repo.getAllProducts();
        };
        this.getProductById = (dto) => {
            return this.repo.getProductById(dto);
        };
        this.createProduct = (product) => {
            return this.repo.createProduct(product);
        };
        this.updateProduct = (product, pid) => {
            return this.repo.updateProduct(product, pid);
        };
    }
    deleteProduct(product) {
        return this.repo.deleteProduct(product);
    }
}
exports.ProductService = ProductService;
