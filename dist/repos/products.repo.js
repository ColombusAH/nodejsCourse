"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRepo = void 0;
const uuid_1 = require("uuid");
class ProductsRepo {
    constructor(productDb) {
        this.productDb = productDb;
        this.getAllProducts = () => {
            return this.productDb.value();
        };
        this.getAllProduct = (by, value) => {
            return this.productDb.filter({ [by]: [value] }).value();
        };
        this.getProductById = ({ id }) => {
            const products = this.productDb.value();
            return products.find(p => p.id === id);
        };
        this.createProduct = (productDto) => {
            const id = uuid_1.v4();
            this.productDb.push(Object.assign({ id }, productDto)).write();
            return Object.assign({ id }, productDto);
        };
    }
    updateProduct(product, pid) {
        this.productDb
            .find({ id: pid })
            .assign(Object.assign({ pid }, product))
            .write();
        return Object.assign({ id: pid }, product);
    }
    deleteProduct({ id }) {
        this.productDb.remove({ id }).write();
        return null;
    }
}
exports.ProductsRepo = ProductsRepo;
